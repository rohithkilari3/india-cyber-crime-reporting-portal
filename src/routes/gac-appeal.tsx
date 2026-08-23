import { createFileRoute } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/gac-appeal")({
  head: () => ({
    meta: [
      { title: "File an appeal with the GAC - National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "If a social media platform refused to act on your complaint, you can appeal to the Grievance Appellate Committee within 30 days. Here is how.",
      },
      { property: "og:title", content: "File an appeal with the GAC" },
      {
        property: "og:description",
        content: "Appeal a social media platform's decision to the Grievance Appellate Committee.",
      },
    ],
  }),
  component: GacAppeal,
});

const steps = [
  {
    title: "Complain to the platform first",
    body: "The platform's Grievance Officer must answer you. Keep the ticket number or the email they send.",
  },
  {
    title: "Wait for their decision or 15 days",
    body: "If they reply and you disagree - or they say nothing in 15 days - you can appeal.",
  },
  {
    title: "Appeal within 30 days",
    body: "Your appeal must be filed within 30 days of the platform's decision, on the GAC portal.",
  },
  {
    title: "The committee decides in 30 days",
    body: "The Grievance Appellate Committee reviews it online and its decision is binding on the platform.",
  },
];

function GacAppeal() {
  return (
    <Page>
      <Scale className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
      <h1 className="mt-3 text-3xl font-bold text-navy">File an appeal with the GAC</h1>
      <p className="mt-3 text-base text-muted-foreground">
        The Grievance Appellate Committee (GAC) is a government body that can overrule a social
        media platform. Use it when a platform has refused to remove content or has taken down
        something of yours unfairly. It is free.
      </p>

      <ol className="mt-8 space-y-4">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4 rounded-sm border-2 border-border p-5">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-base font-bold text-navy-foreground"
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-lg font-bold text-navy">{s.title}</span>
              <span className="mt-1 block text-base text-muted-foreground">{s.body}</span>
            </span>
          </li>
        ))}
      </ol>

      <a
        href="https://gac.gov.in"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
      >
        Go to the GAC appeal portal
      </a>

      <details className="mt-8 rounded-sm border bg-surface-grey p-5">
        <summary className="cursor-pointer text-lg font-semibold text-navy">
          What you will need
        </summary>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground">
          <li>The complaint reference the platform gave you</li>
          <li>The link to the post, profile or video</li>
          <li>Screenshots of the content and of the platform&apos;s reply</li>
          <li>A short description, in your own words, of why the decision is wrong</li>
        </ul>
      </details>
    </Page>
  );
}
