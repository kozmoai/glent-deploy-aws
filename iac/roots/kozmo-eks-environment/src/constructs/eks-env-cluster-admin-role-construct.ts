// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NagSuppressions } from "cdk-nag";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import { KOZMOEnvironmentParams } from "@aws/aws-app-development-common-constructs";

export interface EKSClusterAdminRoleConstructProps extends cdk.StackProps {
  readonly kozmoEnv: KOZMOEnvironmentParams;
  readonly eksClusterName: string;
  readonly kmsKey: kms.IKey;
  /**
   * Scope for CfnOutput
   */
  cfnOutputScope: any
}

const defaultProps: Partial<EKSClusterAdminRoleConstructProps> = {};

export class EKSClusterAdminRoleConstruct extends Construct {
  public iamRole: iam.Role;

  constructor(parent: Construct, name: string, props: EKSClusterAdminRoleConstructProps) {
    super(parent, name);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    props = { ...defaultProps, ...props };

    const envIdentifier = `${props.kozmoEnv.prefix.toLowerCase()}-${props.kozmoEnv.envName}`;

    // Create IAM role
    this.iamRole = new iam.Role(this, `${envIdentifier}-cluster-admin-role`, {
      assumedBy: new iam.AccountPrincipal(props.kozmoEnv.awsAccount),
      // roleName: name, - let CDK generate the role name
      maxSessionDuration: cdk.Duration.seconds(43200),
    });
    NagSuppressions.addResourceSuppressions(this.iamRole, [
      { id: "AwsSolutions-IAM4", reason: "Assumed roles will use AWS managed policies for demonstration purposes.  Customers will be advised/required to assess and apply custom policies based on their role requirements" },
      { id: "AwsSolutions-IAM5", reason: "Assumed roles will require permissions to perform multiple eks, ddb, and ec2 for demonstration purposes.  Customers will be advised/required to assess and apply minimal permission based on role mappings to their idP groups" },
    ], true
    );

    // Add read-only permissions for EKS
    this.iamRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "eks:DescribeEksAnywhereSubscription",
          "eks:DescribeCluster",
          "eks:ListClusters",
          "eks:ListTagsForResource",
        ],
        effect: iam.Effect.ALLOW,
        resources: ["*"],
      })
    );

    // Add cluster-specific permissions
    this.iamRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "eks:AccessKubernetesApi",
          "eks:AssociateEncryptionConfig",
          "eks:AssociateIdentityProviderConfig",
          "eks:CreateAddon",
          "eks:CreateFargateProfile",
          "eks:CreateNodegroup",
          "eks:DeleteAddon",
          "eks:DeleteFargateProfile",
          "eks:DeleteNodegroup",
          "eks:DescribeAddon",
          "eks:DescribeAddonConfiguration",
          "eks:DescribeAddonVersions",
          "eks:DescribeCluster",
          "eks:DescribeFargateProfile",
          "eks:DescribeIdentityProviderConfig",
          "eks:DescribeNodegroup",
          "eks:DescribeUpdate",
          "eks:ListAddons",
          "eks:ListFargateProfiles",
          "eks:ListIdentityProviderConfigs",
          "eks:ListNodegroups",
          "eks:ListUpdates",
          "eks:TagResource",
          "eks:UntagResource",
          "eks:UpdateAddon",
          "eks:UpdateClusterConfig",
          "eks:UpdateClusterVersion",
          "eks:UpdateNodegroupConfig",
          "eks:UpdateNodegroupVersion",
        ],
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:aws:eks:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:addon/${props.eksClusterName}/*/*`,
          `arn:aws:eks:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:cluster/${props.eksClusterName}`,
          `arn:aws:eks:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:fargateprofile/${props.eksClusterName}/*/*`,
          `arn:aws:eks:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:identityproviderconfig/${props.eksClusterName}/*/*/*`,
          `arn:aws:eks:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:nodegroup/${props.eksClusterName}/*/*`,
        ],
      })
    );

    this.iamRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "kms:Decrypt",
        ],
        effect: iam.Effect.ALLOW,
        resources: [props.kmsKey.keyArn],
      })
    );

    // allow calling kubectl lambda function (needed if cluster is private or IP-restricted)
    // Function names for EKS kubectl Lambda handlers are dynamically generated and will truncate
    // a portion of the environment identifier.  Ensure that the resource identifier in the policy is no
    // longer than 35 characters
    const truncatedName = `EKS-ENV-${props.kozmoEnv.prefix}-${props.kozmoEnv.envName}`.substring(0,34);
    this.iamRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "lambda:InvokeFunction"
        ],
        effect: iam.Effect.ALLOW,
        resources: [`arn:aws:lambda:${props.kozmoEnv.awsRegion}:${props.kozmoEnv.awsAccount}:function:${truncatedName}*`],
      })
    );

    this.iamRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonVPCReadOnlyAccess"));
    this.iamRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AWSCloudFormationReadOnlyAccess"));
    this.iamRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMReadOnlyAccess"));

  }
}
