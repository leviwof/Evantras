import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Cpu, 
  Layers, 
  Target, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Search,
  ClipboardList,
  Workflow,
  Sparkles,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Consulting Services",
  description:
    "IT and business strategy consulting services by Evantras Consulting Services Pvt Ltd, Anna Nagar, Chennai. IT Strategy, Process Optimization, Technology Infrastructure, and Digital Operations.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "it-strategy",
      icon: Cpu,
      title: "IT Strategy & Technology Advisory",
      subtitle: "Aligning technology investments with long-term enterprise goals",
      description:
        "We assist organizations in evaluating existing technology stacks, identifying modern software solutions, and formulating strategic IT roadmaps that support scalable growth without unnecessary complexity.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      keyDeliverables: [
        "Technology Needs Assessment & Gap Analysis",
        "Strategic IT Roadmaps & Architecture Guidance",
        "Software & Vendor Evaluation",
        "Legacy Systems Modernization Planning",
      ],
    },
    {
      id: "infrastructure-consulting",
      icon: Target,
      title: "Technology Infrastructure Consulting",
      subtitle: "Building resilient, secure, and future-ready enterprise foundations",
      description:
        "We evaluate infrastructure stability, system scalability, and security posture. We help clients choose suitable cloud or on-premise environments tailored to their operational scale and resource availability.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      keyDeliverables: [
        "Infrastructure Architecture Review",
        "Cloud Readiness & Migration Planning",
        "Data Management & Storage Strategy",
        "Security Posture & Resilience Evaluation",
      ],
    },
    {
      id: "process-optimization",
      icon: Layers,
      title: "Business Process Optimization",
      subtitle: "Streamlining workflows for heightened operational efficiency",
      description:
        "Every organization develops process bottlenecks over time. We map out current operational workflows, diagnose friction points, and introduce lean, structured methodologies that reduce operational friction and overhead.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      keyDeliverables: [
        "Operational Workflow Mapping & Audits",
        "Process Bottleneck & Redundancy Reduction",
        "Cross-functional Communication Alignment",
        "Key Performance Indicators (KPIs) Definition",
      ],
    },
    {
      id: "digital-operations",
      icon: Compass,
      title: "Digital Operations & Enablement",
      subtitle: "Fostering organizational adoption of modern digital tools",
      description:
        "Technology delivers value only when teams adopt it effectively. We guide enterprises through tooling transitions, digital workplace adoption, and change management so that new solutions deliver real business results.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      keyDeliverables: [
        "Enterprise Digital Tooling Integration",
        "Change Management & Team Onboarding",
        "Collaboration & Productivity Workflows",
        "Digital Governance & Operating Standards",
      ],
    },
    {
      id: "systems-assessment",
      icon: ShieldCheck,
      title: "Systems Assessment & Risk Review",
      subtitle: "Prudent risk identification and technology governance",
      description:
        "Independent assessment of critical systems to identify compliance gaps, reliability risks, and operational dependencies. We provide objective, practical mitigation steps to protect business continuity.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      keyDeliverables: [
        "System Reliability & Redundancy Checks",
        "Vendor Contract & SLA Advisory",
        "IT Operational Risk Assessment",
        "Policy & Governance Frameworks",
      ],
    },
  ];

  const methodology = [
    {
      step: "01",
      icon: Search,
      title: "Understand the Business",
      description:
        "Effective consulting begins with understanding the client's business. We spend time learning your operational realities, challenges, and core priorities.",
    },
    {
      step: "02",
      icon: ClipboardList,
      title: "Assess Options & Gaps",
      description:
        "We objectively review existing systems and analyze available technology paths with a rigorous focus on viability, budget, and long-term sustainability.",
    },
    {
      step: "03",
      icon: Workflow,
      title: "Practical Recommendations",
      description:
        "We deliver realistic, relevant roadmaps with clear action items and milestones rather than generic theoretical presentations.",
    },
    {
      step: "04",
      icon: Sparkles,
      title: "Continuous Improvement",
      description:
        "We provide ongoing evaluation frameworks to ensure recommendations translate into tangible organizational progress.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Page Banner with Tech Image Overlay */}
      <section className="relative w-full py-20 lg:py-28 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
          alt="Evantras Consulting Services"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Consulting Services
          </h1>
        </div>
      </section>

      {/* Services List with Tech Imagery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.id}
                className="p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}>
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {service.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Key Capabilities:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {service.keyDeliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/20" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Evantras Consulting Approach
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              How we guide each engagement from initial challenge definition to sustainable execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 relative"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-extrabold text-blue-100">{m.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0a1224] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need Expert Consulting for Your Technology Architecture?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Contact our Anna Nagar team to discuss scope of work and enterprise advisory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-sm text-white transition-colors shadow-md"
            >
              Contact Consulting Team
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
