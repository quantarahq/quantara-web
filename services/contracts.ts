import { apiFetch } from "./client";
import type { Contract } from "@/types/contract";

export function listContractsForProject(projectId: number): Promise<Contract[]> {
  return apiFetch<Contract[]>(`/api/projects/${projectId}/contracts`);
}
