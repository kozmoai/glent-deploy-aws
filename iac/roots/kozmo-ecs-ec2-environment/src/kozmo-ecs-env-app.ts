#!/usr/bin/env node

// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { KOZMOECSEnvStack } from "./kozmo-ecs-environment-stack";
import { makeRandom } from "@aws/aws-app-development-common-constructs";

/**
 * Main application function, make it async so it can call asnyc functions properly.
 */
async function main() {
  const app = new cdk.App();

  console.log("Loading Configurations...");

  const account = process.env.AWS_ACCOUNT_ID as string;
  const region = process.env.AWS_DEFAULT_REGION as string;

  const env = { region, account };

  if (!process.env.ENV_NAME)
    throw new Error("ENV_NAME Environment variable is missing and mandatory");

  if (!process.env.AWS_ACCOUNT_ID)
    throw new Error("AWS_ACCOUNT_ID Environment variable is missing and mandatory");

  if (!process.env.PLATFORM_ROLE_ARN)
    throw new Error("PLATFORM_ROLE_ARN Environment variable is missing and mandatory");

  if (!process.env.PIPELINE_ROLE_ARN)
    throw new Error("PIPELINE_ROLE_ARN Environment variable is missing and mandatory");

  const prefix = process.env.PREFIX as string || "kozmo";
  // generate unique environment identifier
  const envID = makeRandom(4);
  console.log("Generating unique Environment identifier: " + envID)

  new KOZMOECSEnvStack(app, `${prefix}-${process.env.ENV_NAME}-Stack`, {
    // stackName: `kozmo-ecs-environment`,  // Do not use stack name to get a generated stack name so multiple stacks can be created
    description: `${envID} ECS Environment for KOZMO(AWS App Development)`,
    uniqueEnvIdentifier: envID,
    env,
  });


  app.synth();
}


main();
