"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight,
  Briefcase
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers", isHiring: true },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-slate-100">
      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Official Logo */}
        <Link href="/" className="flex items-center space-x-3 group py-1">
          <Image
            src="/logo-dark.png"
            alt="Evantras Consulting Services"
            width={240}
            height={44}
            priority
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
          />
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-7 lg:space-x-9">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                  active
                    ? "text-slate-900 font-bold"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>{link.name}</span>
                {link.isHiring && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                    Hiring
                  </span>
                )}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Pill Shaped CTA Button matching Logo Branding */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/careers#apply-form"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full text-sm font-bold text-amber-100 bg-slate-900 hover:bg-slate-800 border border-amber-500/50 shadow-md transition-all hover:scale-102"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Apply for Jobs</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isHiring && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      We're Hiring
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/careers#apply-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-slate-900 text-amber-100 border border-amber-500/50 font-bold text-sm shadow-md"
            >
              <span>Apply for Open Roles</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
