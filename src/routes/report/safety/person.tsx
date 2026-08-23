import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { SAFETY_STEPS } from "@/components/site/safety-steps";
import { ErrorSummary, Field, boxTone, focusErrorSummary, inputClass, labelTone } from "@/components/site/form-ui";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety/person")({
  head: () => ({
    meta: [
      { title: "The person involved - Report threats, harassment or abuse" },
      {
        name: "description",
        content:
          "Tell us anything you know about the person involved, if anything at all. It is fine if you know nothing.",
      },
      { property: "og:title", content: "The person involved" },
      {
        property: "og:description",
        content: "Share what you know about the person involved - or tell us you don't know anything.",
      },
    ],
  }),
  component: PersonStep,
});

const knownOptions = [
  { id: "yes", label: "Yes, I know something about them" },
  { id: "no", label: "No, I don't know anything about them" },
];

function PersonStep() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!report.suspectKnown)
      found["suspect-known"] = "Tell us whether you know anything about the person involved.";
    setErrors(found);
    if (Object.keys(found).length) {
      focusErrorSummary();
      return;
    }
    navigate({ to: "/report/safety/evidence" });
  }

  return (
    <Page>
      <StepIndicator current={3} steps={SAFETY_STEPS} />
      <h1 className="text-3xl font-bold text-navy">Do you know anything about the person involved?</h1>
      <p className="mt-3 text-base text-muted-foreground">
        It is completely fine if you don&apos;t know anything - carry on to the next step.
      </p>

      <ErrorSummary errors={errors} />

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className={`rounded-sm border-2 p-5 ${boxTone(!!errors["suspect-known"])}`}>
          <fieldset>
            <legend className={`text-lg font-semibold ${labelTone(!!errors["suspect-known"])}`}>
              Do you know anything about them?
            </legend>
            <div className="mt-3 space-y-3">
              {knownOptions.map((o) => (
                <label
                  key={o.id}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                    report.suspectKnown === o.id ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="suspect-known"
                    checked={report.suspectKnown === o.id}
                    onChange={() => update({ suspectKnown: o.id })}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-lg font-semibold text-foreground">{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {report.suspectKnown === "yes" ? (
          <section className="rounded-sm border-2 border-border p-5">
            <h2 className="text-xl font-bold text-navy">What do you know about them?</h2>
            <p className="mt-2 text-base text-muted-foreground">
              Fill in whatever you have - all of these are optional.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="suspect-name" label="Their name" optional>
                <input
                  id="suspect-name"
                  value={report.suspectName}
                  onChange={(e) => update({ suspectName: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
              <Field id="suspect-handle" label="Profile or username" optional>
                <input
                  id="suspect-handle"
                  value={report.suspectHandle}
                  onChange={(e) => update({ suspectHandle: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
              <Field id="suspect-phone" label="Phone number or email" optional>
                <input
                  id="suspect-phone"
                  value={report.suspectPhone}
                  onChange={(e) => update({ suspectPhone: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field
                id="suspect-notes"
                label="Anything else about them"
                hint="How you know them, where they contacted you from, anything they said."
                optional
              >
                <textarea
                  id="suspect-notes"
                  rows={4}
                  value={report.suspectNotes}
                  onChange={(e) => update({ suspectNotes: e.target.value })}
                  className="w-full max-w-lg rounded-sm border-2 border-input p-3 text-lg"
                />
              </Field>
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link to="/report/safety/what-happened" className="font-semibold text-brand-blue underline">
            Back
          </Link>
        </div>
      </form>
    </Page>
  );
}
