import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deployContract } from "@/services/deployments";
import { contractsQueryKey } from "@/hooks/useContracts";
import { deploymentsQueryKey } from "@/hooks/useDeployments";
import type { DeployInput } from "@/types/deployment";

export function useDeploy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeployInput) => deployContract(input),
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({
        queryKey: contractsQueryKey(variables.projectId),
      });
      queryClient.invalidateQueries({
        queryKey: deploymentsQueryKey(variables.projectId),
      });
    },
  });
}
