import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  RefreshCw, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Users,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Evantras Consulting Services Pvt Ltd — IT and business strategy consulting company headquartered in Anna Nagar, Chennai. Our mission, vision, values, and commitment.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Integrity",
      description: "We value transparency, professionalism, and responsible business practices.",
      icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Client Focus",
      description: "We seek to understand each client's requirements before recommending a course of action.",
      icon: Users,
      color: "bg-sky-50 text-sky-600 border-sky-200",
    },
    {
      title: "Practical Thinking",
      description: "We prioritize realistic recommendations that reflect business objectives and available resources.",
      icon: Target,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Continuous Improvement",
      description: "We encourage ongoing evaluation of processes, technology, and business strategies.",
      icon: RefreshCw,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
  ];

  return (
    <div className="bg-white">
      {/* High-Tech Page Banner with Image Overlay */}
      <section className="relative w-full py-20 lg:py-28 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="Evantras Consulting Anna Nagar Chennai"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About Our Firm
          </h1>
        </div>
      </section>

      {/* Main Corporate Content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                About Evantras
              </h2>
              
              <p className="text-slate-900 font-semibold">
                Evantras Consulting Services Pvt Ltd is an IT and business strategy consulting company headquartered in Anna Nagar, Chennai, Tamil Nadu, India.
              </p>

              <p>
                We support businesses in evaluating technology requirements, improving operational processes, and developing strategies that align with their organizational goals.
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-blue-600 space-y-2 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Our Straightforward Principle</span>
                <p className="text-slate-900 italic font-medium leading-relaxed">
                  &ldquo;Effective consulting begins with understanding the client's business. We take the time to understand existing challenges, assess available options, and provide recommendations that are practical, relevant, and aligned with the client's priorities.&rdquo;
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/careers"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
                >
                  Careers with Evantras
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            {/* Right Tech Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                <div className="relative h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="Evantras IT Consulting Team"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-600 uppercase tracking-wider">
                    Anna Nagar, Chennai HQ
                  </span>
                  <h3 className="font-bold text-lg text-white">4th Floor, SDV Arcade</h3>
                  <p className="text-xs text-slate-300">
                    No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai - 600040.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                To help businesses make better technology and strategic decisions through practical consulting, clear communication, and solutions tailored to their requirements.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                To build lasting professional relationships by delivering dependable consulting services and helping businesses adapt to changing technology and market needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Values */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Values
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              The four core principles from our company charter that guide every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-xs hover:shadow-lg transition-all space-y-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment Banner */}
      <section className="py-16 bg-[#0a1224] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Our Commitment
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl mx-auto">
            We aim to build professional relationships based on trust, clear expectations, and consistent communication. Each engagement begins with understanding the client's objectives and defining an appropriate scope of work.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white transition-colors shadow-md"
            >
              Start a Conversation
            </Link>
            <Link
              href="/careers"
              className="px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 font-bold text-sm text-slate-200 transition-colors border border-slate-700"
            >
              Careers at Evantras
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
