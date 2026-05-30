import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Manufacturer Dashboard — Builders Bazar",
  description: "View incoming RFQs and manage your bids.",
};

export default function ManufacturerDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-text-primary">
            Manufacturer Dashboard
          </h1>
          <Badge variant="success" dot>
            Verified
          </Badge>
        </div>
        <p className="text-sm text-text-secondary">
          Browse open RFQs, submit competitive bids, and win direct orders.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Open RFQs in Area", value: "0" },
          { label: "Bids Submitted", value: "0" },
          { label: "Bids Won (L1)", value: "0" },
          { label: "Win Rate", value: "—" },
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
          <span className="text-5xl mb-4 block">🏭</span>
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            No Open RFQs
          </h2>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-6">
            No matching RFQs in your categories yet. Update your profile to
            ensure you receive relevant leads.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-bg-elevated border border-border text-text-primary text-sm font-medium hover:bg-bg-inset transition-colors">
            Update Categories
          </button>
        </div>
      </Card>
    </div>
  );
}
