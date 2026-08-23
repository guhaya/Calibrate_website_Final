"use client";

import { useEffect, useState } from "react";

interface Submission {
  id: string;
  answers: Record<string, string | string[]>;
  name: string | null;
  email: string | null;
  phone: string | null;
  status: "new" | "reviewed" | "archived";
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "#FFDE02",
  reviewed: "#22C55E",
  archived: "#7E8395",
};

export default function ApplicationsView({ password }: { password: string }) {
  const [subs, setSubs] = useState<Submission[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [labelById, setLabelById] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    const [subsRes, fieldsRes] = await Promise.all([
      fetch("/api/admin/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, limit: 100, offset: 0 }),
      }).then((r) => r.json()),
      fetch("/api/admin/form-fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "list" }),
      }).then((r) => r.json()),
    ]);
    setSubs(subsRes.data || []);
    setCount(subsRes.count || 0);
    const map: Record<string, string> = {};
    for (const f of fieldsRes.data || []) map[f.id] = f.label;
    setLabelById(map);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action: "update-status", id, status }),
    });
    load();
  }

  if (loading) {
    return <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" }}>Loading applications…</p>;
  }

  if (subs.length === 0) {
    return (
      <div style={{ padding: "32px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px" }}>
        <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" }}>No applications yet.</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "16px" }}>{count} total</p>
      {subs.map((s) => (
        <div key={s.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", marginBottom: "8px", overflow: "hidden" }}>
          <button
            onClick={() => setOpen(open === s.id ? null : s.id)}
            style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: STATUS_COLORS[s.status], flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.name || "(no name)"}</span>
              <span style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginLeft: "10px" }}>{s.email}</span>
            </div>
            <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", flexShrink: 0 }}>
              {new Date(s.created_at).toLocaleDateString()}
            </span>
          </button>
          {open === s.id && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                {(["new", "reviewed", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateStatus(s.id, st)}
                    style={{
                      padding: "5px 12px", borderRadius: "999px", fontSize: "11px", fontFamily: "'Plus Jakarta Sans', sans-serif",
                      border: `1px solid ${s.status === st ? STATUS_COLORS[st] : "rgba(255,255,255,0.12)"}`,
                      background: s.status === st ? `${STATUS_COLORS[st]}1A` : "transparent",
                      color: s.status === st ? STATUS_COLORS[st] : "#7E8395", cursor: "pointer", textTransform: "capitalize",
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(s.answers).map(([key, val]) => (
                  <div key={key} style={{ fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    <span style={{ color: "#7E8395" }}>{labelById[key] || key}: </span>
                    <span style={{ color: "#F5F3EE" }}>{Array.isArray(val) ? val.join(", ") : val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
