import Link from "next/link";

/**
 * Dashboard shell layout — shared sidebar + top bar for all dashboard routes.
 * Protected routes will add auth checks here later.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 glass border-b border-border">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg gradient-accent">
                <span className="text-white font-bold text-[10px]">BB</span>
              </div>
              <span className="text-sm font-bold text-text-primary tracking-tight hidden sm:block">
                Builders Bazar
              </span>
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-sm font-medium text-text-secondary">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-subtle border border-accent/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-accent">U</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
