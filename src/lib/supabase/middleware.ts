import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on every request and enforces route protection.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh and get the authenticated user session
  const { data: { user } } = await supabase.auth.getUser();

  const nextUrl = request.nextUrl.clone();
  const path = nextUrl.pathname;

  // Define route lists
  const isDashboardRoute =
    path.startsWith("/contractor") ||
    path.startsWith("/manufacturer") ||
    path.startsWith("/dashboard");

  const isAuthRoute = path === "/login" || path === "/register";

  // Case 1: Unauthenticated user accessing protected routes
  if (isDashboardRoute && !user) {
    nextUrl.pathname = "/login";
    nextUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(nextUrl);
  }

  // Case 2: Authenticated user accessing /login or /register
  if (isAuthRoute && user) {
    // Attempt to determine the role from user metadata first (fastest)
    let role = user.user_metadata?.role;

    // Fallback: If role is not in metadata, fetch from the database
    if (!role) {
      const { data: profile } = await (supabase.from("users") as any)
        .select("*")
        .eq("id", user.id)
        .single();
      
      role = profile?.role;
    }

    // Redirect to respective dashboard
    if (role === "contractor") {
      nextUrl.pathname = "/contractor";
    } else if (role === "manufacturer") {
      nextUrl.pathname = "/manufacturer";
    } else {
      nextUrl.pathname = "/";
    }
    return NextResponse.redirect(nextUrl);
  }

  // Case 3: Authenticated user accessing the wrong dashboard (e.g. contractor trying to access manufacturer)
  if (isDashboardRoute && user) {
    let role = user.user_metadata?.role;

    if (!role) {
      const { data: profile } = await (supabase.from("users") as any)
        .select("*")
        .eq("id", user.id)
        .single();
      
      role = profile?.role;
    }

    if (path.startsWith("/contractor") && role !== "contractor") {
      nextUrl.pathname = role === "manufacturer" ? "/manufacturer" : "/";
      return NextResponse.redirect(nextUrl);
    }

    if (path.startsWith("/manufacturer") && role !== "manufacturer") {
      nextUrl.pathname = role === "contractor" ? "/contractor" : "/";
      return NextResponse.redirect(nextUrl);
    }
  }

  return supabaseResponse;
}
