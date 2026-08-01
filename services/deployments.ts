import { apiFetch } from "./client";
import type { DeployInput, DeployResult, Deployment } from "@/types/deployment";

export function deployContract(input: DeployInput): Promise<DeployResult> {
  return apiFetch<DeployResult>("/api/deploy", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function listDeploymentsForProject(projectId: number): Promise<Deployment[]> {
  return apiFetch<Deployment[]>(`/api/projects/${projectId}/deployments`);
}
