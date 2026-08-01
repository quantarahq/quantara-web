export interface Contract {
  id: number;
  projectId: number;
  deploymentId: string;
  contractAddress: string;
  deploymentHash: string;
  timestamp: string;
}
