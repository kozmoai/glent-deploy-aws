#!/usr/bin/env bash

###########
# This file will attempt to create a repo and if it can't it will still 
# push backstage-reference to your gitlab repo
###########
echo "Pushing the reference repository to Gitlab - $SSM_GITLAB_HOSTNAME"
scriptDir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
appDir=$scriptDir/..
configDir=${scriptDir}/../config

source ${configDir}/.env

GITLAB_TOKEN=$SECRET_GITLAB_CONFIG_PROP_apiToken

# Try to create a new project if one doesn't exist (will fail through)
curl -H "Content-Type:application/json" "https://$SSM_GITLAB_HOSTNAME/api/v4/projects?private_token=$GITLAB_TOKEN" -d "{ \"name\": \"backstage-reference\" ,  \"visibility\": \"internal\" }"

# Take backup of Git configs if they are present
if [ -f "$appDir/git-temp/backstage-reference/.git/config" ]; then
  cp $appDir/git-temp/backstage-reference/.git/config $appDir/git-config-temp
fi

# Clean the temp directory if it exists to start from a blank slate
if [ -d "$appDir/git-temp" ]; then
  rm -rf $appDir/git-temp
fi
# Make tmp directory to add files that will be comitted to repo
mkdir -p $appDir/git-temp
echo -e "\nCloning from https://$SSM_GITLAB_HOSTNAME/glent-admin/backstage-reference.git\n"
git -C $appDir/git-temp clone -q "https://oauth2:$GITLAB_TOKEN@$SSM_GITLAB_HOSTNAME/glent-admin/backstage-reference.git"

# Reinstate Git configs if available
if [ -f "$appDir/git-config-temp" ]; then
  mv $appDir/git-config-temp $appDir/git-temp/backstage-reference/.git/config
fi

# copy files to temp git repo
rsync -a --delete --exclude='**/node_modules' --exclude='**/cdk.out' --exclude='**/.git' $appDir/backstage-reference/ $appDir/git-temp/backstage-reference

rsync -a --delete --exclude='**/node_modules' --exclude='**/cdk.out' $appDir/iac/roots/{glent-common-constructs,glent-ecs-environment,glent-ecs-ec2-environment,glent-eks-environment,glent-serverless-environment,glent-gen-ai-environment} $appDir/git-temp/backstage-reference/environments
\cp $appDir/iac/roots/package.json $appDir/git-temp/backstage-reference/environments


cd $appDir/git-temp/backstage-reference;

# Replace variable placeholders with env specific information
if [[ "$OSTYPE" == "darwin"* ]]; then
    find . -type f -name "*.yaml" -exec sed -i "" "s/{{ *gitlab_hostname *}}/$SSM_GITLAB_HOSTNAME/g" {} +; 
    find . -type f -name "*.yaml" -exec sed -i "" "s/{{ *awsAccount *}}/$AWS_ACCOUNT_ID/g" {} +; 
else
    find . -type f -name "*.yaml" -exec sed -i "s/{{ *gitlab_hostname *}}/$SSM_GITLAB_HOSTNAME/g" {} +; 
    find . -type f -name "*.yaml" -exec sed -i "s/{{ *awsAccount *}}/$AWS_ACCOUNT_ID/g" {} +; 
fi

IS_DEFENDER=$(type "git-defender" 2>/dev/null)
# if the system is using git-defender and the repo is not configured, configure it
if [[ ! -z "$IS_DEFENDER" ]] && ! grep -q "\[defender\]" .git/config ; then
  echo "Found git-defender, but repo is not configured.  Proceeding to configure repo for git-defender"
  (sleep 1; echo -e "y\n"; sleep 1; echo -e "y\n";)|git defender --setup
  echo ""
  echo ""
fi

# Add and commit changes to repo if there are files to commit
if [ -n "$(git status --porcelain=v1 2>/dev/null)" ]; then
  echo "Changes found, committing to repo"
  git add --all
  echo "Committing changes"
  git commit --no-verify -m "Reference Commit"

  # set a variable to track retry attempts
  retry_attempts=0
  # set a variable to track the number of retries
  max_retries=5
  # set a variable to track the sleep time between retries
  sleep_time=30
  # Push to git.  If the command fails, retry up to 5 times with a sleep between retries
  while ! git push; do
    # uncomment the following code to print the git configuration for debugging purposes
    # if [ $retry_attempts -eq 0 ]; then
    #   cat .git/config
    # fi
    # increment the retry attempts
    retry_attempts=$((retry_attempts+1))
    # if the retry attempts are greater than the max retries, exit the script
    if [ $retry_attempts -gt $max_retries ]; then
      echo "Max retries exceeded, exiting"
      exit 1
    # otherwise, sleep for 30 seconds and try again
    else
      echo "Push failed, retrying in $sleep_time seconds"
      sleep $sleep_time
    fi
  done

else
  echo "No changes to commit."
fi
echo "Finished setting up the backstage reference repo."
