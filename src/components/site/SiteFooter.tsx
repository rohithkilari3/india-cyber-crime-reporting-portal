import { Link } from "@tanstack/react-router";
import { socialLinks } from "@/components/site/SiteHeader";

const columns = [
  {
    title: "Report",
    links: [
      { to: "/report/financial/what-happened" as const, label: "Financial fraud" },
      { to: "/report/safety" as const, label: "Threats, abuse or harassment" },
      { to: "/report-suspect" as const, label: "Report a suspect to I4C" },
      { to: "/report-abuse-social-media" as const, label: "Report abuse to social media" },
      { to: "/gac-appeal" as const, label: "File an appeal with GAC" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/track" as const, label: "Check my report" },
      { to: "/check-suspect" as const, label: "Check a number, link or UPI ID" },
      { to: "/cyber-volunteers" as const, label: "Become a cyber volunteer" },
      { to: "/nodal-officers" as const, label: "State nodal and grievance officers" },
      { to: "/feedback" as const, label: "Give feedback" },
    ],
  },
  {
    title: "Learn",
    links: [
      { to: "/learning-corner" as const, label: "Learning corner" },
      { to: "/faq" as const, label: "Frequently asked questions" },
      { to: "/advisories" as const, label: "Advisories" },
      { to: "/safety-tips" as const, label: "Online safety tips" },
      { to: "/cyber-awareness" as const, label: "Cyber awareness" },
      { to: "/daily-digest" as const, label: "Daily digest" },
      { to: "/media-gallery" as const, label: "Photo, video and radio gallery" },
      { to: "/training-resources" as const, label: "Training resources" },
      { to: "/citizen-manual" as const, label: "Citizen manual" },
    ],
  },
  {
    title: "About this site",
    links: [
      { to: "/contact" as const, label: "Contact us" },
      { to: "/public-notices" as const, label: "Public notices (RTI, CPGRAMS)" },
      { to: "/website-policies" as const, label: "Website policy and privacy" },
      { to: "/website-policies" as const, label: "Disclaimer" },
      { to: "/website-policies" as const, label: "Accessibility statement" },
    ],
  },
];


export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-4 border-navy bg-surface-grey">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-base font-bold text-navy">If you need help right now</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Call{" "}
          <a className="font-semibold text-brand-blue underline" href="tel:1930">
            1930
          </a>{" "}
          — free, 24 hours a day. The sooner you call, the better the chance of stopping the money.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-navy">{col.title}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-brand-blue underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
          <span className="text-sm font-semibold text-navy">Follow CyberDost:</span>
          <ul className="flex gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-11 items-center justify-center rounded-sm border-2 border-navy text-navy hover:bg-background"
                >
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Prototype interface for the National Cyber Crime Reporting Portal, Indian Cyber Crime
          Coordination Centre (I4C), Ministry of Home Affairs. Not the live government service.
        </p>
      </div>
    </footer>
  );
}
