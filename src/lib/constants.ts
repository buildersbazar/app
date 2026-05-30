export const APP_NAME = "Builders Bazar";
export const APP_TAGLINE = "Factory-Gate Pricing for Indian Construction";
export const APP_DESCRIPTION =
  "India's first direct-to-site procurement platform connecting Contractors with Verified Manufacturers. Eliminate middlemen. Get transparent, L1-ranked bids.";

export const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Contractors", href: "#for-contractors" },
  { label: "For Manufacturers", href: "#for-manufacturers" },
] as const;

export const MATERIAL_CATEGORIES = [
  { id: 1, name: "TMT Steel / Rebars", icon: "🏗️" },
  { id: 2, name: "Cement (OPC / PPC / PSC)", icon: "🧱" },
  { id: 3, name: "Ready-Mix Concrete (RMC)", icon: "🚛" },
  { id: 4, name: "Bricks & Blocks", icon: "🧱" },
  { id: 5, name: "Sand & Aggregates", icon: "⛰️" },
  { id: 6, name: "Plumbing & Pipes", icon: "🔧" },
  { id: 7, name: "Electrical & Wiring", icon: "⚡" },
  { id: 8, name: "Tiles & Flooring", icon: "🏠" },
  { id: 9, name: "Paint & Coatings", icon: "🎨" },
  { id: 10, name: "Waterproofing", icon: "💧" },
  { id: 11, name: "Hardware & Fasteners", icon: "🔩" },
  { id: 12, name: "Wood & Plywood", icon: "🪵" },
] as const;

export const RFQ_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
  CANCELLED: "cancelled",
} as const;

export const BID_STATUS = {
  SUBMITTED: "submitted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export const USER_ROLES = {
  CONTRACTOR: "contractor",
  MANUFACTURER: "manufacturer",
  ADMIN: "admin",
} as const;
