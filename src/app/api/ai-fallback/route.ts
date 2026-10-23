import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { aiFallback, FALLBACK_FEATURES, type FallbackRecord } from "@/lib/ai-fallback";

export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ features: Object.entries(FALLBACK_FEATURES).map(([id, v]) => ({ id, label: v.label, aiGenerated: false })) });
}

export async function POST(request: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const feature = typeof body.feature === "string" ? body.feature : "";
  if (!FALLBACK_FEATURES[feature]) return NextResponse.json({ error: "Unknown fallback feature" }, { status: 422 });
  const records = Array.isArray(body.records) ? (body.records as FallbackRecord[]) : [];
  if (records.length > 500) return NextResponse.json({ error: "At most 500 records" }, { status: 422 });
  return NextResponse.json({ result: aiFallback(feature, records) });
}
