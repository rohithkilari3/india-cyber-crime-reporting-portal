import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/** Shared validation styling so a missing answer is visible on the field itself,
 *  not only in the summary at the top of the form. */
export type FieldErrors = Record<string, string>;

export function labelTone(invalid?: boolean) {
  return invalid ? "text-emergency" : "text-navy";
}

export function inputTone(invalid?: boolean) {
  return invalid ? "border-emergency bg-emergency-tint" : "border-input";
}

export function boxTone(invalid?: boolean) {
  return invalid ? "border-emergency bg-emergency-tint" : "border-border";
}

export function inputClass(invalid?: boolean, extra = "") {
  return `min-h-12 w-full rounded-sm border-2 px-3 text-lg ${inputTone(invalid)} ${extra}`;
}

export function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="mt-1 flex items-center gap-2 text-base font-semibold text-emergency">
      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ErrorSummary({ errors }: { errors: FieldErrors }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return (
    <div
      id="error-summary"
      tabIndex={-1}
      role="alert"
      className="mt-6 rounded-sm border-2 border-emergency bg-emergency-tint p-4"
    >
      <p className="flex items-center gap-2 text-lg font-bold text-emergency">
        <AlertCircle className="size-5" aria-hidden="true" />
        There {entries.length === 1 ? "is 1 thing" : `are ${entries.length} things`} to check
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-6 text-base font-semibold text-emergency">
        {entries.map(([key, message]) => (
          <li key={key}>
            <a
              href={`#${key}`}
              className="underline"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(key);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                (el as HTMLElement | null)?.focus?.();
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function focusErrorSummary() {
  const el = document.getElementById("error-summary");
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  el?.focus();
}

export function Field({
  id,
  label,
  hint,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={`block text-lg font-semibold ${labelTone(!!error)}`}>
        {label}{" "}
        {optional ? <span className="font-normal text-muted-foreground">(optional)</span> : null}
      </label>
      {hint ? <p className="text-base text-muted-foreground">{hint}</p> : null}
      <FieldError id={id} message={error} />
      <div className="mt-2">{children}</div>
    </div>
  );
}
