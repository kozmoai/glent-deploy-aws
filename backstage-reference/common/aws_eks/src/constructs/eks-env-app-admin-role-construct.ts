import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NagSuppressions } from "cdk-nag";
import * as iam from "aws-cdk-lib/aws-iam";
import { GLENTEnvironmentParams } from "../eks-input"

export interface EKSAppAdminRoleConstructProps extends cdk.StackProps {
  readonly glentEnv: GLENTEnvironmentParams;
  readonly eksClusterName: string;
}

const defaultProps: Partial<EKSAppAdminRoleConstructProps> = {};

export class EKSAppAdminRoleConstruct extends Construct {
  public iamRole: iam.Role;

  constructor(parent: Construct, name: string, props: EKSAppAdminRoleConstructProps) {
    super(parent, name);

    /* eslint-disable @typescript-eslint/no-unused-vars */
    props = { ...defaultProps, ...props };

    const envIdentifier = `${props.glentEnv.prefix.toLowerCase()}-${props.glentEnv.envName}`;

    // Create IAM role
    this.iamRole = new iam.Role(this, `${envIdentifier}-app-admin-role`, {
      assumedBy: new iam.AccountPrincipal(props.glentEnv.awsAccount),
      // roleName: name, - let CDK generate the role name
      maxSessionDuration: cdk.Duration.seconds(43200),
    });
    NagSuppressions.addResourceSuppressions(this.iamRole, [
      { id: "AwsSolutions-IAM4", reason: "Assumed roles will use AWS managed policies for demonstration purposes.  Customers will be advised/required to assess and apply custom policies based on their role requirements" },
      { id: "AwsSolutions-IAM5", reason: "Assumed roles will require permissions to perform multiple eks, ddb, and ec2 for demonstration purposes.  Customers will be advised/required to assess and apply minimal permission based on role mappings to their idP groups" },
    ], true
    );

    // Add cluster-specific permissions
    this.iamRole.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "eks:AccessKubernetesApi",
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
          "eks:ListTagsForResource",
          "eks:ListUpdates",
        ],
        effect: iam.Effect.ALLOW,
        resources: [
          `arn:aws:eks:${props.glentEnv.awsRegion}:${props.glentEnv.awsAccount}:addon/${props.eksClusterName}/*/*`,
          `arn:aws:eks:${props.glentEnv.awsRegion}:${props.glentEnv.awsAccount}:cluster/${props.eksClusterName}`,
          `arn:aws:eks:${props.glentEnv.awsRegion}:${props.glentEnv.awsAccount}:fargateprofile/${props.eksClusterName}/*/*`,
          `arn:aws:eks:${props.glentEnv.awsRegion}:${props.glentEnv.awsAccount}:identityproviderconfig/${props.eksClusterName}/*/*/*`,
          `arn:aws:eks:${props.glentEnv.awsRegion}:${props.glentEnv.awsAccount}:nodegroup/${props.eksClusterName}/*/*`,
        ],
      })
    );

  }
}
