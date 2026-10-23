"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Lock, 
  Mail, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  LogOut, 
  Users, 
  Download, 
  ExternalLink,
  Search,
  X,
  FileText,
  Clock,
  MapPin,
  RefreshCw
} from "lucide-react";

interface JobItem {
  id: string;
  title: string;
  department: string;
  category: "all" | "tech" | "business" | "hr";
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  isActive: boolean;
  createdAt?: string;
}

interface ApplicationItem {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  noticePeriod: string;
  message: string;
  resumeName: string;
  resumeData?: string;
  createdAt?: string;
}

export default function PortalAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(null);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard States
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Add Job Modal State
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "Technology & Advisory",
    category: "tech" as "tech" | "business" | "hr",
    location: "Anna Nagar, Chennai",
    type: "Full-Time • On-site",
    experience: "1 - 3 Years",
    overview: "",
    responsibilitiesText: "",
    qualificationsText: "",
  });
  const [jobSubmitting, setJobSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // 1. Verify Session on mount
  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const res = await fetch("/api/admin/check");
      const json = await res.json();
      if (res.ok && json.authenticated) {
        setIsAuthenticated(true);
        setAdminUser(json.user);
        loadDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadDashboardData = async () => {
    setDataLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch("/api/admin/jobs"),
        fetch("/api/admin/applications"),
      ]);

      if (jobsRes.ok) {
        const jJson = await jobsRes.json();
        setJobs(jJson.jobs || []);
      }

      if (appsRes.ok) {
        const aJson = await appsRes.json();
        setApplications(aJson.applications || []);
      }
    } catch (e) {
      console.error("Failed to load dashboard data", e);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Login failed");
      }

      setIsAuthenticated(true);
      setAdminUser(json.user);
      loadDashboardData();
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === id ? { ...job, isActive: !currentStatus } : job
          )
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this job posting?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/jobs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobSubmitting(true);
    setModalError(null);

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newJob,
          responsibilities: newJob.responsibilitiesText
            .split("\n")
            .filter((l) => l.trim().length > 0),
          qualifications: newJob.qualificationsText
            .split("\n")
            .filter((l) => l.trim().length > 0),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to create job.");
      }

      setShowAddJobModal(false);
      if (json.job) {
        setJobs((prev) => [json.job, ...prev.filter((j) => j.id !== json.job.id)]);
      }
      setNewJob({
        title: "",
        department: "Technology & Advisory",
        category: "tech",
        location: "Anna Nagar, Chennai",
        type: "Full-Time • On-site",
        experience: "1 - 3 Years",
        overview: "",
        responsibilitiesText: "",
        qualificationsText: "",
      });
      loadDashboardData();
    } catch (err: any) {
      setModalError(err.message || "Failed to publish job.");
    } finally {
      setJobSubmitting(false);
    }
  };

  // Loading state while verifying token
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Verifying security credentials...</p>
        </div>
      </div>
    );
  }

  // 2. LOGIN VIEW (If not logged in)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070e1b] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-block py-2">
              <Image
                src="/logo-light.png"
                alt="Evantras Consulting Logo"
                width={220}
                height={40}
                className="h-10 w-auto object-contain mx-auto"
              />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Portal Login</h1>
            <p className="text-xs text-slate-400">
              Restricted management portal for Evantras job postings & applications.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@evantras.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 text-white text-sm rounded-xl focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 text-white text-sm rounded-xl focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 px-4 rounded-full bg-slate-800 hover:bg-slate-700 border border-amber-500/50 text-amber-100 font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Sign In to Console</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top Admin Bar */}
      <header className="bg-[#070e1b] text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo-light.png"
              alt="Evantras"
              width={180}
              height={34}
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Admin Console
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link
              href="/careers"
              target="_blank"
              className="hidden md:flex items-center space-x-1.5 text-slate-300 hover:text-white"
            >
              <span>View Public Careers Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <span className="text-slate-500">|</span>

            <div className="flex items-center space-x-3">
              <span className="text-slate-400 hidden sm:inline">{adminUser?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-500/30 font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-400" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === "jobs"
                  ? "bg-slate-900 text-amber-200 shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Postings ({jobs.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center space-x-2 ${
                activeTab === "applications"
                  ? "bg-slate-900 text-amber-200 shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidate Applications ({applications.length})</span>
            </button>
          </div>

          {activeTab === "jobs" && (
            <button
              onClick={() => setShowAddJobModal(true)}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center space-x-2 transition-transform hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </button>
          )}
        </div>

        {/* TAB 1: JOBS MANAGEMENT */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Active Job Postings</h2>
                  <p className="text-xs text-slate-500">
                    Manage roles displayed on the live website. Toggle switch to pause or reactivate.
                  </p>
                </div>
                <button
                  onClick={loadDashboardData}
                  className="p-2 text-slate-500 hover:text-slate-800"
                  title="Refresh jobs"
                >
                  <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`} />
                </button>
              </div>

              {jobs.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-3">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold">No job postings found.</p>
                  <button
                    onClick={() => setShowAddJobModal(true)}
                    className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold"
                  >
                    Post Your First Job
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              job.isActive
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {job.isActive ? "Live on Website" : "Closed / Hidden"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">{job.overview}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                          <span>{job.department}</span>
                          <span>•</span>
                          <span>{job.experience}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 shrink-0">
                        {/* Toggle Active Button */}
                        <button
                          onClick={() => handleToggleActive(job.id, job.isActive)}
                          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                            job.isActive
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                          }`}
                        >
                          {job.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-emerald-600" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-slate-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CANDIDATE APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Received Job Applications</h2>
                <p className="text-xs text-slate-500">
                  Profiles and resumes submitted by candidates via the Evantras Careers Portal.
                </p>
              </div>
              <button
                onClick={loadDashboardData}
                className="p-2 text-slate-500 hover:text-slate-800"
                title="Refresh applications"
              >
                <RefreshCw className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold">No candidate applications received yet.</p>
                <p className="text-xs text-slate-400">
                  Applications submitted on the /careers page will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3">Candidate</th>
                      <th className="px-6 py-3">Applied Role</th>
                      <th className="px-6 py-3">Contact</th>
                      <th className="px-6 py-3">Experience</th>
                      <th className="px-6 py-3">Notice</th>
                      <th className="px-6 py-3">Resume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {applications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {app.fullName}
                          {app.message && (
                            <p className="text-[11px] font-normal text-slate-500 line-clamp-1 mt-0.5">
                              &ldquo;{app.message}&rdquo;
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-700">
                          {app.position}
                        </td>
                        <td className="px-6 py-4 space-y-0.5">
                          <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline block">
                            {app.email}
                          </a>
                          <a href={`tel:${app.phone}`} className="text-slate-600 block">
                            {app.phone}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{app.experience}</td>
                        <td className="px-6 py-4 text-slate-600">{app.noticePeriod}</td>
                        <td className="px-6 py-4">
                          {app.resumeData ? (
                            <a
                              href={app.resumeData}
                              download={app.resumeName}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>{app.resumeName || "Download"}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">{app.resumeName}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* POST NEW JOB MODAL */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Post a New Job Opening</h3>
                <p className="text-xs text-slate-500">
                  This role will be published live on the Evantras Careers page.
                </p>
              </div>
              <button
                onClick={() => setShowAddJobModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="e.g. Senior Cloud Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Department *</label>
                  <input
                    type="text"
                    required
                    value={newJob.department}
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                    placeholder="e.g. Technology & Infrastructure"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Category *</label>
                  <select
                    value={newJob.category}
                    onChange={(e: any) => setNewJob({ ...newJob, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 bg-white"
                  >
                    <option value="tech">Technology & IT</option>
                    <option value="business">Business Strategy</option>
                    <option value="hr">HR & Operations</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Experience *</label>
                  <input
                    type="text"
                    required
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    placeholder="e.g. 1 - 3 Years"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Location</label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Overview / Job Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={newJob.overview}
                  onChange={(e) => setNewJob({ ...newJob, overview: e.target.value })}
                  placeholder="Describe the core purpose of this role..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Key Responsibilities (1 bullet per line)
                </label>
                <textarea
                  rows={4}
                  value={newJob.responsibilitiesText}
                  onChange={(e) => setNewJob({ ...newJob, responsibilitiesText: e.target.value })}
                  placeholder="Lead cloud architecture reviews&#10;Deploy enterprise software solutions&#10;Collaborate with client stakeholders"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">
                  Qualifications & Skills (1 bullet per line)
                </label>
                <textarea
                  rows={3}
                  value={newJob.qualificationsText}
                  onChange={(e) => setNewJob({ ...newJob, qualificationsText: e.target.value })}
                  placeholder="Bachelor's degree in CS or relevant discipline&#10;Experience with AWS or Azure cloud infrastructure&#10;Excellent communication skills"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-600 font-mono text-xs"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={jobSubmitting}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md disabled:opacity-60"
                >
                  {jobSubmitting ? "Publishing Job..." : "Publish Job to Website"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
