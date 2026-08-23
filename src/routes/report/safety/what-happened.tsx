import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { SAFETY_STEPS } from "@/components/site/safety-steps";
import { ErrorSummary, Field, boxTone, focusErrorSummary, inputClass, labelTone } from "@/components/site/form-ui";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety/what-happened")({
  head: () => ({
    meta: [
      { title: "Tell us what happened - Report threats, harassment or abuse" },
      {
        name: "description",
        content:
          "Choose the category closest to what happened and describe it in your own words. No legal terms required.",
      },
      { property: "og:title", content: "Tell us what happened" },
      {
        property: "og:description",
        content: "Choose a plain-language category and describe what happened in your own words.",
      },
    ],
  }),
  component: WhatHappened,
});

const kinds = [
  {
    id: "sexual-content",
    label: "Private or sexual photos or videos of me were shared",
    hint: "Shared without permission, or edited/morphed images (officially: sexually obscene material)",
  },
  {
    id: "sexually-explicit",
    label: "Someone shared or made me appear in a sexually explicit video or act",
    hint: "Officially known as a sexually explicit act",
  },
  {
    id: "rape-content",
    label: "Content showing rape or sexual assault, of me or someone else",
    hint: "Officially: rape/gang rape sexually abusive content (RGR)",
  },
  {
    id: "child",
    label: "Content or contact involving a child",
    hint: "Child sexual abuse or exploitation material (CSEAM), grooming, or an adult contacting a child",
  },
  {
    id: "sextortion",
    label: "Someone is blackmailing me over photos, videos or a video call",
    hint: "Also called sextortion - demands for money or more images",
  },
  {
    id: "threat",
    label: "Someone is threatening me or my family",
    hint: "Threats of violence, harm or exposure",
  },
  {
    id: "bullying",
    label: "Bullying, abuse or hateful messages",
    hint: "Repeated abusive messages, comments or calls",
  },
  {
    id: "stalking",
    label: "Someone is stalking or watching me online",
    hint: "Constant messages, tracking, or following across accounts",
  },
  {
    id: "impersonation",
    label: "A fake profile is pretending to be me",
    hint: "Or my photos are being used on someone else's account",
  },
  {
    id: "hacked",
    label: "My account was taken over",
    hint: "Email, social media or messaging account I can no longer access",
  },
  { id: "other", label: "Something else", hint: "Tell us in your own words below" },
];

const places = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Telegram",
  "Snapchat",
  "X (Twitter)",
  "YouTube",
  "A dating app",
  "A phone call or SMS",
  "Email",
  "A website",
  "Somewhere else",
];

const whenBuckets = [
  { id: "today", label: "Today" },
  { id: "week", label: "In the last 7 days" },
  { id: "month", label: "In the last month" },
  { id: "older", label: "More than a month ago" },
  { id: "ongoing", label: "It is still happening now" },
];

const stillOnlineOptions = ["Yes", "No", "I don't know", "Not content - messages or calls"];

function WhatHappened() {
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
    if (!report.kind) found["kind"] = "Choose the option closest to what happened.";
    if (report.story.trim().length < 50)
      found["story"] = "Describe what happened in at least 50 characters.";
    if (!report.whenBucket) found["when-bucket"] = "Tell us roughly when this happened.";
    if (!report.platform) found["place"] = "Tell us where this happened.";
    if (!report.stillOnline) found["still-online"] = "Tell us whether the content is still online.";
    setErrors(found);
    if (Object.keys(found).length) {
      focusErrorSummary();
      return;
    }
    navigate({ to: "/report/safety/person" });
  }

  return (
    <Page>
      <StepIndicator current={2} steps={SAFETY_STEPS} />
      <h1 className="text-3xl font-bold text-navy">Tell us what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You don&apos;t need to choose a legal category or use the right words. Nothing here is
        shared with the person you are reporting.
      </p>

      {report.draftRef ? (
        <p className="mt-4 rounded-sm border-2 border-success bg-success-tint p-3 text-base font-semibold text-success">
          Saved as {report.draftRef}. You can stop and come back through "My reports".
        </p>
      ) : null}

      <ErrorSummary errors={errors} />

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className={`rounded-sm border-2 p-5 ${boxTone(!!errors["kind"])}`}>
          <fieldset>
            <legend className={`text-lg font-semibold ${labelTone(!!errors["kind"])}`}>
              Which of these is closest?
            </legend>
            <div className="mt-3 space-y-3">
              {kinds.map((k) => (
                <label
                  key={k.id}
                  className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                    report.kind === k.id ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    checked={report.kind === k.id}
                    onChange={() => update({ kind: k.id })}
                    className="mt-1 size-5 accent-[var(--brand-blue)]"
                  />
                  <span>
                    <span className="block text-lg font-semibold">{k.label}</span>
                    <span className="block text-base text-muted-foreground">{k.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <Field
            id="story"
            label="Describe what happened"
            hint="Write as much or as little as you want. Names, dates, what was said, what you were asked for - anything you remember helps. At least 50 characters."
            error={errors["story"]}
          >
            <textarea
              id="story"
              rows={7}
              value={report.story}
              onChange={(e) => update({ story: e.target.value })}
              className={`w-full rounded-sm border-2 p-3 text-lg ${
                errors["story"] ? "border-emergency bg-emergency-tint" : "border-input"
              }`}
            />
          </Field>
        </section>

        <section className={`rounded-sm border-2 p-5 ${boxTone(!!errors["when-bucket"])}`}>
          <fieldset>
            <legend className={`text-lg font-semibold ${labelTone(!!errors["when-bucket"])}`}>
              When did this happen?
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {whenBuckets.map((b) => (
                <label
                  key={b.id}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    report.whenBucket === b.id ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="when"
                    checked={report.whenBucket === b.id}
                    onChange={() => update({ whenBucket: b.id })}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{b.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field id="when-date" label="Exact date, if you remember it" optional>
              <input
                id="when-date"
                type="date"
                value={report.whenDate}
                onChange={(e) => update({ whenDate: e.target.value })}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
            {report.whenBucket === "older" ? (
              <Field
                id="delay"
                label="Why the delay in reporting?"
                hint="No judgement - it helps us ask the platform for older records."
                optional
              >
                <input
                  id="delay"
                  value={report.delayReason}
                  onChange={(e) => update({ delayReason: e.target.value })}
                  className={inputClass(false, "max-w-lg")}
                />
              </Field>
            ) : null}
          </div>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="place" label="Where did this happen?" error={errors["place"]}>
              <select
                id="place"
                value={report.platform}
                onChange={(e) => update({ platform: e.target.value })}
                className={inputClass(!!errors["place"], "max-w-lg")}
              >
                <option value="">Choose one</option>
                {places.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field
              id="link"
              label="Link, profile name or number"
              hint="The single most useful thing you can give us - it is how the account or content is traced."
              optional
            >
              <input
                id="link"
                value={report.contentLink}
                onChange={(e) => update({ contentLink: e.target.value })}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
          </div>

          <fieldset className="mt-6">
            <legend className={`text-lg font-semibold ${labelTone(!!errors["still-online"])}`}>
              Is the content still online?
            </legend>
            <p className="text-base text-muted-foreground">
              If it is, please don&apos;t delete it yet - we need it visible to ask the platform to
              remove it.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {stillOnlineOptions.map((o) => (
                <label
                  key={o}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    report.stillOnline === o ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="still-online"
                    checked={report.stillOnline === o}
                    onChange={() => update({ stillOnline: o })}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link to="/report/safety/start" className="font-semibold text-brand-blue underline">
            Back
          </Link>
        </div>
      </form>
    </Page>
  );
}
