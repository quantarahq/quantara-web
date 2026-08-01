import { apiFetch } from "./client";

export interface HealthStatus {
  status: string;
}

export function getHealth(): Promise<HealthStatus> {
  return apiFetch<HealthStatus>("/api/health");
}
