import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileText, Mail, MapPin, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of the Evantras Consulting Services Pvt Ltd website. Legal terms, consulting disclaimers, IP, and acceptable use.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      {/* High-Tech Page Banner */}
      <section className="relative w-full py-16 lg:py-24 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Terms of Service Evantras"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-blue-950/90" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
        </div>
      </section>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="border-b border-slate-200 pb-6 mb-8">
          <p className="text-base text-slate-700 font-semibold">
            These Terms of Service govern your use of the website operated by Evantras Consulting Services Pvt Ltd.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: 2026 • Effective for all visitors and applicants
          </p>
        </div>

        {/* Exact text from Terms of Service.docx */}
        <div className="prose prose-slate max-w-none text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Website Information</h2>
            <p>
              The information on this website is provided for general informational purposes regarding our consulting business and services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Consulting Services</h2>
            <p>
              Specific consulting services, deliverables, fees, schedules, and responsibilities will be agreed upon separately between Evantras and the relevant client before work begins.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">No Guarantee of Outcomes</h2>
            <p>
              Business and technology recommendations depend on the client's circumstances, implementation, and other factors. We do not guarantee particular business, financial, or operational results.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Intellectual Property</h2>
            <p>
              Unless otherwise stated, website content, branding, text, and other materials owned by Evantras may not be copied, reproduced, or commercially used without prior authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Acceptable Use</h2>
            <p>
              You agree not to misuse this website, attempt unauthorized access, interfere with its operation, or use it for unlawful purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Third-Party Links</h2>
            <p>
              Links to external websites are provided for convenience. Evantras does not control and is not responsible for the content or practices of third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, Evantras shall not be liable for losses arising from reliance on general website information or temporary website unavailability. Nothing in these terms excludes liability that cannot legally be excluded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Changes to These Terms</h2>
            <p>
              We may update these terms periodically. Updated terms will be published on this page.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs sm:text-sm">
              <strong className="text-slate-900 block text-base">Evantras Consulting Services Pvt Ltd</strong>
              <div className="flex items-center space-x-2 text-slate-700">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Email: </span>
                <a href="mailto:hr@evantras.com" className="text-blue-600 font-bold underline">
                  hr@evantras.com
                </a>
              </div>
              <div className="flex items-start space-x-2 text-slate-700">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Address: 4th Floor, SDV Arcade, No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040, India.
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
