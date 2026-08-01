import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Quantara
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <a href="https://github.com/quantarahq" target="_blank" rel="noreferrer">
              GitHub
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
