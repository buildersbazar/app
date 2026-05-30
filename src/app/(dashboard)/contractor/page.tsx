import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Contractor Dashboard — Builders Bazar",
  description: "View and manage your RFQs and bids.",
};

export default function ContractorDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">
          Contractor Dashboard
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Post RFQs, track bids, and accept the best quotes.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active RFQs", value: "0", variant: "accent" as const },
          { label: "Total Bids Received", value: "0", variant: "success" as const },
          { label: "Accepted Bids", value: "0", variant: "success" as const },
          { label: "Avg. Savings", value: "—", variant: "warning" as const },
        ].map((stat) => (
          <Card key={stat.label} variant="default" padding="md" hover={false}>
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-text-primary">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      <Card variant="default" padding="lg" hover={false}>
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">📋</span>
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            No RFQs Yet
          </h2>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
            Post your first material requirement to start receiving competitive
            bids from verified manufacturers.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors">
            <span>+</span>
            Post Your First RFQ
          </button>
        </div>
      </Card>
    </div>
  );
}
