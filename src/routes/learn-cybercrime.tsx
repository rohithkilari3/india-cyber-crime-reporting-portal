import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Banknote, HelpCircle, ImageOff, Search, ShieldAlert } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/learn-cybercrime")({
  head: () => ({
    meta: [
      { title: "What kind of cyber crime is this? — plain-language guide" },
      {
        name: "description",
        content:
          "Search cyber crime types in plain language, grouped by money, harassment and content. Every term is explained in one sentence.",
      },
      { property: "og:title", content: "What kind of cyber crime is this?" },
      {
        property: "og:description",
        content: "Plain-language explanations of cyber crime types, grouped by what actually happened.",
      },
    ],
  }),
  component: LearnCybercrime,
});

type Item = { term: string; plain: string; group: "money" | "harassment" | "content" };

const items: Item[] = [
  { term: "UPI or wallet fraud", plain: "Someone took money through GPay, PhonePe, Paytm or a similar app.", group: "money" },
  { term: "Card fraud (skimming, cloning)", plain: "Your debit or credit card was used without you.", group: "money" },
  { term: "AEPS / Aadhaar-linked withdrawal", plain: "Money was taken from your bank using your fingerprint or Aadhaar number.", group: "money" },
  { term: "SIM swap", plain: "Someone got a new SIM for your number, then took your OTPs.", group: "money" },
  { term: "Phishing / vishing / smishing", plain: "A fake email, call or SMS tricked you into sharing a code or password.", group: "money" },
  { term: "Fake investment or trading app", plain: "You were promised big returns and the money never came back.", group: "money" },
  { term: "Loan app harassment", plain: "A lending app took your contacts and is threatening you or your family.", group: "money" },
  { term: "Job or task scam", plain: "You paid for a job, or did paid 'tasks' and then lost your deposit.", group: "money" },
  { term: "Digital arrest", plain: "Someone posing as police or CBI kept you on a video call and demanded money.", group: "money" },
  { term: "Demat or depository fraud", plain: "Your share trading account was used without you.", group: "money" },
  { term: "Business email compromise", plain: "A fake email from a 'supplier' or 'boss' got a payment sent to the wrong account.", group: "money" },
  { term: "Cyber stalking", plain: "Someone keeps contacting, following or watching you online.", group: "harassment" },
  { term: "Sextortion", plain: "Someone is threatening to share intimate photos or video unless you pay.", group: "harassment" },
  { term: "Online harassment or abuse", plain: "Repeated insults, threats or abuse aimed at you or your child.", group: "harassment" },
  { term: "Impersonation / fake profile", plain: "Someone made an account pretending to be you.", group: "harassment" },
  { term: "Doxxing", plain: "Your address, number or private details were posted publicly.", group: "harassment" },
  { term: "Child sexual abuse material (CSEAM)", plain: "Sexual images or video involving a child. Report this immediately.", group: "harassment" },
  { term: "Images shared without consent", plain: "Private photos or video of you were shared without your permission.", group: "harassment" },
  { term: "Deepfake or morphed content", plain: "Your face or voice was used in a fake photo, video or audio.", group: "content" },
  { term: "Fake news or rumour", plain: "False information being spread that could cause harm.", group: "content" },
  { term: "Hacking of an account or device", plain: "Someone got into your email, social media, phone or computer.", group: "content" },
  { term: "Ransomware", plain: "Your files were locked and money is being demanded to unlock them.", group: "content" },
  { term: "Cryptojacking", plain: "Your device is secretly being used to mine cryptocurrency for someone else.", group: "content" },
  { term: "Cyber squatting / fake website", plain: "A website copies a real brand's name to fool people.", group: "content" },
  { term: "Pharming", plain: "You typed the right web address but were sent to a fake copy of the site.", group: "content" },
  { term: "Data breach", plain: "Personal data held by a company was leaked or stolen.", group: "content" },
];

const groups = [
  { id: "money", label: "Money was taken", icon: Banknote, to: "/report/financial/verify" as const, cta: "Report stolen money" },
  { id: "harassment", label: "Someone is threatening or harassing", icon: ShieldAlert, to: "/report/safety" as const, cta: "Report threats or abuse" },
  { id: "content", label: "Accounts, devices and fake content", icon: ImageOff, to: "/report-suspect" as const, cta: "Report this to I4C" },
] as const;

function LearnCybercrime() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.term} ${i.plain}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">What kind of cyber crime is this?</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You do <strong>not</strong> need to know the right term to report something. This page is
        here only if you want to understand what happened, in ordinary words.
      </p>

      <div className="mt-6 rounded-sm border-2 border-brand-blue bg-surface-grey p-5">
        <p className="flex items-start gap-2 text-base">
          <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
          <span>
            Not sure which one fits?{" "}
            <Link
              to="/report/financial/verify"
              className="font-semibold text-brand-blue underline"
            >
              Start a report anyway
            </Link>{" "}
            — there is an &ldquo;I&apos;m not sure&rdquo; option on every question.
          </span>
        </p>
      </div>

      <div className="mt-8">
        <label htmlFor="q" className="block text-lg font-semibold text-navy">
          Search in your own words
        </label>
        <p id="q-hint" className="text-base text-muted-foreground">
          Try &ldquo;fake police call&rdquo;, &ldquo;photos&rdquo; or &ldquo;loan app&rdquo;.
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-sm border-2 border-input px-3">
          <Search className="size-5 text-muted-foreground" aria-hidden="true" />
          <input
            id="q"
            aria-describedby="q-hint"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-12 w-full bg-transparent text-lg outline-none"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-10 space-y-10">
        {groups.map((g) => {
          const list = filtered.filter((i) => i.group === g.id);
          if (list.length === 0) return null;
          return (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <div className="flex items-center gap-2">
                <g.icon className="size-6 text-brand-blue" aria-hidden="true" />
                <h2 id={`group-${g.id}`} className="text-2xl font-bold text-navy">
                  {g.label}
                </h2>
              </div>
              <ul className="mt-4 divide-y rounded-sm border-2 border-border">
                {list.map((i) => (
                  <li key={i.term} className="p-4">
                    <h3 className="text-lg font-bold text-navy">{i.term}</h3>
                    <p className="mt-1 text-base text-muted-foreground">{i.plain}</p>
                  </li>
                ))}
              </ul>
              <Link
                to={g.to}
                className="mt-4 inline-flex min-h-12 items-center rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-surface-grey"
              >
                {g.cta}
              </Link>
            </section>
          );
        })}
        {filtered.length === 0 ? (
          <p className="rounded-sm border-2 border-border bg-surface-grey p-5 text-base">
            Nothing matched &ldquo;{query}&rdquo;. That doesn&apos;t matter —{" "}
            <Link to="/report/safety" className="font-semibold text-brand-blue underline">
              tell us what happened in your own words
            </Link>
            .
          </p>
        ) : null}
      </div>
    </Page>
  );
}
