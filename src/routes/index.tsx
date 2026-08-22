import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  ShieldAlert,
  Search,
  HelpCircle,
  ChevronRight,
  UserSearch,
  Megaphone,
  Scale,
  HandHeart,
  BookOpen,
  FileClock,
  Phone,
  Sparkles,
} from "lucide-react";
import { Page } from "@/components/site/Page";
import { HomeBanner } from "@/components/site/HomeBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Report cyber crime or online fraud — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Tell us what happened in plain language. Report stolen money, threats or harassment, report a suspect to I4C, appeal to the GAC, or learn how to stay safe online.",
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

const triage = [
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

const services = [
  {
    to: "/report-suspect" as const,
    icon: UserSearch,
    title: "Report a suspect to I4C",
    detail: "Flag a number, account or website used for cyber crime, even if you were not the victim.",
  },
  {
    to: "/report-abuse-social-media" as const,
    icon: Megaphone,
    title: "Report abuse to social media",
    detail: "Get content removed by Facebook, Instagram, X, YouTube, WhatsApp or Telegram.",
  },
  {
    to: "/gac-appeal" as const,
    icon: Scale,
    title: "File an appeal with the GAC",
    detail: "A platform refused to act? Appeal to the Grievance Appellate Committee, free.",
  },
  {
    to: "/cyber-volunteers" as const,
    icon: HandHeart,
    title: "Cyber volunteers",
    detail: "Flag unlawful content, spread awareness locally, or offer your technical skills.",
  },
  {
    to: "/learning-corner" as const,
    icon: BookOpen,
    title: "Learning corner",
    detail: "Simple safety guides for children, parents, students and senior citizens.",
  },
  {
    to: "/track" as const,
    icon: FileClock,
    title: "Check my report",
    detail: "See what has happened with a report you already made, using your acknowledgement number.",
  },
  {
    to: "/faq" as const,
    icon: HelpCircle,
    title: "Questions and answers",
    detail: "What to prepare, what happens to your money, and how long things take.",
  },
  {
    to: "/advisories" as const,
    icon: AlertTriangle,
    title: "Advisories",
    detail: "Current warnings about scams spreading across India right now.",
  },
  {
    to: "/nodal-officers" as const,
    icon: Users,
    title: "State nodal officers",
    detail: "Who to contact in your state if a report needs to be escalated.",
  },
  {
    to: "/feedback" as const,
    icon: MessageSquare,
    title: "Give feedback",
    detail: "Tell us what was confusing so we can fix it for the next person.",
  },
  {
    to: "/contact" as const,
    icon: Phone,
    title: "Contact us",
    detail: "Helpline 1930, email support, and I4C contact details.",
  },
];


const whatsNew = [
  {
    date: "18 Aug 2026",
    title: "Digital arrest scams: what to do if a “police officer” video calls you",
    detail: "No agency in India arrests anyone over a video call. Cut the call and report it here.",
  },
  {
    date: "05 Aug 2026",
    title: "Cyber volunteer registration is open in all states",
    detail: "Sign up as an unlawful content flagger, awareness promoter or cyber expert.",
  },
  {
    date: "22 Jul 2026",
    title: "Reporting a fraud now takes under five minutes",
    detail: "The financial fraud form has been rewritten in plain language with fewer questions.",
  },
  {
    date: "10 Jul 2026",
    title: "Beware of fake loan apps",
    detail: "Check the RBI list before installing any lending app that asks for your contacts.",
  },
];

function Index() {
  return (
    <>
      <HomeBanner />
      <Page width="wide">
        <section className="max-w-3xl">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">What happened?</h2>
          <p className="mt-3 text-lg text-foreground">
            Choose the option closest to your situation — you don&apos;t need to know any legal or
            technical terms.
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

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {triage.map((o) => (
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

        {/* What's new */}
        <section className="mt-14" aria-labelledby="whats-new">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-brand-blue" aria-hidden="true" />
            <h2 id="whats-new" className="text-2xl font-bold text-navy">
              What&apos;s new
            </h2>
          </div>
          <ul className="mt-4 divide-y rounded-sm border-2 border-border">
            {whatsNew.map((n) => (
              <li key={n.title} className="p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {n.date}
                </p>
                <h3 className="mt-1 text-lg font-bold text-navy">{n.title}</h3>
                <p className="mt-1 text-base text-muted-foreground">{n.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* All services */}
        <section className="mt-14" aria-labelledby="all-services">
          <h2 id="all-services" className="text-2xl font-bold text-navy">
            Everything else you can do here
          </h2>
          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.title}>
                <Link
                  to={s.to}
                  className="flex h-full flex-col gap-2 rounded-sm border-2 border-border bg-background p-5 hover:bg-surface-grey"
                >
                  <s.icon className="size-7 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
                  <span className="text-lg font-bold text-navy">{s.title}</span>
                  <span className="text-base text-muted-foreground">{s.detail}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 max-w-3xl">
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
              <p>Please give accurate information so your case can be investigated properly.</p>
            </div>
          </details>
        </section>
      </Page>
    </>
  );
}
