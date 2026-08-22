import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, ShieldAlert, Search, HelpCircle, ChevronRight } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Report cyber crime or online fraud — Cyber Crime Help" },
      {
        name: "description",
        content:
          "Tell us what happened in plain language. Report stolen money, threats or harassment, or check a suspicious number, link or UPI ID.",
      },
      { property: "og:title", content: "Report cyber crime or online fraud" },
      {
        property: "og:description",
        content:
          "Tell us what happened in plain language. Report stolen money, threats or harassment, or check a suspicious number.",
      },
    ],
  }),
  component: Index,
});

const options = [
  {
    to: "/report/financial/what-happened" as const,
    icon: Banknote,
    title: "Money was stolen from me",
    detail: "Money left your bank account, card, wallet or UPI. Report this first — speed matters.",
    urgent: true,
  },
  {
    to: "/report/safety" as const,
    icon: ShieldAlert,
    title: "Someone is threatening or harassing me or my child",
    detail: "Blackmail, abuse, stalking, or images shared without consent. You can report anonymously.",
  },
  {
    to: "/check-suspect" as const,
    icon: Search,
    title: "I want to check a suspicious number or link",
    detail: "Check a phone number, UPI ID, bank account, email or social media account before you act.",
  },
  {
    to: "/report/safety" as const,
    icon: HelpCircle,
    title: "I'm not sure what happened",
    detail: "Tell us in your own words. We'll work out the category for you.",
  },
];

function Index() {
  return (
    <Page width="wide">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold text-navy sm:text-5xl">What happened?</h1>
        <p className="mt-4 text-lg text-foreground">
          We&apos;re here to help. Choose the option closest to your situation — you don&apos;t
          need to know any legal or technical terms.
        </p>
        <p className="mt-3 text-base text-muted-foreground">
          If money has just been taken, call{" "}
          <a href="tel:1930" className="font-semibold text-brand-blue underline">
            1930
          </a>{" "}
          while you fill this in. Reporting within the first few hours gives the best chance of
          getting the money back.
        </p>
      </section>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {options.map((o) => (
          <li key={o.title}>
            <Link
              to={o.to}
              className={`flex h-full min-h-40 flex-col gap-3 rounded-sm border-2 bg-background p-6 transition-colors hover:bg-surface-grey ${
                o.urgent ? "border-brand-blue" : "border-border"
              }`}
            >
              <o.icon className="size-9 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
              <span className="text-xl font-bold text-navy">{o.title}</span>
              <span className="text-base text-muted-foreground">{o.detail}</span>
              <span className="mt-auto inline-flex items-center gap-1 font-semibold text-brand-blue">
                Start
                <ChevronRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold text-navy">Already reported something?</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/track"
            className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-surface-grey"
          >
            Track your report
          </Link>
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <details className="rounded-sm border bg-surface-grey p-5">
          <summary className="cursor-pointer text-lg font-semibold text-navy">
            What happens after you report
          </summary>
          <div className="mt-3 space-y-3 text-base text-muted-foreground">
            <p>
              Your report goes to the police unit for the area where the crime happened. You get an
              acknowledgement number straight away so you can follow it up.
            </p>
            <p>
              For financial fraud, your bank and the receiving bank are alerted so the money can be
              held where possible.
            </p>
          </div>
        </details>
        <details className="mt-3 rounded-sm border bg-surface-grey p-5">
          <summary className="cursor-pointer text-lg font-semibold text-navy">
            About this service and your information
          </summary>
          <div className="mt-3 space-y-3 text-base text-muted-foreground">
            <p>
              This is the official national service for reporting cyber crime. What you tell us is
              used to investigate your case and is shared only with the authorities handling it.
            </p>
            <p>
              Please give accurate information so your case can be investigated properly.
            </p>
          </div>
        </details>
      </section>
    </Page>
  );
}
