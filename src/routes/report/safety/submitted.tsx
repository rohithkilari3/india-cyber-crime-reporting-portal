import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, Phone } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { SAFETY_STEPS } from "@/components/site/safety-steps";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety/submitted")({
  head: () => ({
    meta: [
      { title: "Report received - your acknowledgement number" },
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
            to="/report/safety/start"
            className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Report what happened
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <StepIndicator current={6} steps={SAFETY_STEPS} />
      <div className="flex items-center gap-3">
        <CheckCircle2 className="size-9 text-success" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-navy">We&apos;ve received your report</h1>
      </div>
      <p className="mt-3 text-base text-muted-foreground">
        Thank you for reporting. You did the right thing.
      </p>

      <div className="mt-8 rounded-sm border-2 border-success bg-success-tint p-6">
        <h2 className="text-lg font-semibold text-success">Your acknowledgement number</h2>
        <p className="mt-2 break-all text-3xl font-bold tracking-wide text-navy">{ack}</p>
        <p className="mt-2 text-base text-foreground">
          Write this down or take a screenshot.{" "}
          {report.anonymous
            ? "Because you reported anonymously, this number is the only way to refer to your case - we cannot send you updates or recover it if lost."
            : "You'll need it to check progress."}
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
        <h2 className="text-2xl font-bold text-navy">What happens next</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-foreground">
          <li>Your report goes to the cyber crime unit for your state.</li>
          <li>
            If the content is still online, a takedown request goes to the platform. Save the links
            - don&apos;t delete anything yourself yet.
          </li>
          {!report.anonymous ? (
            <li>An officer may call you from an official number to ask a few questions.</li>
          ) : null}
          <li>
            If you are in immediate danger, call{" "}
            <a href="tel:112" className="font-semibold text-brand-blue underline">
              112
            </a>
            . For women and children, help is also on{" "}
            <a href="tel:1098" className="font-semibold text-brand-blue underline">
              1098
            </a>
            .
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {!report.anonymous ? (
            <Link
              to="/track"
              className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
            >
              Go to my reports
            </Link>
          ) : null}
          <Link
            to="/"
            className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-6 font-semibold text-navy hover:bg-surface-grey"
          >
            Back to home
          </Link>
        </div>
      </section>

      <div className="mt-8 rounded-sm border-2 border-emergency bg-emergency-tint p-4">
        <p className="flex items-center gap-2 text-base font-semibold text-emergency">
          <Phone className="size-5" aria-hidden="true" />
          Emergency: call 112. Women and child helpline: call 1098.
        </p>
      </div>
    </Page>
  );
}
