import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, EyeOff, KeyRound, ShieldCheck, Smartphone, UserCheck } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { SAFETY_STEPS } from "@/components/site/safety-steps";
import { ErrorSummary, focusErrorSummary, labelTone } from "@/components/site/form-ui";
import { makeDraftRef, useReportFlow, useStartFreshReport } from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety/start")({
  head: () => ({
    meta: [
      { title: "Report threats, harassment or abuse - Cyber Crime Help" },
      {
        name: "description",
        content:
          "Choose whether to report anonymously or with your details, before answering any questions about what happened.",
      },
      { property: "og:title", content: "Report threats, harassment or abuse" },
      {
        property: "og:description",
        content: "Choose anonymous or with-your-details reporting first, then tell us what happened.",
      },
    ],
  }),
  component: SafetyStart,
});

function SafetyStart() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  useStartFreshReport("safety");
  const [choice, setChoice] = useState<"anonymous" | "tracked" | "">("");
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      setErrors({ mobile: "Enter your 10-digit mobile number so we can send you a code." });
      focusErrorSummary();
      return;
    }
    setErrors({});
    setSent(true);
  }

  function chooseAnonymous() {
    setChoice("anonymous");
    setErrors({});
  }

  function continueAnonymous() {
    update({ track: "safety", anonymous: true, mobileVerified: false });
    navigate({ to: "/report/safety/what-happened" });
  }

  function onVerifySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sent) {
      sendCode();
      return;
    }
    if (digits.join("").length !== 6) {
      setErrors({ "otp-0": "Enter all 6 digits of the code we sent you." });
      focusErrorSummary();
      return;
    }
    setErrors({});
    update({
      track: "safety",
      anonymous: false,
      mobileVerified: true,
      draftRef: report.draftRef || makeDraftRef(),
    });
    navigate({ to: "/report/safety/what-happened" });
  }

  return (
    <Page>
      <StepIndicator current={1} steps={SAFETY_STEPS} />
      <h1 className="text-3xl font-bold text-navy">How would you like to report this?</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You don&apos;t need to choose a legal category or use the right words. Nothing here is
        shared with the person you are reporting.
      </p>
      <div className="mt-4 rounded-sm border-2 border-emergency bg-emergency-tint p-4 text-base">
        <p className="font-semibold text-emergency">
          If you or a child are in immediate danger, call{" "}
          <a href="tel:112" className="underline">
            112
          </a>{" "}
          first. This form is not watched minute by minute.
        </p>
      </div>

      <ErrorSummary errors={errors} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={chooseAnonymous}
          className={`min-h-16 rounded-sm border-2 p-5 text-left hover:bg-surface-grey ${
            choice === "anonymous" ? "border-brand-blue bg-surface-grey" : "border-border"
          }`}
        >
          <span className="flex items-center gap-2 text-lg font-semibold text-navy">
            <EyeOff className="size-5" aria-hidden="true" />
            Report anonymously
          </span>
          <span className="mt-1 block text-base text-muted-foreground">
            No name, no mobile number. We cannot send you updates or let you recover a saved
            draft.
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setChoice("tracked");
            setErrors({});
          }}
          className={`min-h-16 rounded-sm border-2 p-5 text-left hover:bg-surface-grey ${
            choice === "tracked" ? "border-brand-blue bg-surface-grey" : "border-border"
          }`}
        >
          <span className="flex items-center gap-2 text-lg font-semibold text-navy">
            <UserCheck className="size-5" aria-hidden="true" />
            Report with my details
          </span>
          <span className="mt-1 block text-base text-muted-foreground">
            An officer can contact you, and your answers are saved as you go so nothing is lost.
          </span>
        </button>
      </div>

      {choice === "anonymous" ? (
        <div className="mt-8 rounded-sm border-2 border-caution bg-caution-tint p-5">
          <p className="text-lg font-semibold text-navy">Before you continue</p>
          <p className="mt-2 text-base text-foreground">
            Without a mobile number, you will not get an acknowledgement number tied to a saved
            draft, no officer can call you for more details, and you cannot come back later to add
            evidence through &quot;My reports&quot;. You will still get an acknowledgement number
            at the end - write it down.
          </p>
          <button
            type="button"
            onClick={continueAnonymous}
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue anonymously
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {choice === "tracked" ? (
        <form onSubmit={onVerifySubmit} className="mt-8 space-y-8">
          <div className="rounded-sm border-2 border-border bg-surface-grey p-4 text-base">
            <p className="font-semibold text-navy">Not getting a code?</p>
            <p className="mt-1 text-muted-foreground">
              Call <span className="font-bold">1930</span> and an operator will take your report
              over the phone. Nothing you tell us is lost.
            </p>
          </div>

          <section className="rounded-sm border-2 border-border p-5">
            <div className="flex items-center gap-2">
              <Smartphone className="size-6 text-navy" aria-hidden="true" />
              <h2 className="text-xl font-bold text-navy">Your mobile number</h2>
            </div>
            <label htmlFor="mobile" className={`mt-4 block text-lg font-semibold ${labelTone(!!errors["mobile"])}`}>
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
              Six digits. There is no time limit - ask for a new code whenever you need one.
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
              Security check passed - no puzzle to solve.
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
          </div>
        </form>
      ) : null}

      <p className="mt-8">
        <Link to="/" className="font-semibold text-brand-blue underline">
          Back to start
        </Link>
      </p>
    </Page>
  );
}
