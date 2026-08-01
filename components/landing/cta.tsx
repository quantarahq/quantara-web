import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center gap-6 rounded-xl border bg-muted/40 px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Ready to build on Soroban?
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Create a project, run a deployment, and see it show up in the contract
          registry — the whole workflow in one place.
        </p>
        <Button size="lg" asChild>
          <Link href="/dashboard">Start Building</Link>
        </Button>
      </div>
    </section>
  );
}
