#!/usr/bin/env node

// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export enum SERVERLESS_ENV_VARS {
  ENV_NAME = "ENV_NAME",
  AWS_ACCOUNT_ID = "AWS_ACCOUNT_ID",
  AWS_DEFAULT_REGION = "AWS_DEFAULT_REGION",
  PLATFORM_ROLE_ARN = "PLATFORM_ROLE_ARN",
  PIPELINE_ROLE_ARN = "PIPELINE_ROLE_ARN",
  PREFIX = "PREFIX",
}

export enum SERVERLESS_OPTIONAL_ENV_VARS {
  VPC_ID = "VPC_ID",
  ENV_CIDR = "ENV_CIDR",
}

export function validateServerlessRequiredEnvVars() {
  Object.values(SERVERLESS_ENV_VARS).forEach(val => {
    if (!process.env[val]) {
      throw new Error(`${val} Environment variable is missing and mandatory for Serverless environment`);
    }
  });
}

export function getAccountId(): string {
  return process.env[SERVERLESS_ENV_VARS.AWS_ACCOUNT_ID] as string
}

export function getEnvironmentName(): string {
  return process.env[SERVERLESS_ENV_VARS.ENV_NAME] as string
}

export function getRegion(): string {
  return process.env[SERVERLESS_ENV_VARS.AWS_DEFAULT_REGION] as string
}

export function getPrefix(): string {
  return process.env[SERVERLESS_ENV_VARS.PREFIX] as string || "glent";
}

export function getVpcCIDR(): string {
  return process.env[SERVERLESS_OPTIONAL_ENV_VARS.ENV_CIDR] as string || "10.0.0.0/24";
}
export function getExistingVpcId(): string {
  return process.env[SERVERLESS_OPTIONAL_ENV_VARS.VPC_ID] as string;
}

export function getPlatformRoleArn(): string {
  return process.env[SERVERLESS_ENV_VARS.PLATFORM_ROLE_ARN] as string ;
}

export function getPipelineRoleArn(): string {
  return process.env[SERVERLESS_ENV_VARS.PIPELINE_ROLE_ARN] as string;
}
