# 🛡️ Secure Bastion Host Architecture (GCP)

Automated infrastructure deployment for a secure, multi-tier environment on Google Cloud using **Terraform**.

## 🎯 Objective
To eliminate manual configuration errors and enforce security best practices by defining network architecture as code (IaC).

## 🏗️ Architecture Flow
```text
[Public Internet]
      |
[Reza-Bastion (Public VM)]
      |
[SSH Tunnel (ProxyJump)]
      |
[Jeff-Private (Private VM)]

Features
Network Isolation: Private VM has zero external exposure (no Public IP).

Hardened Access: SSH traffic is tunneled through the Bastion Host.

Firewall Enforcement: Strict rules ensure the private VM only accepts traffic from the bastion's network tag.

IaC Automation: Full infrastructure lifecycle management using Terraform.

🚀 How to Deploy
Initialize Terraform:

Bash
terraform init
Review the Plan:

Bash
terraform plan
Deploy Infrastructure:

Bash
terraform apply
📚 What I Learned
Terraform Lifecycle: Moving from imperative gcloud commands to declarative HCL.

State Management: Understanding how Terraform tracks resources via terraform.tfstate.

Security Engineering: Learning the principle of "least privilege" in networking.

📍 Status
[x] Bastion Host (Public)

[x] Private VM (Secure)

[x] SSH Tunneling configuration

[ ] Automated monitoring/logging (Next Level!)

