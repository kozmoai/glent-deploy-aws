// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Construct } from "constructs";
import { GLENTEnvironmentParams } from "@aws/aws-app-development-common-constructs";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface BasicProvisioningConstructProps extends cdk.StackProps {
  readonly glentEnv: GLENTEnvironmentParams;
  KMSkey: kms.IKey;
  assumedBy: string;
  auditTable: string;
}

const defaultProps: Partial<BasicProvisioningConstructProps> = {};

export class BasicProvisioningConstruct extends Construct {
  public IAMRole: iam.Role;
  public provisioningRoleParam: ssm.StringParameter;
  public provisioningRoleArnParam: ssm.StringParameter;
  constructor(parent: Construct, name: string, props: BasicProvisioningConstructProps) {
    super(parent, name);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    props = { ...defaultProps, ...props };

    const envIdentifier = `${props.glentEnv.prefix.toLowerCase()}-${props.glentEnv.envName}`;
    const envPathIdentifier = `/${props.glentEnv.prefix.toLowerCase()}/${props.glentEnv.envName.toLowerCase()}`;

    // Create Iam role
    this.IAMRole = new iam.Role(this, `${envIdentifier}-role`, {
      assumedBy: new iam.ArnPrincipal(props.assumedBy),
      roleName: name,
      managedPolicies: [
        // !FIXME: Need to scope down the role from PowerUserAccess.  This workaround is to allow provisioning for sprint 2 demo
        iam.ManagedPolicy.fromAwsManagedPolicyName("PowerUserAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2ContainerRegistryFullAccess"),
        iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"),
      ],
      maxSessionDuration: cdk.Duration.seconds(43200),
    });

    // Add Secret and SSM access
    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "secretsmanager:CreateSecret",
          "secretsmanager:GetSecretValue",
          "secretsmanager:PutSecretValue",
          "secretsmanager:UpdateSecret",
          "secretsmanager:TagResource",
        ],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:secretsmanager:*:${props.glentEnv.awsAccount}:secret:*`],
      })
    );
    this.IAMRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMReadOnlyAccess"));

    // Bucket creation and tagging and reading for serverless deployments
    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:CreateBucket",
          "s3:PutBucketTagging"
        ],
        effect: iam.Effect.ALLOW,
        resources: ["*"],
        conditions: {
          "StringEquals": {
            "aws:ResourceAccount": props.glentEnv.awsAccount
          }
        }
      })
    );

    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "s3:GetObject",
          "s3:GetObjectAttributes"
        ],
        effect: iam.Effect.ALLOW,
        resources: ["arn:aws:s3:::*/packaged.yaml"],
        conditions: {
          "StringEquals": {
            "aws:ResourceAccount": props.glentEnv.awsAccount
          }
        }
      })
    );

    // Add resource group access
    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "resource-groups:ListGroupResources",
          "resource-groups:Tag",
          "resource-groups:DeleteGroup"
        ],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:resource-groups:*:${props.glentEnv.awsAccount}:group/*`],
      })
    );

    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["tag:GetResources"],
        effect: iam.Effect.ALLOW,
        resources: ["*"],
      })
    );

    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["kms:Decrypt"],
        effect: iam.Effect.ALLOW,
        resources: [props.KMSkey.keyArn],
      })
    );

    // Write Audit access
    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "dynamodb:List*",
          "dynamodb:DescribeStream",
          "dynamodb:DescribeTable",
          "dynamodb:Put*",
        ],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:dynamodb:*:${props.glentEnv.awsAccount}:${props.auditTable}`],
      })
    );

    // allow creation of a Resource Group to track application resources via tags
    this.IAMRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "resource-groups:CreateGroup"
        ],
        effect: iam.Effect.ALLOW,
        resources: ["*"],  // CreateGroup does not support resource-level permissions and requires a wildcard
      })
    );

    // Add managed role policies to support SAM template deployment for non-root roles
    // 
    // In a production scenario, a customized IAM policy granting specific permissions should be created.
    // See https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-permissions-cloudformation.html
    this.IAMRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AWSCloudFormationFullAccess"));
    this.IAMRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("IAMFullAccess"));
    this.IAMRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess"));

    // now save the VPC in SSM Param
    const roleParam = new ssm.StringParameter(this, `${envIdentifier}-role-param`, {
      allowedPattern: ".*",
      description: `The Provisioning Role for GLENT Solution: ${props.glentEnv.envName} Environment`,
      parameterName: `${envPathIdentifier}/provisioning-role`,
      stringValue: this.IAMRole.roleName,
    });

    const roleArnParam = new ssm.StringParameter(this, `${envIdentifier}-role-arn-param`, {
      allowedPattern: ".*",
      description: `The Provisioning Role Arn for GLENT Solution: ${props.glentEnv.envName} Environment`,
      parameterName: `${envPathIdentifier}/provisioning-role-arn`,
      stringValue: this.IAMRole.roleArn,
    });

    this.provisioningRoleParam = roleParam;
    this.provisioningRoleArnParam = roleArnParam;
  }

}
