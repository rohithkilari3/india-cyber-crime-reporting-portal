import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, Phone } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/submitted")({
  head: () => ({
    meta: [
      { title: "Report received — your acknowledgement number" },
      {
        name: "description",
        content:
          "Your report has been received. Save your acknowledgement number and see what happens next.",
      },
      { property: "og:title", content: "Report received" },
      {
        property: "og:description",
        content: "Your report has been received. Save your acknowledgement number.",
      },
    ],
  }),
  component: Submitted,
});

function Submitted() {
  const { report } = useReportFlow();
  const [copied, setCopied] = useState(false);
  const ack = report.acknowledgement;

  async function copy() {
    try {
      await navigator.clipboard.writeText(ack);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (!ack) {
    return (
      <Page>
        <h1 className="text-3xl font-bold text-navy">No report to show</h1>
        <p className="mt-3 text-base text-muted-foreground">
          This page shows your acknowledgement number right after you submit a report.
        </p>
        <p className="mt-6">
          <Link
            to="/report/financial/what-happened"
            className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Start a report
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <StepIndicator current={4} />
      <div className="flex items-center gap-3">
        <CheckCircle2 className="size-9 text-success" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-navy">We&apos;ve received your report</h1>
      </div>
      <p className="mt-3 text-base text-muted-foreground">
        Thank you. You did the right thing by reporting quickly.
      </p>

      <div className="mt-8 rounded-sm border-2 border-success bg-success-tint p-6">
        <h2 className="text-lg font-semibold text-success">Your acknowledgement number</h2>
        <p className="mt-2 break-all text-3xl font-bold tracking-wide text-navy">{ack}</p>
        <p className="mt-2 text-base text-foreground">
          Write this down or take a screenshot. You&apos;ll need it to check progress.
        </p>
        <button
          type="button"
          onClick={copy}
          className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy bg-background px-5 font-semibold text-navy"
        >
          <Copy className="size-5" aria-hidden="true" />
          Copy number
        </button>
        <span aria-live="polite" className="ml-3 text-base font-semibold text-success">
          {copied ? "Copied" : ""}
        </span>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-navy">Do these two things now</h2>
        <ol className="mt-4 space-y-4">
          <li className="rounded-sm border-2 border-emergency bg-emergency-tint p-4">
            <p className="text-lg font-bold text-emergency">1. Call 1930</p>
            <p className="mt-1 text-base text-foreground">
              The helpline can ask banks to hold the money while it is still moving.
            </p>
            <a
              href="tel:1930"
              className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-emergency bg-background px-5 font-bold text-emergency"
            >
              <Phone className="size-5" aria-hidden="true" />
              Call 1930 now
            </a>
          </li>
          <li className="rounded-sm border p-4">
            <p className="text-lg font-bold text-navy">2. Tell your bank</p>
            <p className="mt-1 text-base text-muted-foreground">
              Ask them to block the card or account used, and quote your acknowledgement number.
            </p>
          </li>
        </ol>
      </section>

      <section className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-bold text-navy">What happens next</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-muted-foreground">
          <li>Your report goes to the police unit for the area where the fraud happened.</li>
          <li>You&apos;ll get an SMS if an officer needs anything more from you.</li>
          <li>You can check progress any time using your acknowledgement number.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/track"
            className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Track this report
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-6 font-semibold text-navy hover:bg-surface-grey"
          >
            Back to home
          </Link>
        </div>
      </section>
    </Page>
  );
}
