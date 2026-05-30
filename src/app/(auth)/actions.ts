"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { UserRole } from "@/types/database";

export type FormState = {
  error?: string;
  success?: boolean;
} | null;

/**
 * Log in action using password
 */
export async function logIn(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { error: authError.message };
  }

  const user = data.user;
  if (!user) {
    return { error: "User login succeeded but no user data returned." };
  }

  // Fetch the user role from the database to redirect them correctly
  const { data: profile, error: dbError } = await (supabase.from("users") as any)
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError || !profile) {
    // If the profile doesn't exist, we fallback to home or create a generic role
    return { error: "Login successful, but user profile could not be loaded." };
  }

  const userProfile = profile;

  // Redirect based on role
  if (userProfile?.role === "contractor") {
    redirect("/contractor");
  } else if (userProfile?.role === "manufacturer") {
    redirect("/manufacturer");
  } else {
    redirect("/");
  }
}

/**
 * Sign up action with role & company details
 */
export async function signUp(prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as UserRole;
  const companyName = formData.get("companyName") as string;
  const contactPerson = formData.get("contactPerson") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const gstin = formData.get("gstin") as string;
  const udyamNumber = formData.get("udyamNumber") as string;

  // Basic validation
  if (!email || !password || !role || !companyName || !contactPerson || !phoneNumber) {
    return { error: "All required fields must be filled out." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  if (role === "manufacturer" && (!gstin || !udyamNumber)) {
    return { error: "GSTIN and Udyam Number are required for manufacturers." };
  }

  const supabase = await createClient();

  // Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        company_name: companyName,
        contact_person: contactPerson,
        phone_number: phoneNumber,
        role,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  const user = authData.user;
  if (!user) {
    return { error: "Account created but user session could not be established." };
  }

  // Insert profile details into our public.users table
  const { error: dbError } = await (supabase.from("users") as any).insert({
    id: user.id,
    role,
    company_name: companyName,
    contact_person: contactPerson,
    phone_number: phoneNumber,
    email,
    gstin: role === "manufacturer" ? gstin : null,
    udyam_number: role === "manufacturer" ? udyamNumber : null,
    is_verified: false,
  });

  if (dbError) {
    return { error: `Auth account created, but profile database entry failed: ${dbError.message}` };
  }

  // Redirect based on role
  if (role === "contractor") {
    redirect("/contractor");
  } else if (role === "manufacturer") {
    redirect("/manufacturer");
  } else {
    redirect("/");
  }
}

/**
 * Sign out action
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin") || "http://localhost:3000";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.url) {
    redirect(data.url);
  }
}
