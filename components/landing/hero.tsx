import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Developer infrastructure for Soroban
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
        Quantara brings modern developer tooling — project management, deployment
        workflows, and contract inspection — to Soroban smart contract development, so
        building on Stellar feels as smooth as building anywhere else.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Start Building
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a
            href="https://github.com/quantarahq/quantara-core"
            target="_blank"
            rel="noreferrer"
          >
            View the source
          </a>
        </Button>
      </div>
    </section>
  );
}
