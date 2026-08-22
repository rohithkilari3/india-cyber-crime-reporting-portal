import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/daily-digest")({
  head: () => ({
    meta: [
      { title: "Daily digest — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "A short daily summary from I4C on the cyber fraud methods being reported across India and how to protect yourself against each one.",
      },
      { property: "og:title", content: "Daily digest of cyber fraud methods" },
      {
        property: "og:description",
        content: "What fraudsters are doing today, and the one step that stops each method.",
      },
    ],
  }),
  component: DailyDigest,
});

const entries = [
  {
    date: "22 Aug 2026",
    method: "Fake electricity bill disconnection SMS",
    how: "An SMS says your power will be cut tonight and gives a number to call. The caller asks you to install an app to “update” your meter details.",
    stop: "Utilities do not send disconnection notices by SMS with a personal mobile number. Check on your provider's official app.",
  },
  {
    date: "21 Aug 2026",
    method: "Wedding invitation APK files",
    how: "A file that looks like a wedding invitation is sent on WhatsApp. Opening it installs software that reads your messages, including OTPs.",
    stop: "Never open a file ending in .apk. Ask the sender to send a photo or PDF instead.",
  },
  {
    date: "20 Aug 2026",
    method: "Part-time job “task” scams",
    how: "You are paid small amounts for liking videos, then asked to deposit money for higher-paying tasks. The deposits are never returned.",
    stop: "Genuine employers never ask you to deposit money to earn money.",
  },
  {
    date: "19 Aug 2026",
    method: "Fake customs or courier parcel calls",
    how: "A caller says a parcel in your name contains illegal items and transfers you to a fake police officer.",
    stop: "Hang up. Customs and courier firms never resolve cases by phone payment.",
  },
];

function DailyDigest() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <Newspaper className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Daily digest</h1>
        <p className="mt-3 text-base text-muted-foreground">
          A short daily note on the fraud methods being reported across the country, so you recognise
          them before they reach you.
        </p>
      </div>

      <ul className="mt-8 max-w-4xl divide-y rounded-sm border-2 border-border">
        {entries.map((e) => (
          <li key={e.date} className="p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {e.date}
            </p>
            <h2 className="mt-1 text-xl font-bold text-navy">{e.method}</h2>
            <p className="mt-2 text-base text-muted-foreground">{e.how}</p>
            <p className="mt-2 text-base">
              <span className="font-semibold text-navy">Stop it by: </span>
              <span className="text-muted-foreground">{e.stop}</span>
            </p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
