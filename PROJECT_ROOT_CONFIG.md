Builders Bazar 2.0 - Project Root Configuration & Architecture

1. Project Identity & Goal

Name: Builders Bazar 2.0

Mission: A hyper-lean, tech-enabled direct-to-site procurement engine for the Indian construction industry.

Core Value: Eliminate middlemen (dealers/distributors) and connect Contractors directly with Verified Manufacturers for "Factory-Gate Pricing".

Motto: "Transparency First. Revenue Later."

2. Tech Stack (The "Clean SaaS" Blueprint)

Frontend: Next.js (React), Tailwind CSS, Framer Motion (for micro-interactions).

Backend & Database: Supabase (PostgreSQL, Auth, Edge Functions).

Hosting/Deployment: Vercel.

AI Integration: Gemini API (for Smart RFQ Extraction & PBAT Bid Analysis).

Mobile Strategy: PWA (Progressive Web App) wrapper via Capacitor (future phase).

3. Strict Scope Definition (MVP)

Only Two User Types: Contractor (Buyer) and Manufacturer (Seller). No Traders/Distributors.

Core Workflow 1: Frictionless "Express RFQ" posting by Contractors (text/image).

Core Workflow 2: Smart Routing of leads to relevant Manufacturers based on Category/Location.

Core Workflow 3: "Live Bidding Room" for Manufacturers to quote Base Rate + Freight.

Core Workflow 4: Contractor dashboard showing L1/L2 ranked bids.

Core Workflow 5: "Accept L1" action to exchange contact details for offline deal execution (No payment gateway in MVP).

4. Database Schema Blueprint (Supabase PostgreSQL)

Table: users

id (UUID, Primary Key)

role (String: 'contractor' | 'manufacturer' | 'admin')

company_name (String)

contact_person (String)

phone_number (String, Unique)

email (String, Unique)

gstin (String, Nullable - Required for Manufacturers)

udyam_number (String, Nullable - Required for Manufacturers)

is_verified (Boolean, Default: false)

created_at (Timestamp)

Table: master_categories

id (Integer, Primary Key)

category_name (String)

description (String)

Table: manufacturer_categories (Mapping Table)

manufacturer_id (UUID, Foreign Key -> users.id)

category_id (Integer, Foreign Key -> master_categories.id)

Table: rfqs (Requirements)

id (UUID, Primary Key)

contractor_id (UUID, Foreign Key -> users.id)

raw_text (Text, Nullable)

image_url (String, Nullable)

parsed_item (String, Nullable - from Gemini)

parsed_quantity (Decimal, Nullable - from Gemini)

parsed_unit (String, Nullable - from Gemini)

location (String)

category_id (Integer, Foreign Key -> master_categories.id)

status (String: 'open' | 'closed' | 'cancelled')

created_at (Timestamp)

Table: bids

id (UUID, Primary Key)

rfq_id (UUID, Foreign Key -> rfqs.id)

manufacturer_id (UUID, Foreign Key -> users.id)

base_rate (Decimal)

freight_rate (Decimal)

total_landed_cost (Decimal - Computed)

status (String: 'submitted' | 'accepted' | 'rejected')

created_at (Timestamp)

5. Next Immediate Execution Steps (Sprint 1)

Supabase Setup: Create new project, run SQL script to generate above schema and RLS (Row Level Security) policies.

Next.js Init: Run npx create-next-app@latest builders-bazar-2.0.

Tailwind & UI Setup: Implement the "Clean SaaS Edition" base layout (Light/Dark mode toggle).

Auth Module: Build the Login/Registration flow connecting to Supabase Auth.