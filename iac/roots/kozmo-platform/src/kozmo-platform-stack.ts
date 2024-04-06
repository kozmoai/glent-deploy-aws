// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  KOZMOEnvironmentParams,
  DynamoDBConstruct,
  HostedZoneConstruct,
  NetworkConstruct,
  RdsConstruct,
  Wafv2BasicConstruct,
} from "@aws/aws-app-development-common-constructs";
import { WafV2Scope } from "@aws/aws-app-development-common-constructs/src/wafv2-basic-construct";
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as kms from "aws-cdk-lib/aws-kms";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { KOZMORootRoleConstruct } from "./constructs/kozmo-role-construct";
import { BackstageFargateServiceConstruct } from "./constructs/backstage-fargate-service-construct";
import { CustomConstruct } from "./constructs/custom-resource-construct";
import { GitlabHostingConstruct } from "./constructs/gitlab-hosting-construct";
import { GitlabRunnerConstruct } from "./constructs/gitlab-runner-construct";
import { NagSuppressions } from "cdk-nag";

function getEnvVarValue(envVar: string | undefined): string {
  if (!envVar || envVar === "blank") {
    return "";
  }
  return envVar;
}

export interface KOZMOPlatformStackProps extends cdk.StackProps {
  // readonly config: BackstageInfraConfig;
}

export class KOZMOPlatformStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: KOZMOPlatformStackProps) {
    super(scope, id, props);

    const sAllowedIPs = getEnvVarValue(process.env.ALLOWED_IPS);
    const allowedIPs = !sAllowedIPs ? [] : sAllowedIPs?.split(",").map((s) => {
      return s.trim();
    });

    // Creating environment params
    const kozmoParams: KOZMOEnvironmentParams = {
      envName: "platform",
      awsRegion: getEnvVarValue(process.env.AWS_DEFAULT_REGION) || "us-east-1",
      awsAccount: getEnvVarValue(process.env.AWS_ACCOUNT_ID),
      prefix: getEnvVarValue(process.env.PREFIX) || "kozmo",
    };

    // Create encryption key for all data at rest encryption
    const key = new kms.Key(this, `${kozmoParams.prefix}-key`, {
      alias: `${kozmoParams.prefix}-key`,
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pendingWindow: cdk.Duration.days(8),
    });

    // save KMS key arn in an SSM Parameter
    new ssm.StringParameter(this, `${kozmoParams.prefix}-key-param`, {
      allowedPattern: ".*",
      description: "The KMS Key for KOZMO Solution",
      parameterName: `/${kozmoParams.prefix}/kms-key`,
      stringValue: key.keyArn,
    });

    // Create a secret to store Okta authentication details
    const oktaSecret = new secretsmanager.Secret(this, `${kozmoParams.prefix}-key-okta-secrets`, {
      secretName: `${kozmoParams.prefix}-okta-secrets`,
      secretObjectValue: {
        clientId: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_CLIENT_ID)),
        clientSecret: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_CLIENT_SECRET)),
        audience: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_AUDIENCE)),
        authServerId: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_AUTH_SERVER_ID)),
        idp: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_IDP)),
        apiToken: cdk.SecretValue.unsafePlainText(getEnvVarValue(process.env.OKTA_API_TOKEN)),
      },
      encryptionKey: key,
    });

    //Create Gitlab Admins Secret
    const gitlabSecret = new secretsmanager.Secret(this, `${kozmoParams.prefix}-key-gitlab-admin-secrets`, {
      secretName: `${kozmoParams.prefix}-admin-gitlab-secrets`,
      secretObjectValue: {
        username: cdk.SecretValue.unsafePlainText("kozmo-admin"),
        password: cdk.SecretValue.unsafePlainText(""),
        apiToken: cdk.SecretValue.unsafePlainText(""),
        runnerId: cdk.SecretValue.unsafePlainText(""),
        runnerRegistrationToken: cdk.SecretValue.unsafePlainText(""),
      },
      encryptionKey: key,
    });

    NagSuppressions.addResourceSuppressions(
      [oktaSecret, gitlabSecret],
      [{ id: "AwsSolutions-SMG4", reason: "Secrets for 3rd party service and should not be automatically rotated" }]
    );

    // Create an ECR repository to contain backstage container images
    const ecrRepository = new ecr.Repository(this, `${kozmoParams.prefix}-ecr-repository`, {
      repositoryName: `${kozmoParams.prefix}-backstage`,
      imageScanOnPush: true,
      encryption: ecr.RepositoryEncryption.KMS,
      encryptionKey: key,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true,
    });

    // Save ECR Repo in an SSM Parameter
    const backstageECRParam = new ssm.StringParameter(this, `${kozmoParams.prefix}-backstage-ecr-param`, {
      allowedPattern: ".*",
      description: "The ECR Key for Backstage Solution",
      parameterName: `/${kozmoParams.prefix}/backstage-ecr`,
      stringValue: ecrRepository.repositoryName,
    });

    // Create VPC for hosting backstage
    const network = new NetworkConstruct(this, "Backstage-Network", {
      kozmoEnv: kozmoParams,
      cidrRange: "10.0.0.0/16",
      isIsolated: false,
      allowedIPs,
      publicVpcNatGatewayCount: 3,
      vpcAzCount: 3
    });

    // Create DB for backstage platform
    const rdsConstruct = new RdsConstruct(this, "rds-construct", {
      kozmoEnv: kozmoParams,
      vpc: network.vpc,
      kmsKey: key,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.R6G, ec2.InstanceSize.XLARGE),
    });

    // Create Solution DynamoDB Tables - SecurityRoleMapping
    const securityMappingTableConstruct = new DynamoDBConstruct(this, "security-mapping-table", {
      kozmoEnv: kozmoParams,
      tableName: "SecurityMappingTable",
      kmsKey: key,
    });

    // Create Master role
    const backstageRootRole = new KOZMORootRoleConstruct(this, "backstage-master-role", {
      kozmoEnv: kozmoParams,
      securityTableName: securityMappingTableConstruct.table.tableName,
      KMSkey: key,
      network,
    });

    const customerName = getEnvVarValue(process.env.CUSTOMER_NAME) || "AWS";
    const customerLogo = getEnvVarValue(process.env.CUSTOMER_LOGO) || "https://companieslogo.com/img/orig/AMZN_BIG-accd00da.png";
    const customerLogoIcon = getEnvVarValue(process.env.CUSTOMER_LOGO_ICON) || "https://companieslogo.com/img/orig/AMZN.D-13fddc58.png";

    let gitlabHostingConstruct: GitlabHostingConstruct;
    let hostedZone: HostedZoneConstruct;
    let backstageConstruct: BackstageFargateServiceConstruct;

    // Generate Load balancer for secure / non secure deployments
    const hostedZoneName = getEnvVarValue(process.env.R53_HOSTED_ZONE_NAME) || "";
    if (!hostedZoneName) {
      throw new Error("R53_HOSTED_ZONE_NAME variable must be set");
    }

    hostedZone = new HostedZoneConstruct(this, "hostedZoneMain", {
      kozmoEnv: kozmoParams,
      R53HostedZoneName: hostedZoneName,
    });

    // Create a secured EC2 Hosted Gitlab
    gitlabHostingConstruct = new GitlabHostingConstruct(this, "GitlabHosting-Construct", {
      kozmoEnv: kozmoParams,
      GitlabAmi: { [kozmoParams.awsRegion]: getEnvVarValue(process.env.GITLAB_AMI) || "ami-08a5423c2bcf8eefc" },
      network: network,
      accessLogBucket: network.logBucket,
      instanceDiskSize: 3000,
      instanceSize: ec2.InstanceSize.XLARGE,
      instanceClass: ec2.InstanceClass.C5,
      hostedZone: hostedZone,
      gitlabSecret,
    });
    gitlabHostingConstruct.node.addDependency(gitlabSecret);

    backstageConstruct = new BackstageFargateServiceConstruct(this, `${kozmoParams.prefix}-fargate-service`, {
      network: network,
      kozmoEnv: kozmoParams,
      ecrRepository,
      ecrKmsKey: key,
      accessLogBucket: network.logBucket,
      dbCluster: rdsConstruct.cluster,
      oktaSecret,
      gitlabAdminSecret: gitlabSecret,
      taskRole: backstageRootRole.IAMRole,
      gitlabHostname: gitlabHostingConstruct.gitlabHostName,
      hostedZone,
      customerName,
      customerLogo,
      customerLogoIcon,
    });

    // Create EC2 Gitlab Runner
    const gitlabRunner = new GitlabRunnerConstruct(this, "GitlabRunner-Construct", {
      kozmoEnv: kozmoParams,
      network,
      runnerSg: gitlabHostingConstruct.gitlabRunnerSecurityGroup,
      GitlabAmi: { [kozmoParams.awsRegion]: getEnvVarValue(process.env.GITLAB_RUNNER_AMI) || "ami-0557a15b87f6559cf" },
      gitlabSecret,
      instanceDiskSize: 3000,
      instanceSize: ec2.InstanceSize.XLARGE,
      instanceClass: ec2.InstanceClass.C5,
    });
    // wait till gitlab host is done.
    gitlabRunner.node.addDependency(gitlabHostingConstruct);

    // Create a regional WAF Web ACL for load balancers
    const wafConstruct = new Wafv2BasicConstruct(this, `${kozmoParams.prefix}-regional-wafAcl`, {
      wafScope: WafV2Scope.REGIONAL,
      region: cdk.Stack.of(this).region,
    });

    // Associate the web ACL with load balancers
    wafConstruct.addResourceAssociation(
      `${kozmoParams.prefix}-backstage-alb-backstage-webacl-assoc`,
      backstageConstruct.loadBalancer.loadBalancerArn
    );

    wafConstruct.addResourceAssociation(
      `${kozmoParams.prefix}-gitlab-alb-git-webacl-assoc`,
      gitlabHostingConstruct.alb.loadBalancerArn
    );

    new cdk.CfnOutput(this, `${kozmoParams.prefix}-ecr-output`, {
      value: backstageECRParam.parameterName,
      description: "ECR repository for backstage platform images",
    });
  }
}
