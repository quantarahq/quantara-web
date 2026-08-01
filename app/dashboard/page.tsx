import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Dashboard — Quantara",
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <DashboardContent />
      </main>
      <SiteFooter />
    </>
  );
}
