import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
import { Page } from "@/components/site/Page";
import { StepIndicator } from "@/components/site/StepIndicator";
import { formatBytes, useReportFlow, type ReportFile } from "@/lib/report-flow";

const OTHER_STEPS = ["Confirm your number", "What happened", "Evidence", "About you and send", "Sent"];

export const Route = createFileRoute("/report/other/evidence")({
  head: () => ({
    meta: [
      { title: "Add screenshots or messages - not sure what happened" },
      {
        name: "description",
        content:
          "Drag and drop screenshots, messages or anything else that shows what happened. This step is optional.",
      },
      { property: "og:title", content: "Add screenshots or messages" },
      {
        property: "og:description",
        content: "Upload files that help explain what happened, or skip and add them later.",
      },
    ],
  }),
  component: Evidence,
});

function Evidence() {
  const navigate = useNavigate();
  const { report, update } = useReportFlow();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!report.mobileVerified) navigate({ to: "/report/other/verify", replace: true });
  }, [report.mobileVerified, navigate]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const added: ReportFile[] = Array.from(list).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      name: f.name,
      size: f.size,
      type: f.type || "file",
    }));
    update({ files: [...report.files, ...added] });
  }

  function remove(id: string) {
    update({ files: report.files.filter((f) => f.id !== id) });
  }

  return (
    <Page>
      <StepIndicator current={3} steps={OTHER_STEPS} />
      <h1 className="text-3xl font-bold text-navy">Add anything that shows what happened</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Screenshots, messages, call logs, links - anything at all. You can add several at once.
      </p>
      <p className="mt-3 rounded-sm border-2 border-border bg-surface-grey p-4 text-base text-muted-foreground">
        This step is optional. But a single screenshot is often what helps an officer work out
        what kind of case this is - add one if you can, and you can always add more later.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mt-8 rounded-sm border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? "border-brand-blue bg-surface-grey" : "border-input bg-background"
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
          type="file"
          multiple
          className="sr-only"
          aria-label="Choose evidence files"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div aria-live="polite" className="mt-6">
        {report.files.length > 0 ? (
          <>
            <div className="flex items-center gap-2 rounded-sm border-2 border-success bg-success-tint p-3">
              <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
              <p className="font-semibold text-success">
                {report.files.length} file{report.files.length > 1 ? "s" : ""} added
              </p>
            </div>
            <ul className="mt-4 divide-y rounded-sm border">
              {report.files.map((f) => (
                <li key={f.id} className="flex items-center gap-3 p-3">
                  <FileText className="size-5 shrink-0 text-navy" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{f.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {formatBytes(f.size)}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(f.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm border px-3 font-semibold text-navy hover:bg-surface-grey"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove {f.name}</span>
                    <span aria-hidden="true">Remove</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/report/other/about-you" })}
          className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-brand-blue px-6 text-lg font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Continue
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
        <Link to="/report/other/about-you" className="font-semibold text-brand-blue underline">
          Skip - I don&apos;t have anything to add
        </Link>
      </div>
      <p className="mt-6">
        <Link to="/report/other/what-happened" className="font-semibold text-brand-blue underline">
          Back to what happened
        </Link>
      </p>
    </Page>
  );
}
