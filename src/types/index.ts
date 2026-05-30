export type {
  User,
  MasterCategory,
  ManufacturerCategory,
  Rfq,
  Bid,
  UserRole,
  RfqStatus,
  BidStatus,
  Database,
} from "./database";

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}
