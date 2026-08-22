import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Tell us what worked and what did not while using this portal. Feedback about the website only — to report a crime, use the reporting pages.",
      },
      { property: "og:title", content: "Give feedback on this portal" },
      {
        property: "og:description",
        content: "Two minutes of feedback helps us make reporting easier for the next person.",
      },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const [sent, setSent] = useState(false);
  const [about, setAbout] = useState("using-the-site");

  return (
    <Page>
      <MessageSquare className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
      <h1 className="mt-3 text-3xl font-bold text-navy">Feedback</h1>
      <p className="mt-3 text-base text-muted-foreground">
        This form is for feedback about the website. It is not a way to report a crime or to chase an
        existing report — for that, call 1930 or use Check my report.
      </p>

      {sent ? (
        <div className="mt-8 rounded-sm border-2 border-success bg-success-tint p-6">
          <CheckCircle2 className="size-7 text-success" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-bold text-navy">Thank you</h2>
          <p className="mt-2 text-base">
            Your feedback has been recorded. We read everything, though we cannot reply to each note.
          </p>
        </div>
      ) : (
        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="fb-about" className="block text-base font-semibold text-navy">
              What is your feedback about?
            </label>
            <select
              id="fb-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 min-h-12 w-full rounded-sm border-2 border-input bg-background px-3 text-base"
            >
              <option value="using-the-site">Using the website</option>
              <option value="wording">Wording I did not understand</option>
              <option value="accessibility">Accessibility problem</option>
              <option value="content">Something is missing or wrong</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="fb-detail" className="block text-base font-semibold text-navy">
              Tell us more
            </label>
            <textarea
              id="fb-detail"
              required
              rows={6}
              className="mt-2 w-full rounded-sm border-2 border-input px-3 py-2 text-base"
            />
          </div>
          <div>
            <label htmlFor="fb-email" className="block text-base font-semibold text-navy">
              Email address <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id="fb-email"
              type="email"
              className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Send feedback
          </button>
        </form>
      )}
    </Page>
  );
}
