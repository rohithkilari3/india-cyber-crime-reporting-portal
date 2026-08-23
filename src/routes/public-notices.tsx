import { createFileRoute } from "@tanstack/react-router";
import { FileText, ExternalLink } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/public-notices")({
  head: () => ({
    meta: [
      { title: "Public notices -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Public notices from the Indian Cyber Crime Coordination Centre, including the RTI public notice and the CPGRAMS public notice.",
      },
      { property: "og:title", content: "Public notices" },
      {
        property: "og:description",
        content: "RTI and CPGRAMS public notices, and where each kind of request should go.",
      },
    ],
  }),
  component: PublicNotices,
});

const notices = [
  {
    title: "RTI public notice",
    href: "https://cybercrime.gov.in/UploadMedia/PublicNotice.pdf",
    body: "Requests under the Right to Information Act must be filed with the public authority that holds the record. Complaints registered on this portal are handled by state and union territory police; this portal is not the custodian of case records.",
  },
  {
    title: "CPGRAMS public notice",
    href: "https://cybercrime.gov.in/UploadMedia/PublicNotice_CPGRAMS.pdf",
    body: "Grievances about the handling of a cyber crime complaint should be raised with the concerned state or union territory police through CPGRAMS. Filing the same grievance repeatedly does not speed up an investigation.",
  },
];

function PublicNotices() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <FileText className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Public notices</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Formal notices published for citizens. Each links to the notice document on the official
          portal.
        </p>
      </div>

      <ul className="mt-8 grid max-w-4xl gap-4">
        {notices.map((n) => (
          <li key={n.title} className="rounded-sm border-2 border-border p-6">
            <h2 className="text-xl font-bold text-navy">{n.title}</h2>
            <p className="mt-2 text-base text-muted-foreground">{n.body}</p>
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-sm border-2 border-navy px-4 font-semibold text-navy hover:bg-surface-grey"
            >
              Open the notice (PDF)
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
}
