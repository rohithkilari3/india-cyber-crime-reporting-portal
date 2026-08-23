import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/advisories")({
  head: () => ({
    meta: [
      { title: "Advisories - National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Current advisories from the Indian Cyber Crime Coordination Centre on digital arrest scams, fake loan apps, investment fraud and more.",
      },
      { property: "og:title", content: "Cyber crime advisories" },
      {
        property: "og:description",
        content: "What the current scams look like and exactly what to do about them.",
      },
    ],
  }),
  component: Advisories,
});

const advisories = [
  {
    date: "12 Aug 2026",
    title: "“Digital arrest” video calls",
    what: "Callers in police or courier uniforms video call and say a parcel or bank account in your name is linked to a crime. They keep you on the call for hours and demand a transfer to a “verification account”.",
    do: "No agency in India arrests anyone over a video call, and none asks for money to clear your name. End the call, tell a family member, and report here.",
  },
  {
    date: "30 Jul 2026",
    title: "Fake loan apps",
    what: "Apps offer instant loans, then take your contacts and photos and threaten to send edited images to everyone you know.",
    do: "Only use lenders on the Reserve Bank of India list. If you are being blackmailed, keep the messages and report it - you are the victim, not the offender.",
  },
  {
    date: "18 Jul 2026",
    title: "Investment and trading groups",
    what: "WhatsApp or Telegram groups show fake profits and a smart-looking app. Withdrawals are blocked until you pay a further “tax” or “fee”.",
    do: "Check the SEBI register before investing. Any platform that asks for a fee before releasing your own money is a fraud.",
  },
  {
    date: "02 Jul 2026",
    title: "Customer care numbers found on search engines",
    what: "Fraudsters buy search adverts for bank, wallet and airline helplines and ask you to install a screen-sharing app.",
    do: "Take helpline numbers only from the official app or the back of your card. Never install a screen-sharing app at a stranger's request.",
  },
];

function Advisories() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <AlertTriangle className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Advisories</h1>
        <p className="mt-3 text-base text-muted-foreground">
          The scams that are most active right now, written plainly, with the one thing you should do
          in each case.
        </p>
      </div>

      <ul className="mt-8 grid max-w-4xl gap-4">
        {advisories.map((a) => (
          <li key={a.title} className="rounded-sm border-2 border-border p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {a.date}
            </p>
            <h2 className="mt-1 text-xl font-bold text-navy">{a.title}</h2>
            <p className="mt-3 text-base text-muted-foreground">
              <span className="font-semibold text-navy">What happens: </span>
              {a.what}
            </p>
            <p className="mt-2 text-base text-muted-foreground">
              <span className="font-semibold text-navy">What to do: </span>
              {a.do}
            </p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
