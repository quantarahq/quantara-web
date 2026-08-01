"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateProjectForm } from "@/components/dashboard/create-project-form";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { DeployPanel } from "@/components/dashboard/deploy-panel";
import { ContractsList } from "@/components/dashboard/contracts-list";
import type { Project } from "@/types/project";

export function DashboardContent() {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Create projects, deploy contracts, and inspect what&apos;s on-chain.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New project</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectsList
            selectedProjectId={selectedProject?.id}
            onSelectProject={setSelectedProject}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deploy</CardTitle>
        </CardHeader>
        <CardContent>
          <DeployPanel selectedProject={selectedProject} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractsList selectedProject={selectedProject} />
        </CardContent>
      </Card>
    </div>
  );
}
