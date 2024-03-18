#!/usr/bin/env node

// Copyright Wearekozmoai.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { makeRandom } from "@aws/aws-app-development-common-constructs";
import { GLENTECSEnvStack } from "./glent-ecs-environment-stack";
import {
  getAccountId, 
  getRegion, 
  getPrefix, 
  getEnvironmentName, 
  validateECSRequiredEnvVars
} from "./ecs-input";

/**
 * Main application function, make it async so it can call asnyc functions properly.
 */
async function main() {
  const app = new cdk.App();

  console.log("Loading Configurations for ECS Environment...");
  validateECSRequiredEnvVars();

  const account = getAccountId();
  const region = getRegion();
  const env = { region, account };

  // generate unique environment identifier
  const envID = makeRandom(4);
  console.log(`Generating unique Environment identifier: ${envID}`);

  new GLENTECSEnvStack(app, `ECS-ENV-${getPrefix()}-${getEnvironmentName()}-Stack`, {
    // stackName: `glent-ecs-environment`,  // Do not use stack name to get a generated stack name so multiple stacks can be created
    description: `${envID} ECS Environment for GLENT`,
    uniqueEnvIdentifier: envID,
    env,
  });

  app.synth();
}

main();
