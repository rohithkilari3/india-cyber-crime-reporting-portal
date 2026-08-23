import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, Info } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/suspect")({
  head: () => ({
    meta: [
      { title: "Who contacted you? — Report stolen money" },
      {
        name: "description",
        content:
          "Share the phone number, UPI ID, bank account or profile the other person used. One detail is enough to link your case to others.",
      },
      { property: "og:title", content: "Who contacted you?" },
      {
        property: "og:description",
        content: "One detail about the other person is often what solves the case.",
      },
    ],
  }),
  component: SuspectStep,
});

const contactKinds = [
  { id: "mobile", label: "A phone number", hint: "The number that called or messaged you" },
  { id: "upi", label: "A UPI ID", hint: "For example name@bank" },
  { id: "bank", label: "A bank account number", hint: "Where your money went" },
  { id: "profile", label: "A social media or WhatsApp profile", hint: "Username, link or display name" },
  { id: "website", label: "A website or app", hint: "Paste the link if you still have it" },
  { id: "none", label: "I don't have any of these", hint: "That's fine — we can still take your report" },
];

function SuspectStep() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");
  const needsValue = report.suspectKind && report.suspectKind !== "none";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.suspectKind) {
      setError(
        "Choose one option. If you genuinely have nothing, pick “I don't have any of these”.",
      );
      document.getElementById("suspect-error")?.focus();
      return;
    }
    if (needsValue && !report.suspectValue.trim()) {
      setError("Write the detail you chose, or switch to “I don't have any of these”.");
      document.getElementById("suspect-error")?.focus();
      return;
    }
    setError("");
    navigate({ to: "/report/financial/evidence" });
  }

  return (
    <Page>
      <StepIndicator current={4} />
      <h1 className="text-3xl font-bold text-navy">Do you know who contacted you?</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Any single detail helps investigators link your case to others and block the account. If
        you truly don&apos;t have anything, choose the last option and carry on.
      </p>

      <div className="mt-6 flex gap-3 rounded-sm border-2 border-border bg-surface-grey p-4">
        <Info className="size-5 shrink-0 text-brand-blue" aria-hidden="true" />
        <p className="text-base text-muted-foreground">
          Only add what you actually saw. You will never be blamed for not knowing who did this.
        </p>
      </div>

      {error ? (
        <div
          id="suspect-error"
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form className="mt-8" onSubmit={onSubmit}>
        <fieldset>
          <legend className="text-lg font-semibold text-navy">
            What detail do you have about them?
          </legend>
          <div className="mt-4 space-y-3">
            {contactKinds.map((k) => (
              <label
                key={k.id}
                className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.suspectKind === k.id ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="suspectKind"
                  value={k.id}
                  checked={report.suspectKind === k.id}
                  onChange={() => update({ suspectKind: k.id })}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span>
                  <span className="block text-lg font-semibold text-foreground">{k.label}</span>
                  <span className="block text-base text-muted-foreground">{k.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {needsValue ? (
          <div className="mt-8">
            <label htmlFor="suspect-value" className="block text-lg font-semibold text-navy">
              Write it here exactly as you saw it
            </label>
            <p id="suspect-value-hint" className="text-base text-muted-foreground">
              Copy and paste is fine. Don&apos;t worry about the format.
            </p>
            <input
              id="suspect-value"
              aria-describedby="suspect-value-hint"
              value={report.suspectValue}
              onChange={(e) => update({ suspectValue: e.target.value })}
              className="mt-2 min-h-12 w-full max-w-lg rounded-sm border-2 border-input px-3 text-lg"
            />
          </div>
        ) : null}

        <section className="mt-8 rounded-sm border-2 border-border p-5">
          <h2 className="text-xl font-bold text-navy">Where your money landed (optional)</h2>
          <p className="mt-2 text-base text-muted-foreground">
            If your bank SMS or payment app shows the receiver, copy it here. This is what lets a
            bank freeze the other account.
          </p>
          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="suspect-bank" className="block text-lg font-semibold text-navy">
                Receiver&apos;s bank, wallet or merchant name
              </label>
              <input
                id="suspect-bank"
                value={report.suspectBank}
                onChange={(e) => update({ suspectBank: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <div>
              <label htmlFor="suspect-account" className="block text-lg font-semibold text-navy">
                Receiver&apos;s account number or UPI ID
              </label>
              <input
                id="suspect-account"
                value={report.suspectAccount}
                onChange={(e) => update({ suspectAccount: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
          </div>
        </section>

        <div className="mt-8">
          <label htmlFor="suspect-notes" className="block text-lg font-semibold text-navy">
            Anything else about them? (optional)
          </label>
          <p id="suspect-notes-hint" className="text-base text-muted-foreground">
            What they said, the name they used, or how they reached you.
          </p>
          <textarea
            id="suspect-notes"
            rows={4}
            aria-describedby="suspect-notes-hint"
            value={report.suspectNotes}
            onChange={(e) => update({ suspectNotes: e.target.value })}
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
          <Link to="/report/financial/money" className="font-semibold text-brand-blue underline">
            Back to money and payments
          </Link>
        </div>
      </form>
    </Page>
  );
}
