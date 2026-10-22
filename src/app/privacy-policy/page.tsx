import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Mail, MapPin, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of Evantras Consulting Services Pvt Ltd, headquartered in Anna Nagar, Chennai. Information on data collection, use, security, and your privacy rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* High-Tech Page Banner */}
      <section className="relative w-full py-16 lg:py-24 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Privacy Policy Evantras"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-blue-950/90" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>
      </section>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="border-b border-slate-200 pb-6 mb-8">
          <p className="text-base text-slate-700 font-semibold">
            Evantras Consulting Services Pvt Ltd respects the privacy of visitors to our website.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: 2026 • Effective for all visitors and applicants
          </p>
        </div>

        {/* Exact text from Privacy Policy.docx */}
        <div className="prose prose-slate max-w-none text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Information We Collect</h2>
            <p>
              We may collect information that visitors voluntarily provide through our contact forms, email communications, or other interactions. This may include names, company names, email addresses, telephone numbers, and information about requested consulting services.
            </p>
            <p>
              Our website hosting or analytics providers may also collect technical information, such as browser type, device information, IP address, and website usage data, depending on the tools implemented.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">How We Use Information</h2>
            <p>Information may be used to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Respond to inquiries and requests.</li>
              <li>Communicate about potential or ongoing consulting engagements.</li>
              <li>Improve our website and services.</li>
              <li>Maintain website security and prevent misuse.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Sharing of Information</h2>
            <p>
              We do not sell personal information. We may share information with service providers who help us operate our website or business, or when disclosure is required or permitted by applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Data Security and Retention</h2>
            <p>
              We take reasonable measures to protect information under our control. Information is retained only as long as reasonably necessary for the relevant purpose, subject to applicable legal requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Your Choices and Rights</h2>
            <p>
              Depending on applicable law, you may have rights to access, correct, delete, or otherwise control certain personal information. You may contact us to submit a privacy-related request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of external websites.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Contact</h2>
            <p>For privacy-related questions, contact:</p>
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
            <p className="text-xs text-slate-500 italic">
              We may update this policy periodically. Any changes will be published on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
