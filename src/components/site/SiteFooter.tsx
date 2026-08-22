import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-surface-grey">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-base font-bold text-navy">If you need help right now</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Call <a className="font-semibold text-brand-blue underline" href="tel:1930">1930</a> — free,
          24 hours a day. The sooner you call, the better the chance of stopping the money.
        </p>
        <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/" className="text-brand-blue underline">Home</Link>
          <Link to="/track" className="text-brand-blue underline">Track a report</Link>
          <Link to="/check-suspect" className="text-brand-blue underline">Check a number or link</Link>
          <Link to="/report/safety" className="text-brand-blue underline">Threats or harassment</Link>
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">
          Prototype interface. Not the live government service.
        </p>
      </div>
    </footer>
  );
}
