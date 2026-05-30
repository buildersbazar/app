"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp } from "../actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { UserRole } from "@/types/database";

export function RegisterForm() {
  const [role, setRole] = useState<UserRole>("contractor");
  const [state, formAction, isPending] = useActionState(signUp, null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValidationError(null);
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    // Client-side validations
    if (password !== confirmPassword) {
      e.preventDefault();
      setValidationError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      setValidationError("Password must be at least 6 characters long.");
      return;
    }

    // Clean Indian Phone number check (10 digits)
    const phoneClean = phoneNumber.replace(/[^0-9]/g, "");
    if (phoneClean.length < 10) {
      e.preventDefault();
      setValidationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (role === "manufacturer") {
      const gstin = formData.get("gstin") as string;
      const udyamNumber = formData.get("udyamNumber") as string;

      if (!gstin || !udyamNumber) {
        e.preventDefault();
        setValidationError("Manufacturers must provide both GSTIN and Udyam Registration Number.");
        return;
      }

      if (gstin.trim().length !== 15) {
        e.preventDefault();
        setValidationError("GSTIN must be exactly 15 characters long.");
        return;
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setRole("contractor");
            setValidationError(null);
          }}
          disabled={isPending}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            role === "contractor"
              ? "border-accent bg-accent/5 text-accent shadow-sm"
              : "border-border bg-bg-surface text-text-secondary hover:border-border-hover hover:bg-bg-elevated"
          }`}
        >
          <span className="text-2xl">🏗️</span>
          <span className="text-sm font-semibold">Contractor</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole("manufacturer");
            setValidationError(null);
          }}
          disabled={isPending}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            role === "manufacturer"
              ? "border-accent bg-accent/5 text-accent shadow-sm"
              : "border-border bg-bg-surface text-text-secondary hover:border-border-hover hover:bg-bg-elevated"
          }`}
        >
          <span className="text-2xl">🏭</span>
          <span className="text-sm font-semibold">Manufacturer</span>
        </button>
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden input for role */}
        <input type="hidden" name="role" value={role} />

        {(state?.error || validationError) && (
          <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium">
            {validationError || state?.error}
          </div>
        )}

        <Input
          label="Company Name"
          id="companyName"
          name="companyName"
          placeholder="e.g. Acme Builders Pvt Ltd"
          required
          disabled={isPending}
        />

        <Input
          label="Contact Person Name"
          id="contactPerson"
          name="contactPerson"
          placeholder="e.g. Rajesh Kumar"
          required
          disabled={isPending}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="e.g. 9876543210"
            required
            disabled={isPending}
          />
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            disabled={isPending}
          />
        </div>

        {role === "manufacturer" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-border bg-bg-elevated/30 animate-fadeIn">
            <Input
              label="GSTIN"
              id="gstin"
              name="gstin"
              placeholder="15-digit GSTIN"
              required
              disabled={isPending}
            />
            <Input
              label="Udyam Reg. Number"
              id="udyamNumber"
              name="udyamNumber"
              placeholder="UDYAM-XX-00-0000000"
              required
              disabled={isPending}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          isLoading={isPending}
          variant="primary"
        >
          Create {role === "contractor" ? "Contractor" : "Manufacturer"} Account
        </Button>
      </form>
    </div>
  );
}
