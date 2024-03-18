// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as kms from "aws-cdk-lib/aws-kms";
import { Construct } from "constructs";
import { NetworkConstruct, GLENTEnvironmentParams, DynamoDBConstruct, } from '@aws/aws-app-development-common-constructs'
import { ServerlessAPIProvisioningConstruct } from './constructs/serverless-api-env-provisioning-role-construct'
import { ServerlessAPIOperationsConstruct } from "./constructs/serverless-api-env-operations-role-construct";
import {
  getAccountId, 
  getRegion, 
  getPrefix, 
  getEnvironmentName, 
  getPlatformRoleArn,
  getPipelineRoleArn,
  getVpcCIDR,
  getExistingVpcId,
} from "./serverless-input";

export interface GLENTServerlessEnvStackProps extends cdk.StackProps {
  uniqueEnvIdentifier: string;
}

export class GLENTServerlessEnvStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: GLENTServerlessEnvStackProps) {
    super(scope, id, props);

    const prefix = getPrefix();
    const envName = getEnvironmentName();
    const awsAccount = getAccountId();
    const platformRoleArn = getPlatformRoleArn();
    const pipelineRoleArn = getPipelineRoleArn();
    const awsRegion = getRegion();
    const cidrInput = getVpcCIDR();
    const existingVpcId = getExistingVpcId();

    // Creating environment params object

    const glentEnvParams: GLENTEnvironmentParams = {
      envName: envName.toLowerCase(),
      awsRegion: awsRegion,
      awsAccount: awsAccount,
      prefix: prefix.toLowerCase()
    }

    const envIdentifier = glentEnvParams.envName;
    const envPathIdentifier = `/${envIdentifier}`

    // Create encryption key for all data at rest encryption
    const key = new kms.Key(this, `${envIdentifier}-key`, {
      alias: `${envIdentifier}-key`,
      enableKeyRotation: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pendingWindow: cdk.Duration.days(8),
    });

    // Save KMS key arn in an SSM Parameter
    new ssm.StringParameter(this, `${envIdentifier}-key-param`, {
      allowedPattern: ".*",
      description: `The KMS Key for Serverless API Solution: ${envIdentifier} Environment`,
      parameterName: `${envPathIdentifier}/kms-key`,
      stringValue: key.keyArn,
    });

    // Create underlying network construct
    const network = new NetworkConstruct(this, envIdentifier, {
      glentEnv: glentEnvParams,
      cidrRange: cidrInput,
      isIsolated: false,
      publicVpcNatGatewayCount: 3,
      vpcAzCount: 3,
      existingVpcId,
    })

    //create audit table
    const auditTableConstruct = new DynamoDBConstruct(this, "audit-table", {
      glentEnv: glentEnvParams,
      tableName: `${envIdentifier}-audit`,
      kmsKey: key,
    });

    // Create pipeline provisioning role for the environment
    const provisioningRoleConstruct = new ServerlessAPIProvisioningConstruct(this, `${glentEnvParams.prefix}-${envIdentifier}-provisioning-role`, {
      glentEnv: glentEnvParams,
      KMSkey: key,
      vpcCollection: [network.vpc],
      assumedBy: pipelineRoleArn,
      auditTable: auditTableConstruct.table.tableName,
    });

    // Create operations role for the environment
    const operationsRoleConstruct = new ServerlessAPIOperationsConstruct(this, `${glentEnvParams.prefix}-${envIdentifier}-operations-role`, {
      glentEnv: glentEnvParams,
      KMSkey: key,
      vpcCollection: [network.vpc],
      assumedBy: platformRoleArn,
      auditTable: auditTableConstruct.table.tableName
    });

    // save the unique environment identifier
    const uniqueEnvId = new ssm.StringParameter(this, `${envIdentifier}-unique-id-param`, {
      allowedPattern: ".*",
      description: `The Unique ID for: ${glentEnvParams.envName} Environment`,
      parameterName: `${envPathIdentifier}/unique-id`,
      stringValue: props.uniqueEnvIdentifier,
    });

    // Printing outputs
    new cdk.CfnOutput(this, "EnvironmentName", {
      value: envName,
    });

    // Printing the unique environment ID
    new cdk.CfnOutput(this, "EnvironmentID", {
      value: uniqueEnvId.stringValue,
    });

    // Printing the unique environment ID
    new cdk.CfnOutput(this, "VPC", {
      value: network.vpcParam.parameterName,
    });

    // Printing audit table
    new cdk.CfnOutput(this, "AuditTable", {
      value: auditTableConstruct.tableParam.parameterName,
    });

    // Print role information
    new cdk.CfnOutput(this, "ProvisioningRole", {
      value: provisioningRoleConstruct.provisioningRoleParam.parameterName,
    });

    new cdk.CfnOutput(this, "ProvisioningRoleARN", {
      value: provisioningRoleConstruct.provisioningRoleArnParam.parameterName,
    });

    new cdk.CfnOutput(this, "OperationsRole", {
      value: operationsRoleConstruct.operationsRoleParam.parameterName,
    });

    new cdk.CfnOutput(this, "OperationsRoleARN", {
      value: operationsRoleConstruct.operationsRoleArnParam.parameterName,
    });

    // print the stack name as a Cloudformation output
    new cdk.CfnOutput(this, `StackName`, {
      value: this.stackName,
      description: "The Serverless API Environment Provider CF Stack name",
    });
  }
}
