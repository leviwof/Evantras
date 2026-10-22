export interface JobRole {
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
}

export const jobRoles: JobRole[] = [
  {
    id: "it-support-engineer",
    title: "IT Support & Systems Engineer",
    department: "Technical Services & Infrastructure",
    category: "tech",
    location: "Anna Nagar, Chennai",
    type: "Full-Time • On-site",
    experience: "0 - 3 Years (Freshers Welcome)",
    overview:
      "Provide front-line technical support for enterprise hardware, software, networking, and OS administration at our Anna Nagar facility.",
    responsibilities: [
      "Troubleshoot Windows/Linux systems, workstations, and network connectivity.",
      "Perform system installations, security patch updates, and software licensing setups.",
      "Manage ticketing and respond to user technical issues promptly.",
      "Assist in hardware inventory and network equipment upkeep.",
    ],
    qualifications: [
      "Bachelor's degree or Diploma in CS, IT, BCA, or related field.",
      "Good understanding of TCP/IP, DNS, DHCP, and Windows administration.",
      "Strong troubleshooting mindset and clear communication skills.",
    ],
  },
  {
    id: "business-development-executive",
    title: "Business Development Executive",
    department: "Client Strategy & Advisory Growth",
    category: "business",
    location: "Anna Nagar, Chennai",
    type: "Full-Time • On-site",
    experience: "1 - 4 Years",
    overview:
      "Drive outreach to corporate prospects for IT strategy and consulting services, schedule consultative discovery meetings, and nurture client relationships.",
    responsibilities: [
      "Identify prospective enterprise clients seeking technology and process consulting.",
      "Coordinate consultative introductory calls and present Evantras capabilities.",
      "Collaborate with senior consultants to formulate customized consulting proposals.",
      "Maintain clean CRM records and follow up with decision-makers.",
    ],
    qualifications: [
      "Any Graduate / MBA with prior B2B sales or business development experience.",
      "Excellent written and verbal English communication.",
      "Professional interpersonal skills and self-motivated work ethic.",
    ],
  },
  {
    id: "hr-talent-acquisition",
    title: "HR & Talent Acquisition Associate",
    department: "People Operations & Recruitment",
    category: "hr",
    location: "Anna Nagar, Chennai",
    type: "Full-Time • On-site",
    experience: "1 - 3 Years",
    overview:
      "Source, screen, and interview candidates for our consulting practice across Naukri, Indeed, LinkedIn, and referral channels.",
    responsibilities: [
      "Manage job postings on Naukri, Indeed, LinkedIn, and monitor incoming applications.",
      "Screen candidate resumes, conduct initial HR interviews, and verify backgrounds.",
      "Coordinate technical evaluation rounds with hiring managers.",
      "Facilitate smooth onboarding, documentation, and employee relations.",
    ],
    qualifications: [
      "Degree in HR, Business Administration, or related discipline.",
      "Hands-on experience with job portal recruiting (Naukri Resdex, Indeed Employer).",
      "Empathetic communicator with strong organizational skills.",
    ],
  },
  {
    id: "junior-it-business-analyst",
    title: "Junior IT & Business Analyst",
    department: "Consulting Practice & Analytics",
    category: "business",
    location: "Anna Nagar, Chennai",
    type: "Full-Time • On-site",
    experience: "0 - 2 Years",
    overview:
      "Work alongside senior strategy consultants to document client workflows, analyze operational data, and assist in blueprint preparations.",
    responsibilities: [
      "Gather business requirements and prepare structured process maps.",
      "Analyze operational data using spreadsheets and visualization tools.",
      "Draft client-facing reports, presentations, and process documentation.",
      "Participate in client discovery sessions and track follow-up action items.",
    ],
    qualifications: [
      "Bachelor's degree in Engineering, Business, Computer Applications, or Economics.",
      "Analytical problem solver with strong skills in Microsoft Excel / Docs.",
      "Eagerness to learn corporate IT consulting methodologies.",
    ],
  },
];

export interface StoredJobItem extends JobRole {
  isActive: boolean;
  createdAt?: string;
}

declare global {
  var globalJobsStore: StoredJobItem[] | undefined;
}

export function getGlobalJobsStore(): StoredJobItem[] {
  if (!global.globalJobsStore || global.globalJobsStore.length === 0) {
    global.globalJobsStore = jobRoles.map((j) => ({
      ...j,
      isActive: true,
      createdAt: new Date().toISOString(),
    }));
  }
  return global.globalJobsStore;
}

export function addGlobalJob(job: StoredJobItem): StoredJobItem {
  const store = getGlobalJobsStore();
  store.unshift(job);
  return job;
}

export function updateGlobalJob(id: string, updates: Partial<StoredJobItem>): StoredJobItem | null {
  const store = getGlobalJobsStore();
  const index = store.findIndex((j) => j.id === id);
  if (index !== -1) {
    store[index] = { ...store[index], ...updates };
    return store[index];
  }
  return null;
}

export function deleteGlobalJob(id: string): boolean {
  const store = getGlobalJobsStore();
  const initialLen = store.length;
  global.globalJobsStore = store.filter((j) => j.id !== id);
  return global.globalJobsStore.length < initialLen;
}

