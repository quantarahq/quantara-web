import { Blocks, Boxes, LayoutDashboard, Rocket } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Blocks,
    title: "Soroban development tools",
    description:
      "A clean starting point for Soroban smart contracts, with a real on-chain DeploymentRegistry contract to build on.",
  },
  {
    icon: Rocket,
    title: "Deployment workflows",
    description:
      "Kick off a deployment from the dashboard and track its status through a real API — no manual CLI juggling.",
  },
  {
    icon: Boxes,
    title: "Contract management",
    description:
      "Every deployment registers verifiable metadata — address, hash, timestamp — in a contract registry you can query.",
  },
  {
    icon: LayoutDashboard,
    title: "Developer dashboard",
    description:
      "See your projects, deployments, and contracts in one place instead of piecing it together from logs.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className="size-6 text-primary" />
              <CardTitle className="mt-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
