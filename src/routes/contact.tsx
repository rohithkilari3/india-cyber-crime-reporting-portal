import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Page } from "@/components/site/Page";
import { socialLinks } from "@/components/site/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Helpline 1930, email support and the address of the Indian Cyber Crime Coordination Centre, plus how to reach your state cyber cell.",
      },
      { property: "og:title", content: "Contact us" },
      {
        property: "og:description",
        content: "Helpline 1930, email support and I4C contact details.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Contact us</h1>
      <p className="mt-3 text-base text-muted-foreground">
        If money has been taken from you, call 1930 first — it is the fastest way to stop it.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-sm border-2 border-emergency bg-emergency-tint p-6">
          <Phone className="size-8 text-emergency" aria-hidden="true" />
          <h2 className="mt-2 text-2xl font-bold text-navy">1930 — cyber fraud helpline</h2>
          <p className="mt-2 text-base">Free, 24 hours a day, every day, in many Indian languages.</p>
          <a
            href="tel:1930"
            className="mt-4 inline-flex min-h-12 items-center rounded-sm bg-emergency px-6 font-bold text-navy-foreground"
          >
            Call 1930 now
          </a>
        </div>

        <div className="rounded-sm border-2 border-border p-6">
          <Mail className="size-7 text-brand-blue" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-bold text-navy">Email</h2>
          <p className="mt-2 text-base">
            <a className="text-brand-blue underline" href="mailto:helpdesk-cybercrime@gov.in">
              helpdesk-cybercrime@gov.in
            </a>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            For help using this portal. Do not send evidence by email.
          </p>
        </div>

        <div className="rounded-sm border-2 border-border p-6">
          <MapPin className="size-7 text-brand-blue" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-bold text-navy">
            Indian Cyber Crime Coordination Centre (I4C)
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Ministry of Home Affairs, Cyber and Information Security Division,
            <br />
            NDCC-II Building, Jai Singh Road, New Delhi 110001
          </p>
        </div>

        <div className="rounded-sm border-2 border-border p-6">
          <Clock className="size-7 text-brand-blue" aria-hidden="true" />
          <h2 className="mt-2 text-xl font-bold text-navy">Your local cyber cell</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Every state and union territory has a cyber crime police station. Reports filed here are
            sent to the right one automatically — you do not need to find it yourself.
          </p>
        </div>
      </div>

      <section className="mt-10 border-t pt-8">
        <h2 className="text-2xl font-bold text-navy">Follow us for safety alerts</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {socialLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy px-4 font-semibold text-navy hover:bg-surface-grey"
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
