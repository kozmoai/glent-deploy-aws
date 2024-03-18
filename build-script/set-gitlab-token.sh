#!/usr/bin/env bash

scriptDir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
configDir=$scriptDir/../config

source $configDir/.env

GITLAB_API_TOKEN=$(aws secretsmanager get-secret-value --secret-id glent-admin-gitlab-secrets --output text --query 'SecretString' | jq -r '.apiToken')
echo "GITLAB_API_TOKEN=$GITLAB_API_TOKEN"
sed -i.bak "s/^\(SECRET_GITLAB_CONFIG_PROP_apiToken=\).*$/\1\"$GITLAB_API_TOKEN\"/g" ./config/.env && rm -f ./config/.env.bak
