import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";
import { Badge } from "@/components/ui/Badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Dashboard Layout - Shell for protected Contractor and Manufacturer pages.
 * Fetches user profile from Supabase and handles secure sign-out.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch public profile metadata
  const { data: profile } = await (supabase.from("users") as any)
    .select("*")
    .eq("id", user.id)
    .single();

  const companyName = profile?.company_name || "Enterprise Partner";
  const contactPerson = profile?.contact_person || user.email?.split("@")[0] || "User";
  const role = profile?.role || "user";
  const isVerified = profile?.is_verified || false;

  // Format initials
  const initials = contactPerson
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 glass border-b border-border transition-colors duration-300">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo & Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg gradient-accent shadow-sm group-hover:opacity-90 transition-opacity">
                <span className="text-white font-bold text-[10px]">BB</span>
              </div>
              <span className="text-sm font-bold text-text-primary tracking-tight hidden sm:block">
                Builders Bazar
              </span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-text-secondary capitalize">
                {role} Console
              </span>
              {isVerified && (
                <Badge variant="success" dot>
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Meta & Log Out */}
            <div className="flex items-center gap-3 pl-3 border-l border-border">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-text-primary leading-tight">
                  {contactPerson}
                </span>
                <span className="text-[10px] text-text-tertiary truncate max-w-[150px]">
                  {companyName}
                </span>
              </div>

              {/* Initial Avatar */}
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-inner cursor-default">
                <span className="text-xs font-semibold text-accent">{initials}</span>
              </div>

              {/* Logout Server Action Form */}
              <form action={signOut}>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg border border-border bg-bg-surface text-xs font-medium text-text-secondary hover:text-danger hover:border-danger/30 hover:bg-danger/5 transition-all duration-200 cursor-pointer"
                >
                  Log Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-14 min-h-screen flex flex-col">
        <div className="flex-1 mx-auto w-full max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
