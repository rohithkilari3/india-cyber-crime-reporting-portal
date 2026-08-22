import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, FileClock, FileText, Smartphone, Undo2 } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/my-reports")({
  head: () => ({
    meta: [
      { title: "My reports — unfinished reports, withdrawals and contact number" },
      {
        name: "description",
        content:
          "Continue a report you started, withdraw a report you no longer want investigated, or change the mobile number we use to reach you.",
      },
      { property: "og:title", content: "My reports" },
      {
        property: "og:description",
        content:
          "Continue an unfinished report, withdraw a report, or update the mobile number on your reports.",
      },
    ],
  }),
  component: MyReports,
});

type TabId = "unfinished" | "withdraw" | "mobile";

const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
  { id: "unfinished", label: "Unfinished reports", icon: FileText },
  { id: "withdraw", label: "Withdraw a report", icon: Undo2 },
  { id: "mobile", label: "Change my mobile number", icon: Smartphone },
];

const drafts = [
  {
    ref: "NCRP-2026-4471230",
    started: "Started 20 Aug 2026, 9:14 pm",
    about: "Money was stolen — UPI payment, ₹18,000",
    missing: "Still needs: your state and a mobile number",
  },
];

function MyReports() {
  const [tab, setTab] = useState<TabId>("unfinished");
  const [withdrawRef, setWithdrawRef] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");
  const [withdrawDone, setWithdrawDone] = useState(false);
  const [oldMobile, setOldMobile] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [mobileDone, setMobileDone] = useState(false);

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">My reports</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Pick up where you left off, ask us to stop working on a report, or change the number we use
        to reach you. To see the progress of a finished report, use{" "}
        <Link to="/track" className="font-semibold text-brand-blue underline">
          Check my report
        </Link>
        .
      </p>

      <div role="tablist" aria-label="My reports sections" className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex min-h-12 items-center gap-2 rounded-sm border-2 px-4 text-base font-semibold ${
              tab === t.id
                ? "border-brand-blue bg-surface-grey text-brand-blue"
                : "border-border text-navy hover:bg-surface-grey"
            }`}
          >
            <t.icon className="size-5" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "unfinished" ? (
        <section
          role="tabpanel"
          id="panel-unfinished"
          aria-labelledby="tab-unfinished"
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-navy">Reports you started but didn&apos;t send</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Every unfinished report gets its own reference number straight away, so you or someone
            helping you can quote it — even before it is submitted.
          </p>
          <ul className="mt-5 space-y-4">
            {drafts.map((d) => (
              <li key={d.ref} className="rounded-sm border-2 border-border p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Reference number
                </p>
                <p className="text-xl font-bold text-navy">{d.ref}</p>
                <p className="mt-2 text-base">{d.about}</p>
                <p className="mt-1 text-base text-muted-foreground">{d.started}</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-caution">
                  <FileClock className="size-5" aria-hidden="true" />
                  {d.missing}
                </p>
                <Link
                  to="/report/financial/what-happened"
                  className="mt-4 inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-5 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                >
                  Continue this report
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-sm border-2 border-border bg-surface-grey p-5">
            <p className="text-base text-muted-foreground">
              Nothing else here yet. When you leave a report part-way through, it appears in this
              list for 30 days and then is deleted.
            </p>
          </div>
        </section>
      ) : null}

      {tab === "withdraw" ? (
        <section role="tabpanel" id="panel-withdraw" aria-labelledby="tab-withdraw" className="mt-8">
          <h2 className="text-2xl font-bold text-navy">Withdraw a report</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Use this if you reported something by mistake, or the matter has been resolved. An
            officer reviews every withdrawal — you will be told the outcome by SMS.
          </p>
          <form
            className="mt-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setWithdrawDone(true);
            }}
          >
            <div>
              <label htmlFor="wd-ref" className="block text-lg font-semibold text-navy">
                Acknowledgement number
              </label>
              <p id="wd-hint" className="text-base text-muted-foreground">
                For example NCRP-2026-1234567.
              </p>
              <input
                id="wd-ref"
                required
                aria-describedby="wd-hint"
                value={withdrawRef}
                onChange={(e) => setWithdrawRef(e.target.value)}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <div>
              <label htmlFor="wd-reason" className="block text-lg font-semibold text-navy">
                Why do you want to withdraw it?
              </label>
              <textarea
                id="wd-reason"
                rows={4}
                required
                value={withdrawReason}
                onChange={(e) => setWithdrawReason(e.target.value)}
                className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
            >
              Request withdrawal
            </button>
          </form>
          <div aria-live="polite" className="mt-6">
            {withdrawDone ? (
              <div className="flex gap-3 rounded-sm border-2 border-success bg-success-tint p-4">
                <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
                <p className="font-semibold text-success">
                  Withdrawal requested. We&apos;ll text you once an officer has reviewed it.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {tab === "mobile" ? (
        <section role="tabpanel" id="panel-mobile" aria-labelledby="tab-mobile" className="mt-8">
          <h2 className="text-2xl font-bold text-navy">Change my mobile number</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Changed your SIM or lost your phone? Update the number so updates about your reports
            reach you. We send a code to the new number to confirm it works.
          </p>
          <form
            className="mt-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setMobileDone(true);
            }}
          >
            <div>
              <label htmlFor="old-mobile" className="block text-lg font-semibold text-navy">
                The number on your reports now
              </label>
              <input
                id="old-mobile"
                required
                inputMode="numeric"
                value={oldMobile}
                onChange={(e) => setOldMobile(e.target.value)}
                className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <div>
              <label htmlFor="new-mobile" className="block text-lg font-semibold text-navy">
                Your new number
              </label>
              <input
                id="new-mobile"
                required
                inputMode="numeric"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
                className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
            >
              Send a code to the new number
            </button>
          </form>
          <div aria-live="polite" className="mt-6">
            {mobileDone ? (
              <div className="flex gap-3 rounded-sm border-2 border-success bg-success-tint p-4">
                <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
                <p className="font-semibold text-success">
                  Code sent to your new number. Enter it there to finish the change.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </Page>
  );
}
