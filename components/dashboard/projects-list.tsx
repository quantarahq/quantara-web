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
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/project";

interface ProjectsListProps {
  selectedProjectId: number | undefined;
  onSelectProject: (project: Project) => void;
}

export function ProjectsList({ selectedProjectId, onSelectProject }: ProjectsListProps) {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading projects…</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Couldn&apos;t reach the Quantara API. Is quantara-core running?
      </p>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No projects yet — create one above to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow
            key={project.id}
            data-state={project.id === selectedProjectId ? "selected" : undefined}
            onClick={() => onSelectProject(project)}
            className="cursor-pointer"
          >
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">Active</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(project.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
