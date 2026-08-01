"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "@/hooks/useProjects";

const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  description: z.string().trim().max(1000).optional(),
});

type CreateProjectValues = z.infer<typeof createProjectSchema>;

export function CreateProjectForm() {
  const createProject = useCreateProject();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await createProject.mutateAsync({
      name: values.name,
      description: values.description || undefined,
    });
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="project-name">Project name</Label>
        <Input id="project-name" placeholder="example-contract" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="flex-1 space-y-1.5">
        <Label htmlFor="project-description">Description (optional)</Label>
        <Input
          id="project-description"
          placeholder="Sample Soroban application"
          {...register("description")}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating…" : "Create project"}
      </Button>
    </form>
  );
}
