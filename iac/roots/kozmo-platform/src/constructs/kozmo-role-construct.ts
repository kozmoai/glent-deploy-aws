// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { KOZMOEnvironmentParams, NetworkConstruct } from "@aws/aws-app-development-common-constructs";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { NagSuppressions } from "cdk-nag";
import { Construct } from "constructs";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface KOZMORootRoleConstructProps extends cdk.StackProps {
  readonly kozmoEnv: KOZMOEnvironmentParams;
  readonly securityTableName: string;
  KMSkey: kms.IKey;
  network: NetworkConstruct;
}

const defaultProps: Partial<KOZMORootRoleConstructProps> = {};

export class KOZMORootRoleConstruct extends Construct {
  public IAMRole: iam.Role;
  private props: KOZMORootRoleConstructProps;

  constructor(parent: Construct, name: string, props: KOZMORootRoleConstructProps) {
    super(parent, name);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    this.props = { ...defaultProps, ...props };
    this.IAMRole = new iam.Role(this, name, {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      roleName: name,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2ContainerRegistryFullAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMReadOnlyAccess"),
      ],
      inlinePolicies: {
        [`${name}-role-assumption`]: this.createRoleAssumptionPolicyDocument(this.props.kozmoEnv.awsAccount),
      },
      maxSessionDuration: cdk.Duration.seconds(43200),
    });

    // Add permissions to the default policy for actions required by the role
    this.IAMRole.addToPolicy(this.createSecretsManagerStatement());
    this.IAMRole.addToPolicy(this.createS3BucketStatement());
    this.IAMRole.addToPolicy(this.createS3ObjectStatement());
    this.IAMRole.addToPolicy(this.createResourceGroupsStatement());
    this.IAMRole.addToPolicy(this.createCloudformationStatement());
    this.IAMRole.addToPolicy(this.createTagStatement());
    this.IAMRole.addToPolicy(this.createKmsStatement());
    this.IAMRole.addToPolicy(this.createEc2Statement());
    this.IAMRole.addToPolicy(this.createDyamodbStatement());

    NagSuppressions.addResourceSuppressions(
      this.IAMRole,
      [
        {
          id: "AwsSolutions-IAM4",
          reason:
            "Assumed roles will use AWS managed policies for demonstration purposes.  Customers will be advised/required to assess and apply custom policies based on their role requirements",
        },
        {
          id: "AwsSolutions-IAM5",
          reason:
            "Assumed roles will require permissions to perform multiple ecs, ddb, and ec2 for demonstration purposes.  Customers will be advised/required to assess and apply minimal permission based on role mappings to their idP groups",
        },
      ],
      true
    );

    // save root role in a param
    const roleParam = new ssm.StringParameter(this, `${this.props.kozmoEnv.prefix}-platform-role`, {
      allowedPattern: ".*",
      description: `The KOZMO Backstage Platform Role Arn`,
      parameterName: `/${this.props.kozmoEnv.prefix}/platform-role`,
      stringValue: this.IAMRole.roleArn,
    });

    new cdk.CfnOutput(this, `Backstage Platform Role Arn Parameter`, {
      value: roleParam.parameterName,
    });

  }

  /**
   * Define policy statement for SecretsManager actions
   * @returns IAM Policy statement
   */
  private createSecretsManagerStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: [
        "secretsmanager:CreateSecret",
        "secretsmanager:GetSecretValue",
        "secretsmanager:PutSecretValue",
        "secretsmanager:UpdateSecret",
        "secretsmanager:TagResource",
        "secretsmanager:DeleteSecret",
      ],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:secretsmanager:*:${this.props.kozmoEnv.awsAccount}:secret:*`],
    });
  }

  /**
   * Define policy statement for S3 bucket actions
   * @returns IAM Policy statement
   */
  private createS3BucketStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["s3:CreateBucket", "s3:PutBucketTagging"],
      effect: iam.Effect.ALLOW,
      resources: ["*"],
      conditions: {
        StringEquals: {
          "aws:ResourceAccount": this.props.kozmoEnv.awsAccount,
        },
      },
    });
  }

  /**
   * Define policy statement for S3 object actions
   * @returns IAM Policy statement
   */
  private createS3ObjectStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:GetObjectAttributes"],
      effect: iam.Effect.ALLOW,
      resources: ["arn:aws:s3:::*/packaged.yaml"],
      conditions: {
        StringEquals: {
          "aws:ResourceAccount": this.props.kozmoEnv.awsAccount,
        },
      },
    });
  }

  /**
   * Define policy statement for ResourceGroups actions
   * @returns IAM Policy statement
   */
  private createResourceGroupsStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["resource-groups:ListGroupResources", "resource-groups:Tag", "resource-groups:DeleteGroup"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:resource-groups:*:${this.props.kozmoEnv.awsAccount}:group/*`],
    });
  }

  /**
   * Define policy statement for Cloudformation actions
   * @returns IAM Policy statement
   */
  private createCloudformationStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["cloudformation:DescribeStacks", "cloudformation:ListStackResources"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:cloudformation:*:${this.props.kozmoEnv.awsAccount}:stack/${this.props.kozmoEnv.prefix}-api-*`],
    });
  }

  /**
   * Define policy statement for tag actions
   * @returns IAM Policy statement
   */
  private createTagStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["tag:GetResources"],
      effect: iam.Effect.ALLOW,
      resources: ["*"],
    });
  }

  /**
   * Define policy statement for KMS actions
   * @returns IAM Policy statement
   */
  private createKmsStatement(): cdk.aws_iam.PolicyStatement {
    return new iam.PolicyStatement({
      actions: ["kms:Decrypt"],
      effect: iam.Effect.ALLOW,
      resources: [this.props.KMSkey.keyArn],
    });
  }

  /**
   * Define policy statement for EC2 actions
   * @returns IAM Policy statement
   */
  private createEc2Statement() {
    return new iam.PolicyStatement({
      actions: ["ec2:*"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:ec2:*:${this.props.kozmoEnv.awsAccount}:vpc/${this.props.network.vpc.vpcId}`],
    });
  }

  /**
   * Define policy statement for DynamoDB actions
   * @returns IAM Policy statement
   */
  private createDyamodbStatement() {
    return new iam.PolicyStatement({
      actions: [
        "dynamodb:List*",
        "dynamodb:DescribeStream",
        "dynamodb:DescribeTable",
        "dynamodb:Get*",
        "dynamodb:Query",
        "dynamodb:Scan",
      ],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:dynamodb:*:${this.props.kozmoEnv.awsAccount}:table/${this.props.securityTableName}`],
    });
  }

  private createRoleAssumptionPolicyDocument(account: string): cdk.aws_iam.PolicyDocument {
    //Allow master role to assume backstage roles
    const kozmoRoleAssumptionPolicy = new iam.PolicyStatement({
      sid: "AllowKOZMORoleAssumptionInAccount",
      actions: ["sts:AssumeRole"],
      effect: iam.Effect.ALLOW,
      resources: [`arn:aws:iam::${account}:role/kozmo*`],
    });

    // Allow assmumption of application operations roles
    const operationsAssumptionPolicy = new iam.PolicyStatement({
      sid: "AllowAssumeOperationsRoles",
      actions: ["sts:AssumeRole"],
      effect: iam.Effect.ALLOW,
      // !TODO: this resource pattern relies on a naming convention to be followed in all environment provider IaC provisioning code.
      //        Improve with a
      resources: ["*"],
      conditions: {
        "StringLike": {
          "sts:RoleSessionName": ["*-backstage-session"]
        }
      }
    });

    return new cdk.aws_iam.PolicyDocument({
      statements: [
        kozmoRoleAssumptionPolicy,
        operationsAssumptionPolicy,
      ],

    });
  }

}
