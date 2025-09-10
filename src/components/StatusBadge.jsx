import React from "react";

export default function StatusBadge({ status }) {
  const s = (status || "").toUpperCase();
  const styles = {
    OPEN:    "bg-amber-100 text-amber-800",
    PENDING: "bg-blue-100 text-blue-800",
    DONE:    "bg-emerald-100 text-emerald-800",
  }[s] || "bg-slate-100 text-slate-800";

  return <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${styles}`}>{s}</span>;
}
