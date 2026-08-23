import { useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  Smartphone,
  Trash2,
  Upload,
  UserSearch,
  UserX,
} from "lucide-react";
import { Page } from "@/components/site/Page";
import {
  ErrorSummary,
  Field,
  boxTone,
  focusErrorSummary,
  inputClass,
  labelTone,
  type FieldErrors,
} from "@/components/site/form-ui";
import { districtsFor } from "@/lib/locations";
import { STATES, formatBytes, makeAcknowledgement, type ReportFile } from "@/lib/report-flow";

export const Route = createFileRoute("/report-suspect")({
  head: () => ({
    meta: [
      { title: "Report a suspect to I4C - National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Tell us about a number, account, website or profile you believe is being used for cyber crime, even if nothing happened to you.",
      },
      { property: "og:title", content: "Report a suspect to I4C" },
      {
        property: "og:description",
        content: "Share details of a suspected cyber criminal with the Indian Cyber Crime Coordination Centre.",
      },
    ],
  }),
  component: ReportSuspect,
});

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MIN_DESCRIPTION = 30;
const MAX_DESCRIPTION = 500;

type TileType =
  | "website"
  | "whatsapp"
  | "phone"
  | "email"
  | "sms"
  | "social"
  | "deepfake"
  | "app";

const tiles: { id: TileType; label: string; icon: typeof Globe }[] = [
  { id: "website", label: "Website URL", icon: Globe },
  { id: "whatsapp", label: "WhatsApp / Telegram", icon: MessageSquare },
  { id: "phone", label: "Phone number", icon: Phone },
  { id: "email", label: "Email ID", icon: Mail },
  { id: "sms", label: "SMS header/number", icon: MessageSquare },
  { id: "social", label: "Social media URL", icon: Share2 },
  { id: "deepfake", label: "Deepfake", icon: UserX },
  { id: "app", label: "Mobile app", icon: Smartphone },
];

const tileCopy: Record<TileType, { label: string; hint: string; placeholder: string }> = {
  website: {
    label: "The website address",
    hint: "The full web address, pasted - for example https://example.com/offer",
    placeholder: "https://",
  },
  whatsapp: {
    label: "The WhatsApp or Telegram number or handle",
    hint: "The WhatsApp or Telegram number with country code, or the @handle",
    placeholder: "+91XXXXXXXXXX or @handle",
  },
  phone: {
    label: "The phone number",
    hint: "The number that called, texted or messaged you, with country code if you have it",
    placeholder: "+91XXXXXXXXXX",
  },
  email: {
    label: "The email address",
    hint: "The exact email ID they used",
    placeholder: "name@example.com",
  },
  sms: {
    label: "The SMS header or number",
    hint: "The sender name shown on the SMS (for example VM-SBIBNK) or the number it came from",
    placeholder: "VM-SBIBNK or number",
  },
  social: {
    label: "The social media profile URL",
    hint: "The full link to the profile or page, pasted from the app",
    placeholder: "https://",
  },
  deepfake: {
    label: "Where the deepfake is posted",
    hint: "A link to the video, image or post, or a clear description of where you saw it",
    placeholder: "Link or description",
  },
  app: {
    label: "The app name or store link",
    hint: "The app's name and, if you have it, the link to its listing",
    placeholder: "App name or link",
  },
};

const whenOptions = [
  { id: "today", label: "Today" },
  { id: "week", label: "In the last 7 days" },
  { id: "month", label: "In the last month" },
  { id: "older", label: "Longer ago" },
  { id: "ongoing", label: "It is still happening" },
];

const affectedOptions = [
  { id: "me", label: "I was affected" },
  { id: "known", label: "It happened to someone I know" },
  { id: "saw", label: "I just saw it" },
];

function ReportSuspect() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  const [type, setType] = useState<TileType | "">("");
  const [value, setValue] = useState("");

  const [description, setDescription] = useState("");
  const [when, setWhen] = useState("");
  const [affected, setAffected] = useState("");

  const [files, setFiles] = useState<ReportFile[]>([]);
  const [noEvidence, setNoEvidence] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [declaration, setDeclaration] = useState(false);
  const [showFalseNote, setShowFalseNote] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [done, setDone] = useState(false);
  const [ackRef, setAckRef] = useState("");

  const districts = useMemo(() => districtsFor(state), [state]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFileError("");
    const accepted: ReportFile[] = [];
    let rejected = 0;
    Array.from(list).forEach((f) => {
      if (f.size > MAX_FILE_BYTES) {
        rejected += 1;
        return;
      }
      accepted.push({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
        type: f.type || "file",
      });
    });
    if (rejected > 0) {
      setFileError(
        `${rejected} file${rejected > 1 ? "s were" : " was"} too large. Each file must be under 5 MB.`,
      );
    }
    if (accepted.length) setFiles((prev) => [...prev, ...accepted]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!state) e["state"] = "Please choose the state";
    if (!district) e["district"] = "Please choose the district or city";

    if (!type) e["report-type"] = "Please choose what you want to report";
    if (!value.trim()) e["value"] = "Please fill in this detail";

    if (!description.trim()) e["description"] = "Please describe what happened";
    else if (description.trim().length < MIN_DESCRIPTION)
      e["description"] = `Please add a little more detail (at least ${MIN_DESCRIPTION} characters)`;
    if (!when) e["when-group"] = "Please tell us when you saw this";
    if (!affected) e["affected-group"] = "Please tell us who this happened to";

    if (files.length === 0 && !noEvidence)
      e["evidence"] = "Please add evidence, or tell us you don't have any";

    if (!declaration) e["declaration"] = "Please confirm the declaration";

    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) {
      requestAnimationFrame(focusErrorSummary);
      return;
    }
    setAckRef(makeAcknowledgement());
    setDone(true);
  }

  if (done) {
    return (
      <Page>
        <div className="rounded-sm border-2 border-success bg-success-tint p-6">
          <CheckCircle2 className="size-8 text-success" aria-hidden="true" />
          <h1 className="mt-3 text-3xl font-bold text-navy">Thank you - we have your report</h1>
          <p className="mt-3 text-base">
            Your reference number is <span className="font-bold">{ackRef}</span>. Please note it
            down.
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            This has been passed to the Indian Cyber Crime Coordination Centre (I4C). You do not
            need to do anything else. We will only contact you if we need more detail, and only if
            you shared your contact details.
          </p>
        </div>
      </Page>
    );
  }

  const typeCopy = type ? tileCopy[type] : null;

  return (
    <Page>
      <UserSearch className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
      <h1 className="mt-3 text-3xl font-bold text-navy">Report a suspect to I4C</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Use this if you know of someone or something being used for cyber crime - even if nothing
        happened to you. This is a short tip, not a full case file, so it all fits on one page. If
        you were the one affected, use "Report fraud" or "Report threats or abuse" instead so your
        own case gets tracked properly.
      </p>

      <ErrorSummary errors={errors} />

      <form className="mt-8 space-y-10" onSubmit={handleSubmit} noValidate>
        <section>
          <h2 className="text-xl font-bold text-navy">1. Where did this happen</h2>
          <div className="mt-4 space-y-6">
            <Field id="state" label="State" error={errors["state"]}>
              <select
                id="state"
                value={state}
                onChange={(ev) => {
                  setState(ev.target.value);
                  setDistrict("");
                }}
                className={inputClass(!!errors["state"], "max-w-lg bg-background")}
              >
                <option value="">Choose a state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="district" label="District or city" error={errors["district"]}>
              <select
                id="district"
                value={district}
                onChange={(ev) => setDistrict(ev.target.value)}
                disabled={!state}
                className={inputClass(!!errors["district"], "max-w-lg bg-background disabled:opacity-60")}
              >
                <option value="">{state ? "Choose a district" : "Choose a state first"}</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="pincode" label="Pincode" optional>
              <input
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(ev) => setPincode(ev.target.value.replace(/\D/g, ""))}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">2. What do you want to report</h2>
          <fieldset className="mt-4">
            <legend className={`text-lg font-semibold ${labelTone(!!errors["report-type"])}`}>
              Choose one
            </legend>
            {errors["report-type"] ? (
              <p
                id="report-type-error"
                className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency"
              >
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                {errors["report-type"]}
              </p>
            ) : null}
            <div id="report-type" tabIndex={-1} className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tiles.map((t) => {
                const Icon = t.icon;
                const active = type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setType(t.id);
                      setValue("");
                    }}
                    aria-pressed={active}
                    className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-sm border-2 p-3 text-center hover:bg-surface-grey ${
                      active ? "border-brand-blue bg-surface-grey" : boxTone(!!errors["report-type"])
                    }`}
                  >
                    <Icon
                      className={`size-6 ${active ? "text-brand-blue" : "text-navy"}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-navy">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {typeCopy ? (
            <div className="mt-6">
              <Field id="value" label={typeCopy.label} hint={typeCopy.hint} error={errors["value"]}>
                <input
                  id="value"
                  value={value}
                  placeholder={typeCopy.placeholder}
                  onChange={(ev) => setValue(ev.target.value)}
                  className={inputClass(!!errors["value"], "max-w-lg")}
                />
              </Field>
            </div>
          ) : null}
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">3. What did they do</h2>
          <div className="mt-4 space-y-6">
            <div>
              <label htmlFor="description" className={`block text-lg font-semibold ${labelTone(!!errors["description"])}`}>
                Describe what happened
              </label>
              <p className="text-base text-muted-foreground">
                Everyday words are fine. There is no right way to write this.
              </p>
              {errors["description"] ? (
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency">
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  {errors["description"]}
                </p>
              ) : null}
              <textarea
                id="description"
                rows={5}
                maxLength={MAX_DESCRIPTION}
                value={description}
                onChange={(ev) => setDescription(ev.target.value.slice(0, MAX_DESCRIPTION))}
                className={`mt-2 w-full rounded-sm border-2 p-3 text-lg ${
                  errors["description"] ? "border-emergency bg-emergency-tint" : "border-input"
                }`}
              />
              <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
                {MAX_DESCRIPTION - description.length} of {MAX_DESCRIPTION} characters left
              </p>
            </div>

            <fieldset>
              <legend className={`text-lg font-semibold ${labelTone(!!errors["when-group"])}`}>
                When did you see this?
              </legend>
              {errors["when-group"] ? (
                <p
                  id="when-group-error"
                  className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency"
                >
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  {errors["when-group"]}
                </p>
              ) : null}
              <div id="when-group" tabIndex={-1} className="mt-3 space-y-2 max-w-lg">
                {whenOptions.map((o) => (
                  <label
                    key={o.id}
                    className={`flex min-h-12 items-center gap-3 rounded-sm border-2 px-4 hover:bg-surface-grey ${boxTone(
                      !!errors["when-group"],
                    )}`}
                  >
                    <input
                      type="radio"
                      name="when"
                      value={o.id}
                      checked={when === o.id}
                      onChange={() => setWhen(o.id)}
                      className="size-5"
                    />
                    <span className="text-base">{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={`text-lg font-semibold ${labelTone(!!errors["affected-group"])}`}>
                Did this happen to you?
              </legend>
              {errors["affected-group"] ? (
                <p
                  id="affected-group-error"
                  className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency"
                >
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                  {errors["affected-group"]}
                </p>
              ) : null}
              <div id="affected-group" tabIndex={-1} className="mt-3 space-y-2 max-w-lg">
                {affectedOptions.map((o) => (
                  <label
                    key={o.id}
                    className={`flex min-h-12 items-center gap-3 rounded-sm border-2 px-4 hover:bg-surface-grey ${boxTone(
                      !!errors["affected-group"],
                    )}`}
                  >
                    <input
                      type="radio"
                      name="affected"
                      value={o.id}
                      checked={affected === o.id}
                      onChange={() => setAffected(o.id)}
                      className="size-5"
                    />
                    <span className="text-base">{o.label}</span>
                  </label>
                ))}
              </div>
              {affected === "me" ? (
                <p className="mt-3 max-w-lg rounded-sm border-2 border-border bg-surface-grey p-4 text-base">
                  Since this happened to you, please use our full report flow so your case is
                  tracked and followed up: for money lost, go to{" "}
                  <a href="/report/financial/verify" className="font-semibold text-brand-blue underline">
                    Report fraud
                  </a>
                  , or for threats and abuse go to{" "}
                  <a href="/report/safety/start" className="font-semibold text-brand-blue underline">
                    Report threats or abuse
                  </a>
                  . You can also call 1930 for urgent help with a financial loss.
                </p>
              ) : null}
            </fieldset>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">4. Evidence</h2>
          <p className="mt-2 text-base text-muted-foreground">
            A suspect cannot be flagged on a bare claim, so please add at least one screenshot or
            file, or tell us you don't have any.
          </p>
          <p className="mt-1 text-base text-muted-foreground">
            Screenshots are strongly encouraged. Each file must be under 5 MB.
          </p>

          <div
            onDragOver={(ev) => {
              ev.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(ev) => {
              ev.preventDefault();
              setDragging(false);
              addFiles(ev.dataTransfer.files);
            }}
            className={`mt-4 rounded-sm border-2 border-dashed p-8 text-center transition-colors ${
              dragging ? "border-brand-blue bg-surface-grey" : boxTone(!!errors["evidence"])
            }`}
          >
            <Upload className="mx-auto size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
            <p className="mt-3 text-lg font-semibold text-navy">Drag your files here</p>
            <p className="mt-1 text-base text-muted-foreground">
              Images, PDFs, screenshots - as many as you like.
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-4 inline-flex min-h-12 items-center rounded-sm border-2 border-brand-blue px-5 text-lg font-semibold text-brand-blue hover:bg-surface-grey"
            >
              Choose files from your device
            </button>
            <input
              ref={inputRef}
              id="evidence"
              type="file"
              multiple
              className="sr-only"
              aria-label="Choose evidence files"
              onChange={(ev) => {
                addFiles(ev.target.files);
                ev.target.value = "";
              }}
            />
          </div>

          {fileError ? (
            <p className="mt-3 flex items-center gap-2 text-base font-semibold text-emergency">
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              {fileError}
            </p>
          ) : null}

          {errors["evidence"] ? (
            <p className="mt-3 flex items-center gap-2 text-base font-semibold text-emergency">
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              {errors["evidence"]}
            </p>
          ) : null}

          {files.length > 0 ? (
            <ul className="mt-4 divide-y rounded-sm border">
              {files.map((f) => (
                <li key={f.id} className="flex items-center gap-3 p-3">
                  <FileText className="size-5 shrink-0 text-navy" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{f.name}</span>
                    <span className="block text-sm text-muted-foreground">{formatBytes(f.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm border px-3 font-semibold text-navy hover:bg-surface-grey"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove {f.name}</span>
                    <span aria-hidden="true">Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <label className="mt-4 flex min-h-12 max-w-lg items-center gap-3 rounded-sm border-2 border-border px-4 hover:bg-surface-grey">
            <input
              type="checkbox"
              checked={noEvidence}
              onChange={(ev) => setNoEvidence(ev.target.checked)}
              className="size-5"
            />
            <span className="text-base">I don't have any evidence</span>
          </label>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">5. About you (optional)</h2>
          <p className="mt-2 text-base text-muted-foreground">
            This report can be anonymous. If you share your details, we only use them if the team
            needs to ask you a question.
          </p>
          <div className="mt-4 space-y-6">
            <Field id="name" label="Your name" optional>
              <input
                id="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
            <Field id="mobile" label="Mobile number" optional>
              <input
                id="mobile"
                inputMode="tel"
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
            <Field id="email" label="Email" optional>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className={inputClass(false, "max-w-lg")}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy">6. Declaration</h2>
          <div className="mt-4">
            <label
              htmlFor="declaration"
              className={`flex min-h-12 max-w-lg items-start gap-3 rounded-sm border-2 px-4 py-3 hover:bg-surface-grey ${boxTone(
                !!errors["declaration"],
              )}`}
            >
              <input
                id="declaration"
                type="checkbox"
                checked={declaration}
                onChange={(ev) => setDeclaration(ev.target.checked)}
                className="mt-1 size-5"
              />
              <span className={`text-base ${labelTone(!!errors["declaration"])}`}>
                What I have written here is true to the best of my knowledge
              </span>
            </label>
            {errors["declaration"] ? (
              <p className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency">
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                {errors["declaration"]}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() => setShowFalseNote((v) => !v)}
              className="mt-3 flex items-center gap-1 text-base font-semibold text-brand-blue underline"
              aria-expanded={showFalseNote}
            >
              <ChevronDown
                className={`size-4 transition-transform ${showFalseNote ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
              What if my report turns out to be wrong?
            </button>
            {showFalseNote ? (
              <p className="mt-2 max-w-lg rounded-sm border-2 border-border bg-surface-grey p-4 text-base text-muted-foreground">
                Honest mistakes are fine - we understand you may not have all the facts. But
                reporting something you know to be false, to cause trouble for someone, can be a
                punishable offence.
              </p>
            ) : null}
          </div>
        </section>

        <div className="rounded-sm border-2 border-border bg-surface-grey p-4">
          <p className="flex items-center gap-2 text-base font-semibold text-navy">
            <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
            Security check passed
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Send this to I4C
        </button>
      </form>
    </Page>
  );
}
