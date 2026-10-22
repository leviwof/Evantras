"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Cpu, 
  Server, 
  Workflow, 
  Laptop, 
  ShieldCheck, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Target, 
  Compass, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      title: "We Provide Strategic Technology & Business Advisory",
      subtitle: "Helping organizations evaluate technology requirements, improve operational processes, and develop strategies that align with organizational goals.",
      primaryBtn: "View Our Services",
      primaryLink: "/services",
      secondaryBtn: "Apply for Open Roles",
      secondaryLink: "/careers",
    },
    {
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
      title: "Pragmatic IT Consulting For Scalable Enterprise Growth",
      subtitle: "Effective consulting begins with understanding the client's business. We provide recommendations that are practical, relevant, and aligned with priorities.",
      primaryBtn: "About Our Firm",
      primaryLink: "/about",
      secondaryBtn: "Contact Our Office",
      secondaryLink: "/contact",
    },
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
      title: "We Are Actively Hiring at Anna Nagar, Chennai",
      subtitle: "Applied via Naukri, Indeed, or LinkedIn? Submit your resume directly to our recruitment team for priority consideration.",
      primaryBtn: "Explore Open Careers",
      primaryLink: "/careers",
      secondaryBtn: "Direct Resume Upload",
      secondaryLink: "/careers#apply-form",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const floatingFeatures = [
    {
      icon: Cpu,
      title: "IT Strategy",
      link: "/services#it-strategy",
    },
    {
      icon: Server,
      title: "Cloud & Infra",
      link: "/services#infrastructure-consulting",
    },
    {
      icon: Workflow,
      title: "Process Opt",
      link: "/services#process-optimization",
    },
    {
      icon: Laptop,
      title: "Digital Ops",
      link: "/services#digital-operations",
    },
    {
      icon: ShieldCheck,
      title: "Systems Audit",
      link: "/services#systems-assessment",
    },
    {
      icon: Briefcase,
      title: "Careers / Jobs",
      link: "/careers",
      highlight: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with High-Tech Photography & Slider */}
      <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden pb-20">
        {/* Background Image Carousel */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
            {/* Tech Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/85" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            {heroSlides[activeSlide].title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            {heroSlides[activeSlide].subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={heroSlides[activeSlide].primaryLink}
              className="px-8 py-3.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {heroSlides[activeSlide].primaryBtn}
            </Link>

            <Link
              href={heroSlides[activeSlide].secondaryLink}
              className="px-8 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-amber-100 border border-amber-500/50 font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
            >
              <span>{heroSlides[activeSlide].secondaryBtn}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Interactive Carousel Pagination Dots */}
          <div className="pt-8 flex items-center justify-center space-x-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? "w-8 h-2.5 bg-amber-500 shadow-sm shadow-amber-500/50"
                    : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Overlapping Service Cards (Signature Colorlib UI Style) */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {floatingFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={idx}
                  href={feat.link}
                  className={`group p-4 sm:p-5 rounded-xl border text-center flex flex-col items-center justify-center space-y-3 transition-all duration-200 ${
                    feat.highlight
                      ? "border-amber-500/60 bg-amber-50/40 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm"
                      : "border-slate-100 hover:border-amber-400/50 hover:bg-slate-50 hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    feat.highlight
                      ? "bg-slate-900 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-900"
                      : "bg-slate-100 text-slate-800 group-hover:bg-slate-900 group-hover:text-amber-400"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-inherit">
                    {feat.title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4">
            <span>Check out our full spectrum of enterprise consulting practices and </span>
            <Link href="/contact" className="text-blue-600 font-bold hover:underline inline-flex items-center space-x-1">
              <span>get in touch for a consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dark Split Section (Colorlib Dark Theme - Tech Deep Navy) */}
      <section className="mt-16 sm:mt-24 bg-[#0a1224] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Delivering Dependable Technology & Strategy Consulting From Chennai
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <strong className="text-white">Evantras Consulting Services Pvt Ltd</strong> is an IT and business strategy consulting company headquartered in Anna Nagar, Chennai, Tamil Nadu, India.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                We support businesses in evaluating technology requirements, improving operational processes, and developing strategies that align with their organizational goals.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Practical recommendations that reflect business objectives and available resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Transparent, ethical, and client-centric consulting engagements</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Dedicated corporate office at SDV Arcade, Shanthi Colony, Anna Nagar</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm transition-colors shadow-md"
                >
                  Learn More About Us
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-colors border border-slate-700"
                >
                  Visit Anna Nagar Office
                </Link>
              </div>
            </div>

            {/* Right Column: Mission & Vision Cards */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-sky-400 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To help businesses make better technology and strategic decisions through practical consulting, clear communication, and solutions tailored to their requirements.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To build lasting professional relationships by delivering dependable consulting services and helping businesses adapt to changing technology and market needs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-900/40 text-xs sm:text-sm text-sky-200 italic leading-relaxed">
                &ldquo;Effective consulting begins with understanding the client's business. We take the time to understand existing challenges, assess available options, and provide recommendations that are practical and relevant.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Focus & Core Practice Areas Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
              Technology & Strategy Consulting Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Real-world technology advisory, systems assessment, and organizational process engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech Card 1 */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                  alt="Enterprise Infrastructure & Cloud Systems"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Infrastructure & Cloud
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Technology Infrastructure Consulting
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Reviewing data architecture, cloud readiness, and systems integration to ensure resilient enterprise operations.
                  </p>
                </div>
                <Link
                  href="/services#infrastructure-consulting"
                  className="pt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tech Card 2 */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt="IT Strategy & Tech Advisory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Technology Roadmaps
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    IT Strategy & Systems Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Formulating pragmatic digital modernization paths, assessing vendor solutions, and optimizing software investments.
                  </p>
                </div>
                <Link
                  href="/services#it-strategy"
                  className="pt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tech Card 3 */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Business Process Optimization"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-sky-300 uppercase tracking-wider">
                  Process Engineering
                </span>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Business Process Optimization
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Mapping complex workflows, eliminating operational friction points, and deploying digital collaboration tools.
                  </p>
                </div>
                <Link
                  href="/services#process-optimization"
                  className="pt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office & Contact Callout */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 font-bold">
                <MapPin className="w-5 h-5" />
                <span>Anna Nagar Chennai Office</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                4th Floor, SDV Arcade, No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai - 600040.
              </p>
              <a
                href="https://maps.app.goo.gl/hfr9GDqV7X8vVCC78"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center space-x-1 pt-1"
              >
                <span>View Google Map Pin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 font-bold">
                <Mail className="w-5 h-5" />
                <span>Recruitment & Inquiries</span>
              </div>
              <p className="text-slate-600 text-xs">
                Official HR and Candidate communications desk:
              </p>
              <a href="mailto:hr@evantras.com" className="text-base font-bold text-slate-900 hover:text-blue-600 block">
                hr@evantras.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-blue-600 font-bold">
                <Phone className="w-5 h-5" />
                <span>Direct Voice Line</span>
              </div>
              <p className="text-slate-600 text-xs">
                Available Monday - Friday, 9:30 AM to 6:30 PM IST:
              </p>
              <a href="tel:+919019892622" className="text-base font-bold text-slate-900 hover:text-blue-600 block">
                +91 90198 92622
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
