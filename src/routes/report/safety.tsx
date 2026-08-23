import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  EyeOff,
  KeyRound,
  Paperclip,
  Trash2,
  UserCheck,
} from "lucide-react";
import { Page } from "@/components/site/Page";
import {
  STATES,
  formatBytes,
  makeAcknowledgement,
  type ReportFile,
} from "@/lib/report-flow";

export const Route = createFileRoute("/report/safety")({
  head: () => ({
    meta: [
      { title: "Report threats, harassment or abuse — Cyber Crime Help" },
      {
        name: "description",
        content:
          "Tell us in your own words what happened. Report anonymously, or give your details so an officer can contact you and you can follow the case.",
      },
      { property: "og:title", content: "Report threats, harassment or abuse" },
      {
        property: "og:description",
        content: "Tell us in your own words. Report anonymously or with your details.",
      },
    ],
  }),
  component: Safety,
});

const kinds = [
  {
    id: "sexual-content",
    label: "Private or sexual photos or videos of me were shared",
    hint: "Shared without permission, or edited/morphed images",
  },
  {
    id: "sextortion",
    label: "Someone is blackmailing me over photos, videos or a video call",
    hint: "Also called sextortion — demands for money or more images",
  },
  {
    id: "child",
    label: "Content or contact involving a child",
    hint: "Child sexual abuse material, grooming, or an adult contacting a child",
  },
  {
    id: "threat",
    label: "Someone is threatening me or my family",
    hint: "Threats of violence, harm or exposure",
  },
  {
    id: "bullying",
    label: "Bullying, abuse or hateful messages",
    hint: "Repeated abusive messages, comments or calls",
  },
  {
    id: "stalking",
    label: "Someone is stalking or watching me online",
    hint: "Constant messages, tracking, or following across accounts",
  },
  {
    id: "impersonation",
    label: "A fake profile is pretending to be me",
    hint: "Or my photos are being used on someone else's account",
  },
  {
    id: "hacked",
    label: "My account was taken over",
    hint: "Email, social media or messaging account I can no longer access",
  },
  { id: "other", label: "Something else", hint: "Tell us in your own words below" },
];

const places = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Telegram",
  "Snapchat",
  "X (Twitter)",
  "YouTube",
  "A dating app",
  "A phone call or SMS",
  "Email",
  "A website",
  "Somewhere else",
];

const whenBuckets = [
  { id: "today", label: "Today" },
  { id: "week", label: "In the last 7 days" },
  { id: "month", label: "In the last month" },
  { id: "older", label: "More than a month ago" },
  { id: "ongoing", label: "It is still happening now" },
];

function Field({
  id,
  label,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-semibold text-navy">
        {label}{" "}
        {optional ? <span className="font-normal text-muted-foreground">(optional)</span> : null}
      </label>
      {hint ? <p className="text-base text-muted-foreground">{hint}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Safety() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [kind, setKind] = useState("");
  const [story, setStory] = useState("");
  const [whenBucket, setWhenBucket] = useState("");
  const [whenDate, setWhenDate] = useState("");
  const [delayReason, setDelayReason] = useState("");
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");
  const [stillOnline, setStillOnline] = useState("");

  const [files, setFiles] = useState<ReportFile[]>([]);

  const [suspectKnown, setSuspectKnown] = useState("");
  const [suspectName, setSuspectName] = useState("");
  const [suspectHandle, setSuspectHandle] = useState("");
  const [suspectPhone, setSuspectPhone] = useState("");

  const [mode, setMode] = useState<"anonymous" | "tracked" | "">("");
  const [victimIsChild, setVictimIsChild] = useState("");
  const [relationship, setRelationship] = useState("");
  const [victimAge, setVictimAge] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [declaration, setDeclaration] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);
  const [ack, setAck] = useState("");

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [
      ...prev,
      ...Array.from(list).map((f) => ({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
        name: f.name,
        size: f.size,
        type: f.type,
      })),
    ]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found: string[] = [];
    if (!kind) found.push("Choose what best describes what happened.");
    if (story.trim().length < 50)
      found.push("Please describe what happened in a few sentences (at least 50 characters).");
    if (!whenBucket) found.push("Tell us roughly when this happened.");
    if (!place) found.push("Tell us where this happened.");
    if (!suspectKnown) found.push("Tell us whether you know anything about the person involved.");
    if (!mode) found.push("Choose whether to report anonymously or with your details.");
    if (mode === "tracked") {
      if (!fullName.trim()) found.push("Enter your name.");
      if (!/^\d{10}$/.test(mobile.replace(/\s/g, "")))
        found.push("Enter a 10-digit mobile number so an officer can reach you.");
      if (!codeSent || code.replace(/\D/g, "").length !== 6)
        found.push("Confirm your mobile number with the 6-digit code.");
      if (!state) found.push("Choose your state or union territory so we can route your report.");
      if (!relationship) found.push("Tell us who the report is about.");
    }
    if (!declaration) found.push("Tick the declaration to send your report.");
    setErrors(found);
    if (found.length) {
      document.getElementById("error-summary")?.focus();
      return;
    }
    setAck(makeAcknowledgement());
  }

  if (ack) {
    return (
      <Page>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-9 text-success" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-navy">We&apos;ve received your report</h1>
        </div>
        <div className="mt-6 rounded-sm border-2 border-success bg-success-tint p-6">
          <h2 className="text-lg font-semibold text-success">Your acknowledgement number</h2>
          <p className="mt-2 text-3xl font-bold text-navy">{ack}</p>
          <p className="mt-2 text-base text-foreground">
            Keep this safe. If you reported anonymously, this number is the only way to refer to
            your case, and we cannot send you updates.
          </p>
        </div>
        <h2 className="mt-8 text-2xl font-bold text-navy">What happens next</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-foreground">
          <li>Your report goes to the cyber crime unit for your state.</li>
          <li>
            If the content is still online, a takedown request goes to the platform. Save the links
            — don&apos;t delete anything yourself yet.
          </li>
          {mode === "tracked" ? (
            <li>An officer may call you from an official number to ask a few questions.</li>
          ) : null}
          <li>
            If you are in immediate danger, call{" "}
            <a href="tel:112" className="font-semibold text-brand-blue underline">
              112
            </a>
            . For women and children, help is also on{" "}
            <a href="tel:1098" className="font-semibold text-brand-blue underline">
              1098
            </a>
            .
          </li>
        </ul>
        <p className="mt-8">
          <Link to="/" className="font-semibold text-brand-blue underline">
            Back to home
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-3xl font-bold text-navy">Tell us in your own words what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        You don&apos;t need to choose a legal category or use the right words. Nothing here is
        shared with the person you are reporting.
      </p>
      <div className="mt-4 rounded-sm border-2 border-emergency bg-emergency-tint p-4 text-base">
        <p className="font-semibold text-emergency">
          If you or a child are in immediate danger, call{" "}
          <a href="tel:112" className="underline">
            112
          </a>{" "}
          first. This form is not watched minute by minute.
        </p>
      </div>

      {errors.length ? (
        <div
          id="error-summary"
          tabIndex={-1}
          role="alert"
          className="mt-6 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
        >
          <p className="flex items-center gap-2 text-lg font-bold text-emergency">
            <AlertCircle className="size-5" aria-hidden="true" />
            There {errors.length === 1 ? "is 1 thing" : `are ${errors.length} things`} to check
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-base font-semibold text-emergency">
            {errors.map((er) => (
              <li key={er}>{er}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={submit} className="mt-8 space-y-10">
        {/* 1 — what happened */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">1. What happened</h2>
          <fieldset className="mt-4">
            <legend className="text-lg font-semibold text-navy">
              Which of these is closest?
            </legend>
            <div className="mt-3 space-y-3">
              {kinds.map((k) => (
                <label
                  key={k.id}
                  className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                    kind === k.id ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="kind"
                    checked={kind === k.id}
                    onChange={() => setKind(k.id)}
                    className="mt-1 size-5 accent-[var(--brand-blue)]"
                  />
                  <span>
                    <span className="block text-lg font-semibold">{k.label}</span>
                    <span className="block text-base text-muted-foreground">{k.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6">
            <Field
              id="story"
              label="Describe what happened"
              hint="Write as much or as little as you want. Names, dates, what was said, what you were asked for — anything you remember helps."
            >
              <textarea
                id="story"
                rows={7}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full rounded-sm border-2 border-input p-3 text-lg"
              />
            </Field>
          </div>
        </section>

        {/* 2 — when and where */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">2. When and where</h2>

          <fieldset className="mt-4">
            <legend className="text-lg font-semibold text-navy">When did this happen?</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {whenBuckets.map((b) => (
                <label
                  key={b.id}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    whenBucket === b.id ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="when"
                    checked={whenBucket === b.id}
                    onChange={() => setWhenBucket(b.id)}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{b.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field id="when-date" label="Exact date, if you remember it" optional>
              <input
                id="when-date"
                type="date"
                value={whenDate}
                onChange={(e) => setWhenDate(e.target.value)}
                className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
              />
            </Field>
            {whenBucket === "older" ? (
              <Field
                id="delay"
                label="Why the delay in reporting?"
                hint="No judgement — it helps us ask the platform for older records."
                optional
              >
                <input
                  id="delay"
                  value={delayReason}
                  onChange={(e) => setDelayReason(e.target.value)}
                  className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                />
              </Field>
            ) : null}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field id="place" label="Where did this happen?">
              <select
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
              >
                <option value="">Choose one</option>
                {places.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field
              id="link"
              label="Link, profile name or number"
              hint="The single most useful thing you can give us — it is how the account or content is traced."
              optional
            >
              <input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
              />
            </Field>
          </div>

          <fieldset className="mt-6">
            <legend className="text-lg font-semibold text-navy">
              Is the content still online?
            </legend>
            <p className="text-base text-muted-foreground">
              If it is, please don&apos;t delete it yet — we need it visible to ask the platform to
              remove it.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {["Yes", "No", "I don't know", "Not content — messages or calls"].map((o) => (
                <label
                  key={o}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    stillOnline === o ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="still-online"
                    checked={stillOnline === o}
                    onChange={() => setStillOnline(o)}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* 3 — evidence */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">3. Screenshots or files</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Optional, and you can add more later. Screenshots of the messages, the profile, or the
            call log help most.
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            className="mt-4 rounded-sm border-2 border-dashed border-border bg-surface-grey p-6 text-center"
          >
            <Paperclip className="mx-auto size-7 text-navy" aria-hidden="true" />
            <p className="mt-2 text-base text-muted-foreground">
              Drag files here, or choose them from your phone.
            </p>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="mt-3 min-h-12 rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-background"
            >
              Choose files
            </button>
            <input
              ref={fileInput}
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>
          {files.length ? (
            <ul className="mt-4 space-y-2">
              {files.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-3 rounded-sm border-2 border-border p-3"
                >
                  <span className="text-base">
                    {f.name} <span className="text-muted-foreground">({formatBytes(f.size)})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-border px-3 font-semibold text-navy hover:bg-surface-grey"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* 4 — the other person */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">4. The person involved</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Only if you know. Not knowing is completely normal and does not weaken your report.
          </p>
          <fieldset className="mt-4">
            <legend className="text-lg font-semibold text-navy">
              Do you know anything about them?
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {["Yes, some details", "No, I don't know who they are"].map((o) => (
                <label
                  key={o}
                  className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                    suspectKnown === o ? "border-brand-blue bg-surface-grey" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="suspect-known"
                    checked={suspectKnown === o}
                    onChange={() => setSuspectKnown(o)}
                    className="size-5 accent-[var(--brand-blue)]"
                  />
                  <span className="text-base font-semibold">{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {suspectKnown === "Yes, some details" ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field id="s-name" label="Name they use" optional>
                <input
                  id="s-name"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                />
              </Field>
              <Field id="s-handle" label="Profile link or username" optional>
                <input
                  id="s-handle"
                  value={suspectHandle}
                  onChange={(e) => setSuspectHandle(e.target.value)}
                  className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                />
              </Field>
              <Field id="s-phone" label="Phone number or email they used" optional>
                <input
                  id="s-phone"
                  value={suspectPhone}
                  onChange={(e) => setSuspectPhone(e.target.value)}
                  className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                />
              </Field>
            </div>
          ) : null}
        </section>

        {/* 5 — about you */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">5. About you</h2>
          <fieldset className="mt-4">
            <legend className="text-lg font-semibold text-navy">
              How would you like to report this?
            </legend>
            <div className="mt-3 space-y-3">
              <label
                className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  mode === "anonymous" ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "anonymous"}
                  onChange={() => setMode("anonymous")}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span>
                  <span className="flex items-center gap-2 text-lg font-semibold">
                    <EyeOff className="size-5 text-navy" aria-hidden="true" />
                    Anonymously
                  </span>
                  <span className="block text-base text-muted-foreground">
                    We won&apos;t ask who you are. Content can still be taken down, but no officer
                    can call you, you can&apos;t get updates, and this cannot become an FIR unless
                    you come forward later.
                  </span>
                </span>
              </label>
              <label
                className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-sm border-2 p-4 hover:bg-surface-grey ${
                  mode === "tracked" ? "border-brand-blue bg-surface-grey" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "tracked"}
                  onChange={() => setMode("tracked")}
                  className="mt-1 size-5 accent-[var(--brand-blue)]"
                />
                <span>
                  <span className="flex items-center gap-2 text-lg font-semibold">
                    <UserCheck className="size-5 text-navy" aria-hidden="true" />
                    With my details
                  </span>
                  <span className="block text-base text-muted-foreground">
                    You can follow progress, add evidence later, and an officer can contact you.
                    Your details are never shown to the person you report.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          {mode === "tracked" ? (
            <div className="mt-8 space-y-6">
              <fieldset>
                <legend className="text-lg font-semibold text-navy">
                  Who is this report about?
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["Myself", "My child", "Someone else I'm helping"].map((o) => (
                    <label
                      key={o}
                      className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                        relationship === o ? "border-brand-blue bg-surface-grey" : "border-border"
                      }`}
                    >
                      <input
                        type="radio"
                        name="relationship"
                        checked={relationship === o}
                        onChange={() => setRelationship(o)}
                        className="size-5 accent-[var(--brand-blue)]"
                      />
                      <span className="text-base font-semibold">{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-lg font-semibold text-navy">
                  Is the person affected under 18?
                </legend>
                <p className="text-base text-muted-foreground">
                  Cases involving children are handled first and by a specialist unit.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["Yes", "No", "I don't know"].map((o) => (
                    <label
                      key={o}
                      className={`flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border-2 px-4 hover:bg-surface-grey ${
                        victimIsChild === o ? "border-brand-blue bg-surface-grey" : "border-border"
                      }`}
                    >
                      <input
                        type="radio"
                        name="child"
                        checked={victimIsChild === o}
                        onChange={() => setVictimIsChild(o)}
                        className="size-5 accent-[var(--brand-blue)]"
                      />
                      <span className="text-base font-semibold">{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="full-name" label="Your name">
                  <input
                    id="full-name"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                  />
                </Field>
                <Field id="victim-age" label="Age of the person affected" optional>
                  <input
                    id="victim-age"
                    inputMode="numeric"
                    value={victimAge}
                    onChange={(e) => setVictimAge(e.target.value)}
                    className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                  />
                </Field>
                <Field
                  id="s-mobile"
                  label="Your mobile number"
                  hint="An officer may call you from an official number."
                >
                  <div className="flex flex-wrap gap-3">
                    <input
                      id="s-mobile"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="min-h-12 w-full max-w-xs rounded-sm border-2 border-input px-3 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setCodeSent(true)}
                      className="min-h-12 rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-surface-grey"
                    >
                      {codeSent ? "Send the code again" : "Send me a code"}
                    </button>
                  </div>
                </Field>
                <Field id="s-email" label="Email address" optional>
                  <input
                    id="s-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                  />
                </Field>
              </div>

              {codeSent ? (
                <div className="rounded-sm border-2 border-border p-4">
                  <p className="flex items-center gap-2 text-lg font-semibold text-navy">
                    <KeyRound className="size-5" aria-hidden="true" />
                    The 6-digit code from your SMS
                  </p>
                  <input
                    id="s-code"
                    inputMode="numeric"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    aria-label="6-digit code"
                    className="mt-3 min-h-12 w-40 rounded-sm border-2 border-input px-3 text-2xl font-bold tracking-widest"
                  />
                  <p className="mt-2 text-base text-muted-foreground">
                    No time limit. Ask for a new code whenever you need one.
                  </p>
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="s-state"
                  label="State or union territory"
                  hint="This decides which cyber crime unit gets your report."
                >
                  <select
                    id="s-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                  >
                    <option value="">Choose one</option>
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field id="s-district" label="District or city" optional>
                  <input
                    id="s-district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="min-h-12 w-full rounded-sm border-2 border-input px-3 text-lg"
                  />
                </Field>
              </div>
            </div>
          ) : null}
        </section>

        {/* 6 — declaration */}
        <section className="rounded-sm border-2 border-border p-5">
          <h2 className="text-2xl font-bold text-navy">6. Your declaration</h2>
          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={declaration}
              onChange={(e) => setDeclaration(e.target.checked)}
              className="mt-1 size-5 accent-[var(--brand-blue)]"
            />
            <span className="text-base">
              What I have written here is true to the best of my knowledge.
            </span>
          </label>
          <details className="mt-4">
            <summary className="cursor-pointer text-base font-semibold text-brand-blue underline">
              What this means
            </summary>
            <p className="mt-2 text-base text-muted-foreground">
              Knowingly filing a false report is an offence. Getting a detail wrong, or not
              remembering something, is not — tell us what you know and say when you are unsure.
            </p>
          </details>
        </section>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Send this report
        </button>
      </form>
    </Page>
  );
}
