import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { makeDraftRef, useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/verify")({
  head: () => ({
    meta: [
      { title: "Confirm your mobile number — Report stolen money" },
      {
        name: "description",
        content:
          "We confirm your mobile number first, so your report is saved as you go and nothing is lost if you stop halfway.",
      },
      { property: "og:title", content: "Confirm your mobile number" },
      {
        property: "og:description",
        content: "Verification happens first so your answers are saved from the very beginning.",
      },
    ],
  }),
  component: VerifyStep,
});

function VerifyStep() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");

  function setDigit(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  }

  function sendCode() {
    if (!/^\d{10}$/.test(report.mobile.replace(/\s/g, ""))) {
      setError("Enter your 10-digit mobile number so we can send you a code.");
      return;
    }
    setError("");
    setSent(true);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sent) {
      sendCode();
      return;
    }
    if (digits.join("").length !== 6) {
      setError("Enter all 6 digits of the code we sent you.");
      return;
    }
    setError("");
    update({ mobileVerified: true, draftRef: report.draftRef || makeDraftRef() });
    navigate({ to: "/report/financial/what-happened" });
  }

  return (
    <Page>
      <StepIndicator current={1} />
      <h1 className="text-3xl font-bold text-navy">First, confirm your mobile number</h1>
      <p className="mt-3 text-base text-muted-foreground">
        We do this before any questions for two reasons: your answers are saved against this number
        from the start, and if the code doesn&apos;t arrive you find out now — not after filling in
        a long form.
      </p>

      <div className="mt-6 rounded-sm border-2 border-border bg-surface-grey p-4 text-base">
        <p className="font-semibold text-navy">Not getting a code?</p>
        <p className="mt-1 text-muted-foreground">
          Call <span className="font-bold">1930</span> and an operator will take your report over
          the phone. Nothing you tell us is lost.
        </p>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <Smartphone className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Your mobile number</h2>
          </div>
          <label htmlFor="mobile" className="mt-4 block text-lg font-semibold">
            10-digit mobile number
          </label>
          <p id="mobile-hint" className="text-base text-muted-foreground">
            Updates about your report are sent here. Use a number you can check today.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              id="mobile"
              inputMode="numeric"
              autoComplete="tel-national"
              aria-describedby="mobile-hint"
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
            <h2 className="text-xl font-bold text-navy">The code from your SMS</h2>
          </div>
          <p id="otp-hint" className="mt-2 text-base text-muted-foreground">
            Six digits. There is no time limit — ask for a new code whenever you need one.
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
        </section>

        <section className="flex items-start gap-3 rounded-sm border-2 border-success bg-success-tint p-4">
          <ShieldCheck className="size-6 shrink-0 text-success" aria-hidden="true" />
          <p className="text-base font-semibold text-success">
            Security check passed — no puzzle to solve.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            {sent ? "Confirm and start my report" : "Send me a code"}
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link to="/" className="font-semibold text-brand-blue underline">
            Back to start
          </Link>
        </div>
      </form>
    </Page>
  );
}
