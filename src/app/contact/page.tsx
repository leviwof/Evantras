"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Briefcase,
  Copy,
  Check,
  ChevronRight
} from "lucide-react";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<"business" | "recruitment">("business");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hr@evantras.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryType: inquiryType === "business" ? "Business / Consulting Inquiry" : "Recruitment / Job Inquiry",
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit. Please reach out to hr@evantras.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* High-Tech Page Banner with Image Overlay */}
      <section className="relative w-full py-20 lg:py-28 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="Contact Evantras Consulting Chennai"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Address */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Evantras Consulting Services Pvt Ltd
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We welcome inquiries regarding our IT consulting, business strategy, and technology advisory services. Please reach out to us using the contact details below.
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-4 text-sm">
                {/* Office Address */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Office Address</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm pl-7">
                    4th Floor, SDV Arcade, No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040, India.
                  </p>
                  <div className="pl-7 pt-1">
                    <a
                      href="https://maps.app.goo.gl/hfr9GDqV7X8vVCC78"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      <span>Open Google Maps Pin</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-slate-900 font-bold">
                      <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>Email</span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Copy email to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="pl-7">
                    <a
                      href="mailto:hr@evantras.com"
                      className="text-base font-bold text-blue-600 hover:text-blue-800"
                    >
                      hr@evantras.com
                    </a>
                    <p className="text-xs text-slate-500 mt-1">
                      For business and recruitment inquiries.
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Phone</span>
                  </div>
                  <div className="pl-7">
                    <a
                      href="tel:+919019892622"
                      className="text-base font-bold text-slate-900 hover:text-blue-600"
                    >
                      +91 90198 92622
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-slate-900 font-bold">
                    <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Business Hours</span>
                  </div>
                  <div className="pl-7 text-xs sm:text-sm text-slate-700 space-y-1">
                    <p className="font-semibold text-slate-900">Monday to Friday, 9:30 AM - 6:30 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    For business inquiries, please email us with a brief description of your requirements. For recruitment-related inquiries, please mention the position you are interested in.
                  </p>
                </div>

                {/* Inquiry Type Tabs */}
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-full">
                  <button
                    type="button"
                    onClick={() => setInquiryType("business")}
                    className={`py-2 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                      inquiryType === "business"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Business Consulting</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryType("recruitment")}
                    className={`py-2 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                      inquiryType === "recruitment"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Recruitment / Job</span>
                  </button>
                </div>

                {inquiryType === "recruitment" && (
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      Applying for an open role? You can also use our{" "}
                      <Link href="/careers#apply-form" className="font-bold underline text-blue-700">
                        dedicated Careers Application Form
                      </Link>{" "}
                      to attach your resume file directly.
                    </span>
                  </div>
                )}

                {submitSuccess ? (
                  <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900">Inquiry Received!</h4>
                    <p className="text-sm text-emerald-800 max-w-md mx-auto">
                      Thank you for contacting Evantras Consulting Services. Our team at <strong>hr@evantras.com</strong> will respond to you within 1-2 business days.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-8 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Full name"
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 90000 00000"
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Subject / Topic
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder={
                            inquiryType === "business"
                              ? "e.g. IT Strategy Consultation"
                              : "e.g. Inquiring about open roles"
                          }
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        {inquiryType === "business"
                          ? "Brief Description of Your Requirements *"
                          : "Position Interested In & Details *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={
                          inquiryType === "business"
                            ? "Please describe the challenges your organization is looking to address or consulting assistance required..."
                            : "Mention the role you are applying for, your background, and why you are interested in joining Evantras..."
                        }
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-100 border border-amber-500/50 font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Submit Inquiry to hr@evantras.com</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Location Pin</span>
              <h3 className="text-2xl font-bold text-slate-900">Our Chennai Office on Google Maps</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                SDV Arcade, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai - 600040.
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/hfr9GDqV7X8vVCC78"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:text-blue-600 hover:border-blue-400 transition-colors shadow-xs"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map Frame */}
          <div className="w-full h-96 rounded-3xl overflow-hidden border border-slate-300 shadow-md bg-slate-200">
            <iframe
              title="Evantras Consulting Services - Anna Nagar Chennai Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.176378411036!2d80.209355!3d13.086438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52643a7587784b%3A0x6b44760ad87b0a6e!2sSDV%20Arcade%2C%20AB%20Block%2C%20Shanthi%20Colony%2C%20Anna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu%20600040!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
