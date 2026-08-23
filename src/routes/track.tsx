import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  Clock,
  FilePlus2,
  KeyRound,
  Pencil,
  Smartphone,
  XCircle,
} from "lucide-react";
import { Page } from "@/components/site/Page";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "My reports - National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Confirm your mobile number with a one-time code to see every report you have made, finish an unfinished one, or add more details.",
      },
      { property: "og:title", content: "My reports" },
      {
        property: "og:description",
        content: "One place for every report you've made - finished or not. Protected by a one-time code.",
      },
    ],
  }),
  component: MyReports,
});

type Report = {
  ref: string;
  title: string;
  when: string;
  state: "draft" | "received" | "investigating" | "closed";
  stateLabel: string;
  note: string;
  /** Days left before an unsent draft is closed automatically. Drafts only. */
  daysLeft?: number;
};

const demoReports: Report[] = [
  {
    ref: "DRAFT-2026-104477",
    title: "Money went out through UPI",
    when: "Started 2 days ago",
    state: "draft",
    stateLabel: "Not sent yet",
    note: "You stopped at the evidence step. Nothing has reached the police yet.",
    daysLeft: 13,
  },
  {
    ref: "NCRP-2026-4471902",
    title: "Someone used my debit card",
    when: "Sent 9 days ago",
    state: "investigating",
    stateLabel: "With the investigating officer",
    note: "Banks were alerted the same day. An officer is reviewing your case.",
  },
];

const stateStyles: Record<Report["state"], string> = {
  draft: "border-caution bg-caution-tint text-navy",
  received: "border-brand-blue bg-surface-grey text-navy",
  investigating: "border-brand-blue bg-surface-grey text-navy",
  closed: "border-success bg-success-tint text-success",
};

function MyReports() {
  const navigate = useNavigate();
  const { update } = useReportFlow();
  const [reports, setReports] = useState<Report[]>(demoReports);
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  function setDigit(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) document.getElementById(`track-otp-${i + 1}`)?.focus();
  }

  function sendCode() {
    if (!/^\d{10}$/.test(mobile.replace(/\s/g, ""))) {
      setError("Enter the 10-digit mobile number you used when you reported.");
      return;
    }
    setError("");
    setSent(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!sent) return sendCode();
    if (digits.join("").length !== 6) {
      setError("Enter all 6 digits of the code we sent to your phone.");
      return;
    }
    setError("");
    setSignedIn(true);
  }

  if (!signedIn) {
    return (
      <Page>
        <h1 className="text-3xl font-bold text-navy">My reports</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Everything you have reported is here - finished or not. Because reports contain personal
          details, we confirm it&apos;s you first. You only need the mobile number you reported
          with; no acknowledgement number needed.
        </p>

        {error ? (
          <div
            role="alert"
            className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
          >
            <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
            <p className="font-semibold text-emergency">{error}</p>
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-8 space-y-8">
          <section className="rounded-sm border-2 border-border p-5">
            <div className="flex items-center gap-2">
              <Smartphone className="size-6 text-navy" aria-hidden="true" />
              <h2 className="text-xl font-bold text-navy">Your mobile number</h2>
            </div>
            <label htmlFor="track-mobile" className="mt-4 block text-lg font-semibold">
              The 10-digit number you used when reporting
            </label>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <input
                id="track-mobile"
                inputMode="numeric"
                autoComplete="tel-national"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
              />
              <button
                type="button"
                onClick={sendCode}
                className="min-h-12 rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-surface-grey"
              >
                {sent ? "Send the code again" : "Send me a code"}
              </button>
            </div>
          </section>

          <section className="rounded-sm border-2 border-border p-5">
            <div className="flex items-center gap-2">
              <KeyRound className="size-6 text-navy" aria-hidden="true" />
              <h2 className="text-xl font-bold text-navy">One-time code from your SMS</h2>
            </div>
            <p id="track-otp-hint" className="mt-2 text-base text-muted-foreground">
              A 6-digit number, texted to the phone above. There is no time limit.
            </p>
            <div className="mt-4 flex gap-2" role="group" aria-labelledby="track-otp-hint">
              {digits.map((d, i) => (
                <input
                  key={i}
                  id={`track-otp-${i}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  disabled={!sent}
                  aria-label={`Code digit ${i + 1} of 6`}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digits[i] && i > 0) {
                      document.getElementById(`track-otp-${i - 1}`)?.focus();
                    }
                  }}
                  className="size-14 rounded-sm border-2 border-input text-center text-2xl font-bold disabled:bg-surface-grey disabled:text-muted-foreground"
                />
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            {sent ? "Show my reports" : "Send me a code"}
          </button>
        </form>

        <p className="mt-8 text-base text-muted-foreground">
          Changed your phone number, or lost the SIM? Call <span className="font-bold">1930</span>{" "}
          with your acknowledgement number and an operator will update it for you.
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">My reports</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Signed in as {mobile}. Everything reported from this number is listed below, newest first.
      </p>

      <ul className="mt-8 space-y-6">
        {reports.map((r) => (
          <li key={r.ref} className="rounded-sm border-2 border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-navy">{r.title}</h2>
                <p className="text-base text-muted-foreground">
                  {r.ref} · {r.when}
                </p>
              </div>
              <p
                className={`inline-flex items-center gap-2 rounded-sm border-2 px-3 py-1 text-base font-semibold ${stateStyles[r.state]}`}
              >
                <Clock className="size-4" aria-hidden="true" />
                {r.stateLabel}
              </p>
            </div>
            <p className="mt-3 text-base text-muted-foreground">{r.note}</p>
            {r.state === "draft" ? (
              <p className="mt-3 flex items-start gap-2 rounded-sm border-2 border-caution bg-caution-tint p-3 text-base text-foreground">
                <Clock className="mt-0.5 size-5 shrink-0 text-caution" aria-hidden="true" />
                <span>
                  Unsent reports are kept for <span className="font-bold">15 days</span>. This one
                  closes on its own in <span className="font-bold">{r.daysLeft} days</span> if you
                  don&apos;t send it. Nothing bad happens if it does - you can always start a new
                  report.
                </span>
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-3">
              {r.state === "draft" ? (
                <button
                  type="button"
                  onClick={() => {
                    // Already signed in with a code on this page - don't ask again.
                    update({ mobile, mobileVerified: true, draftRef: r.ref });
                    navigate({ to: "/report/financial/what-happened" });
                  }}
                  className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-5 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                >
                  Carry on where you left off
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenPanel(openPanel === `add-${r.ref}` ? null : `add-${r.ref}`)}
                  aria-expanded={openPanel === `add-${r.ref}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-brand-blue px-5 font-semibold text-brand-blue hover:bg-surface-grey"
                >
                  <FilePlus2 className="size-5" aria-hidden="true" />
                  Add more details
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  setOpenPanel(openPanel === `stop-${r.ref}` ? null : `stop-${r.ref}`)
                }
                aria-expanded={openPanel === `stop-${r.ref}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-border px-5 font-semibold text-navy hover:bg-surface-grey"
              >
                <XCircle className="size-5" aria-hidden="true" />
                {r.state === "draft" ? "Delete this draft" : "Ask to withdraw"}
              </button>
            </div>

            {openPanel === `add-${r.ref}` ? (
              <div className="mt-5 rounded-sm border-2 border-border bg-surface-grey p-4">
                <label htmlFor={`add-${r.ref}`} className="block text-lg font-semibold text-navy">
                  What else would you like to add?
                </label>
                <p className="text-base text-muted-foreground">
                  A new transaction number, another payment, a screenshot you found, or anything you
                  remembered. It is added to your existing report - you never start again.
                </p>
                <textarea
                  id={`add-${r.ref}`}
                  rows={4}
                  className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setOpenPanel(null)}
                  className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-5 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                >
                  <Pencil className="size-5" aria-hidden="true" />
                  Add to my report
                </button>
              </div>
            ) : null}

            {openPanel === `stop-${r.ref}` ? (
              <div className="mt-5 rounded-sm border-2 border-caution bg-caution-tint p-4">
                <p className="text-base text-foreground">
                  {r.state === "draft"
                    ? "This draft has not been sent to anyone. Deleting it removes it completely."
                    : "A sent report cannot be deleted, because the police are already looking at it. You can tell the officer you want to withdraw, and they will contact you before closing it."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (r.state === "draft") {
                      setReports((prev) => prev.filter((x) => x.ref !== r.ref));
                    }
                    setOpenPanel(null);
                  }}
                  className="mt-3 inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-background"
                >
                  {r.state === "draft" ? "Yes, delete this draft" : "Send my withdrawal request"}
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      <section className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-bold text-navy">Something else</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-muted-foreground">
          <li>
            Changing your mobile number? Call <span className="font-bold">1930</span> - we can only
            move reports to a new number after checking who you are.
          </li>
          <li>
            <Link to="/report/financial/verify" className="font-semibold text-brand-blue underline">
              Report something new
            </Link>
          </li>
        </ul>
      </section>
    </Page>
  );
}
