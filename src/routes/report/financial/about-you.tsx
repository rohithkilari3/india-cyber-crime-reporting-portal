import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, MapPin, Send } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { STATES, makeAcknowledgement, useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/about-you")({
  head: () => ({
    meta: [
      { title: "About you and send your report — Report stolen money" },
      {
        name: "description",
        content:
          "Tell us who is reporting, who the money belongs to, and your state so the report reaches the right police cyber unit.",
      },
      { property: "og:title", content: "About you and send your report" },
      {
        property: "og:description",
        content: "Your state decides which police cyber unit handles your report.",
      },
    ],
  }),
  component: AboutYou,
});

const relationships = [
  { id: "self", label: "It happened to me" },
  { id: "family", label: "I'm reporting for a family member" },
  { id: "friend", label: "I'm reporting for a friend or neighbour" },
  { id: "org", label: "I'm reporting for a business or organisation" },
];

const idTypes = ["Aadhaar", "PAN", "Voter ID", "Passport", "Driving licence"];

function AboutYou() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");
  const forSomeoneElse = report.relationship && report.relationship !== "self";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.fullName.trim()) {
      return fail("Enter your name — the officer needs to know who to contact.");
    }
    if (!report.relationship) {
      return fail("Tell us whether this happened to you or to someone else.");
    }
    if (forSomeoneElse && !report.victimName.trim()) {
      return fail("Enter the name of the person the money belongs to.");
    }
    if (!report.state) {
      return fail("Choose your state or union territory so we can send this to the right police unit.");
    }
    if (!report.declaration) {
      return fail("Tick the box to confirm what you've told us is true, then send.");
    }
    setError("");
    update({ acknowledgement: makeAcknowledgement() });
    navigate({ to: "/report/financial/submitted" });
  }

  function fail(message: string) {
    setError(message);
    document.getElementById("about-error")?.focus();
  }

  return (
    <Page>
      <StepIndicator current={6} />
      <h1 className="text-3xl font-bold text-navy">About you, and then we&apos;re done</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Last step. Your mobile number is already confirmed — we just need who you are and where
        this should go.
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
          <h2 className="text-xl font-bold text-navy">Who is reporting?</h2>
          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-navy">
                Your full name
              </label>
              <input
                id="name"
                required
                autoComplete="name"
                value={report.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <fieldset>
              <legend className="text-lg font-semibold text-navy">
                Did this happen to you, or to someone else?
              </legend>
              <div className="mt-3 space-y-3">
                {relationships.map((r) => (
                  <label
                    key={r.id}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border-2 p-3 text-lg font-semibold hover:bg-surface-grey ${
                      report.relationship === r.id
                        ? "border-brand-blue bg-surface-grey"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="relationship"
                      value={r.id}
                      checked={report.relationship === r.id}
                      onChange={() => update({ relationship: r.id })}
                      className="size-5 accent-[var(--brand-blue)]"
                    />
                    {r.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {forSomeoneElse ? (
              <div className="space-y-5 rounded-sm border-2 border-border bg-surface-grey p-4">
                <div>
                  <label htmlFor="victim-name" className="block text-lg font-semibold text-navy">
                    Name of the person the money belongs to
                  </label>
                  <input
                    id="victim-name"
                    value={report.victimName}
                    onChange={(e) => update({ victimName: e.target.value })}
                    className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="victim-age" className="block text-lg font-semibold text-navy">
                    Their age (optional)
                  </label>
                  <p id="victim-age-hint" className="text-base text-muted-foreground">
                    Cases involving children or senior citizens are handled with extra care.
                  </p>
                  <input
                    id="victim-age"
                    inputMode="numeric"
                    aria-describedby="victim-age-hint"
                    value={report.victimAge}
                    onChange={(e) => update({ victimAge: e.target.value })}
                    className="mt-2 min-h-12 w-24 rounded-sm border-2 border-input px-3 text-lg"
                  />
                </div>
              </div>
            ) : null}

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
          </div>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-xl font-bold text-navy">Proof of identity (optional)</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Only the last 4 digits, and only if you have it handy. It speeds things up if the case
            becomes a formal FIR, but your report is accepted without it. Never enter a full
            Aadhaar number here.
          </p>
          <div className="mt-5 flex flex-wrap gap-5">
            <div>
              <label htmlFor="id-type" className="block text-lg font-semibold text-navy">
                Type of ID
              </label>
              <select
                id="id-type"
                value={report.idType}
                onChange={(e) => update({ idType: e.target.value })}
                className="mt-2 min-h-12 w-56 rounded-sm border-2 border-input bg-background px-3 text-lg"
              >
                <option value="">Prefer not to say</option>
                {idTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="id-last4" className="block text-lg font-semibold text-navy">
                Last 4 digits
              </label>
              <input
                id="id-last4"
                inputMode="numeric"
                maxLength={4}
                value={report.idLast4}
                onChange={(e) => update({ idLast4: e.target.value })}
                className="mt-2 min-h-12 w-28 rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
          </div>
        </section>

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
              <label htmlFor="address" className="block text-lg font-semibold text-navy">
                Address (optional)
              </label>
              <p id="address-hint" className="text-base text-muted-foreground">
                Needed only if the case goes to a local police station and an officer has to visit.
              </p>
              <textarea
                id="address"
                rows={3}
                aria-describedby="address-hint"
                value={report.address}
                onChange={(e) => update({ address: e.target.value })}
                className="mt-2 w-full max-w-md rounded-sm border-2 border-input p-3 text-lg"
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

            <label className="flex min-h-12 items-start gap-3 text-lg">
              <input
                type="checkbox"
                checked={report.anonymousContact}
                onChange={(e) => update({ anonymousContact: e.target.checked })}
                className="mt-1 size-5 accent-[var(--brand-blue)]"
              />
              <span>
                Don&apos;t show my name to anyone outside the investigating team.
              </span>
            </label>
          </div>
        </section>

        <details className="rounded-sm border-2 border-border p-4">
          <summary className="min-h-11 cursor-pointer text-lg font-semibold text-navy">
            Your declaration — what you&apos;re confirming
          </summary>
          <p className="mt-3 text-base text-muted-foreground">
            You confirm the information you have given is true to the best of your knowledge. A
            knowingly false report is an offence. Your details are shared only with the police unit
            handling your case and, where money can still be held, with the banks involved.
          </p>
        </details>

        <label className="flex min-h-12 items-start gap-3 text-lg">
          <input
            type="checkbox"
            checked={report.declaration}
            onChange={(e) => update({ declaration: e.target.checked })}
            className="mt-1 size-5 accent-[var(--brand-blue)]"
          />
          <span>Everything I&apos;ve told you is true to the best of my knowledge.</span>
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            <Send className="size-5" aria-hidden="true" />
            Send my report
          </button>
          <Link to="/report/financial/evidence" className="font-semibold text-brand-blue underline">
            Back to evidence
          </Link>
        </div>
      </form>
    </Page>
  );
}
