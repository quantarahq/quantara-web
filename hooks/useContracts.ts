import { useQuery } from "@tanstack/react-query";
import { listContractsForProject } from "@/services/contracts";

export function contractsQueryKey(projectId: number) {
  return ["projects", projectId, "contracts"] as const;
}

export function useContracts(projectId: number | undefined) {
  return useQuery({
    queryKey: contractsQueryKey(projectId ?? -1),
    queryFn: () => listContractsForProject(projectId as number),
    enabled: projectId !== undefined,
  });
}
