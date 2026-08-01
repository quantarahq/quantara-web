export interface DeployInput {
  projectId: number;
  contract: string;
}

export interface DeployResult {
  status: "SUCCESS" | "FAILED";
  deploymentId: string;
}
