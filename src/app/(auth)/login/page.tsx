import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log In — Builders Bazar",
  description: "Log in to your Builders Bazar account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary gradient-mesh px-6">
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
            Welcome Back
          </h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Log in to your account to continue
          </p>

          {/* Login Form Client Component */}
          <LoginForm />

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-accent hover:text-accent-hover font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
