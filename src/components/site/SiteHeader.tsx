import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  Shield,
  Type,
  Contrast,
  Globe,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useA11y, type FontScale } from "@/lib/a11y-settings";
import { CHANGE_LANGUAGE_LABEL, LANGUAGES, useLanguage, type LanguageCode } from "@/lib/language";
import { cn } from "@/lib/utils";

const scales: { value: FontScale; label: string; sr: string }[] = [
  { value: 87.5, label: "A-", sr: "Compact text size, 87 percent" },
  { value: 100, label: "A", sr: "Normal text size" },
  { value: 125, label: "A+", sr: "Larger text size, 125 percent" },
  { value: 150, label: "A++", sr: "Largest text size, 150 percent" },
];

export const primaryNav = [
  { to: "/" as const, label: "Home" },
  { to: "/report/financial/verify" as const, label: "Money was stolen" },
  { to: "/report/safety" as const, label: "Threats or abuse" },
  { to: "/report-suspect" as const, label: "Report a suspect" },
  { to: "/report-abuse-social-media" as const, label: "Social media abuse" },
  { to: "/cyber-volunteers" as const, label: "Cyber volunteers" },
  { to: "/learning-corner" as const, label: "Learning corner" },
  { to: "/track" as const, label: "My reports" },
  { to: "/contact" as const, label: "Contact us" },
];

export const socialLinks = [
  { href: "https://www.facebook.com/CyberDost", label: "Facebook", Icon: Facebook },
  { href: "https://twitter.com/CyberDost", label: "X (Twitter)", Icon: Twitter },
  { href: "https://www.instagram.com/cyberdosti4c", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/cyberdosti4c", label: "LinkedIn", Icon: Linkedin },
];

/** Language, text size and contrast. Rendered inline on desktop, stacked in the menu on mobile. */
function AccessibilityControls({ stacked }: { stacked?: boolean }) {
  const { fontScale, setFontScale, highContrast, toggleHighContrast } = useA11y();
  const { language, setLanguage } = useLanguage();
  const selectId = stacked ? "language-select-mobile" : "language-select";

  return (
    <div className={cn("flex gap-2", stacked ? "flex-col items-stretch" : "items-center")}>
      <div className={cn("relative", stacked ? "" : "w-60")}>
        <label htmlFor={selectId} className="sr-only">
          {CHANGE_LANGUAGE_LABEL[language]} - change language
        </label>
        <Globe
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy"
          aria-hidden="true"
        />
        <select
          id={selectId}
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="h-11 w-full appearance-none rounded-sm border border-border bg-background pl-9 pr-8 text-sm font-semibold text-navy hover:bg-surface-grey"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.native} - {l.english}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-navy"
        >
          ▾
        </span>
      </div>

      <div
        className={cn(
          "flex h-11 items-center gap-1 rounded-sm border border-border px-1.5",
          stacked && "justify-center",
        )}
        role="group"
        aria-label="Text size"
      >
        <Type className="mx-1 size-4 shrink-0 text-navy" aria-hidden="true" />
        {scales.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setFontScale(s.value)}
            aria-pressed={fontScale === s.value}
            className={cn(
              "h-8 min-w-8 rounded-sm px-2 text-sm font-semibold",
              fontScale === s.value
                ? "bg-navy text-navy-foreground"
                : "text-navy hover:bg-surface-grey",
            )}
          >
            <span aria-hidden="true">{s.label}</span>
            <span className="sr-only">{s.sr}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-sm border border-border px-3 text-sm font-semibold text-navy hover:bg-surface-grey",
          highContrast && "border-navy bg-navy text-navy-foreground",
          stacked && "justify-center",
        )}
      >
        <Contrast className="size-4 shrink-0" aria-hidden="true" />
        High contrast: {highContrast ? "on" : "off"}
      </button>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <header className="border-b-2 border-navy bg-background">
      {/* Government identity strip - mirrors the official portal masthead. */}
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5">
          <p className="text-[11px] leading-snug sm:text-sm">
            <span className="sm:border-r sm:border-navy-foreground/40 sm:pr-3">
              Government Website (Prototype)
            </span>
          </p>
          <ul className="flex items-center gap-1">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-8 items-center justify-center rounded-sm hover:bg-navy-foreground/15"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-navy text-navy-foreground"
            >
              <Shield className="size-6" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-xs text-muted-foreground sm:text-sm">
                राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल
              </span>
              <span className="block text-base font-bold text-navy sm:text-lg">
                National Cyber Crime Reporting Portal (Prototype - Not Official Website)
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm border-2 border-navy px-3 text-base font-semibold text-navy hover:bg-surface-grey lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            Menu
          </button>
        </div>

        {/* Action row: full-width helpline on mobile, inline controls from large screens up. */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <a
            href="tel:1930"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm border-2 border-emergency bg-emergency-tint px-4 text-base font-bold text-emergency sm:w-auto sm:justify-start"
          >
            <Phone className="size-5" aria-hidden="true" />
            Call 1930 now
            <span className="sr-only"> - free 24 hour cyber fraud helpline</span>
          </a>
          <div className="hidden lg:block">
            <AccessibilityControls />
          </div>
        </div>

        {language !== "en" ? (
          <p aria-live="polite" className="mt-3 rounded-sm border-2 border-border bg-surface-grey p-3 text-sm">
            You chose {LANGUAGES.find((l) => l.code === language)?.native}. Translated pages are
            being added - content is shown in English for now.
          </p>
        ) : null}
      </div>

      <div
        id="primary-navigation"
        className={cn("border-t bg-background lg:block", menuOpen ? "block" : "hidden")}
      >
        <nav aria-label="Primary">
          <ul className="mx-auto flex max-w-6xl flex-col gap-0 px-4 lg:flex-row lg:flex-wrap lg:gap-1">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "border-brand-blue text-brand-blue" }}
                  inactiveProps={{ className: "border-transparent text-navy" }}
                  className="flex min-h-11 items-center border-b-4 px-2 text-sm font-semibold hover:bg-surface-grey"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mx-auto max-w-6xl border-t px-4 py-4 lg:hidden">
          <AccessibilityControls stacked />
        </div>
      </div>
    </header>
  );
}
