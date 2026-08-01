import { useQuery } from "@tanstack/react-query";
import { listDeploymentsForProject } from "@/services/deployments";

export function deploymentsQueryKey(projectId: number) {
  return ["projects", projectId, "deployments"] as const;
}

export function useDeployments(projectId: number | undefined) {
  return useQuery({
    queryKey: deploymentsQueryKey(projectId ?? -1),
    queryFn: () => listDeploymentsForProject(projectId as number),
    enabled: projectId !== undefined,
  });
}
