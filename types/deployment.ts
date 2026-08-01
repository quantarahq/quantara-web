export interface DeployInput {
  projectId: number;
  contract: string;
}

export interface DeployResult {
  status: "SUCCESS" | "FAILED";
  deploymentId: string;
}

export interface Deployment {
  id: number;
  deploymentId: string;
  projectId: number;
  contractName: string;
  status: "SUCCESS" | "FAILED";
  createdAt: string;
}
