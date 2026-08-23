import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Search } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/check-suspect")({
  head: () => ({
    meta: [
      { title: "Check a suspicious number, UPI ID or link - Cyber Crime Help" },
      {
        name: "description",
        content:
          "Check whether a phone number, UPI ID, bank account, email or social media account has been reported before.",
      },
      { property: "og:title", content: "Check a suspicious number, UPI ID or link" },
      {
        property: "og:description",
        content: "See whether a number, UPI ID or account has been reported by others.",
      },
    ],
  }),
  component: CheckSuspect,
});

const kinds = [
  { id: "mobile", label: "Phone number" },
  { id: "upi", label: "UPI ID" },
  { id: "account", label: "Bank account" },
  { id: "email", label: "Email address" },
  { id: "social", label: "Social media account" },
];

function CheckSuspect() {
  const [kind, setKind] = useState("mobile");
  const [value, setValue] = useState("");
  const [result, setResult] = useState<null | { reported: boolean; count: number }>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Prototype result derived from the input so it is stable per value.
    const hits = value.replace(/\D/g, "").split("").reduce((a, d) => a + Number(d), 0) % 5;
    setResult({ reported: hits > 1, count: hits });
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Check something suspicious</h1>
      <p className="mt-3 text-base text-muted-foreground">
        See whether other people have reported it. Checking takes a few seconds and is anonymous.
      </p>

      <form onSubmit={submit} className="mt-8">
        <fieldset>
          <legend className="text-lg font-semibold text-navy">What do you want to check?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <label
                key={k.id}
                className={`inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 text-base font-semibold hover:bg-surface-grey ${
                  kind === k.id ? "border-brand-blue bg-surface-grey text-navy" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="kind"
                  checked={kind === k.id}
                  onChange={() => {
                    setKind(k.id);
                    setResult(null);
                  }}
                  className="size-4 accent-[var(--brand-blue)]"
                />
                {k.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label htmlFor="value" className="mt-8 block text-lg font-semibold text-navy">
          Enter it here
        </label>
        <div className="mt-2 flex flex-wrap gap-3">
          <input
            id="value"
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            <Search className="size-5" aria-hidden="true" />
            Check
          </button>
        </div>
      </form>

      <div aria-live="polite" className="mt-8">
        {result ? (
          result.reported ? (
            <div className="rounded-sm border-2 border-caution bg-caution-tint p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-caution">
                <AlertTriangle className="size-6" aria-hidden="true" />
                Reported by others
              </p>
              <p className="mt-2 text-base text-foreground">
                This has been reported {result.count} time{result.count > 1 ? "s" : ""} recently.
                Treat it as unsafe: don&apos;t pay, don&apos;t share codes, and don&apos;t click
                links from it.
              </p>
            </div>
          ) : (
            <div className="rounded-sm border-2 border-border bg-surface-grey p-5">
              <p className="flex items-center gap-2 text-lg font-bold text-navy">
                <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
                No reports found
              </p>
              <p className="mt-2 text-base text-muted-foreground">
                No one has reported this yet. That doesn&apos;t prove it&apos;s safe - new scams
                appear every day.
              </p>
            </div>
          )
        ) : null}

        {result ? (
          <details className="mt-4 rounded-sm border p-4">
            <summary className="cursor-pointer font-semibold text-navy">
              How reliable is this result?
            </summary>
            <p className="mt-2 text-base text-muted-foreground">
              Results come from reports made by the public and may contain errors. Use your own
              judgement, and report anything suspicious so others are warned.
            </p>
          </details>
        ) : null}
      </div>
    </Page>
  );
}
