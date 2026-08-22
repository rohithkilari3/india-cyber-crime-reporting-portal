import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ReportFile = { id: string; name: string; size: number; type: string };

export type FinancialReport = {
  whatHappened: string;
  otherDescription: string;
  amount: string;
  whenHappened: string;
  /** Where the incident reached you — call, WhatsApp, website, app, in person */
  platform: string;
  platformDetail: string;
  /** Suspect details */
  suspectKind: string;
  suspectValue: string;
  suspectNotes: string;
  files: ReportFile[];
  /** Complainant details */
  fullName: string;
  email: string;
  state: string;
  district: string;
  policeStation: string;
  anonymousContact: boolean;
  mobile: string;
  acknowledgement: string;
};

const emptyReport: FinancialReport = {
  whatHappened: "",
  otherDescription: "",
  amount: "",
  whenHappened: "",
  platform: "",
  platformDetail: "",
  suspectKind: "",
  suspectValue: "",
  suspectNotes: "",
  files: [],
  fullName: "",
  email: "",
  state: "",
  district: "",
  policeStation: "",
  anonymousContact: false,
  mobile: "",
  acknowledgement: "",
};

type ReportFlowValue = {
  report: FinancialReport;
  update: (patch: Partial<FinancialReport>) => void;
  reset: () => void;
};

const ReportFlowContext = createContext<ReportFlowValue | null>(null);

export function ReportFlowProvider({ children }: { children: ReactNode }) {
  const [report, setReport] = useState<FinancialReport>(emptyReport);

  const update = useCallback((patch: Partial<FinancialReport>) => {
    setReport((prev) => ({ ...prev, ...patch }));
  }, []);
  const reset = useCallback(() => setReport(emptyReport), []);

  const value = useMemo(() => ({ report, update, reset }), [report, update, reset]);
  return <ReportFlowContext.Provider value={value}>{children}</ReportFlowContext.Provider>;
}

export function useReportFlow() {
  const ctx = useContext(ReportFlowContext);
  if (!ctx) throw new Error("useReportFlow must be used inside ReportFlowProvider");
  return ctx;
}

export function makeAcknowledgement() {
  const year = new Date().getFullYear();
  const digits = Math.floor(1000000 + Math.random() * 8999999);
  return `NCRP-${year}-${digits}`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Lakshadweep",
];
