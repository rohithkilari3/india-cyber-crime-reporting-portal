import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type ReportFile = { id: string; name: string; size: number; type: string };

export type FinancialReport = {
  whatHappened: string;
  otherDescription: string;
  amount: string;
  whenHappened: string;
  files: ReportFile[];
  mobile: string;
  acknowledgement: string;
};

const emptyReport: FinancialReport = {
  whatHappened: "",
  otherDescription: "",
  amount: "",
  whenHappened: "",
  files: [],
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
