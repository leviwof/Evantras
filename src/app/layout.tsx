import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Evantras Consulting Services Pvt Ltd | IT & Business Strategy Advisory",
    template: "%s | Evantras Consulting Services",
  },
  description:
    "Evantras Consulting Services Pvt Ltd is an IT and business strategy consulting company headquartered in Anna Nagar, Chennai. We provide practical technology evaluations, operational process optimization, and scalable enterprise consulting.",
  keywords: [
    "Evantras Consulting Services",
    "Evantras Chennai",
    "IT Consulting Anna Nagar",
    "Business Strategy Consulting Chennai",
    "Technology Advisory India",
    "IT Careers Chennai",
    "Evantras Careers",
  ],
  authors: [{ name: "Evantras Consulting Services Pvt Ltd" }],
  openGraph: {
    title: "Evantras Consulting Services Pvt Ltd",
    description:
      "Strategic IT and Business Consulting headquartered in Anna Nagar, Chennai. Practical advisory, digital enablement, and rewarding career opportunities.",
    url: "https://evantras.com",
    siteName: "Evantras Consulting Services",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
