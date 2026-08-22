import { createFileRoute, Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/cyber-awareness")({
  head: () => ({
    meta: [
      { title: "Cyber awareness — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Cyber awareness material from I4C: campaign resources, handbooks, posters and CyberDost messages you can share in your school, office or neighbourhood.",
      },
      { property: "og:title", content: "Cyber awareness" },
      {
        property: "og:description",
        content: "Free awareness material you can download and share with your community.",
      },
    ],
  }),
  component: CyberAwareness,
});

const material = [
  {
    title: "Awareness handbooks",
    detail:
      "Booklets for citizens, students, women and senior citizens explaining common frauds and how to respond.",
  },
  {
    title: "Posters and standees",
    detail: "Print-ready posters in Hindi, English and regional languages for offices, banks and schools.",
  },
  {
    title: "CyberDost messages",
    detail: "Short shareable messages and graphics published on our social media channels every week.",
  },
  {
    title: "Talk kits",
    detail:
      "Slide decks and speaking notes for cyber awareness promoters running sessions in their community.",
  },
];

function CyberAwareness() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <Megaphone className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Cyber awareness</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Cyber awareness is an ongoing effort to help citizens and employees understand the threats
          in cyberspace and act responsibly. Everything here is free to download, copy and share.
        </p>
      </div>

      <ul className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        {material.map((m) => (
          <li key={m.title} className="rounded-sm border-2 border-border p-6">
            <h2 className="text-xl font-bold text-navy">{m.title}</h2>
            <p className="mt-2 text-base text-muted-foreground">{m.detail}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10 max-w-4xl rounded-sm border-2 border-navy bg-surface-grey p-6">
        <h2 className="text-2xl font-bold text-navy">Where to go next</h2>
        <ul className="mt-3 space-y-2 text-base">
          <li>
            <Link to="/media-gallery" className="text-brand-blue underline">
              Photo, video and radio gallery
            </Link>{" "}
            — campaign films and radio spots.
          </li>
          <li>
            <Link to="/daily-digest" className="text-brand-blue underline">
              Daily digest
            </Link>{" "}
            — the fraud methods being seen right now.
          </li>
          <li>
            <Link to="/training-resources" className="text-brand-blue underline">
              Training resources
            </Link>{" "}
            — courses for police, prosecutors and judicial officers.
          </li>
          <li>
            <Link to="/cyber-volunteers" className="text-brand-blue underline">
              Become a cyber awareness promoter
            </Link>{" "}
            — run sessions where you live.
          </li>
        </ul>
      </section>
    </Page>
  );
}
