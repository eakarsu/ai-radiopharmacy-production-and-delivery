// Offline only: keys are unset before importing the app module under test; the fallback never calls a provider.
delete process.env.OPENROUTER_API_KEY;
delete process.env.OPENAI_API_KEY;
import { test } from "node:test";
import assert from "node:assert/strict";
import { aiFallback, FALLBACK_FEATURES } from "../src/lib/ai-fallback";

test("fallback lists 2-3 domain features", () => {
  const ids = Object.keys(FALLBACK_FEATURES);
  assert.ok(ids.length >= 2 && ids.length <= 3, ids.join(","));
});

test("fallback is labelled aiGenerated:false and preserves false/0/empty", () => {
  const feature = Object.keys(FALLBACK_FEATURES)[0];
  const r = aiFallback(feature, [], new Date("2026-01-01T00:00:00Z"));
  assert.equal(r.aiGenerated, false);
  assert.equal(r.source, "deterministic-fallback");
  const byLabel = Object.fromEntries(r.sections.map((s) => [s.label, s.value]));
  assert.equal(byLabel["Records reviewed"], 0);
  assert.equal(byLabel["Has overdue records"], false);
  assert.equal(byLabel["Notes"], "");
});

test("fallback counts overdue open records deterministically", () => {
  const feature = Object.keys(FALLBACK_FEATURES)[0];
  const rows = [
    { status: "OPEN", dueAt: "2025-01-01" },
    { status: "DONE", dueAt: "2025-01-01" },
    { status: "OPEN", dueAt: "2027-01-01" },
  ];
  const r = aiFallback(feature, rows as never, new Date("2026-01-01T00:00:00Z"));
  const byLabel = Object.fromEntries(r.sections.map((s) => [s.label, s.value]));
  assert.equal(byLabel["Overdue records"], 1);
  assert.equal(byLabel["Has overdue records"], true);
  assert.throws(() => aiFallback("nope", []), /Unknown fallback feature/);
});
