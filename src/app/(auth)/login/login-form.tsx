"use client";

import { useActionState } from "react";
import Link from "next/link";
import { logIn } from "../actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(logIn, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium animate-pulse">
          {state.error}
        </div>
      )}

      <Input
        label="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="you@company.com"
        required
        disabled={isPending}
      />

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label htmlFor="password" className="text-sm font-medium text-text-secondary">
            Password
          </label>
        </div>
        <Input
          id="password"
          name="password"
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
        Log In
      </Button>
    </form>
  );
}
