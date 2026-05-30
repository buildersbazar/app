import Link from "next/link";
import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

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

          {/* Role-based register form component */}
          <RegisterForm />

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
