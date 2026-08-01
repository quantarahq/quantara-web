import { apiFetch } from "./client";
import type { CreateProjectInput, Project } from "@/types/project";

export function listProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/api/projects");
}

export function getProject(id: number): Promise<Project> {
  return apiFetch<Project>(`/api/projects/${id}`);
}

export function createProject(input: CreateProjectInput): Promise<Project> {
  return apiFetch<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
