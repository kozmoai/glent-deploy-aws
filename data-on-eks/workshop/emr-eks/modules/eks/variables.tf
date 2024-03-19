variable "name" {
  description = "Name of the VPC and EKS Cluster"
  type        = string
}

variable "region" {
  description = "Region"
  type        = string
  default     = "us-west-2"
}

variable "eks_cluster_version" {
  description = "EKS Cluster version"
  type        = string
}

variable "tags" {
  description = "Default tags"
  default     = {}
  type        = map(string)
}

variable "vpc_id" {
  description = "VPC CIDR"
  type        = string
}

variable "private_subnets" {
  description = "Private Subnet IDs"
  type        = list(string)
}
