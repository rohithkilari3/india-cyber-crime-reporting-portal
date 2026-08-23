import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Megaphone } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/report-abuse-social-media")({
  head: () => ({
    meta: [
      { title: "Report abuse to a social media platform -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Step-by-step help to report abusive posts, fake profiles or leaked images directly to Facebook, Instagram, X, YouTube, WhatsApp and Telegram.",
      },
      { property: "og:title", content: "Report abuse to a social media platform" },
      {
        property: "og:description",
        content: "Direct reporting links and plain-language steps for each major platform.",
      },
    ],
  }),
  component: ReportAbuse,
});

const platforms = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/help/263149623790594",
    what: "Fake profiles, abusive posts, impersonation.",
  },
  {
    name: "Instagram",
    href: "https://help.instagram.com/165828726894770",
    what: "Harassing accounts, private photos shared without consent.",
  },
  {
    name: "X (Twitter)",
    href: "https://help.twitter.com/en/safety-and-security/report-abusive-behavior",
    what: "Threats, abuse, doxxing.",
  },
  {
    name: "YouTube",
    href: "https://support.google.com/youtube/answer/2802027",
    what: "Videos that harass you or share your private information.",
  },
  {
    name: "WhatsApp",
    href: "https://faq.whatsapp.com/1142481766359885",
    what: "Blackmail messages, scam numbers, unwanted groups.",
  },
  {
    name: "Telegram",
    href: "https://telegram.org/faq#q-there-39s-illegal-content-on-telegram-how-do-i-take-it-down",
    what: "Channels sharing your images or scam offers.",
  },
];

function ReportAbuse() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <Megaphone className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">
          Report abuse to a social media platform
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Reporting to the platform gets content taken down fastest. It is separate from reporting
          to the police -  you can and should do both.
        </p>
        <div className="mt-4 rounded-sm border-2 border-caution bg-caution-tint p-4 text-base">
          <p className="font-semibold text-navy">Before you report, take screenshots.</p>
          <p className="mt-1">
            Once the platform removes the content, you may not be able to get it back as evidence.
          </p>
        </div>
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full min-h-36 flex-col gap-2 rounded-sm border-2 border-border bg-background p-5 hover:bg-surface-grey"
            >
              <span className="text-xl font-bold text-navy">{p.name}</span>
              <span className="text-base text-muted-foreground">{p.what}</span>
              <span className="mt-auto inline-flex items-center gap-1 font-semibold text-brand-blue">
                Open reporting page
                <ExternalLink className="size-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <section className="mt-10 max-w-3xl border-t pt-8">
        <h2 className="text-2xl font-bold text-navy">If the platform does not act</h2>
        <p className="mt-3 text-base text-muted-foreground">
          You can challenge the decision with the Grievance Appellate Committee.
        </p>
        <Link
          to="/gac-appeal"
          className="mt-4 inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-surface-grey"
        >
          File an appeal with GAC
        </Link>
      </section>
    </Page>
  );
}
