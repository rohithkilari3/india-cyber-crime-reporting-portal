import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ReportFile = { id: string; name: string; size: number; type: string };

export type FinancialReport = {
  /** Step 1 — identity first, so a draft can be saved against a verified number */
  mobile: string;
  mobileVerified: boolean;
  draftRef: string;

  /** Step 2 — what happened */
  whatHappened: string;
  otherDescription: string;
  whenBucket: string;
  whenDate: string;
  delayReason: string;
  platform: string;
  platformDetail: string;

  /** Step 3 — money and payment trail (needed to freeze funds) */
  amount: string;
  victimBank: string;
  victimAccountType: string;
  victimAccountLast: string;
  txnDate: string;
  txnRefs: string;
  txnCount: string;
  bankInformed: string;

  /** Step 4 — suspect */
  suspectKind: string;
  suspectValue: string;
  suspectNotes: string;
  suspectBank: string;
  suspectAccount: string;

  /** Step 5 — evidence */
  files: ReportFile[];

  /** Step 6 — complainant and victim */
  relationship: string;
  victimName: string;
  victimAge: string;
  fullName: string;
  email: string;
  idType: string;
  idLast4: string;
  state: string;
  district: string;
  policeStation: string;
  address: string;
  anonymousContact: boolean;
  declaration: boolean;

  acknowledgement: string;
};

const emptyReport: FinancialReport = {
  mobile: "",
  mobileVerified: false,
  draftRef: "",
  whatHappened: "",
  otherDescription: "",
  whenBucket: "",
  whenDate: "",
  delayReason: "",
  platform: "",
  platformDetail: "",
  amount: "",
  victimBank: "",
  victimAccountType: "",
  victimAccountLast: "",
  txnDate: "",
  txnRefs: "",
  txnCount: "",
  bankInformed: "",
  suspectKind: "",
  suspectValue: "",
  suspectNotes: "",
  suspectBank: "",
  suspectAccount: "",
  files: [],
  relationship: "",
  victimName: "",
  victimAge: "",
  fullName: "",
  email: "",
  idType: "",
  idLast4: "",
  state: "",
  district: "",
  policeStation: "",
  address: "",
  anonymousContact: false,
  declaration: false,
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

export function makeDraftRef() {
  const year = new Date().getFullYear();
  const digits = Math.floor(100000 + Math.random() * 899999);
  return `DRAFT-${year}-${digits}`;
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
