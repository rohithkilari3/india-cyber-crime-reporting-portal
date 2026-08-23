import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Send } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { STATES, makeAcknowledgement, useReportFlow } from "@/lib/report-flow";
import { districtsFor } from "@/lib/locations";
import {
  ErrorSummary,
  Field,
  boxTone,
  focusErrorSummary,
  inputClass,
  labelTone,
  type FieldErrors,
} from "@/components/site/form-ui";

const OTHER_STEPS = ["Confirm your number", "What happened", "Evidence", "About you and send", "Sent"];

export const Route = createFileRoute("/report/other/about-you")({
  head: () => ({
    meta: [
      { title: "About you and send your report - not sure what happened" },
      {
        name: "description",
        content:
          "Tell us who is reporting and your state and district so the report reaches the right police cyber unit.",
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
  const [errors, setErrors] = useState<FieldErrors>({});
  const forSomeoneElse = report.relationship && report.relationship !== "self";
  const districts = districtsFor(report.state);

  useEffect(() => {
    if (!report.mobileVerified) navigate({ to: "/report/other/verify", replace: true });
  }, [report.mobileVerified, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: FieldErrors = {};

    if (!report.fullName.trim()) {
      next["name"] = "Enter your name - the officer needs to know who to contact.";
    }
    if (!report.relationship) {
      next["relationship"] = "Tell us whether this happened to you or to someone else.";
    }
    if (!report.state) {
      next["state"] = "Choose your state or union territory so we can send this to the right police unit.";
    }
    if (report.state && !report.district) {
      next["district"] = "Choose your district so we can route this to the right city police unit.";
    }
    if (!report.declaration) {
      next["declaration"] = "Tick the box to confirm what you've told us is true, then send.";
    }

    setErrors(next);
    if (Object.keys(next).length) {
      focusErrorSummary();
      return;
    }
    update({ acknowledgement: makeAcknowledgement() });
    navigate({ to: "/report/other/submitted" });
  }

  return (
    <Page>
      <StepIndicator current={4} steps={OTHER_STEPS} />
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
            <Field id="name" label="Your full name" error={errors["name"]}>
              <input
                id="name"
                autoComplete="name"
                value={report.fullName}
                onChange={(e) => update({ fullName: e.target.value })}
                className={inputClass(!!errors["name"], "max-w-lg")}
              />
            </Field>

            <fieldset>
              <legend className={`text-lg font-semibold ${labelTone(!!errors["relationship"])}`}>
                Did this happen to you, or to someone else?
              </legend>
              {errors["relationship"] ? (
                <p className="mt-1 text-base font-semibold text-emergency">{errors["relationship"]}</p>
              ) : null}
              <div className="mt-3 space-y-3">
                {relationships.map((r) => (
                  <label
                    key={r.id}
                    id={r === relationships[0] ? "relationship" : undefined}
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
              <div className="grid gap-4 rounded-sm border-2 border-border bg-surface-grey p-4 sm:grid-cols-2">
                <Field id="victim-name" label="Name of the person this happened to" optional>
                  <input
                    id="victim-name"
                    value={report.victimName}
                    onChange={(e) => update({ victimName: e.target.value })}
                    className={inputClass(false, "max-w-lg")}
                  />
                </Field>
                <Field
                  id="victim-age"
                  label="Their age"
                  optional
                  hint="Cases involving children or senior citizens are handled with extra care."
                >
                  <input
                    id="victim-age"
                    inputMode="numeric"
                    value={report.victimAge}
                    onChange={(e) => update({ victimAge: e.target.value })}
                    className={inputClass(false, "max-w-[8rem]")}
                  />
                </Field>
              </div>
            ) : null}

            <Field
              id="email"
              label="Email address"
              optional
              hint="We send a copy of your acknowledgement number here if you give it."
            >
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
                className={`min-h-12 w-full max-w-lg rounded-sm border-2 bg-background px-3 text-lg ${boxTone(!!errors["state"])}`}
              >
                <option value="">Choose your state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="district" label="District or city" error={errors["district"]}>
              <select
                id="district"
                value={report.district}
                onChange={(e) => update({ district: e.target.value })}
                disabled={!report.state}
                className={`min-h-12 w-full max-w-lg rounded-sm border-2 bg-background px-3 text-lg disabled:bg-surface-grey disabled:text-muted-foreground ${boxTone(!!errors["district"])}`}
              >
                <option value="">
                  {report.state ? "Choose your district" : "Choose a state first"}
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="pincode" label="Pincode" optional>
              <input
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                value={report.pincode}
                onChange={(e) => update({ pincode: e.target.value })}
                className={inputClass(false, "max-w-[10rem]")}
              />
            </Field>
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
            handling your case.
          </p>
        </details>

        <div>
          <label
            id="declaration"
            className="flex min-h-12 items-start gap-3 text-lg"
          >
            <input
              type="checkbox"
              checked={report.declaration}
              onChange={(e) => update({ declaration: e.target.checked })}
              className="mt-1 size-5 accent-[var(--brand-blue)]"
            />
            <span className={labelTone(!!errors["declaration"])}>
              Everything I&apos;ve told you is true to the best of my knowledge.
            </span>
          </label>
          {errors["declaration"] ? (
            <p className="mt-1 text-base font-semibold text-emergency">{errors["declaration"]}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            <Send className="size-5" aria-hidden="true" />
            Send my report
          </button>
          <Link to="/report/other/evidence" className="font-semibold text-brand-blue underline">
            Back to evidence
          </Link>
        </div>
      </form>
    </Page>
  );
}
