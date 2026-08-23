import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { Page } from "@/components/site/Page";

export const Route = createFileRoute("/nodal-officers")({
  head: () => ({
    meta: [
      { title: "State nodal and grievance officers - National Cyber Crime Reporting Portal" },
      {
        name: "description",
        content:
          "Find the cyber crime nodal officer and grievance officer for your state or union territory, and when to contact them.",
      },
      { property: "og:title", content: "State nodal and grievance officers" },
      {
        property: "og:description",
        content: "Who to contact in your state if a report needs to be escalated.",
      },
    ],
  }),
  component: NodalOfficers,
});

const officers = [
  { state: "Andhra Pradesh", office: "Cyber Crime Coordination Centre, Mangalagiri", email: "cybercell@appolice.gov.in" },
  { state: "Assam", office: "CID Cyber Crime Cell, Guwahati", email: "cybercell@assampolice.gov.in" },
  { state: "Bihar", office: "Economic Offences Unit, Patna", email: "cybercell-bih@nic.in" },
  { state: "Delhi", office: "IFSO, Special Cell, New Delhi", email: "cybercell.delhi@nic.in" },
  { state: "Gujarat", office: "CID Crime Cyber Cell, Gandhinagar", email: "cc-cid@gujarat.gov.in" },
  { state: "Karnataka", office: "CID Cyber Crime Division, Bengaluru", email: "cybercrimeps@ksp.gov.in" },
  { state: "Kerala", office: "Cyberdome, Thiruvananthapuram", email: "cyberpolice@keralapolice.gov.in" },
  { state: "Madhya Pradesh", office: "State Cyber Police, Bhopal", email: "cybercell.mp@mppolice.gov.in" },
  { state: "Maharashtra", office: "Maharashtra Cyber, Navi Mumbai", email: "cybercell@mahapolice.gov.in" },
  { state: "Rajasthan", office: "Cyber Crime Police Station, Jaipur", email: "cybercell@rajpolice.gov.in" },
  { state: "Tamil Nadu", office: "Cyber Crime Wing, Chennai", email: "cybercrime@tncctns.gov.in" },
  { state: "Telangana", office: "Cyber Crime Police Station, Hyderabad", email: "cybercrime@tspolice.gov.in" },
  { state: "Uttar Pradesh", office: "Cyber Crime Headquarters, Lucknow", email: "cyberps@up.gov.in" },
  { state: "West Bengal", office: "CID Cyber Crime Cell, Kolkata", email: "occyber@cidwestbengal.gov.in" },
];

function NodalOfficers() {
  return (
    <Page width="wide">
      <div className="max-w-3xl">
        <Users className="size-10 text-brand-blue" aria-hidden="true" strokeWidth={1.75} />
        <h1 className="mt-3 text-3xl font-bold text-navy">State nodal and grievance officers</h1>
        <p className="mt-3 text-base text-muted-foreground">
          You do not need this list to report - reports are routed automatically. Use it only if your
          report needs to be escalated or you have not heard back for a long time. Contact details in
          this prototype are illustrative.
        </p>
      </div>

      <div className="mt-8 max-w-4xl overflow-x-auto rounded-sm border-2 border-border">
        <table className="w-full border-collapse text-left text-base">
          <caption className="sr-only">
            Cyber crime nodal and grievance officers by state or union territory
          </caption>
          <thead className="bg-surface-grey">
            <tr>
              <th scope="col" className="p-4 font-bold text-navy">State or UT</th>
              <th scope="col" className="p-4 font-bold text-navy">Office</th>
              <th scope="col" className="p-4 font-bold text-navy">Email</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((o) => (
              <tr key={o.state} className="border-t">
                <th scope="row" className="p-4 font-semibold text-navy">{o.state}</th>
                <td className="p-4 text-muted-foreground">{o.office}</td>
                <td className="p-4">
                  <a href={`mailto:${o.email}`} className="text-brand-blue underline">
                    {o.email}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
