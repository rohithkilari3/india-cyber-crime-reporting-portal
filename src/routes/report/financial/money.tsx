import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, Banknote, Info } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { useReportFlow } from "@/lib/report-flow";

export const Route = createFileRoute("/report/financial/money")({
  head: () => ({
    meta: [
      { title: "Money and payment details — Report stolen money" },
      {
        name: "description",
        content:
          "The amount, the account the money left from and any transaction reference. These details are what let banks freeze the money.",
      },
      { property: "og:title", content: "Money and payment details" },
      {
        property: "og:description",
        content: "The account and transaction details banks need to try and hold your money.",
      },
    ],
  }),
  component: MoneyStep,
});

const accountTypes = [
  "Bank account",
  "Debit card",
  "Credit card",
  "UPI ID",
  "Wallet (Paytm, PhonePe and similar)",
  "Other",
];

function MoneyStep() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!report.amount.trim()) {
      setError("Enter roughly how much money was taken — an approximate figure is fine.");
      document.getElementById("money-error")?.focus();
      return;
    }
    if (!report.victimBank.trim()) {
      setError("Tell us which bank, wallet or app the money left from.");
      document.getElementById("money-error")?.focus();
      return;
    }
    setError("");
    navigate({ to: "/report/financial/suspect" });
  }

  return (
    <Page>
      <StepIndicator current={3} />
      <h1 className="text-3xl font-bold text-navy">Where did the money go from?</h1>
      <p className="mt-3 text-base text-muted-foreground">
        This is the part banks act on. With the account and the transaction reference, the money
        can sometimes be held before it is withdrawn.
      </p>

      <div className="mt-6 flex gap-3 rounded-sm border-2 border-border bg-surface-grey p-4">
        <Info className="size-5 shrink-0 text-brand-blue" aria-hidden="true" />
        <p className="text-base text-muted-foreground">
          Never type your full card number, PIN, CVV or any password. We only ask for the last few
          digits — no genuine officer will ever ask for more.
        </p>
      </div>

      {error ? (
        <div
          id="money-error"
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <AlertCircle className="size-5 shrink-0 text-emergency" aria-hidden="true" />
          <p className="font-semibold text-emergency">{error}</p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-8">
        <section className="rounded-sm border-2 border-border p-5">
          <div className="flex items-center gap-2">
            <Banknote className="size-6 text-navy" aria-hidden="true" />
            <h2 className="text-xl font-bold text-navy">Your money</h2>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="amount" className="block text-lg font-semibold text-navy">
                How much was taken, in rupees?
              </label>
              <p id="amount-hint" className="text-base text-muted-foreground">
                An approximate total is fine. Add up all the payments if there were several.
              </p>
              <input
                id="amount"
                inputMode="numeric"
                required
                aria-describedby="amount-hint"
                value={report.amount}
                onChange={(e) => update({ amount: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div>
              <label htmlFor="victim-bank" className="block text-lg font-semibold text-navy">
                Which bank, wallet or app did the money leave from?
              </label>
              <p id="victim-bank-hint" className="text-base text-muted-foreground">
                For example: State Bank of India, HDFC, PhonePe, Paytm.
              </p>
              <input
                id="victim-bank"
                required
                aria-describedby="victim-bank-hint"
                value={report.victimBank}
                onChange={(e) => update({ victimBank: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div>
              <label htmlFor="account-type" className="block text-lg font-semibold text-navy">
                What was used?
              </label>
              <select
                id="account-type"
                value={report.victimAccountType}
                onChange={(e) => update({ victimAccountType: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input bg-background px-3 text-lg"
              >
                <option value="">Choose one</option>
                {accountTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="account-last" className="block text-lg font-semibold text-navy">
                Last 4 digits of the account or card, or your UPI ID
              </label>
              <p id="account-last-hint" className="text-base text-muted-foreground">
                Never the full card number. Your UPI ID, like name@bank, is safe to give.
              </p>
              <input
                id="account-last"
                aria-describedby="account-last-hint"
                value={report.victimAccountLast}
                onChange={(e) => update({ victimAccountLast: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-md rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>
          </div>
        </section>

        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-xl font-bold text-navy">The transactions</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Copy these from your bank SMS or app history if you can. If you can&apos;t find them,
            continue — your bank statement can be added later.
          </p>

          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="txn-date" className="block text-lg font-semibold text-navy">
                Date of the first payment (optional)
              </label>
              <input
                id="txn-date"
                type="date"
                value={report.txnDate}
                onChange={(e) => update({ txnDate: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div>
              <label htmlFor="txn-count" className="block text-lg font-semibold text-navy">
                How many payments went out? (optional)
              </label>
              <input
                id="txn-count"
                inputMode="numeric"
                value={report.txnCount}
                onChange={(e) => update({ txnCount: e.target.value })}
                className="mt-2 min-h-12 w-full max-w-24 rounded-sm border-2 border-input px-3 text-lg"
              />
            </div>

            <div>
              <label htmlFor="txn-refs" className="block text-lg font-semibold text-navy">
                Transaction or UTR reference numbers (optional)
              </label>
              <p id="txn-refs-hint" className="text-base text-muted-foreground">
                One per line. These are in your bank SMS — they are how a bank finds the exact
                payment to freeze.
              </p>
              <textarea
                id="txn-refs"
                rows={3}
                aria-describedby="txn-refs-hint"
                value={report.txnRefs}
                onChange={(e) => update({ txnRefs: e.target.value })}
                className="mt-2 w-full rounded-sm border-2 border-input p-3 text-lg"
              />
            </div>

            <fieldset>
              <legend className="text-lg font-semibold text-navy">
                Have you told your bank yet?
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {["Yes", "No", "Not sure"].map((v) => (
                  <label
                    key={v}
                    className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 text-lg font-semibold hover:bg-surface-grey ${
                      report.bankInformed === v ? "border-brand-blue bg-surface-grey" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bankInformed"
                      value={v}
                      checked={report.bankInformed === v}
                      onChange={() => update({ bankInformed: v })}
                      className="size-5 accent-[var(--brand-blue)]"
                    />
                    {v}
                  </label>
                ))}
              </div>
              {report.bankInformed === "No" ? (
                <p className="mt-3 rounded-sm border-2 border-caution bg-caution-tint p-3 text-base">
                  Call your bank as soon as you finish here, and ask them to block the account or
                  card. You can also call <span className="font-bold">1930</span> right now.
                </p>
              ) : null}
            </fieldset>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
          >
            Continue
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          <Link
            to="/report/financial/what-happened"
            className="font-semibold text-brand-blue underline"
          >
            Back to what happened
          </Link>
        </div>
      </form>
    </Page>
  );
}
