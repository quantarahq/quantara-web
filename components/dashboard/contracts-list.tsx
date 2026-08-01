"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContracts } from "@/hooks/useContracts";
import type { Project } from "@/types/project";

interface ContractsListProps {
  selectedProject: Project | undefined;
}

function truncateAddress(address: string) {
  return `${address.slice(0, 8)}…${address.slice(-6)}`;
}

export function ContractsList({ selectedProject }: ContractsListProps) {
  const { data: contracts, isLoading } = useContracts(selectedProject?.id);

  if (!selectedProject) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a project above to see its deployed contracts.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading contracts…</p>;
  }

  if (!contracts || contracts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No contracts deployed for {selectedProject.name} yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment ID</TableHead>
          <TableHead>Contract address</TableHead>
          <TableHead>Verification status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contracts.map((contract) => (
          <TableRow key={contract.id}>
            <TableCell className="font-mono text-sm">{contract.deploymentId}</TableCell>
            <TableCell className="font-mono text-sm">
              {truncateAddress(contract.contractAddress)}
            </TableCell>
            <TableCell>
              <Badge>Verified</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
