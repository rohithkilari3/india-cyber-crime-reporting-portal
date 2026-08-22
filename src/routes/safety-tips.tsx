import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/safety-tips")({
  head: () => ({
    meta: [
      { title: "Online safety tips — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Practical online safety tips for your money, your phone, your accounts, social media and your family.",
      },
      { property: "og:title", content: "Online safety tips" },
      {
        property: "og:description",
        content: "Simple habits that stop most online fraud and abuse before it starts.",
      },
    ],
  }),
  component: SafetyTips,
});

const sections = [
  {
    title: "Your money",
    tips: [
      "Never share an OTP, PIN, CVV or UPI PIN. No bank, police officer or delivery agent will ever ask for one.",
      "You never need to enter a UPI PIN to receive money. If someone asks you to, it is a fraud.",
      "Set daily transaction limits in your bank app so a single mistake cannot empty your account.",
      "Keep SMS and email alerts switched on for every account.",
    ],
  },
  {
    title: "Your phone and computer",
    tips: [
      "Install apps only from the official app store, and check who published them.",
      "Never install screen-sharing or remote-control apps because someone on a call asked you to.",
      "Keep automatic updates on — most attacks use faults that were already fixed.",
      "Lock your device with a PIN or biometrics, and encrypt backups.",
    ],
  },
  {
    title: "Your accounts",
    tips: [
      "Turn on two-step verification for email, banking and social media.",
      "Use a different password for your email than for anything else — email resets everything else.",
      "Check the sender address, not the display name, before you click a link in a message.",
      "Review which apps and devices are signed in to your accounts every few months.",
    ],
  },
  {
    title: "Social media and family",
    tips: [
      "Keep children's accounts private and know which apps they use.",
      "Do not accept friend or video call requests from strangers, and never undress on a video call.",
      "Screenshot abusive messages before blocking — you will need them to report.",
      "Talk to an older relative about fraud calls before it happens, not after.",
    ],
  },
];

function SafetyTips() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <ShieldCheck className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Online safety tips</h1>
        <p className="mt-3 text-base text-muted-foreground">
          You do not need to be technical. These few habits prevent most of the cases reported here.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <section key={s.title} className="rounded-sm border-2 border-border p-6">
            <h2 className="text-xl font-bold text-navy">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground">
              {s.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Page>
  );
}
