import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Users,
  Baby,
  Briefcase,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Megaphone,
  Newspaper,
  Images,
  BookMarked,
} from "lucide-react";
import { Page } from "@/components/site/Page";

const resources = [
  {
    to: "/citizen-manual" as const,
    icon: BookMarked,
    title: "Citizen manual",
    body: "How to use this portal, step by step.",
  },
  {
    to: "/safety-tips" as const,
    icon: ShieldCheck,
    title: "Online safety tips",
    body: "Everyday habits that keep your money and accounts safe.",
  },
  {
    to: "/cyber-awareness" as const,
    icon: Megaphone,
    title: "Cyber awareness",
    body: "Posters, booklets and campaign material you can share.",
  },
  {
    to: "/daily-digest" as const,
    icon: Newspaper,
    title: "Daily digest",
    body: "The fraud methods being reported today.",
  },
  {
    to: "/advisories" as const,
    icon: AlertTriangle,
    title: "Advisories",
    body: "Current warnings on scams spreading across India.",
  },
  {
    to: "/faq" as const,
    icon: HelpCircle,
    title: "Frequently asked questions",
    body: "Straight answers about reporting and what happens next.",
  },
  {
    to: "/media-gallery" as const,
    icon: Images,
    title: "Photo, video and radio gallery",
    body: "Awareness films, campaign photos and radio spots.",
  },
  {
    to: "/training-resources" as const,
    icon: GraduationCap,
    title: "Training resources",
    body: "Courses for police, prosecutors and volunteers.",
  },
];


export const Route = createFileRoute("/learning-corner")({
  head: () => ({
    meta: [
      { title: "Learning corner -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Simple guides on staying safe online for children, parents, students, senior citizens, women and small businesses.",
      },
      { property: "og:title", content: "Learning corner -  stay safe online" },
      {
        property: "og:description",
        content: "Short, plain-language guides on online safety for every age group.",
      },
    ],
  }),
  component: LearningCorner,
});

const audiences = [
  {
    icon: Baby,
    title: "Children and teenagers",
    points: [
      "Never share your photos or school details with someone you only know online.",
      "If someone makes you uncomfortable, tell an adult -  you will not be in trouble.",
      "Block first, then tell someone. Do not reply.",
    ],
  },
  {
    icon: Users,
    title: "Parents and teachers",
    points: [
      "Keep devices in shared rooms and talk about what your child sees online.",
      "Learn the reporting buttons on the apps your child uses.",
      "If images of your child are shared, report immediately -  content can be removed.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Students and young adults",
    points: [
      "Fake job and internship offers ask for a fee. Real employers do not.",
      "Never share OTPs, even with someone claiming to be from your bank or college.",
      "Check loan apps against the RBI list before installing.",
    ],
  },
  {
    icon: Briefcase,
    title: "Senior citizens",
    points: [
      "No police officer, courier company or bank will ever video call to demand money.",
      "Take your time. Genuine callers never rush you or threaten arrest.",
      "Ask a family member before making any payment you were not expecting.",
    ],
  },
];

const quickRules = [
  "Never share an OTP, PIN or CVV -  not even with the police or your bank.",
  "Call 1930 within the first hour if money has left your account.",
  "Take screenshots before you block or delete anything.",
  "Check links carefully: a single wrong letter usually means it is fake.",
  "Turn on two-step verification on your email, bank app and social accounts.",
];

function LearningCorner() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <BookOpen className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Learning corner</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Short, plain-language guides. No technical words. Pick the one closest to you.
        </p>
      </div>

      <section className="mt-8 rounded-sm border-2 border-navy bg-surface-grey p-6">
        <h2 className="text-2xl font-bold text-navy">Five rules that stop most scams</h2>
        <ol className="mt-4 space-y-3">
          {quickRules.map((r, i) => (
            <li key={r} className="flex gap-3 text-base">
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-navy-foreground"
              >
                {i + 1}
              </span>
              {r}
            </li>
          ))}
        </ol>
      </section>

      <h2 className="mt-12 text-2xl font-bold text-navy">Guides by who you are</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {audiences.map((a) => (
          <li key={a.title} className="rounded-sm border-2 border-border p-6">
            <a.icon className="size-8 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
            <h3 className="mt-3 text-xl font-bold text-navy">{a.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground">
              {a.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-bold text-navy">More in the learning corner</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <li key={r.to}>
            <Link
              to={r.to}
              className="flex h-full flex-col rounded-sm border-2 border-border p-5 hover:border-navy hover:bg-surface-grey"
            >
              <r.icon className="size-7 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
              <span className="mt-3 text-lg font-bold text-brand-blue underline">{r.title}</span>
              <span className="mt-1 text-base text-muted-foreground">{r.body}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}

