import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Clock, Search } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Check my report — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content: "Enter your acknowledgement number to see the progress of a report you made.",
      },
      { property: "og:title", content: "Check my report" },
      {
        property: "og:description",
        content: "Enter your acknowledgement number to see the progress of your report.",
      },
    ],
  }),
  component: Track,
});

function Track() {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState<null | "found" | "not-found">(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(/^NCRP-\d{4}-\d{7}$/i.test(number.trim()) ? "found" : "not-found");
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Check my report</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Enter the acknowledgement number you were given, for example NCRP-2026-1234567.
      </p>

      <form onSubmit={submit} className="mt-8">
        <label htmlFor="ack" className="block text-lg font-semibold text-navy">
          Acknowledgement number
        </label>
        <div className="mt-2 flex flex-wrap gap-3">
          <input
            id="ack"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            <Search className="size-5" aria-hidden="true" />
            Check progress
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-8">
        {status === "found" ? (
          <div className="rounded-sm border-2 border-border p-5">
            <p className="flex items-center gap-2 text-lg font-bold text-navy">
              <Clock className="size-6 text-brand-blue" aria-hidden="true" />
              With the investigating officer
            </p>
            <ol className="mt-4 space-y-3 text-base">
              <li className="border-l-4 border-success pl-4">
                <span className="font-semibold">Report received</span> — your details were recorded.
              </li>
              <li className="border-l-4 border-success pl-4">
                <span className="font-semibold">Banks alerted</span> — a hold request was sent.
              </li>
              <li className="border-l-4 border-brand-blue pl-4">
                <span className="font-semibold">Under investigation</span> — an officer is
                reviewing your case now.
              </li>
            </ol>
          </div>
        ) : null}
        {status === "not-found" ? (
          <div className="flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4">
            <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
            <p className="font-semibold text-emergency">
              We couldn&apos;t find that number. Check it looks like NCRP-2026-1234567, or call
              1930 and we&apos;ll look it up for you.
            </p>
          </div>
        ) : null}
      </div>
    </Page>
  );
}
