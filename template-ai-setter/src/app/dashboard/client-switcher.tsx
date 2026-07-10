"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

/**
 * Top-nav client switcher. Sets the `client` URL param (a client slug) while
 * preserving every other filter, so switching is deep-linkable
 * (/dashboard?client=ty-barnes). "All clients" clears the param and the
 * dashboard falls back to the combined, all-clients view.
 *
 * Server-side, page.tsx resolves the slug to a client_id and passes it to
 * get_dashboard(p_client_id) so every card re-queries scoped to that client.
 */
type ClientOpt = { slug: string; label: string };

export default function ClientSwitcher({
  clients,
  active,
}: {
  clients: ClientOpt[];
  active: string; // slug, or "all"
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function onChange(next: string) {
    const p = new URLSearchParams(params.toString());
    if (next === "all") p.delete("client");
    else p.set("client", next);
    startTransition(() => router.push(`/dashboard?${p.toString()}`));
  }

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          fontSize: 10.5,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: "#7d869c",
          fontFamily: "var(--mono)",
        }}
      >
        Workspace
      </span>
      <select
        className="hud-select"
        value={active}
        onChange={(e) => onChange(e.target.value)}
        style={{ opacity: pending ? 0.55 : 1, fontWeight: 700, minWidth: 170 }}
        aria-label="Client workspace"
      >
        <option value="all">All clients</option>
        {clients.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
