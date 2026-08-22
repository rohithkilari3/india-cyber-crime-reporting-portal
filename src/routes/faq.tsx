import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Help and frequently asked questions — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Answers to common questions about reporting cyber crime: what you need, what happens next, getting money back, anonymity and tracking your report.",
      },
      { property: "og:title", content: "Help and frequently asked questions" },
      {
        property: "og:description",
        content: "Plain answers about reporting cyber crime, evidence, refunds and tracking.",
      },
    ],
  }),
  component: Faq,
});

const groups = [
  {
    title: "Before you report",
    items: [
      {
        q: "What do I need to make a report?",
        a: "Your mobile number for the one-time password, and whatever details you already have — the transaction, the message, the profile, the screenshots. If something is missing you can still report; you can add details later.",
      },
      {
        q: "Can I report on behalf of someone else?",
        a: "Yes. Parents, children, carers or friends can report for a victim. Say whose account or device is involved when you describe what happened.",
      },
      {
        q: "Can I report anonymously?",
        a: "Yes, for threats, abuse and unlawful content. Anonymous reports cannot be tracked and the police cannot contact you for more information, so give contact details if you can.",
      },
      {
        q: "Is there any fee?",
        a: "No. Reporting here, calling 1930 and appealing to the Grievance Appellate Committee are all free.",
      },
    ],
  },
  {
    title: "Money and fraud",
    items: [
      {
        q: "Will I get my money back?",
        a: "Sometimes. If you report within the first few hours the money can often be held in the receiving account before it is withdrawn. This is why the helpline is the fastest route.",
      },
      {
        q: "Should I call 1930 or report online?",
        a: "Do both. Call 1930 straight away so the banks can be alerted, then complete the online report so there is a written record with your evidence.",
      },
      {
        q: "The fraud happened in another state. Where do I report?",
        a: "Report here from wherever you are. The report is routed to the police unit with jurisdiction — you do not need to work that out.",
      },
    ],
  },
  {
    title: "After you report",
    items: [
      {
        q: "What is my acknowledgement number for?",
        a: "It identifies your report. Keep it safe — you need it to check progress on the Check my report page and to speak to the police unit handling your case.",
      },
      {
        q: "How long does it take?",
        a: "Banks are alerted within hours. Investigation timelines depend on the case; you will be contacted by the handling unit if more information is needed.",
      },
      {
        q: "I lost my acknowledgement number.",
        a: "Contact the helpline on 1930 with the mobile number you used, or use the feedback form and we will help you recover it.",
      },
    ],
  },
];

function Faq() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <HelpCircle className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Help and frequently asked questions</h1>
        <p className="mt-3 text-base text-muted-foreground">
          If your question is not answered here, call 1930 or{" "}
          <Link to="/contact" className="font-semibold text-brand-blue underline">
            contact us
          </Link>
          .
        </p>
      </div>

      <div className="mt-8 max-w-3xl space-y-10">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="text-2xl font-bold text-navy">{g.title}</h2>
            <div className="mt-4 space-y-3">
              {g.items.map((it) => (
                <details key={it.q} className="rounded-sm border-2 border-border p-5">
                  <summary className="cursor-pointer text-lg font-semibold text-navy">
                    {it.q}
                  </summary>
                  <p className="mt-3 text-base text-muted-foreground">{it.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
}
