"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeploy } from "@/hooks/useDeploy";
import type { Project } from "@/types/project";

interface DeployPanelProps {
  selectedProject: Project | undefined;
}

export function DeployPanel({ selectedProject }: DeployPanelProps) {
  const [contractName, setContractName] = useState("example");
  const deploy = useDeploy();

  if (!selectedProject) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a project above to deploy a contract for it.
      </p>
    );
  }

  const handleDeploy = () => {
    deploy.mutate({ projectId: selectedProject.id, contract: contractName });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="contract-name">Contract</Label>
        <Input
          id="contract-name"
          value={contractName}
          onChange={(event) => setContractName(event.target.value)}
        />
      </div>

      <Button onClick={handleDeploy} disabled={deploy.isPending}>
        {deploy.isPending ? "Deploying…" : "Deploy Contract"}
      </Button>

      {deploy.isSuccess && (
        <p className="text-sm text-muted-foreground sm:self-center">
          Deployed as <span className="font-mono">{deploy.data.deploymentId}</span>
        </p>
      )}
      {deploy.isError && (
        <p className="text-sm text-destructive sm:self-center">
          Deployment failed — check that the project still exists.
        </p>
      )}
    </div>
  );
}
