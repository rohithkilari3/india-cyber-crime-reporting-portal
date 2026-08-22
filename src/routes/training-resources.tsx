import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/training-resources")({
  head: () => ({
    meta: [
      { title: "Training resources — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Cyber crime investigation training for police officers, prosecutors and judicial officers, plus the CyTrain massive open online course.",
      },
      { property: "og:title", content: "Cyber crime training resources" },
      {
        property: "og:description",
        content: "Courses and material for police, prosecutors, judicial officers and volunteers.",
      },
    ],
  }),
  component: TrainingResources,
});

const courses = [
  {
    title: "CyTrain — online course platform",
    who: "Police officers, prosecutors and judicial officers",
    detail:
      "Self-paced modules with certification on first response, cyber forensics, evidence handling and legal provisions.",
  },
  {
    title: "First responder handbook",
    who: "Station-level police staff",
    detail:
      "How to receive a complaint, preserve digital evidence and act inside the golden hour of a financial fraud.",
  },
  {
    title: "Financial fraud investigation",
    who: "Investigating officers",
    detail:
      "Following the money through bank, wallet and merchant accounts, and using the citizen financial cyber fraud reporting system.",
  },
  {
    title: "Volunteer orientation pack",
    who: "Registered cyber volunteers",
    detail:
      "What unlawful content is, how to flag it correctly, and the confidentiality expected of volunteers.",
  },
];

function TrainingResources() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <GraduationCap className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Training resources</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Capacity-building material for the people who handle cyber crime cases, and for volunteers
          who support them.
        </p>
      </div>

      <ul className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        {courses.map((c) => (
          <li key={c.title} className="rounded-sm border-2 border-border p-6">
            <h2 className="text-xl font-bold text-navy">{c.title}</h2>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              For {c.who}
            </p>
            <p className="mt-2 text-base text-muted-foreground">{c.detail}</p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
