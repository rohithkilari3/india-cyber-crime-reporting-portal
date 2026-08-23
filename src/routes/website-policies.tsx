import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/website-policies")({
  head: () => ({
    meta: [
      { title: "Website policies, privacy and disclaimer -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Website policy, privacy policy, disclaimer, copyright, hyperlinking and accessibility statement for the National Cyber Crime Reporting Portal.",
      },
      { property: "og:title", content: "Website policies, privacy and disclaimer" },
      {
        property: "og:description",
        content: "How this site handles your data, what it does not promise, and how to reuse it.",
      },
    ],
  }),
  component: WebsitePolicies,
});

const sections = [
  {
    id: "website-policy",
    title: "Website policy",
    body: [
      "This portal is owned by the Ministry of Home Affairs and operated by the Indian Cyber Crime Coordination Centre (I4C). Content is reviewed by the ministry and by state and union territory police.",
      "External links are provided for convenience. We are not responsible for the content, availability or privacy practices of external sites, and a link is not an endorsement.",
      "Material on this site may be reproduced free of charge in any format provided it is reproduced accurately, is not used in a misleading context, and the source is acknowledged.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy policy",
    body: [
      "We collect only what is needed to act on your report: what happened, evidence you choose to attach, and a way to contact you. You are never asked for a password, a full card number, a CVV or an OTP.",
      "Your report is shared with the police unit with jurisdiction over the incident, and with banks or intermediaries where that is necessary to freeze funds or take content down.",
      "We do not sell or trade personal data. Site analytics are aggregated and do not identify you. Cookies are used only to keep your session and your accessibility settings, such as text size and high contrast.",
      "Reports of threats and abuse may be filed anonymously. If you do, we cannot contact you for more detail, which may limit what police can do.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: [
      "Information on this site is for general guidance and does not constitute legal advice. Where content conflicts with an Act, rule or notification, the official text prevails.",
      "Reporting here does not by itself register an FIR. Police may contact you to complete formalities. In an emergency, call 112, and for financial fraud call 1930 immediately.",
      "This is a redesign prototype. Submissions made here are not received by any police unit.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility statement",
    body: [
      "We aim to meet WCAG 2.1 level AA and the Guidelines for Indian Government Websites. Every page can be used with a keyboard alone, works with screen readers, and offers four text sizes plus a high contrast mode from the header.",
      "If you meet a barrier on any page, tell us through the feedback form and describe the page and what happened.",
    ],
  },
  {
    id: "screen-reader",
    title: "Screen reader access",
    body: [
      "This portal is tested with common screen readers. NVDA is a free, open source screen reader for Windows and can be downloaded from nvaccess.org. JAWS, VoiceOver on Apple devices and TalkBack on Android are also supported.",
    ],
  },
];

function WebsitePolicies() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <ScrollText className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Website policies</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Website policy, privacy, disclaimer, accessibility and screen reader information, in one
          place.
        </p>
      </div>

      <nav aria-label="On this page" className="mt-8 max-w-3xl rounded-sm border-2 border-border p-5">
        <h2 className="text-base font-bold text-navy">On this page</h2>
        <ul className="mt-2 space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-base text-brand-blue underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 max-w-3xl space-y-10">
        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-8">
            <h2 id={`${s.id}-h`} className="text-2xl font-bold text-navy">
              {s.title}
            </h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 text-base text-muted-foreground">
                {p}
              </p>
            ))}
            {s.id === "screen-reader" ? (
              <a
                href="https://www.nvaccess.org/download/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-4 font-semibold text-navy hover:bg-surface-grey"
              >
                Download NVDA screen reader
              </a>
            ) : null}
          </section>
        ))}
      </div>
    </Page>
  );
}
