import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  Shield,
  Type,
  Contrast,
  Languages,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useA11y, type FontScale } from "@/lib/a11y-settings";
import { cn } from "@/lib/utils";

const scales: { value: FontScale; label: string; sr: string }[] = [
  { value: 87.5, label: "A-", sr: "Compact text size, 87 percent" },
  { value: 100, label: "A", sr: "Normal text size" },
  { value: 125, label: "A+", sr: "Larger text size, 125 percent" },
  { value: 150, label: "A++", sr: "Largest text size, 150 percent" },
];

export const primaryNav = [
  { to: "/" as const, label: "Home" },
  { to: "/report/financial/what-happened" as const, label: "Report fraud" },
  { to: "/report/safety" as const, label: "Report threats or abuse" },
  { to: "/report-suspect" as const, label: "Report a suspect" },
  { to: "/report-abuse-social-media" as const, label: "Social media abuse" },
  { to: "/track" as const, label: "Check my report" },
  { to: "/cyber-volunteers" as const, label: "Cyber volunteers" },
  { to: "/learning-corner" as const, label: "Learning corner" },
  { to: "/faq" as const, label: "Help and FAQs" },
  { to: "/contact" as const, label: "Contact us" },
];

export const socialLinks = [
  { href: "https://www.facebook.com/CyberDost", label: "Facebook", Icon: Facebook },
  { href: "https://twitter.com/CyberDost", label: "X (Twitter)", Icon: Twitter },
  { href: "https://www.instagram.com/cyberdosti4c", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/cyberdosti4c", label: "LinkedIn", Icon: Linkedin },
];

export function SiteHeader() {
  const { fontScale, setFontScale, highContrast, toggleHighContrast } = useA11y();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hindi, setHindi] = useState(false);

  return (
    <header className="border-b-2 border-navy bg-background">
      {/* Government identity strip — mirrors the official portal masthead. */}
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1.5">
          <p className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="border-r border-navy-foreground/40 pr-3">
              भारत सरकार <span className="hidden sm:inline">| Government of India</span>
            </span>
            <span>
              गृह मंत्रालय <span className="hidden sm:inline">| Ministry of Home Affairs</span>
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

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-sm bg-navy text-navy-foreground"
          >
            <Shield className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm text-muted-foreground">
              राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल
            </span>
            <span className="block text-lg font-bold text-navy">
              National Cyber Crime Reporting Portal
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="tel:1930"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-emergency bg-emergency-tint px-4 text-base font-bold text-emergency"
          >
            <Phone className="size-5" aria-hidden="true" />
            Call 1930 now
            <span className="sr-only">— free 24 hour cyber fraud helpline</span>
          </a>

          {/* Language: state the action, not just the target language. */}
          <button
            type="button"
            onClick={() => setHindi((v) => !v)}
            className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy px-3 text-sm font-semibold text-navy hover:bg-surface-grey"
          >
            <Languages className="size-5" aria-hidden="true" />
            {hindi ? "Read in English" : "हिन्दी में पढ़ें · Read in Hindi"}
          </button>

          {/* Text size and contrast sit with the other page-level controls. */}
          <div
            className="inline-flex min-h-12 items-center gap-1 rounded-sm border-2 border-border px-2"
            role="group"
            aria-label="Text size"
          >
            <Type className="mr-1 size-4 text-navy" aria-hidden="true" />
            {scales.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setFontScale(s.value)}
                aria-pressed={fontScale === s.value}
                className={cn(
                  "min-h-9 min-w-9 rounded-sm border px-2 text-sm font-semibold",
                  fontScale === s.value
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-border text-navy hover:bg-surface-grey",
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
            className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-border px-3 text-sm font-semibold text-navy hover:bg-surface-grey"
          >
            <Contrast className="size-4" aria-hidden="true" />
            High contrast: {highContrast ? "on" : "off"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy px-4 text-base font-semibold text-navy hover:bg-surface-grey lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            Menu
          </button>
        </div>
      </div>

      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={cn("border-t bg-background lg:block", menuOpen ? "block" : "hidden")}
      >
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
    </header>
  );
}
