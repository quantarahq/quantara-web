import { apiFetch } from "./client";
import type { DeployInput, DeployResult } from "@/types/deployment";

export function deployContract(input: DeployInput): Promise<DeployResult> {
  return apiFetch<DeployResult>("/api/deploy", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
