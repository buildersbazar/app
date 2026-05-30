"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp, signInWithGoogle } from "../actions";
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

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-text-tertiary text-xs font-medium uppercase">Or continue with</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <Button
          type="button"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (err) {
              console.error(err);
            }
          }}
          icon={
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          }
        >
          Sign up with Google
        </Button>
      </form>
    </div>
  );
}
