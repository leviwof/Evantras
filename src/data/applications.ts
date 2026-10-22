export interface StoredApplicationItem {
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
  status?: string;
  createdAt?: string;
}

declare global {
  var globalApplicationsStore: StoredApplicationItem[] | undefined;
}

export function getGlobalApplicationsStore(): StoredApplicationItem[] {
  if (!global.globalApplicationsStore) {
    global.globalApplicationsStore = [];
  }
  return global.globalApplicationsStore;
}

export function addGlobalApplication(app: StoredApplicationItem): StoredApplicationItem {
  const store = getGlobalApplicationsStore();
  const newApp = {
    ...app,
    _id: app._id || `app-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: app.createdAt || new Date().toISOString(),
    status: app.status || "New",
  };
  store.unshift(newApp);
  return newApp;
}
