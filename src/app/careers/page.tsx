"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  FileText, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  Building2,
  Calendar,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

import { jobRoles, type JobRole } from "@/data/jobs";

export default function CareersPage() {
  const [liveJobs, setLiveJobs] = useState<JobRole[]>(jobRoles);
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "business" | "hr">("all");
  const [selectedPosition, setSelectedPosition] = useState<string>(
    jobRoles.length > 0 ? jobRoles[0].title : "IT Support & Systems Engineer"
  );

  useEffect(() => {
    fetch("/api/jobs", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
          setLiveJobs(data.jobs);
        }
      })
      .catch((err) => console.log("Using static jobs fallback", err));
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "IT Support & Systems Engineer",
    experience: "Fresher (0 - 1 yr)",
    location: "Chennai",
    noticePeriod: "Immediate",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredJobs = liveJobs.filter(
    (job) => activeTab === "all" || job.category === activeTab
  );

  const handleApplyClick = (jobTitle: string) => {
    setSelectedPosition(jobTitle);
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    const formEl = document.getElementById("apply-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("experience", formData.experience);
      data.append("location", formData.location);
      data.append("noticePeriod", formData.noticePeriod);
      data.append("message", formData.message);
      if (resumeFile) {
        data.append("resume", resumeFile);
      }

      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit application");
      }

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: selectedPosition,
        experience: "Fresher (0 - 1 yr)",
        location: "Chennai",
        noticePeriod: "Immediate",
        message: "",
      });
      setResumeFile(null);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please email hr@evantras.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* High-Tech Page Banner with Image Overlay */}
      <section className="relative w-full py-20 lg:py-28 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80"
          alt="Careers at Evantras Consulting"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/85" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Careers at Evantras Consulting
          </h1>
        </div>
      </section>

      {/* Naukri / Indeed Redirection Alert Box */}
      <section className="bg-blue-50/90 border-b border-blue-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-blue-900">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              <strong>Applied via Naukri / Indeed / LinkedIn?</strong> You are on the official Evantras Careers Portal. Complete your application below for priority HR review.
            </span>
          </div>
          <a
            href="#apply-form"
            className="shrink-0 font-bold text-blue-700 hover:text-blue-900 underline flex items-center space-x-1"
          >
            <span>Jump to Quick Apply</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Main Jobs Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Explore Active Positions
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                All roles are based at our registered office in Anna Nagar, Chennai.
              </p>
            </div>

            {/* Filter Pill Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Roles ({liveJobs.length})
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "tech"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Technology & IT
              </button>
              <button
                onClick={() => setActiveTab("business")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "business"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Business Strategy
              </button>
              <button
                onClick={() => setActiveTab("hr")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === "hr"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                HR & Talent
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>Experience: {job.experience}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {job.overview}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-1.5">
                      {job.responsibilities.slice(0, 3).map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">On-site Anna Nagar Chennai</span>
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-100 border border-amber-500/40 font-bold text-xs transition-colors shadow-xs flex items-center space-x-2"
                  >
                    <span>Apply for This Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Application Form Section */}
      <section id="apply-form" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Submit Your Application & Resume
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                Fill out the application below. Your credentials will be reviewed directly by our HR desk at <strong className="text-slate-900">hr@evantras.com</strong>.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Application Submitted Successfully!</h3>
                <p className="text-sm text-emerald-800 max-w-lg mx-auto">
                  Thank you for applying to Evantras Consulting Services Pvt Ltd. Our recruitment desk at <strong>hr@evantras.com</strong> has received your profile and will contact shortlisted candidates shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-8 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Position Applying For <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                    >
                      {liveJobs.map((role) => (
                        <option key={role.id} value={role.title}>
                          {role.title}
                        </option>
                      ))}
                      <option value="General Consulting Application">General Consulting Application / Other</option>
                    </select>
                  </div>

                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Total Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                    >
                      <option value="Fresher (0 - 1 yr)">Fresher (0 - 1 yr)</option>
                      <option value="1 - 3 Years">1 - 3 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  {/* Notice Period */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Notice Period / Availability
                    </label>
                    <select
                      value={formData.noticePeriod}
                      onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                    >
                      <option value="Immediate">Immediate Joiner</option>
                      <option value="15 Days or less">15 Days or less</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days+">60 Days+</option>
                    </select>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Upload Resume (.PDF or .DOCX) <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50">
                    <input
                      type="file"
                      id="resume-file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume-file"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {resumeFile ? resumeFile.name : "Click to select your Resume file"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {resumeFile
                          ? `Size: ${(resumeFile.size / 1024).toFixed(1)} KB (Click to change)`
                          : "Supports PDF, DOC, DOCX up to 10MB"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Message / Cover Note */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Brief Note or Candidate Summary (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention relevant skills, past work, or why you are interested in this position..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-100 border border-amber-500/50 font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit Job Application</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct HR email notice */}
                <div className="text-center pt-2 text-xs text-slate-500">
                  <span>Prefer direct email? Send your CV to </span>
                  <a href="mailto:hr@evantras.com" className="text-blue-600 font-semibold underline">
                    hr@evantras.com
                  </a>
                  <span> with the role in the subject line.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
