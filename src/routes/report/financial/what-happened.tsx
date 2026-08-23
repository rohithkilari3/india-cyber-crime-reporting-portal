import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/what-happened")({
  head: () => ({
    meta: [
      { title: "Tell us what happened - Report stolen money" },
      {
        name: "description",
        content:
          "Choose the plain-language description that fits best, or select 'I'm not sure'. No banking jargon required.",
      },
      { property: "og:title", content: "Tell us what happened - Report stolen money" },
      {
        property: "og:description",
        content: "Report money taken from your account in plain language. No banking jargon required.",
      },
    ],
  }),
  component: WhatHappened,
});

/**
 * Plain-language equivalents of the official financial-fraud sub-categories,
 * so the report still maps to a police category without asking the victim to
 * diagnose it themselves.
 */
const choices = [
  { id: "upi", label: "Money went out through UPI or a wallet", hint: "GPay, PhonePe, Paytm and similar" },
  { id: "netbanking", label: "Money left my bank account online", hint: "Internet or mobile banking, or an OTP was used" },
  { id: "card", label: "Someone used my debit or credit card", hint: "Online, at a shop or at an ATM" },
  { id: "investment", label: "I was promised profits and lost money", hint: "Trading, crypto, chit fund or investment app" },
  { id: "job", label: "A job, task or work-from-home offer", hint: "I paid a fee, or did paid tasks and never got the money back" },
  { id: "loan", label: "A loan or lending app", hint: "Fees taken up front, or threats after a small loan" },
  { id: "impersonation", label: "Someone posed as police, a bank or an official", hint: "Includes 'digital arrest', KYC update and customer-care calls" },
  { id: "shopping", label: "Online shopping, delivery or refund", hint: "Fake seller, fake refund, or a courier fee" },
  { id: "unsure", label: "I'm not sure how it happened", hint: "We'll work it out - you don't need to know" },
];

const places = [
  { id: "call", label: "A phone call" },
  { id: "sms", label: "An SMS or text message" },
  { id: "whatsapp", label: "WhatsApp or Telegram" },
  { id: "social", label: "Social media (Instagram, Facebook, X, YouTube)" },
  { id: "email", label: "An email" },
  { id: "website", label: "A website" },
  { id: "app", label: "A mobile app I installed" },
  { id: "person", label: "In person, or at an ATM or shop" },
  { id: "unknown", label: "I don't know where it came from" },
];

const detailHints: Record<string, string> = {
  call: "The phone number that called you",
  sms: "The sender ID or number, and the exact message",
  whatsapp: "The WhatsApp or Telegram number, or the group or channel name",
  social: "The profile name and the link to it",
  email: "The email address it came from",
  website: "The full web address, pasted",
  app: "The app name, and where you downloaded it from",
  person: "The place, ATM or shop name and location",
  unknown: "Anything you remember about how it reached you",
};

const whenBuckets = [
  { id: "24h", label: "Within the last 24 hours", hint: "Fastest chance of stopping the money" },
  { id: "3d", label: "1 to 3 days ago" },
  { id: "7d", label: "4 to 7 days ago" },
  { id: "30d", label: "1 week to 1 month ago" },
  { id: "old", label: "More than a month ago" },
  { id: "unsure", label: "I don't know exactly" },
];

const delayed = new Set(["7d", "30d", "old"]);

function WhatHappened() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");

  // Identity is confirmed first so answers are saved as a draft from step 1.
  useEffect(() => {
    if (!report.mobileVerified) navigate({ to: "/report/financial/verify", replace: true });
  }, [report.mobileVerified, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.whatHappened) {
      setError("Select the option closest to what happened, or choose “I'm not sure”.");
      document.getElementById("error-summary")?.focus();
      return;
    }
    if (!report.platform) {
      setError("Tell us where this reached you - choose “I don't know” if you're unsure.");
      document.getElementById("error-summary")?.focus();
      return;
    }
    if (!report.whenBucket) {
      setError("Tell us roughly when it happened. “I don't know exactly” is a valid answer.");
      document.getElementById("error-summary")?.focus();
      return;
    }
    setError("");
    navigate({ to: "/report/financial/money" });
  }

  return (
    <Page>
      <StepIndicator current={2} />
      <h1 className="text-3xl font-bold text-navy">Tell us what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Pick whatever is closest. You will not be penalised for choosing the wrong one - we sort
        out the exact category for you.
      </p>

      {report.draftRef ? (
        <p className="mt-4 rounded-sm border-2 border-success bg-success-tint p-3 text-base font-semibold text-success">
          Saved as {report.draftRef}. You can stop and come back through “My reports”.
        </p>
      ) : null}

      <div className="mt-6 rounded-sm border-2 border-border bg-surface-grey p-5">
        <h2 className="text-lg font-bold text-navy">Handy to have, but not required</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-muted-foreground">
          <li>The date and rough time it happened</li>
          <li>Your bank SMS, screenshots or transaction receipts</li>
          <li>The account or UPI ID the money left from</li>
          <li>The number, UPI ID or link the other person used</li>
        </ul>
        <p className="mt-3 text-base text-muted-foreground">
          Missing something? Carry on - you can add it later. Not sure what to call this?{" "}
          <Link to="/learn-cybercrime" className="font-semibold text-brand-blue underline">
            See cyber crime types in plain words
          </Link>
          .
        </p>
      </div>

      {error ? (
        <div
          id="error-summary"
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8">
        <fieldset>
          <legend className="text-lg font-semibold text-navy">Which of these is closest?</legend>
          <div className="mt-4 space-y-3">
            {choices.map((c) => (
              <label
                key={c.id}
                className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.whatHappened === c.id ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="whatHappened"
                  value={c.id}
                  checked={report.whatHappened === c.id}
                  onChange={() => update({ whatHappened: c.id })}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span>
                  <span className="block text-lg font-semibold text-foreground">{c.label}</span>
                  <span className="block text-base text-muted-foreground">{c.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg font-semibold text-navy">Where did this reach you?</legend>
          <p className="text-base text-muted-foreground">
            The place you were contacted, or where you made the payment.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {places.map((p) => (
              <label
                key={p.id}
                className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.platform === p.id ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={p.id}
                  checked={report.platform === p.id}
                  onChange={() => update({ platform: p.id })}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span className="text-lg font-semibold text-foreground">{p.label}</span>
              </label>
            ))}
          </div>
          {report.platform ? (
            <div className="mt-4">
              <label htmlFor="platform-detail" className="block text-lg font-semibold text-navy">
                {detailHints[report.platform]}
              </label>
              <p id="platform-detail-hint" className="text-base text-muted-foreground">
                This is often the single most useful thing in a report - please add it if you can.
              </p>
              <input
                id="platform-detail"
                aria-describedby="platform-detail-hint"
                value={report.platformDetail}
                onChange={(e) => update({ platformDetail: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-lg rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
          ) : null}
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg font-semibold text-navy">When did it happen?</legend>
          <p className="text-base text-muted-foreground">
            Reports made in the first 24 hours have the best chance of the money being held.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {whenBuckets.map((w) => (
              <label
                key={w.id}
                className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.whenBucket === w.id ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="whenBucket"
                  value={w.id}
                  checked={report.whenBucket === w.id}
                  onChange={() => update({ whenBucket: w.id })}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span>
                  <span className="block text-lg font-semibold text-foreground">{w.label}</span>
                  {w.hint ? (
                    <span className="block text-base text-muted-foreground">{w.hint}</span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4">
            <label htmlFor="when-date" className="block text-lg font-semibold text-navy">
              The exact date, if you know it (optional)
            </label>
            <input
              id="when-date"
              type="date"
              value={report.whenDate}
              onChange={(e) => update({ whenDate: e.target.value })}
              className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
            />
          </div>

          {delayed.has(report.whenBucket) ? (
            <div className="mt-4 rounded-sm border-2 border-caution bg-caution-tint p-4">
              <label htmlFor="delay-reason" className="block text-lg font-semibold text-navy">
                What kept you from reporting earlier? (optional)
              </label>
              <p id="delay-hint" className="text-base text-foreground">
                Nobody is judging you - this is very common. Telling us helps the officer
                understand the case and ask banks for older records.
              </p>
              <textarea
                id="delay-reason"
                rows={3}
                aria-describedby="delay-hint"
                value={report.delayReason}
                onChange={(e) => update({ delayReason: e.target.value })}
                className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
              />
            </div>
          ) : null}
        </fieldset>

        <div className="mt-10">
          <label htmlFor="details" className="block text-lg font-semibold text-navy">
            Tell us in your own words what happened (optional)
          </label>
          <p id="details-hint" className="text-base text-muted-foreground">
            Even a few lines help. What was said to you, what you clicked, what you were promised - 
            this is often what lets an officer link your case to others.
          </p>
          <textarea
            id="details"
            rows={5}
            aria-describedby="details-hint"
            value={report.otherDescription}
            onChange={(e) => update({ otherDescription: e.target.value })}
            className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
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
