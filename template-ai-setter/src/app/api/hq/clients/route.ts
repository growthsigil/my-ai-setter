/**
 * JARVIS HQ — the client roster for the top-bar workspace switcher.
 * Returns every client as { slug, label } so the HQ can drive the dashboard
 * iframe with ?client=<slug>. The owner's own setter is labelled "My Dashboard".
 * Key-gated, read-only.
 *
 * GET /api/hq/clients?k=<key>  →  { clients: [{ slug, label }] }
 */
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAccessKey } from "@/lib/access";
import { OWNER_SLUG } from "@/lib/owner";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const k = req.nextUrl.searchParams.get("k") ?? "";
    const accessKey = await getAccessKey();
    if (!accessKey || k !== accessKey) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { data } = await supabase.from("clients").select("name, slug").order("name");
    const clients = ((data ?? []) as { name: string | null; slug: string }[]).map((c) => ({
      slug: c.slug,
      label: c.slug === OWNER_SLUG ? "My Dashboard" : (c.name || c.slug),
    }));
    return NextResponse.json({ clients });
  } catch (err) {
    console.error("[hq/clients] error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
