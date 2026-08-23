import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HandHeart, ShieldAlert, ListChecks, FileSignature } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/cyber-volunteers")({
  head: () => ({
    meta: [
      { title: "Become a cyber volunteer -  National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Understand the Cyber Crime Volunteer programme: the three roles, what counts as unlawful content, the terms you agree to, and how to register step by step.",
      },
      { property: "og:title", content: "Become a cyber volunteer" },
      {
        property: "og:description",
        content:
          "The concept, the rules, what unlawful content means, and the full registration process.",
      },
    ],
  }),
  component: Volunteers,
});

const roles = [
  {
    id: "flagger",
    title: "Unlawful content flagger",
    body: "Report content about child sexual abuse, rape or gang rape, terrorism, radicalisation or anti-national activity that you come across online. No technical skill needed.",
    needs: "Government photo ID, 18 or older, verified mobile number.",
  },
  {
    id: "promoter",
    title: "Cyber awareness promoter",
    body: "Run awareness talks in your school, workplace, resident association or village. We give you the material to use.",
    needs: "A few hours a month locally, and willingness to be identified as a volunteer.",
  },
  {
    id: "expert",
    title: "Cyber expert",
    body: "Lend technical skills in malware analysis, digital forensics, cryptography, network security or mobile forensics.",
    needs: "A relevant qualification or demonstrable experience, plus state verification.",
  },
];

const unlawful = [
  "Child sexual abuse material, in any form.",
  "Content depicting rape or gang rape.",
  "Content that promotes or glorifies terrorism, or is used to recruit or radicalise.",
  "Content that threatens the sovereignty, integrity or security of India.",
  "Content that incites communal disharmony or religious hatred.",
];

const notUnlawful = [
  "Opinions or criticism you disagree with, including criticism of government.",
  "Satire, journalism, art or academic discussion.",
  "Personal disputes, defamation or civil matters -  these go to the courts, not here.",
  "Ordinary fraud or harassment against you -  report that as a complaint instead.",
];

const instructions = [
  "Flag content only from the role you registered for. Do not act beyond it.",
  "Do not identify yourself publicly as a cyber volunteer, or use the programme in advertising, on social media or on letterheads.",
  "Do not talk to the media on behalf of the programme.",
  "Never download, store, copy or forward unlawful content. Report the link and describe it.",
  "Never contact the person who posted the content, and never investigate on your own.",
  "Keep everything you see or learn confidential.",
  "Flag in good faith. Repeated frivolous or malicious reports end your registration and may attract legal action.",
];

const terms = [
  "You are volunteering. There is no payment, no employment relationship, and no claim to any allowance or benefit.",
  "Your details are verified by the state or union territory nodal officer, who may reject or withdraw registration without giving reasons.",
  "You have no power to investigate, seize, question or represent the police in any way.",
  "You are personally liable for misuse of the programme, and the Information Technology Act and other laws apply to you as to anyone else.",
  "Registration can be cancelled at any time by the nodal officer, and you may withdraw at any time.",
];

const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

function Volunteers() {
  const [role, setRole] = useState("flagger");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [accepted, setAccepted] = useState(false);
  const [state, setState] = useState("");
  const [loginId, setLoginId] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [name, setName] = useState("");
  const [idType, setIdType] = useState("aadhaar");
  const [idFile, setIdFile] = useState<string | null>(null);
  const [addressFile, setAddressFile] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);

  const captchaText = useMemo(() => "K7QM2", []);

  function goToForm(roleId: string) {
    setRole(roleId);
    setDone(false);
    document.getElementById("volunteer-registration")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <HandHeart className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Become a cyber volunteer</h1>
        <p className="mt-3 text-base text-muted-foreground">
          The Cyber Crime Volunteer programme lets ordinary citizens help make the internet safer in
          India. Read what the role is and is not before you register -  it takes about five minutes.
        </p>
      </div>

      {/* Concept */}
      <section className="mt-10 max-w-4xl rounded-sm border-2 border-navy bg-surface-grey p-6">
        <h2 className="text-2xl font-bold text-navy">What the programme is</h2>
        <p className="mt-3 text-base text-muted-foreground">
          The Indian Cyber Crime Coordination Centre (I4C) runs this programme so citizens can
          contribute in a limited, clearly defined way: flagging seriously unlawful content, spreading
          awareness locally, or offering technical expertise to police units.
        </p>
        <p className="mt-3 text-base text-muted-foreground">
          Volunteers are not police. You get no authority, no uniform, no identity card for public
          use, and no power to investigate anyone. Everything you flag is assessed by the state
          police, who decide what happens next.
        </p>
      </section>

      {/* Roles */}
      <section className="mt-12" aria-labelledby="roles">
        <h2 id="roles" className="text-2xl font-bold text-navy">
          Three ways to volunteer
        </h2>
        <ul className="mt-4 grid gap-4 lg:grid-cols-3">
          {roles.map((r) => (
            <li key={r.id} className="flex flex-col rounded-sm border-2 border-border p-5">
              <h3 className="text-xl font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{r.body}</p>
              <p className="mt-3 text-sm">
                <span className="font-semibold text-navy">You need: </span>
                {r.needs}
              </p>
              <button
                type="button"
                onClick={() => goToForm(r.id)}
                className="mt-auto min-h-12 rounded-sm border-2 border-navy px-4 pt-0.5 font-semibold text-navy hover:bg-surface-grey"
              >
                Choose this role
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Unlawful content */}
      <section className="mt-12 max-w-4xl" aria-labelledby="unlawful">
        <ShieldAlert className="size-8 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h2 id="unlawful" className="mt-2 text-2xl font-bold text-navy">
          What counts as unlawful content
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Only a narrow set of content can be flagged through this programme. Getting this right
          matters -  wrongly flagged content wastes police time and can harm people.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border-2 border-emergency bg-emergency-tint p-5">
            <h3 className="text-lg font-bold text-navy">Flag this</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-base">
              {unlawful.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border-2 border-border p-5">
            <h3 className="text-lg font-bold text-navy">Do not flag this</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-muted-foreground">
              {notUnlawful.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="mt-12 max-w-4xl" aria-labelledby="instructions">
        <ListChecks className="size-8 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h2 id="instructions" className="mt-2 text-2xl font-bold text-navy">
          Instructions for volunteers
        </h2>
        <ul className="mt-4 space-y-3">
          {instructions.map((i) => (
            <li key={i} className="flex gap-3 rounded-sm border-2 border-border p-4 text-base">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Registration */}
      <section id="volunteer-registration" className="mt-14 max-w-2xl border-t pt-8">
        <FileSignature className="size-8 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h2 className="mt-2 text-2xl font-bold text-navy">Register as a volunteer</h2>
        <p className="mt-2 text-base text-muted-foreground">
          Four steps: agree to the terms, verify your mobile number, give your details, and submit.
        </p>

        <ol className="mt-5 flex flex-wrap gap-2" aria-label="Registration steps">
          {["Terms", "Verify", "Your details", "Submit"].map((label, i) => {
            const n = (i + 1) as 1 | 2 | 3 | 4;
            const active = step === n;
            const past = step > n;
            return (
              <li
                key={label}
                aria-current={active ? "step" : undefined}
                className={
                  "rounded-sm border-2 px-3 py-1.5 text-sm font-semibold " +
                  (active
                    ? "border-navy bg-navy text-navy-foreground"
                    : past
                      ? "border-success text-success"
                      : "border-border text-muted-foreground")
                }
              >
                {n}. {label}
              </li>
            );
          })}
        </ol>

        {done ? (
          <div className="mt-6 rounded-sm border-2 border-success bg-success-tint p-6">
            <CheckCircle2 className="size-7 text-success" aria-hidden="true" />
            <h3 className="mt-2 text-xl font-bold text-navy">Registration received</h3>
            <p className="mt-2 text-base">
              Thank you, {name || "volunteer"}. Your details go to the nodal officer in{" "}
              {state || "your state"} for verification. They will contact you on the mobile number you
              verified. Nothing else is needed from you right now.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-navy">Terms and conditions</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground">
                  {terms.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <label className="mt-5 flex items-start gap-3 rounded-sm border-2 border-border p-4 text-base">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 size-5"
                  />
                  <span>
                    I have read the terms above and the instructions for volunteers, and I declare
                    that the information I give will be true to the best of my knowledge.
                  </span>
                </label>
                <button
                  type="button"
                  disabled={!accepted}
                  onClick={() => setStep(2)}
                  className="mt-5 inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Agree and continue
                </button>
              </div>
            )}

            {step === 2 && (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <div>
                  <label htmlFor="v-state" className="block text-base font-semibold text-navy">
                    State or union territory
                  </label>
                  <select
                    id="v-state"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input bg-background px-3 text-base"
                  >
                    <option value="">Choose your state</option>
                    {states.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="v-login" className="block text-base font-semibold text-navy">
                    Choose a login ID
                  </label>
                  <p id="v-login-help" className="text-sm text-muted-foreground">
                    Letters and numbers only. You will use this to sign in later.
                  </p>
                  <input
                    id="v-login"
                    required
                    aria-describedby="v-login-help"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="v-mobile" className="block text-base font-semibold text-navy">
                    Mobile number
                  </label>
                  <input
                    id="v-mobile"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setOtpSent(true)}
                    className="mt-3 inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-4 font-semibold text-navy hover:bg-surface-grey"
                  >
                    {otpSent ? "Send the code again" : "Send me a one-time code"}
                  </button>
                </div>
                <div>
                  <label htmlFor="v-otp" className="block text-base font-semibold text-navy">
                    One-time code (OTP)
                  </label>
                  <p id="v-otp-help" className="text-sm text-muted-foreground">
                    A six digit code sent by SMS. It is only for signing in -  never share it with
                    anyone, including anyone claiming to be from the police.
                  </p>
                  <input
                    id="v-otp"
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    aria-describedby="v-otp-help"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-2 min-h-12 w-40 rounded-sm border-2 border-input px-3 text-lg tracking-widest"
                  />
                </div>
                <div>
                  <label htmlFor="v-captcha" className="block text-base font-semibold text-navy">
                    Type the characters shown
                  </label>
                  <p id="v-captcha-help" className="text-sm text-muted-foreground">
                    This is a separate security check from the code sent to your phone. It confirms
                    you are a person, not a program.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="select-none rounded-sm border-2 border-border bg-surface-grey px-4 py-2 font-mono text-2xl tracking-[0.4em] text-navy line-through decoration-navy/30"
                    >
                      {captchaText}
                    </span>
                    <input
                      id="v-captcha"
                      required
                      aria-describedby="v-captcha-help"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      className="min-h-12 w-40 rounded-sm border-2 border-input px-3 text-base uppercase"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-surface-grey"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                  >
                    Verify and continue
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(4);
                }}
              >
                <div>
                  <label htmlFor="v-role" className="block text-base font-semibold text-navy">
                    Role you are applying for
                  </label>
                  <select
                    id="v-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input bg-background px-3 text-base"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="v-name" className="block text-base font-semibold text-navy">
                    Your full name, as printed on your ID
                  </label>
                  <input
                    id="v-name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="v-idtype" className="block text-base font-semibold text-navy">
                    Photo ID you will upload
                  </label>
                  <select
                    id="v-idtype"
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-sm border-2 border-input bg-background px-3 text-base"
                  >
                    <option value="aadhaar">Aadhaar</option>
                    <option value="voter">Voter ID</option>
                    <option value="passport">Passport</option>
                    <option value="driving">Driving licence</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="v-idfile" className="block text-base font-semibold text-navy">
                    Upload your photo ID
                  </label>
                  <input
                    id="v-idfile"
                    type="file"
                    required
                    accept="image/*,.pdf"
                    onChange={(e) => setIdFile(e.target.files?.[0]?.name ?? null)}
                    className="mt-2 w-full rounded-sm border-2 border-dashed border-input p-3 text-base"
                  />
                  {idFile ? <p className="mt-1 text-sm text-success">Attached: {idFile}</p> : null}
                </div>
                <div>
                  <label htmlFor="v-addr" className="block text-base font-semibold text-navy">
                    Upload proof of address
                  </label>
                  <input
                    id="v-addr"
                    type="file"
                    required
                    accept="image/*,.pdf"
                    onChange={(e) => setAddressFile(e.target.files?.[0]?.name ?? null)}
                    className="mt-2 w-full rounded-sm border-2 border-dashed border-input p-3 text-base"
                  />
                  {addressFile ? (
                    <p className="mt-1 text-sm text-success">Attached: {addressFile}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="v-reason" className="block text-base font-semibold text-navy">
                    Why do you want to volunteer?
                  </label>
                  <textarea
                    id="v-reason"
                    required
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-2 w-full rounded-sm border-2 border-input px-3 py-2 text-base"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-surface-grey"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                  >
                    Continue to check your answers
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-xl font-bold text-navy">Check your answers</h3>
                <dl className="mt-4 divide-y rounded-sm border-2 border-border">
                  {[
                    ["Role", roles.find((r) => r.id === role)?.title ?? ""],
                    ["State", state],
                    ["Login ID", loginId],
                    ["Mobile", mobile],
                    ["Name", name],
                    ["Photo ID", `${idType}${idFile ? ` -  ${idFile}` : ""}`],
                    ["Address proof", addressFile ?? "Not attached"],
                    ["Reason", reason],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-wrap gap-2 p-4">
                      <dt className="w-40 font-semibold text-navy">{k}</dt>
                      <dd className="flex-1 text-muted-foreground">{v || " - "}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy hover:bg-surface-grey"
                  >
                    Change my answers
                  </button>
                  <button
                    type="button"
                    onClick={() => setDone(true)}
                    className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
                  >
                    Submit my registration
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </Page>
  );
}
