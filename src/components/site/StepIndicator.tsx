const steps = ["What happened", "Evidence", "Verify", "Done"];

export function StepIndicator({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold text-muted-foreground">
        Step {current} of {steps.length} — {steps[current - 1]}
      </p>
      <ol className="mt-2 flex gap-2" aria-label={`Step ${current} of ${steps.length}`}>
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <span className="sr-only">{label}</span>
            <span
              aria-hidden="true"
              className={`block h-1.5 rounded-full ${i < current ? "bg-brand-blue" : "bg-border"}`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
