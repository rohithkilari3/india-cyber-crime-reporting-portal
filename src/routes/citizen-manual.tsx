import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/citizen-manual")({
  head: () => ({
    meta: [
      { title: "Citizen manual — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "A step-by-step guide to using this portal: what each kind of report covers, what you need, how to add evidence, and how to check progress.",
      },
      { property: "og:title", content: "Citizen manual" },
      {
        property: "og:description",
        content: "How to use the portal, step by step, in plain language.",
      },
    ],
  }),
  component: CitizenManual,
});

const steps = [
  {
    title: "1. Choose what happened",
    body: "On the home page, pick the option closest to your situation. If none fits, choose “I'm not sure” and describe it in your own words.",
  },
  {
    title: "2. Tell us the story",
    body: "Write what happened in ordinary language, including dates, amounts and any names or numbers you have. Nothing is rejected for wording.",
  },
  {
    title: "3. Add evidence",
    body: "Attach screenshots, transaction receipts, message exports or call recordings. You can drag files in or choose them from your device. Add more later if needed.",
  },
  {
    title: "4. Verify your mobile number",
    body: "We send a one-time password to your mobile so we can contact you about the case. Anonymous reporting is available for threats and abuse.",
  },
  {
    title: "5. Get your acknowledgement number",
    body: "Save or copy the number shown at the end. It is how you and the police identify your report.",
  },
  {
    title: "6. Check progress",
    body: "Use Check my report with your acknowledgement number at any time. The handling unit will contact you if they need more.",
  },
];

function CitizenManual() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <BookMarked className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Citizen manual</h1>
        <p className="mt-3 text-base text-muted-foreground">
          This describes what the portal does and how to use it, from start to finish.
        </p>
      </div>

      <ol className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.title} className="rounded-sm border-2 border-border p-6">
            <h2 className="text-xl font-bold text-navy">{s.title}</h2>
            <p className="mt-2 text-base text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 max-w-4xl rounded-sm border-2 border-navy bg-surface-grey p-6">
        <h2 className="text-2xl font-bold text-navy">Kinds of report this portal accepts</h2>
        <ul className="mt-3 space-y-2 text-base text-muted-foreground">
          <li>
            <span className="font-semibold text-navy">Financial fraud</span> — money taken from a
            bank account, card, wallet or UPI.{" "}
            <Link to="/report/financial/verify" className="text-brand-blue underline">
              Report it
            </Link>
            .
          </li>
          <li>
            <span className="font-semibold text-navy">Threats, abuse and harassment</span> —
            including crimes against women and children.{" "}
            <Link to="/report/safety" className="text-brand-blue underline">
              Report it
            </Link>
            .
          </li>
          <li>
            <span className="font-semibold text-navy">Suspect information</span> — flag a number,
            account or website to I4C even if you were not the victim.{" "}
            <Link to="/report-suspect" className="text-brand-blue underline">
              Report a suspect
            </Link>
            .
          </li>
        </ul>
      </section>
    </Page>
  );
}
