import type { ReactNode } from "react";

export function Page({
  children,
  width = "narrow",
}: {
  children: ReactNode;
  width?: "narrow" | "wide";
}) {
  return (
    <div className="page-enter mx-auto w-full px-4 py-10">
      <div className={width === "narrow" ? "mx-auto max-w-2xl" : "mx-auto max-w-6xl"}>
        {children}
      </div>
    </div>
  );
}
