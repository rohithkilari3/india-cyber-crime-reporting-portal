import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, EyeOff, UserCheck } from "lucide-react";
import { Page } from "@/components/site/Page";
import { makeAcknowledgement } from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety")({
  head: () => ({
    meta: [
      { title: "Report threats, harassment or abuse — Cyber Crime Help" },
      {
        name: "description",
        content:
          "Tell us in your own words what happened. Report anonymously, or give your details so you can follow the case.",
      },
      { property: "og:title", content: "Report threats, harassment or abuse" },
      {
        property: "og:description",
        content: "Tell us in your own words. Report anonymously or with your details.",
      },
    ],
  }),
  component: Safety,
});

function Safety() {
  const [story, setStory] = useState("");
  const [mode, setMode] = useState<"anonymous" | "tracked">("");
  const [ack, setAck] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setAck(makeAcknowledgement());
  }

  if (ack) {
    return (
      <Page>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-9 text-success" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-navy">We&apos;ve received your report</h1>
        </div>
        <div className="mt-6 rounded-sm border-2 border-success bg-success-tint p-6">
          <h2 className="text-lg font-semibold text-success">Your acknowledgement number</h2>
          <p className="mt-2 text-3xl font-bold text-navy">{ack}</p>
          <p className="mt-2 text-base text-foreground">
            Keep this safe. If you reported anonymously, this number is the only way to refer to
            your case.
          </p>
        </div>
        <p className="mt-8">
          <Link to="/" className="font-semibold text-brand-blue underline">
            Back to home
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Tell us in your own words what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You don&apos;t need to choose a legal category. Write as much or as little as you want —
        we&apos;ll work out the rest.
      </p>
      <p className="mt-3 text-base text-muted-foreground">
        If you or your child are in immediate danger, call{" "}
        <a href="tel:112" className="font-semibold text-brand-blue underline">
          112
        </a>{" "}
        first.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-8">
        <div>
          <label htmlFor="story" className="block text-lg font-semibold text-navy">
            What happened?
          </label>
          <textarea
            id="story"
            rows={7}
            required
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
          />
        </div>

        <fieldset>
          <legend className="text-lg font-semibold text-navy">
            How would you like to report this?
          </legend>
          <div className="mt-4 space-y-3">
            <label
              className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                mode === "anonymous" ? "border-brand-blue bg-surface-grey" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="mode"
                checked={mode === "anonymous"}
                onChange={() => setMode("anonymous")}
                className="mt-1 size-5 accent-[var(--brand-blue)]"
              />
              <span>
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <EyeOff className="size-5 text-navy" aria-hidden="true" />
                  Anonymously
                </span>
                <span className="block text-base text-muted-foreground">
                  We won&apos;t ask who you are. You won&apos;t be able to get updates or add to
                  the report later.
                </span>
              </span>
            </label>
            <label
              className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                mode === "tracked" ? "border-brand-blue bg-surface-grey" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="mode"
                checked={mode === "tracked"}
                onChange={() => setMode("tracked")}
                className="mt-1 size-5 accent-[var(--brand-blue)]"
              />
              <span>
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <UserCheck className="size-5 text-navy" aria-hidden="true" />
                  With my details
                </span>
                <span className="block text-base text-muted-foreground">
                  You can follow progress, add evidence later, and an officer can contact you. Your
                  details are not shown to anyone you report.
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!story || !mode}
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover disabled:opacity-50"
        >
          Send this report
        </button>
      </form>
    </Page>
  );
}
