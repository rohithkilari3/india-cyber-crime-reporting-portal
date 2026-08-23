import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/report/safety/")({
  beforeLoad: () => {
    throw redirect({ to: "/report/safety/start" });
  },
});
