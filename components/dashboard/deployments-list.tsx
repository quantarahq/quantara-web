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
import { useDeployments } from "@/hooks/useDeployments";
import type { Project } from "@/types/project";

interface DeploymentsListProps {
  selectedProject: Project | undefined;
}

export function DeploymentsList({ selectedProject }: DeploymentsListProps) {
  const { data: deployments, isLoading } = useDeployments(selectedProject?.id);

  if (!selectedProject) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a project above to see its deployment history.
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading deployments…</p>;
  }

  if (!deployments || deployments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No deployments for {selectedProject.name} yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Deployment ID</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Deployed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell className="font-mono text-sm">{deployment.deploymentId}</TableCell>
            <TableCell>{deployment.contractName}</TableCell>
            <TableCell>
              <Badge variant={deployment.status === "SUCCESS" ? "default" : "destructive"}>
                {deployment.status}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(deployment.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
