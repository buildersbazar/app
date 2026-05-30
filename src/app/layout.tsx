import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Builders Bazar — Factory-Gate Pricing for Indian Construction",
  description:
    "India's first direct-to-site procurement platform. Post an RFQ, get L1-ranked bids from verified manufacturers — zero middlemen, zero markup.",
  keywords: [
    "construction procurement",
    "building materials",
    "manufacturer direct",
    "RFQ",
    "TMT steel",
    "cement",
    "India construction",
    "B2B procurement",
  ],
  openGraph: {
    title: "Builders Bazar — Factory-Gate Pricing for Indian Construction",
    description:
      "Post an RFQ, get L1-ranked bids from verified manufacturers — zero middlemen, zero markup.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        {/* Inline theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bb-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
