import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, CheckCircle2, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { makeAcknowledgement, useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/verify")({
  head: () => ({
    meta: [
      { title: "Confirm your mobile number — Report stolen money" },
      {
        name: "description",
        content:
          "Enter the one-time code sent to your phone. The security check runs automatically — there is no puzzle to solve.",
      },
      { property: "og:title", content: "Confirm your mobile number" },
      {
        property: "og:description",
        content: "Enter your one-time code. No distorted-text puzzle to solve.",
      },
    ],
  }),
  component: Verify,
});

function Verify() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const code = digits.join("");

  function setDigit(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  }

  function sendCode() {
    if (!/^\d{10}$/.test(report.mobile.replace(/\s/g, ""))) {
      setError("Enter your 10-digit mobile number so we can send you a code.");
      return;
    }
    setError("");
    setSent(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Enter all 6 digits of the code we sent to your phone.");
      return;
    }
    if (!agreed) {
      setError("Please confirm that what you have told us is true, then submit.");
      return;
    }
    setError("");
    update({ acknowledgement: makeAcknowledgement() });
    navigate({ to: "/report/financial/submitted" });
  }

  return (
    <Page>
      <StepIndicator current={3} />
      <h1 className="text-3xl font-bold text-navy">Confirm it&apos;s you</h1>
      <p className="mt-3 text-base text-muted-foreground">
        We need a mobile number so we can send you updates about your report. Take your time —
        nothing here expires while you&apos;re typing.
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
          <label htmlFor="mobile" className="mt-4 block text-lg font-semibold">
            10-digit mobile number
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              id="mobile"
              inputMode="numeric"
              autoComplete="tel-national"
              value={report.mobile}
              onChange={(e) => update({ mobile: e.target.value })}
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
          <p id="otp-hint" className="mt-2 text-base text-muted-foreground">
            This is the 6-digit number we text to your phone. It is not a password.
          </p>
          <div className="mt-4 flex gap-2" role="group" aria-labelledby="otp-hint">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                inputMode="numeric"
                maxLength={1}
                value={d}
                disabled={!sent}
                aria-label={`Code digit ${i + 1} of 6`}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digits[i] && i > 0) {
                    document.getElementById(`otp-${i - 1}`)?.focus();
                  }
                }}
                className="size-14 rounded-sm border-2 border-input text-center text-2xl font-bold disabled:bg-surface-grey disabled:text-muted-foreground"
              />
            ))}
          </div>
          {!sent ? (
            <p className="mt-3 text-base text-muted-foreground">
              Enter your mobile number above first, then we&apos;ll text you the code.
            </p>
          ) : (
            <p className="mt-3 text-base text-muted-foreground">
              Code sent. Didn&apos;t get it? Use “Send the code again” above — there is no time
              limit.
            </p>
          )}
        </section>

        <section className="rounded-sm border-2 border-success bg-success-tint p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-success" aria-hidden="true" />
            <h2 className="text-xl font-bold text-success">Security check</h2>
          </div>
          <p className="mt-2 flex items-center gap-2 text-base text-foreground">
            <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
            Passed automatically — there is no puzzle for you to solve.
          </p>
        </section>

        <details className="rounded-sm border bg-surface-grey p-5">
          <summary className="cursor-pointer text-lg font-semibold text-navy">
            Your declaration
          </summary>
          <p className="mt-3 text-base text-muted-foreground">
            By submitting, you confirm that the information you have given is true to the best of
            your knowledge, and that it may be shared with the police unit handling your case.
          </p>
        </details>

        <label className="flex min-h-12 items-start gap-3 text-lg">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 size-5 accent-[var(--brand-blue)]"
          />
          <span>What I&apos;ve told you is true to the best of my knowledge.</span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Submit my report
          </button>
          <Link to="/report/financial/evidence" className="font-semibold text-brand-blue underline">
            Back to evidence
          </Link>
        </div>
      </form>
    </Page>
  );
}
