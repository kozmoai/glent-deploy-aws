Add AWS IAM policy statements here, each file with a particular statement that grant the ECS task access.
make sure the tasks are of the format - statement-xxx.json

example:
{
    "Effect": "Allow",
    "Action": ["rds:*"],
    "Resource": "*"
}