import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { SAFETY_STEPS } from "@/components/site/safety-steps";
import { ErrorSummary, Field, boxTone, focusErrorSummary, inputClass, labelTone } from "@/components/site/form-ui";
import { STATES, makeAcknowledgement, useReportFlow } from "@/lib/report-flow";
import { districtsFor } from "@/lib/locations";

export const Route = createFileRoute("/report/safety/about-you")({
  head: () => ({
    meta: [
      { title: "About you and send your report - Report threats, harassment or abuse" },
      {
        name: "description",
        content:
          "Tell us who the report is about and where you are, so it reaches the right police cyber unit.",
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

function AboutYou() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const districts = districtsFor(report.state);

  useEffect(() => {
    if (report.track !== "safety") {
      navigate({ to: "/report/safety/start", replace: true });
      return;
    }
    if (!report.anonymous && !report.mobileVerified) {
      navigate({ to: "/report/safety/start", replace: true });
    }
  }, [report.track, report.anonymous, report.mobileVerified, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found: Record<string, string> = {};

    if (!report.anonymous) {
      if (!report.fullName.trim()) found["name"] = "Enter your name.";
      if (!report.relationship) found["relationship"] = "Tell us who the report is about.";
    }
    if (!report.victimIsChild)
      found["victim-is-child"] = "Tell us whether the affected person is under 18.";
    if (!report.state) found["state"] = "Choose your state or union territory.";
    if (!report.district) found["district"] = "Choose your district.";
    if (!report.declaration) found["declaration"] = "Tick the declaration to send your report.";

    setErrors(found);
    if (Object.keys(found).length) {
      focusErrorSummary();
      return;
    }
    update({ acknowledgement: makeAcknowledgement() });
    navigate({ to: "/report/safety/submitted" });
  }

  return (
    <Page>
      <StepIndicator current={5} steps={SAFETY_STEPS} />
      <h1 className="text-3xl font-bold text-navy">About you, and then we&apos;re done</h1>
      <p className="mt-3 text-base text-muted-foreground">
        {report.anonymous
          ? "You are reporting anonymously. We only need a little more information to route your report."
          : "Your mobile number is already confirmed - we just need who you are and where this should go."}
      </p>

      <ErrorSummary errors={errors} />

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        {!report.anonymous ? (
          <section className="rounded-sm border-2 border-border p-5">
            <h2 className="text-xl font-bold text-navy">Who is reporting?</h2>
            <div className="mt-5 space-y-6">
              <Field id="name" label="Your full name" error={errors["name"]}>
                <input
                  id="name"
                  autoComplete="name"
                  value={report.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
                  className={inputClass(!!errors["name"], "max-w-lg")}
                />
              </Field>

              <fieldset className={`rounded-sm border-2 p-4 ${boxTone(!!errors["relationship"])}`}>
                <legend className={`text-lg font-semibold ${labelTone(!!errors["relationship"])}`}>
                  Who is the report about?
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

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="victim-age"
                  label="Age of the affected person"
                  hint="Optional, but helps if a child is involved."
                  optional
                >
                  <input
                    id="victim-age"
                    inputMode="numeric"
                    value={report.victimAge}
                    onChange={(e) => update({ victimAge: e.target.value })}
                    className={inputClass(false, "max-w-lg")}
                  />
                </Field>
                <Field id="email" label="Email address" optional hint="We send a copy of your acknowledgement number here if you give it.">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={report.email}
                    onChange={(e) => update({ email: e.target.value })}
                    className={inputClass(false, "max-w-lg")}
                  />
                </Field>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-sm border-2 border-border p-5">
            <h2 className="text-xl font-bold text-navy">Who is the report about?</h2>
            <fieldset className={`mt-4 rounded-sm border-2 p-4 ${boxTone(!!errors["relationship"])}`}>
              <legend className={`text-lg font-semibold ${labelTone(!!errors["relationship"])}`}>
                Choose one
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
          </section>
        )}

        <section className={`rounded-sm border-2 p-5 ${boxTone(!!errors["victim-is-child"])}`}>
          <fieldset>
            <legend className={`text-lg font-semibold ${labelTone(!!errors["victim-is-child"])}`}>
              Is the affected person under 18?
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {["Yes", "No", "I don't know"].map((o) => (
                <label
                  key={o}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    report.victimIsChild === o ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="victim-is-child"
                    checked={report.victimIsChild === o}
                    onChange={() => update({ victimIsChild: o })}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <MapPin className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Where should this report go?</h2>
          </div>
          <p className="mt-2 text-base text-muted-foreground">
            Cyber crime is investigated by the police in the state where you live. We use this to
            route your report - nothing else.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="state" label="Your state or union territory" error={errors["state"]}>
              <select
                id="state"
                value={report.state}
                onChange={(e) => update({ state: e.target.value, district: "" })}
                className={inputClass(!!errors["state"], "max-w-lg bg-background")}
              >
                <option value="">Choose your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="district" label="District" error={errors["district"]}>
              <select
                id="district"
                value={report.district}
                onChange={(e) => update({ district: e.target.value })}
                disabled={!report.state}
                className={inputClass(!!errors["district"], "max-w-lg bg-background disabled:bg-surface-grey")}
              >
                <option value="">{report.state ? "Choose your district" : "Choose a state first"}</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field id="pincode" label="Pincode" optional>
              <input
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                value={report.pincode}
                onChange={(e) => update({ pincode: e.target.value })}
                className={inputClass(false, "max-w-xs")}
              />
            </Field>
          </div>
        </section>

        <details className="rounded-sm border-2 border-border p-4">
          <summary className="min-h-11 cursor-pointer text-lg font-semibold text-navy">
            Your declaration - what you&apos;re confirming
          </summary>
          <p className="mt-3 text-base text-muted-foreground">
            You confirm the information you have given is true to the best of your knowledge. A
            knowingly false report is an offence. Your details are shared only with the police unit
            handling your case.
          </p>
        </details>

        <Field id="declaration" label="" error={errors["declaration"]}>
          <label className="flex min-h-12 items-start gap-3 text-lg">
            <input
              type="checkbox"
              checked={report.declaration}
              onChange={(e) => update({ declaration: e.target.checked })}
              className="mt-1 size-5 accent-[var(--brand-blue)]"
            />
            <span className="text-foreground">Everything I&apos;ve told you is true to the best of my knowledge.</span>
          </label>
        </Field>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            <Send className="size-5" aria-hidden="true" />
            Send my report
          </button>
          <Link to="/report/safety/evidence" className="font-semibold text-brand-blue underline">
            Back to evidence
          </Link>
        </div>
      </form>
    </Page>
  );
}
