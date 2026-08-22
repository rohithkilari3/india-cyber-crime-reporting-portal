import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/what-happened")({
  head: () => ({
    meta: [
      { title: "Tell us what happened — Report stolen money" },
      {
        name: "description",
        content:
          "Choose the plain-language description that fits best, or select 'I'm not sure'. No banking jargon required.",
      },
      { property: "og:title", content: "Tell us what happened — Report stolen money" },
      {
        property: "og:description",
        content: "Report money taken from your account in plain language. No banking jargon required.",
      },
    ],
  }),
  component: WhatHappened,
});

const choices = [
  { id: "account", label: "Money left my bank account", hint: "I did not authorise it" },
  { id: "tricked", label: "I was tricked into paying someone", hint: "A call, message or fake website" },
  { id: "card", label: "Someone used my debit or credit card", hint: "Online or at a machine" },
  { id: "upi", label: "My UPI or wallet was used", hint: "GPay, PhonePe, Paytm and similar" },
  { id: "unsure", label: "I'm not sure how it happened", hint: "We'll work it out — you don't need to know" },
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

function WhatHappened() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.whatHappened) {
      setError("Select the option closest to what happened, or choose “I'm not sure”.");
      document.getElementById("error-summary")?.focus();
      return;
    }
    setError("");
    navigate({ to: "/report/financial/suspect" });
  }

  return (
    <Page>
      <StepIndicator current={1} />
      <h1 className="text-3xl font-bold text-navy">Tell us what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Pick whatever is closest. You will not be penalised for choosing the wrong one — we sort
        out the exact category for you.
      </p>

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
          <legend className="text-lg font-semibold text-navy">
            Which of these is closest?
          </legend>
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
          <legend className="text-lg font-semibold text-navy">
            Where did this reach you?
          </legend>
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
          <div className="mt-4">
            <label htmlFor="platform-detail" className="block text-lg font-semibold text-navy">
              The number, link or app name, if you have it (optional)
            </label>
            <input
              id="platform-detail"
              value={report.platformDetail}
              onChange={(e) => update({ platformDetail: e.target.value })}
              className="mt-2 min-h-12 w-full max-w-lg rounded-sm border-2 border-input px-3 text-lg"
            />
          </div>
        </fieldset>

        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="amount" className="block text-lg font-semibold text-navy">
              How much money was taken?
            </label>
            <p id="amount-hint" className="text-base text-muted-foreground">
              An approximate amount in rupees is fine. Leave blank if you don&apos;t know.
            </p>
            <input
              id="amount"
              inputMode="numeric"
              aria-describedby="amount-hint"
              value={report.amount}
              onChange={(e) => update({ amount: e.target.value })}
              className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
            />
          </div>

          <div>
            <label htmlFor="when" className="block text-lg font-semibold text-navy">
              When did it happen?
            </label>
            <p id="when-hint" className="text-base text-muted-foreground">
              For example: “about an hour ago” or “yesterday evening”.
            </p>
            <input
              id="when"
              aria-describedby="when-hint"
              value={report.whenHappened}
              onChange={(e) => update({ whenHappened: e.target.value })}
              className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-lg font-semibold text-navy">
              Anything else you want to tell us? (optional)
            </label>
            <textarea
              id="details"
              rows={4}
              value={report.otherDescription}
              onChange={(e) => update({ otherDescription: e.target.value })}
              className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
            />
          </div>
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
