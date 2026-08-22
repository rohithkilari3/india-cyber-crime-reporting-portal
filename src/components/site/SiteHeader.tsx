import { Link } from "@tanstack/react-router";
import { Phone, LogOut, Shield, Type, Contrast } from "lucide-react";
import { useA11y, type FontScale } from "@/lib/a11y-settings";
import { cn } from "@/lib/utils";

const scales: { value: FontScale; label: string; sr: string }[] = [
  { value: 100, label: "A", sr: "Normal text size" },
  { value: 125, label: "A+", sr: "Larger text size, 125 percent" },
  { value: 150, label: "A++", sr: "Largest text size, 150 percent" },
];

function leaveSite() {
  // Replace the current entry so this page is not left in the back history.
  window.location.replace("https://www.google.com");
}

export function SiteHeader() {
  const { fontScale, setFontScale, highContrast, toggleHighContrast } = useA11y();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-navy bg-background">
      <div className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="size-5 shrink-0" aria-hidden="true" />
            <span>Government of India — report cyber crime</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Text size"
            >
              <Type className="mr-1 size-4" aria-hidden="true" />
              {scales.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setFontScale(s.value)}
                  aria-pressed={fontScale === s.value}
                  className={cn(
                    "min-h-11 min-w-11 rounded-sm border px-2 text-sm font-semibold",
                    fontScale === s.value
                      ? "border-navy-foreground bg-background text-navy"
                      : "border-navy-foreground/60 text-navy-foreground hover:bg-navy-foreground/10",
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
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-navy-foreground/60 px-3 text-sm font-semibold hover:bg-navy-foreground/10"
            >
              <Contrast className="size-4" aria-hidden="true" />
              High contrast: {highContrast ? "on" : "off"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-sm bg-navy text-navy-foreground"
          >
            <Shield className="size-6" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-navy">Cyber Crime Help</span>
            <span className="block text-sm text-muted-foreground">
              National reporting service
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
          <button
            type="button"
            onClick={leaveSite}
            className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy px-4 text-base font-semibold text-navy hover:bg-surface-grey"
          >
            <LogOut className="size-5" aria-hidden="true" />
            Leave this site
          </button>
        </div>
      </div>
    </header>
  );
}
