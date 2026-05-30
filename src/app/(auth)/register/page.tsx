import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register — Builders Bazar",
  description: "Create your Builders Bazar account as a Contractor or Manufacturer.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary gradient-mesh px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-accent shadow-sm">
            <span className="text-white font-bold text-base">BB</span>
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">
            Builders Bazar
          </span>
        </div>

        {/* Card */}
        <div className="bg-bg-surface border border-border rounded-2xl p-8 shadow-[var(--shadow-lg)]">
          <h1 className="text-2xl font-bold text-text-primary text-center mb-2">
            Create Account
          </h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Join India&apos;s direct procurement platform
          </p>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-accent
                bg-accent-subtle text-accent text-sm font-medium transition-all"
            >
              <span className="text-2xl">🏗️</span>
              Contractor
            </button>
            <button
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border
                bg-bg-surface text-text-secondary text-sm font-medium transition-all
                hover:border-border-hover hover:bg-bg-elevated"
            >
              <span className="text-2xl">🏭</span>
              Manufacturer
            </button>
          </div>

          {/* Placeholder Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="reg-company" className="block text-sm font-medium text-text-secondary mb-1.5">
                Company Name
              </label>
              <input
                id="reg-company"
                type="text"
                placeholder="Your Company Name"
                className="w-full rounded-xl border border-border bg-bg-surface px-4 py-2.5 text-sm
                  text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2
                  focus:ring-ring focus:border-accent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-bg-surface px-4 py-2.5 text-sm
                  text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2
                  focus:ring-ring focus:border-accent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-text-secondary mb-1.5">
                Phone Number
              </label>
              <input
                id="reg-phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-border bg-bg-surface px-4 py-2.5 text-sm
                  text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2
                  focus:ring-ring focus:border-accent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-bg-surface px-4 py-2.5 text-sm
                  text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2
                  focus:ring-ring focus:border-accent transition-all duration-200"
              />
            </div>
            <button
              className="w-full rounded-xl bg-accent text-white py-2.5 text-sm font-medium
                hover:bg-accent-hover transition-colors duration-200 shadow-sm"
            >
              Create Account
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:text-accent-hover font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
