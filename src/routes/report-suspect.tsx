import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, UserSearch } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/report-suspect")({
  head: () => ({
    meta: [
      { title: "Report a suspect to I4C — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Share details of a person, number, account or website you believe is involved in cyber crime. You can do this even if you were not the victim.",
      },
      { property: "og:title", content: "Report a suspect to I4C" },
      {
        property: "og:description",
        content: "Share details of a suspected cyber criminal with the Indian Cyber Crime Coordination Centre.",
      },
    ],
  }),
  component: ReportSuspect,
});

const kinds = [
  { id: "mobile", label: "Mobile number" },
  { id: "upi", label: "UPI ID or bank account" },
  { id: "website", label: "Website or app" },
  { id: "social", label: "Social media profile" },
  { id: "person", label: "A person I can describe" },
];

function ReportSuspect() {
  const [kind, setKind] = useState("mobile");
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <Page>
        <div className="rounded-sm border-2 border-success bg-success-tint p-6">
          <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
          <h1 className="mt-3 text-3xl font-bold text-navy">Thank you — we have your report</h1>
          <p className="mt-3 text-base">
            Your information has been passed to the Indian Cyber Crime Coordination Centre (I4C). You
            do not need to do anything else. We will only contact you if we need more detail.
          </p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <UserSearch className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
      <h1 className="mt-3 text-3xl font-bold text-navy">Report a suspect to I4C</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Use this if you know of someone or something being used for cyber crime — even if nothing
        happened to you. This is not a complaint about your own case; to report what happened to
        you, use “Report fraud” or “Report threats or abuse”.
      </p>

      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <fieldset>
          <legend className="text-lg font-bold text-navy">What are you reporting?</legend>
          <div className="mt-3 space-y-2">
            {kinds.map((k) => (
              <label
                key={k.id}
                className="flex min-h-12 items-center gap-3 rounded-sm border-2 border-border px-4 hover:bg-surface-grey"
              >
                <input
                  type="radio"
                  name="kind"
                  value={k.id}
                  checked={kind === k.id}
                  onChange={() => setKind(k.id)}
                  className="size-5"
                />
                <span className="text-base">{k.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="value" className="block text-base font-semibold text-navy">
            Number, ID, link or name
          </label>
          <input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-base font-semibold text-navy">
            Tell us what they did (optional)
          </label>
          <p id="details-help" className="mt-1 text-sm text-muted-foreground">
            Everyday words are fine. There is no right way to write this.
          </p>
          <textarea
            id="details"
            aria-describedby="details-help"
            rows={5}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="mt-2 w-full rounded-sm border-2 border-input p-3 text-base"
          />
        </div>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Send this to I4C
        </button>
      </form>
    </Page>
  );
}
