/**
 * Builders Bazar 2.0 — Database Types
 * Matches the Supabase PostgreSQL schema from PROJECT_ROOT_CONFIG.md
 */

export type UserRole = "contractor" | "manufacturer" | "admin";
export type RfqStatus = "open" | "closed" | "cancelled";
export type BidStatus = "submitted" | "accepted" | "rejected";

export interface User {
  id: string;
  role: UserRole;
  company_name: string;
  contact_person: string;
  phone_number: string;
  email: string;
  gstin: string | null;
  udyam_number: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface MasterCategory {
  id: number;
  category_name: string;
  description: string;
}

export interface ManufacturerCategory {
  manufacturer_id: string;
  category_id: number;
}

export interface Rfq {
  id: string;
  contractor_id: string;
  raw_text: string | null;
  image_url: string | null;
  parsed_item: string | null;
  parsed_quantity: number | null;
  parsed_unit: string | null;
  location: string;
  category_id: number;
  status: RfqStatus;
  created_at: string;
}

export interface Bid {
  id: string;
  rfq_id: string;
  manufacturer_id: string;
  base_rate: number;
  freight_rate: number;
  total_landed_cost: number;
  status: BidStatus;
  created_at: string;
}

/**
 * Supabase Database type definition for use with createClient<Database>
 */
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at" | "is_verified"> & {
          id?: string;
          created_at?: string;
          is_verified?: boolean;
        };
        Update: Partial<User>;
        Relationships: [];
      };
      master_categories: {
        Row: MasterCategory;
        Insert: Omit<MasterCategory, "id"> & { id?: number };
        Update: Partial<MasterCategory>;
        Relationships: [];
      };
      manufacturer_categories: {
        Row: ManufacturerCategory;
        Insert: ManufacturerCategory;
        Update: Partial<ManufacturerCategory>;
        Relationships: [];
      };
      rfqs: {
        Row: Rfq;
        Insert: Omit<Rfq, "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: RfqStatus;
        };
        Update: Partial<Rfq>;
        Relationships: [];
      };
      bids: {
        Row: Bid;
        Insert: Omit<Bid, "id" | "created_at" | "status"> & {
          id?: string;
          created_at?: string;
          status?: BidStatus;
        };
        Update: Partial<Bid>;
        Relationships: [];
      };
    };
  };
}
