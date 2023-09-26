terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}


provider "google" {
credentials =  file("/home/leon/sonorous-summer-376712-419c4adc4106.json")

  project = var.gcp_account_id
  region  = "us-central1"
  zone    = "us-central1-c"
}


resource "aws_instance" "app_server" {
  ami           = "ami-0aa7d40eeae50c9a9"
  instance_type = "t2.micro"

  tags = {
    Name = var.aws_instance_name
  }
}

resource "google_compute_network" "vpn_network" {
  name = "terraform-network"
