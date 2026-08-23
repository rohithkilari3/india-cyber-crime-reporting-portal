import { createFileRoute } from "@tanstack/react-router";
import { Images, Video, Radio } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/media-gallery")({
  head: () => ({
    meta: [
      { title: "Photo, video and radio gallery -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Cyber awareness campaign photographs, short films and radio spots published by the Indian Cyber Crime Coordination Centre.",
      },
      { property: "og:title", content: "Photo, video and radio gallery" },
      {
        property: "og:description",
        content: "Campaign photographs, awareness films and radio jingles you can share.",
      },
    ],
  }),
  component: MediaGallery,
});

const photos = [
  "Cyber awareness week at a district school",
  "Helpline 1930 operators at a state coordination centre",
  "Cyber volunteer training session",
  "Street play on OTP fraud in a rural block",
  "Senior citizens' awareness camp",
  "Signing of a bank coordination agreement",
];

const videos = [
  { title: "Never share your OTP", len: "0:45" },
  { title: "What a digital arrest call sounds like", len: "1:30" },
  { title: "How to report on this portal, step by step", len: "3:10" },
  { title: "Keeping children safe online -  for parents", len: "2:20" },
];

const radio = [
  { title: "CyberDost jingle -  Hindi", len: "0:30" },
  { title: "Loan app warning -  regional languages", len: "0:40" },
  { title: "1930 helpline announcement", len: "0:25" },
];

function MediaGallery() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <Images className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Photo, video and radio gallery</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Campaign material from cyber awareness activity across India. In this prototype the items
          are listed rather than played.
        </p>
      </div>

      <section className="mt-10" aria-labelledby="photos">
        <h2 id="photos" className="text-2xl font-bold text-navy">
          Photo gallery
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li key={p} className="rounded-sm border-2 border-border">
              <div
                aria-hidden="true"
                className="flex h-32 items-center justify-center bg-surface-grey text-navy"
              >
                <Images className="size-8" strokeWidth={1.5} />
              </div>
              <p className="border-t p-4 text-base text-navy">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="videos">
        <h2 id="videos" className="text-2xl font-bold text-navy">
          Video gallery
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {videos.map((v) => (
            <li key={v.title} className="flex items-center gap-4 rounded-sm border-2 border-border p-5">
              <Video className="size-8 shrink-0 text-brand-blue" aria-hidden="true" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-bold text-navy">{v.title}</p>
                <p className="text-sm text-muted-foreground">Running time {v.len}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="radio">
        <h2 id="radio" className="text-2xl font-bold text-navy">
          Radio gallery
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {radio.map((r) => (
            <li key={r.title} className="flex items-center gap-4 rounded-sm border-2 border-border p-5">
              <Radio className="size-8 shrink-0 text-brand-blue" aria-hidden="true" strokeWidth={1.5} />
              <div>
                <p className="text-lg font-bold text-navy">{r.title}</p>
                <p className="text-sm text-muted-foreground">Running time {r.len}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
