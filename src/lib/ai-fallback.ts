// Deterministic offline fallback over the caller's own records. No provider call is made here.
// Every result is labelled aiGenerated:false so it is never presented as AI output.
export type FallbackRecord = Record<string, unknown>;
export interface FallbackSection { label: string; value: string | number | boolean }
export interface FallbackResult {
  feature: string; label: string; aiGenerated: false; source: "deterministic-fallback";
  summary: string; sections: FallbackSection[]; findings: string[];
}
export const FALLBACK_FEATURES: Record<string, { label: string; dateField: string }> = {
  "expiry-window-risk": { label: "Expiry window risk (operational)", dateField: "expiresAt" },
  "assay-evidence-gaps": { label: "Assay evidence gaps (operational)", dateField: "assayedAt" },
  "delivery-readiness": { label: "Delivery readiness (operational)", dateField: "etaAt" }
};

function asDate(v: unknown): number | null {
  if (typeof v !== "string" && typeof v !== "number") return null;
  const t = new Date(v as string).getTime();
  return Number.isFinite(t) ? t : null;
}
function isClosed(r: FallbackRecord): boolean {
  const s = String(r.status ?? r.done ?? "").toLowerCase();
  return s === "done" || s === "closed" || s === "approved" || s === "complete" || r.done === true;
}

export function aiFallback(feature: string, records: FallbackRecord[], now: Date = new Date()): FallbackResult {
  const cfg = FALLBACK_FEATURES[feature];
  if (!cfg) throw new Error(`Unknown fallback feature: ${feature}`);
  const rows = Array.isArray(records) ? records : [];
  const nowMs = now.getTime();
  let overdue = 0, missingDate = 0, closed = 0;
  for (const r of rows) {
    if (isClosed(r)) { closed++; continue; }
    const t = asDate(r[cfg.dateField] ?? r.dueAt ?? r.expiresAt ?? r.nextDueAt);
    if (t == null) missingDate++;
    else if (t < nowMs) overdue++;
  }
  const open = rows.length - closed;
  const sections: FallbackSection[] = [
    { label: "Records reviewed", value: rows.length },
    { label: "Open records", value: open },
    { label: "Closed records", value: closed },
    { label: "Overdue records", value: overdue },
    { label: "Records missing a date", value: missingDate },
    { label: "Has overdue records", value: overdue > 0 },
    { label: "Notes", value: "" },
  ];
  const findings: string[] = [];
  if (rows.length === 0) findings.push("No records were supplied; nothing was assessed.");
  if (overdue > 0) findings.push(`${overdue} open record(s) are past their ${cfg.dateField} date and need review.`);
  if (missingDate > 0) findings.push(`${missingDate} open record(s) have no usable date and need completion.`);
  if (rows.length > 0 && overdue === 0 && missingDate === 0) findings.push("No overdue or undated open records were found in the supplied records.");
  return {
    feature, label: cfg.label, aiGenerated: false, source: "deterministic-fallback",
    summary: `${cfg.label}: reviewed ${rows.length} record(s) locally without an AI provider.`,
    sections, findings,
  };
}
