export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          Quantara is open source, MIT licensed —{" "}
          <a
            href="https://github.com/quantarahq"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            github.com/quantarahq
          </a>
        </p>
        <p>An MVP foundation for the Soroban ecosystem.</p>
      </div>
    </footer>
  );
}
