import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  FileText, 
  ChevronRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070e1b] text-slate-400 border-t border-slate-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-white/10 p-2.5 rounded-2xl border border-amber-500/30 backdrop-blur-xs hover:border-amber-400 transition-colors">
              <Image
                src="/logo.png"
                alt="Evantras Consulting Services"
                width={170}
                height={65}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              An IT and business strategy consulting company headquartered in Anna Nagar, Chennai. We empower organizations with practical technology roadmaps, process optimization, and scalable enterprise consulting.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Consulting Services</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>About Our Firm</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-sky-400 transition-colors flex items-center space-x-1.5 font-semibold text-slate-200">
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                  <span>Careers & Opportunities</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-800">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Consulting Practice Areas */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Consulting Practices</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services#it-strategy" className="hover:text-sky-400 transition-colors block text-slate-400">
                  IT Strategy & Technology Advisory
                </Link>
              </li>
              <li>
                <Link href="/services#infrastructure-consulting" className="hover:text-sky-400 transition-colors block text-slate-400">
                  Infrastructure & Cloud Consulting
                </Link>
              </li>
              <li>
                <Link href="/services#process-optimization" className="hover:text-sky-400 transition-colors block text-slate-400">
                  Business Process Optimization
                </Link>
              </li>
              <li>
                <Link href="/services#digital-operations" className="hover:text-sky-400 transition-colors block text-slate-400">
                  Digital Operations & Enablement
                </Link>
              </li>
              <li>
                <Link href="/services#systems-assessment" className="hover:text-sky-400 transition-colors block text-slate-400">
                  Systems Assessment & Governance
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Office & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Registered Office</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  4th Floor, SDV Arcade, No. AB5, 2nd Avenue, AB Block, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu 600040, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:hr@evantras.com" className="hover:text-sky-400 transition-colors">
                  hr@evantras.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:+919019892622" className="hover:text-sky-400 transition-colors">
                  +91 90198 92622
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mon - Fri: 9:30 AM - 6:30 PM IST</span>
              </div>
              <div className="pt-1">
                <a
                  href="https://maps.app.goo.gl/hfr9GDqV7X8vVCC78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Compliance Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Evantras Consulting Services Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Support & Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
