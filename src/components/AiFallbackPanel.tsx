"use client";
import { useState } from "react";
type Section = { label: string; value: string | number | boolean };
type Result = { label: string; summary: string; sections: Section[]; findings: string[] };
export default function AiFallbackPanel() {
  const [feature, setFeature] = useState(""), [features, setFeatures] = useState<{ id: string; label: string }[]>([]), [result, setResult] = useState<Result | null>(null), [error, setError] = useState("");
  async function load() {
    try {
      const r = await fetch("/api/ai-fallback"); const d = await r.json();
      if (!r.ok) throw new Error(d?.error || "Unavailable");
      setFeatures(d.features); setFeature(d.features[0]?.id || "");
    } catch (e) { setError(e instanceof Error ? e.message : "Unavailable"); }
  }
  async function run() {
    try {
      const r = await fetch("/api/ai-fallback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ feature, records: [] }) });
      const d = await r.json(); if (!r.ok) throw new Error(d?.error || "Unavailable"); setResult(d.result);
    } catch (e) { setError(e instanceof Error ? e.message : "Unavailable"); }
  }
  return <section aria-label="Local deterministic insights" className="space-y-2 rounded border p-3">
    <h3 className="font-semibold">Local deterministic insights — aiGenerated: false</h3>
    <p className="text-sm">Offline fallback over your own records. No AI provider is called and no diagnosis or clinical decision is made.</p>
    {error ? <p role="alert">{error}</p> : null}
    {!features.length ? <button type="button" onClick={load}>Load local insights</button> : <>
      <label>Insight <select aria-label="Local insight" value={feature} onChange={e => setFeature(e.target.value)}>{features.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}</select></label>
      <button type="button" onClick={run}>Run local insight</button></>}
    {result ? <div><h4>{result.label}</h4><p>{result.summary}</p>
      {result.sections.map(s => <p key={s.label}>{s.label}: {String(s.value)}</p>)}
      {result.findings.map((f, i) => <p key={i}>{f}</p>)}</div> : null}
  </section>;
}
