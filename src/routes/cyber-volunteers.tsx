import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HandHeart } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/cyber-volunteers")({
  head: () => ({
    meta: [
      { title: "Become a cyber volunteer — National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Register as a Cyber Crime Volunteer: flag unlawful content, spread cyber awareness in your community, or offer your technical skills.",
      },
      { property: "og:title", content: "Become a cyber volunteer" },
      {
        property: "og:description",
        content: "Three ways to help: flag unlawful content, raise awareness, or lend expertise.",
      },
    ],
  }),
  component: Volunteers,
});

const roles = [
  {
    id: "flagger",
    title: "Unlawful content flagger",
    body: "Report content about child abuse, terrorism or extreme violence that you come across online. No technical skill needed.",
    needs: "Aadhaar-verified identity, 18 or older.",
  },
  {
    id: "promoter",
    title: "Cyber awareness promoter",
    body: "Run awareness talks in your school, workplace, RWA or village. We give you the material.",
    needs: "Willingness to spend a few hours a month locally.",
  },
  {
    id: "expert",
    title: "Cyber expert",
    body: "Lend technical skills in malware analysis, digital forensics, cryptography or network security.",
    needs: "A relevant qualification or demonstrable experience.",
  },
];

function Volunteers() {
  const [role, setRole] = useState("flagger");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <HandHeart className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">Become a cyber volunteer</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Volunteers help make the internet safer for everyone in India. Choose the role that fits
          you — you can start with any of them and change later.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {roles.map((r) => (
          <li key={r.id} className="flex flex-col rounded-sm border-2 border-border p-5">
            <h2 className="text-xl font-bold text-navy">{r.title}</h2>
            <p className="mt-2 text-base text-muted-foreground">{r.body}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold text-navy">You need: </span>
              {r.needs}
            </p>
            <button
              type="button"
              onClick={() => {
                setRole(r.id);
                setDone(false);
                document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-auto min-h-12 rounded-sm border-2 border-navy px-4 pt-0.5 font-semibold text-navy hover:bg-surface-grey"
            >
              Choose this role
            </button>
          </li>
        ))}
      </ul>

      <section id="volunteer-form" className="mt-12 max-w-2xl border-t pt-8">
        <h2 className="text-2xl font-bold text-navy">Register your interest</h2>
        {done ? (
          <div className="mt-4 rounded-sm border-2 border-success bg-success-tint p-5">
            <CheckCircle2 className="size-7 text-success" aria-hidden="true" />
            <p className="mt-2 text-base">
              Thank you, {name || "volunteer"}. Your state nodal officer will verify your details and
              contact you. Nothing else is needed from you right now.
            </p>
          </div>
        ) : (
          <form
            className="mt-4 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div>
              <label htmlFor="v-role" className="block text-base font-semibold text-navy">
                Role
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
                Your name
              </label>
              <input
                id="v-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
              />
            </div>
            <div>
              <label htmlFor="v-state" className="block text-base font-semibold text-navy">
                State or union territory
              </label>
              <input
                id="v-state"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-2 min-h-12 w-full rounded-sm border-2 border-input px-3 text-base"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-6 text-base font-semibold text-primary-foreground hover:bg-brand-blue-hover"
            >
              Register as a volunteer
            </button>
          </form>
        )}
      </section>
    </Page>
  );
}
