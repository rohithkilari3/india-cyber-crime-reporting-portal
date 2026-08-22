import { Link } from "@tanstack/react-router";
import { Phone, ChevronRight, ShieldCheck } from "lucide-react";

export function HomeBanner() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* Decorative shield-grid artwork — calm, geometric, no threat imagery. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[70%] opacity-25"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="banner-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="currentColor" className="text-navy-foreground" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#banner-dots)" />
        <path d="M420 40 L560 100 V220 C560 300 490 350 420 375 C350 350 280 300 280 220 V100 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M420 90 L515 130 V215 C515 268 468 302 420 320 C372 302 325 268 325 215 V130 Z" fill="currentColor" opacity="0.14" />
        <circle cx="120" cy="90" r="60" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <circle cx="160" cy="330" r="34" fill="currentColor" opacity="0.12" />
      </svg>

      {/* Tricolour accent rule */}
      <div aria-hidden="true" className="flex h-1.5 w-full">
        <span className="h-full flex-1 bg-[#FF9933]" />
        <span className="h-full flex-1 bg-white" />
        <span className="h-full flex-1 bg-[#138808]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-sm border border-navy-foreground/40 px-3 py-1 text-sm font-semibold">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Official service of the Ministry of Home Affairs
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Something happened online.
          <span className="block text-[#FFD24C]">We&apos;ll help you sort it out.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-navy-foreground/90">
          Report fraud, threats or abuse in your own words — no legal terms, no forms you need help
          to understand. It takes a few minutes and it is free.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/report/financial/what-happened"
            className="inline-flex min-h-14 items-center gap-2 rounded-sm bg-background px-6 text-lg font-bold text-navy hover:bg-surface-grey"
          >
            Report what happened
            <ChevronRight className="size-5" aria-hidden="true" />
          </Link>
          <a
            href="tel:1930"
            className="inline-flex min-h-14 items-center gap-2 rounded-sm border-2 border-navy-foreground px-6 text-lg font-bold text-navy-foreground hover:bg-navy-foreground/10"
          >
            <Phone className="size-5" aria-hidden="true" />
            Call 1930 — free, 24 hours
          </a>
        </div>

        <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-navy-foreground/25 pt-6 sm:grid-cols-3">
          {[
            { k: "Under 5 minutes", v: "to file a basic report" },
            { k: "24 × 7", v: "helpline in many languages" },
            { k: "Golden hour", v: "report fast to freeze the money" },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-xl font-bold">{s.k}</dt>
              <dd className="mt-1 text-sm text-navy-foreground/85">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
