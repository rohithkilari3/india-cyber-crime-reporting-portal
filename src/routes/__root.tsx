import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { A11yProvider } from "@/lib/a11y-settings";
import { ReportFlowProvider } from "@/lib/report-flow";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-bold text-navy">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-muted-foreground">
        The page may have moved. You can start again from the home page, or call 1930 if you
        need help now.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-5 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Go to the home page
        </Link>
        <a
          href="tel:1930"
          className="inline-flex min-h-12 items-center rounded-sm border-2 border-emergency bg-emergency-tint px-5 font-semibold text-emergency"
        >
          Call 1930
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-bold text-navy">This page didn&apos;t load</h1>
      <p className="mt-3 text-muted-foreground">
        Something went wrong on our side. Nothing you entered was lost by us. You can try again,
        or call 1930 for immediate help.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex min-h-12 items-center rounded-sm bg-brand-blue px-5 font-semibold text-primary-foreground hover:bg-brand-blue-hover"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex min-h-12 items-center rounded-sm border-2 border-navy px-5 font-semibold text-navy"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Report cyber crime — Cyber Crime Help" },
      {
        name: "description",
        content:
          "Report online fraud, threats or harassment in plain language. Call 1930 for urgent help.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <A11yProvider>
        <ReportFlowProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-background focus:px-4 focus:py-3 focus:font-semibold focus:text-navy"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content">
            {/* Required: nested routes render here. */}
            <Outlet />
          </main>
          <SiteFooter />
        </ReportFlowProvider>
      </A11yProvider>
    </QueryClientProvider>
  );
}
