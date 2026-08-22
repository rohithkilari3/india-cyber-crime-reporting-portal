import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, MapPin } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { STATES, useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/about-you")({
  head: () => ({
    meta: [
      { title: "About you and where you live — Report stolen money" },
      {
        name: "description",
        content:
          "Tell us your state and district so your report reaches the right police cyber unit, plus how to contact you.",
      },
      { property: "og:title", content: "About you and where you live" },
      {
        property: "og:description",
        content: "Your state and district decide which police cyber unit handles your report.",
      },
    ],
  }),
  component: AboutYou,
});

function AboutYou() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.state) {
      setError("Choose your state or union territory so we can send this to the right police unit.");
      document.getElementById("about-error")?.focus();
      return;
    }
    setError("");
    navigate({ to: "/report/financial/verify" });
  }

  return (
    <Page>
      <StepIndicator current={4} />
      <h1 className="text-3xl font-bold text-navy">About you</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Only your state is required. Everything else helps an officer reach you faster.
      </p>

      {error ? (
        <div
          id="about-error"
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <MapPin className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Where should this report go?</h2>
          </div>
          <p className="mt-2 text-base text-muted-foreground">
            Cyber crime is investigated by the police in the state where you live. We use this to
            route your report — nothing else.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="state" className="block text-lg font-semibold text-navy">
                Your state or union territory
              </label>
              <select
                id="state"
                required
                value={report.state}
                onChange={(e) => update({ state: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input bg-background px-3 text-lg"
              >
                <option value="">Choose your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block text-lg font-semibold text-navy">
                District or city (optional)
              </label>
              <input
                id="district"
                value={report.district}
                onChange={(e) => update({ district: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div>
              <label htmlFor="ps" className="block text-lg font-semibold text-navy">
                Nearest police station (optional)
              </label>
              <p id="ps-hint" className="text-base text-muted-foreground">
                Leave this blank if you don&apos;t know it — we will work it out from your district.
              </p>
              <input
                id="ps"
                aria-describedby="ps-hint"
                value={report.policeStation}
                onChange={(e) => update({ policeStation: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
          </div>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-xl font-bold text-navy">How we can reach you</h2>
          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-navy">
                Your name (optional)
              </label>
              <input
                id="name"
                autoComplete="name"
                value={report.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-navy">
                Email address (optional)
              </label>
              <p id="email-hint" className="text-base text-muted-foreground">
                We send a copy of your acknowledgement number here if you give it.
              </p>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-describedby="email-hint"
                value={report.email}
                onChange={(e) => update({ email: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <label className="flex min-h-12 items-start gap-3 text-lg">
              <input
                type="checkbox"
                checked={report.anonymousContact}
                onChange={(e) => update({ anonymousContact: e.target.checked })}
                className="mt-1 size-5 accent-[var(--brand-blue)]"
              />
              <span>
                Don&apos;t show my name to anyone outside the investigating team.
                <span className="block text-base text-muted-foreground">
                  Your mobile number is still needed on the next step so we can send you updates.
                </span>
              </span>
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link to="/report/financial/evidence" className="font-semibold text-brand-blue underline">
            Back to evidence
          </Link>
        </div>
      </form>
    </Page>
  );
}
