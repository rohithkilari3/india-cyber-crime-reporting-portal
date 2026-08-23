import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { STATES, makeAcknowledgement, useReportFlow } from "@/lib/report-flow";
import { districtsFor } from "@/lib/locations";
import {
  ErrorSummary,
  FieldError,
  boxTone,
  focusErrorSummary,
  inputClass,
  labelTone,
  type FieldErrors,
} from "@/components/site/form-ui";

export const Route = createFileRoute("/report/financial/about-you")({
  head: () => ({
    meta: [
      { title: "About you and send your report - Report stolen money" },
      {
        name: "description",
        content:
          "Tell us who is reporting, who the money belongs to, and your state and district so the report reaches the right police cyber unit.",
      },
      { property: "og:title", content: "About you and send your report" },
      {
        property: "og:description",
        content: "Your state and district decide which police cyber unit handles your report.",
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const forSomeoneElse = report.relationship && report.relationship !== "self";
  const districts = districtsFor(report.state);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found: FieldErrors = {};
    if (!report.fullName.trim())
      found["name"] = "Enter your name so the officer knows who to contact.";
    if (!report.relationship)
      found["relationship"] = "Tell us whether this happened to you or to someone else.";
    if (forSomeoneElse && !report.victimName.trim())
      found["victim-name"] = "Enter the name of the person the money belongs to.";
    if (!report.state)
      found["state"] = "Choose your state or union territory so we can route your report.";
    if (!report.district)
      found["district"] = "Choose your district or city so the case reaches that city's cyber unit.";
    if (!report.declaration)
      found["declaration"] = "Tick the box to confirm what you've told us is true, then send.";
    setErrors(found);
    if (Object.keys(found).length) {
      focusErrorSummary();
      return;
    }
    update({ acknowledgement: makeAcknowledgement() });
    navigate({ to: "/report/financial/submitted" });
  }

  return (
    <Page>
      <StepIndicator current={6} />
      <h1 className="text-3xl font-bold text-navy">About you, and then we&apos;re done</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Last step. Your mobile number is already confirmed - we just need who you are and where
        this should go.
      </p>

      <ErrorSummary errors={errors} />

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-xl font-bold text-navy">Who is reporting?</h2>
          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="name" className={`block text-lg font-semibold ${labelTone(!!errors["name"])}`}>
                Your full name
              </label>
              <FieldError id="name" message={errors["name"]} />
              <input
                id="name"
                autoComplete="name"
                aria-invalid={!!errors["name"]}
                value={report.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className={inputClass(!!errors["name"], "mt-2 max-w-md")}
              />
            </div>

            <fieldset id="relationship">
              <legend className={`text-lg font-semibold ${labelTone(!!errors["relationship"])}`}>
                Did this happen to you, or to someone else?
              </legend>
              <FieldError id="relationship" message={errors["relationship"]} />
              <div className="mt-3 space-y-3">
                {relationships.map((r) => (
                  <label
                    key={r.id}
                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border-2 p-3 text-lg font-semibold hover:bg-surface-grey ${
                      report.relationship === r.id
                        ? "border-brand-blue bg-surface-grey"
                        : boxTone(!!errors["relationship"])
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
              <div className="grid gap-5 rounded-sm border-2 border-border bg-surface-grey p-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor="victim-name"
                    className={`block text-lg font-semibold ${labelTone(!!errors["victim-name"])}`}
                  >
                    Name of the person the money belongs to
                  </label>
                  <FieldError id="victim-name" message={errors["victim-name"]} />
                  <input
                    id="victim-name"
                    aria-invalid={!!errors["victim-name"]}
                    value={report.victimName}
                    onChange={(e) => update({ victimName: e.target.value })}
                    className={inputClass(!!errors["victim-name"], "mt-2")}
                  />
                </div>
                <div className="min-w-0">
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
            <MapPin className="size-6 shrink-0 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Where should this report go?</h2>
          </div>
          <p className="mt-2 text-base text-muted-foreground">
            Cyber crime is investigated by the police where you live. We use this to route your
            report - nothing else.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="state" className={`block text-lg font-semibold ${labelTone(!!errors["state"])}`}>
                Your state or union territory
              </label>
              <FieldError id="state" message={errors["state"]} />
              <select
                id="state"
                aria-invalid={!!errors["state"]}
                value={report.state}
                onChange={(e) => update({ state: e.target.value, district: "" })}
                className={inputClass(!!errors["state"], "mt-2 bg-background")}
              >
                <option value="">Choose your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label
                htmlFor="district"
                className={`block text-lg font-semibold ${labelTone(!!errors["district"])}`}
              >
                District or city
              </label>
              <FieldError id="district" message={errors["district"]} />
              <select
                id="district"
                aria-invalid={!!errors["district"]}
                disabled={!report.state}
                value={report.district}
                onChange={(e) => update({ district: e.target.value })}
                className={inputClass(!!errors["district"], "mt-2 bg-background disabled:bg-surface-grey")}
              >
                <option value="">
                  {report.state ? "Choose your district or city" : "Choose your state first"}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label htmlFor="pincode" className="block text-lg font-semibold text-navy">
                Pincode (optional)
              </label>
              <p id="pincode-hint" className="text-base text-muted-foreground">
                This tells us the exact police station area, so you don&apos;t have to name one.
              </p>
              <input
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                aria-describedby="pincode-hint"
                value={report.pincode}
                onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, "") })}
                className="mt-2 min-h-12 w-36 rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div className="min-w-0 sm:col-span-2">
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
          </div>

          <label className="mt-5 flex min-h-12 items-start gap-3 text-lg">
            <input
              type="checkbox"
              checked={report.anonymousContact}
              onChange={(e) => update({ anonymousContact: e.target.checked })}
              className="mt-1 size-5 accent-[var(--brand-blue)]"
            />
            <span>Don&apos;t show my name to anyone outside the investigating team.</span>
          </label>
        </section>

        <details className="rounded-sm border-2 border-border p-4">
          <summary className="min-h-11 cursor-pointer text-lg font-semibold text-navy">
            Your declaration - what you&apos;re confirming
          </summary>
          <p className="mt-3 text-base text-muted-foreground">
            You confirm the information you have given is true to the best of your knowledge. A
            knowingly false report is an offence. Your details are shared only with the police unit
            handling your case and, where money can still be held, with the banks involved.
          </p>
        </details>

        <label
          id="declaration"
          tabIndex={-1}
          className={`flex min-h-12 items-start gap-3 rounded-sm border-2 p-3 text-lg ${
            errors["declaration"] ? "border-emergency bg-emergency-tint" : "border-transparent"
          }`}
        >
          <input
            type="checkbox"
            checked={report.declaration}
            onChange={(e) => update({ declaration: e.target.checked })}
            className="mt-1 size-5 accent-[var(--brand-blue)]"
          />
          <span className={errors["declaration"] ? "font-semibold text-emergency" : undefined}>
            Everything I&apos;ve told you is true to the best of my knowledge.
          </span>
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
