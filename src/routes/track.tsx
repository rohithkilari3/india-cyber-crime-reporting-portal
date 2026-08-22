import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Clock, KeyRound, Search, Smartphone } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Check my report — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Enter your acknowledgement number and confirm your mobile number to see the progress of a report you made.",
      },
      { property: "og:title", content: "Check my report" },
      {
        property: "og:description",
        content: "Confirm it's you with a one-time code, then see the progress of your report.",
      },
    ],
  }),
  component: Track,
});

function Track() {
  const [number, setNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [status, setStatus] = useState<null | "found" | "not-found">(null);

  function setDigit(i: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 5) document.getElementById(`track-otp-${i + 1}`)?.focus();
  }

  function sendCode() {
    if (!/^NCRP-\d{4}-\d{7}$/i.test(number.trim())) {
      setError("Check your acknowledgement number — it looks like NCRP-2026-1234567.");
      return;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\s/g, ""))) {
      setError("Enter the 10-digit mobile number you used when you made the report.");
      return;
    }
    setError("");
    setStatus(null);
    setSent(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!sent) {
      sendCode();
      return;
    }
    if (digits.join("").length !== 6) {
      setError("Enter all 6 digits of the code we sent to your phone.");
      return;
    }
    setError("");
    setStatus(/^NCRP-\d{4}-\d{7}$/i.test(number.trim()) ? "found" : "not-found");
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Check my report</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Your report contains personal details, so we confirm it&apos;s you before showing anything.
        You need your acknowledgement number and the mobile number you reported with.
      </p>

      {error ? (
        <div
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <Search className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Your report</h2>
          </div>
          <label htmlFor="ack" className="mt-4 block text-lg font-semibold">
            Acknowledgement number
          </label>
          <p id="ack-hint" className="text-base text-muted-foreground">
            For example NCRP-2026-1234567. It was shown when you submitted and texted to you.
          </p>
          <input
            id="ack"
            aria-describedby="ack-hint"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
          />
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <Smartphone className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Your mobile number</h2>
          </div>
          <label htmlFor="track-mobile" className="mt-4 block text-lg font-semibold">
            The 10-digit number you used when reporting
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              id="track-mobile"
              inputMode="numeric"
              autoComplete="tel-national"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
            />
            <button
              type="button"
              onClick={sendCode}
              className="min-h-12 rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-surface-grey"
            >
              {sent ? "Send the code again" : "Send me a code"}
            </button>
          </div>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <KeyRound className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">One-time code from your SMS</h2>
          </div>
          <p id="track-otp-hint" className="mt-2 text-base text-muted-foreground">
            A 6-digit number, texted to the phone above. There is no time limit.
          </p>
          <div className="mt-4 flex gap-2" role="group" aria-labelledby="track-otp-hint">
            {digits.map((d, i) => (
              <input
                key={i}
                id={`track-otp-${i}`}
                inputMode="numeric"
                maxLength={1}
                value={d}
                disabled={!sent}
                aria-label={`Code digit ${i + 1} of 6`}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digits[i] && i > 0) {
                    document.getElementById(`track-otp-${i - 1}`)?.focus();
                  }
                }}
                className="size-14 rounded-sm border-2 border-input text-center text-2xl font-bold disabled:bg-surface-grey disabled:text-muted-foreground"
              />
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          {sent ? "Show my report" : "Send me a code"}
        </button>
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
