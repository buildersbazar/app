import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Route Handler to exchange the Supabase authorization code for an active session cookie.
 * This is used for OAuth logins (like Google Sign-In) and email verification links.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Default redirect path after successful auth exchange
  let next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      // Check user profile role to redirect correctly
      const { data: profile } = await (supabase.from("users") as any)
        .select("*")
        .eq("id", data.user.id)
        .single();
      
      const userProfile = profile as any;
      
      if (userProfile?.role === "contractor") {
        next = "/contractor";
      } else if (userProfile?.role === "manufacturer") {
        next = "/manufacturer";
      }
      
      const forwardedHost = request.headers.get("x-forwarded-host");
      if (forwardedHost) {
        const isLocal = forwardedHost.includes("localhost") || forwardedHost.includes("127.0.0.1");
        const protocol = isLocal ? "http" : "https";
        return NextResponse.redirect(`${protocol}://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Fallback redirect if something went wrong
  return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
