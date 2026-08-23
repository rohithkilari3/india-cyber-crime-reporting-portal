import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";
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

export const Route = createFileRoute("/report/other/what-happened")({
  head: () => ({
    meta: [
      { title: "Tell us what happened - not sure what happened" },
      {
        name: "description",
        content:
          "Describe what happened in your own words. No need to know the right category - an officer will work that out.",
      },
      { property: "og:title", content: "Tell us what happened - not sure what happened" },
      {
        property: "og:description",
        content: "Describe what happened in your own words, we will sort out the category.",
      },
    ],
  }),
  component: WhatHappened,
});

const places = [
  { id: "call", label: "A phone call" },
  { id: "sms", label: "An SMS or text message" },
  { id: "whatsapp", label: "WhatsApp or Telegram" },
  { id: "social", label: "Social media (Instagram, Facebook, X, YouTube)" },
  { id: "email", label: "An email" },
  { id: "website", label: "A website" },
  { id: "app", label: "A mobile app I installed" },
  { id: "person", label: "In person, or at an ATM or shop" },
  { id: "unknown", label: "I don't know where it came from" },
];

const detailHints: Record<string, string> = {
  call: "The phone number that called you",
  sms: "The sender ID or number, and the exact message",
  whatsapp: "The WhatsApp or Telegram number, or the group or channel name",
  social: "The profile name and the link to it",
  email: "The email address it came from",
  website: "The full web address, pasted",
  app: "The app name, and where you downloaded it from",
  person: "The place, ATM or shop name and location",
  unknown: "Anything you remember about how it reached you",
};

const whenBuckets = [
  { id: "24h", label: "Within the last 24 hours" },
  { id: "3d", label: "1 to 3 days ago" },
  { id: "7d", label: "4 to 7 days ago" },
  { id: "30d", label: "1 week to 1 month ago" },
  { id: "old", label: "More than a month ago" },
  { id: "unsure", label: "I don't know exactly" },
];

const whoOptions = [
  { id: "stranger", label: "Someone I don't know" },
  { id: "known", label: "Someone I know" },
  { id: "unsure", label: "I don't know who it was" },
];

function WhatHappened() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!report.mobileVerified) navigate({ to: "/report/other/verify", replace: true });
  }, [report.mobileVerified, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: FieldErrors = {};

    if (!report.story.trim()) {
      next["story"] = "Tell us what happened, in your own words.";
    } else if (report.story.trim().length < 50) {
      next["story"] = "Please write a little more - at least 50 characters helps an officer understand your case.";
    }
    if (report.lostMoney === "yes" && !report.amount.trim()) {
      next["amount"] = "Enter roughly how much money was lost.";
    }
    if (!report.platform) {
      next["platform"] = "Tell us where this reached you - choose \"I don't know\" if you're unsure.";
    }
    if (!report.whenBucket) {
      next["whenBucket"] = "Tell us roughly when it happened. \"I don't know exactly\" is a valid answer.";
    }
    if (!report.suspectKnown) {
      next["suspectKnown"] = "Tell us whether you know who contacted you.";
    }

    setErrors(next);
    if (Object.keys(next).length) {
      focusErrorSummary();
      return;
    }
    navigate({ to: "/report/other/evidence" });
  }

  return (
    <Page>
      <StepIndicator current={2} steps={OTHER_STEPS} />
      <h1 className="text-3xl font-bold text-navy">Tell us what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You don&apos;t need to know the right category. Describe it in your own words and we&apos;ll
        work out what kind of case it is.
      </p>

      {report.draftRef ? (
        <p className="mt-4 rounded-sm border-2 border-success bg-success-tint p-3 text-base font-semibold text-success">
          Saved as {report.draftRef}. You can stop and come back through "My reports".
        </p>
      ) : null}

      <ErrorSummary errors={errors} />

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <Field
            id="story"
            label="Tell us what happened in your own words"
            hint="What was said or shown to you, what you clicked or did, and anything that felt wrong. Even a few sentences help."
            error={errors["story"]}
          >
            <textarea
              id="story"
              rows={6}
              aria-describedby="story-hint"
              value={report.story}
              onChange={(e) => update({ story: e.target.value })}
              className={`w-full rounded-sm border-2 p-3 text-lg ${boxTone(!!errors["story"])}`}
            />
          </Field>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <fieldset>
            <legend className={`text-lg font-semibold ${labelTone(false)}`}>
              Did you lose any money because of this? (optional)
            </legend>
            <div className="mt-3 flex gap-4">
              {["yes", "no"].map((v) => (
                <label
                  key={v}
                  className={`flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-3 rounded-sm border-2 p-3 text-lg font-semibold hover:bg-surface-grey ${
                    report.lostMoney === v ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="lostMoney"
                    value={v}
                    checked={report.lostMoney === v}
                    onChange={() => update({ lostMoney: v })}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </fieldset>

          {report.lostMoney === "yes" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="amount" label="Roughly how much (INR)" error={errors["amount"]}>
                <input
                  id="amount"
                  inputMode="numeric"
                  value={report.amount}
                  onChange={(e) => update({ amount: e.target.value })}
                  className={inputClass(!!errors["amount"], "max-w-lg")}
                />
              </Field>
              <Field id="victim-bank" label="Your bank (optional)">
                <input
                  id="victim-bank"
                  value={report.victimBank}
                  onChange={(e) => update({ victimBank: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
            </div>
          ) : null}
        </section>

        <fieldset className="rounded-sm border-2 border-border p-5">
          <legend className={`text-lg font-semibold ${labelTone(!!errors["platform"])}`}>
            Where did this reach you?
          </legend>
          {errors["platform"] ? (
            <p className="mt-1 text-base font-semibold text-emergency">{errors["platform"]}</p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {places.map((p) => (
              <label
                key={p.id}
                id={p === places[0] ? "platform" : undefined}
                className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.platform === p.id
                    ? "border-brand-blue bg-surface-grey"
                    : boxTone(!!errors["platform"])
                }`}
              >
                <input
                  type="radio"
                  name="platform"
                  value={p.id}
                  checked={report.platform === p.id}
                  onChange={() => update({ platform: p.id })}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span className="text-lg font-semibold text-foreground">{p.label}</span>
              </label>
            ))}
          </div>
          {report.platform ? (
            <div className="mt-4">
              <label htmlFor="platform-detail" className="block text-lg font-semibold text-navy">
                {detailHints[report.platform]}
              </label>
              <input
                id="platform-detail"
                value={report.platformDetail}
                onChange={(e) => update({ platformDetail: e.target.value })}
                className={inputClass(false, "max-w-lg")}
              />
            </div>
          ) : null}
        </fieldset>

        <fieldset className="rounded-sm border-2 border-border p-5">
          <legend className={`text-lg font-semibold ${labelTone(!!errors["whenBucket"])}`}>
            When did it happen?
          </legend>
          {errors["whenBucket"] ? (
            <p className="mt-1 text-base font-semibold text-emergency">{errors["whenBucket"]}</p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {whenBuckets.map((w) => (
              <label
                key={w.id}
                id={w === whenBuckets[0] ? "whenBucket" : undefined}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.whenBucket === w.id
                    ? "border-brand-blue bg-surface-grey"
                    : boxTone(!!errors["whenBucket"])
                }`}
              >
                <input
                  type="radio"
                  name="whenBucket"
                  value={w.id}
                  checked={report.whenBucket === w.id}
                  onChange={() => update({ whenBucket: w.id })}
                  className="size-5 accent-[var(--brand-blue)]"
                />
                <span className="text-lg font-semibold text-foreground">{w.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field id="when-date" label="The exact date, if you know it" optional>
              <input
                id="when-date"
                type="date"
                value={report.whenDate}
                onChange={(e) => update({ whenDate: e.target.value })}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
            <Field id="content-link" label="Any number, link or app name involved" optional>
              <input
                id="content-link"
                value={report.contentLink}
                onChange={(e) => update({ contentLink: e.target.value })}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
          </div>
        </fieldset>

        <fieldset className="rounded-sm border-2 border-border p-5">
          <legend className={`text-lg font-semibold ${labelTone(!!errors["suspectKnown"])}`}>
            Do you know who contacted you?
          </legend>
          {errors["suspectKnown"] ? (
            <p className="mt-1 text-base font-semibold text-emergency">{errors["suspectKnown"]}</p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {whoOptions.map((w) => (
              <label
                key={w.id}
                id={w === whoOptions[0] ? "suspectKnown" : undefined}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  report.suspectKnown === w.id
                    ? "border-brand-blue bg-surface-grey"
                    : boxTone(!!errors["suspectKnown"])
                }`}
              >
                <input
                  type="radio"
                  name="suspectKnown"
                  value={w.id}
                  checked={report.suspectKnown === w.id}
                  onChange={() => update({ suspectKnown: w.id })}
                  className="size-5 accent-[var(--brand-blue)]"
                />
                <span className="text-lg font-semibold text-foreground">{w.label}</span>
              </label>
            ))}
          </div>

          {report.suspectKnown === "known" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="suspect-name" label="Their name" optional>
                <input
                  id="suspect-name"
                  value={report.suspectName}
                  onChange={(e) => update({ suspectName: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
              <Field id="suspect-phone" label="Their phone number" optional>
                <input
                  id="suspect-phone"
                  value={report.suspectPhone}
                  onChange={(e) => update({ suspectPhone: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
            </div>
          ) : null}

          {report.suspectKnown === "stranger" ? (
            <div className="mt-4">
              <Field id="suspect-handle" label="Any username, number or profile link they used" optional>
                <input
                  id="suspect-handle"
                  value={report.suspectHandle}
                  onChange={(e) => update({ suspectHandle: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
            </div>
          ) : null}
        </fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link to="/" className="font-semibold text-brand-blue underline">
            Back to start
          </Link>
        </div>
      </form>
    </Page>
  );
}
