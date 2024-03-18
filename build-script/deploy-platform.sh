#!/usr/bin/env bash

scriptDir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
iacDir=${scriptDir}/../iac/roots
glentPlatformDir=${iacDir}/glent-platform
configDir=${scriptDir}/../config

source ${scriptDir}/helpers.sh
source ${configDir}/.env

# if AWS_ACCOUNT_ID is not set, ask for it
if [[ -z $AWS_ACCOUNT_ID ]]; then
  defaultAwsAccountNum=${CDK_DEPLOY_ACCOUNT:-""}
  aws_account_number AWS_ACCOUNT_ID "Enter the AWS account number to deploy GLENT to:" "$defaultAwsAccountNum"
fi
# if AWS_DEFAULT_REGION is not set, ask for it
if [[ -z $AWS_DEFAULT_REGION ]]; then
  defaultRegion=$( if [[ -n "${AWS_REGION}" ]]; then echo ${AWS_REGION}; else aws configure get region; fi )
  aws_region AWS_DEFAULT_REGION "Enter the AWS region to deploy GLENT to:" "$defaultRegion"
fi

cd $glentPlatformDir
confirm_aws_account
cdk deploy --account $AWS_ACCOUNT_ID --region $AWS_DEFAULT_REGION --require-approval never --progress bar
cd -
