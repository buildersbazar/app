import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-accent">
                <span className="text-white font-bold text-xs">BB</span>
              </div>
              <span className="text-base font-bold text-text-primary tracking-tight">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              India&apos;s first direct-to-site procurement platform. Connecting
              Contractors with Verified Manufacturers for transparent,
              factory-gate pricing.
            </p>
            <p className="mt-4 text-xs text-text-tertiary">
              &quot;Transparency First. Revenue Later.&quot;
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "For Contractors", href: "#for-contractors" },
                { label: "For Manufacturers", href: "#for-manufacturers" },
                { label: "Pricing", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary">
            Built with 🏗️ for Indian Construction
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
