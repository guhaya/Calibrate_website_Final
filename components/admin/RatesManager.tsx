"use client";

import { useEffect, useState } from "react";
import type { PricingRate } from "@/lib/supabase";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "#FFFFFF",
  fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "10px", fontWeight: 700, color: "#6B7280",
  fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.07em",
  textTransform: "uppercase", marginBottom: "6px",
};

type DraftRate = Omit<PricingRate, "id"> & { id?: string };

const BLANK: DraftRate = {
  order_index: 0, name: "", tagline: "", price: 0, currency: "INR",
  billing_note: "", discount_label: "", features: [], highlight: false, active: true,
};

function RateEditor({
  draft, onChange, onSave, onCancel, saving,
}: {
  draft: DraftRate;
  onChange: (d: DraftRate) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div style={{ background: "rgba(255,222,2,0.03)", border: "1px solid rgba(255,222,2,0.18)", borderRadius: "12px", padding: "20px", marginTop: "8px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Plan name</label>
          <input style={inputStyle} value={draft.name} onChange={(e) => onChange({ ...draft, name: e.target.value })} placeholder="Monthly" />
        </div>
        <div>
          <label style={labelStyle}>Price</label>
          <input style={inputStyle} type="number" value={draft.price} onChange={(e) => onChange({ ...draft, price: Number(e.target.value) })} placeholder="25000" />
        </div>
        <div>
          <label style={labelStyle}>Currency</label>
          <input style={inputStyle} value={draft.currency} onChange={(e) => onChange({ ...draft, currency: e.target.value })} placeholder="INR" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Tagline</label>
          <input style={inputStyle} value={draft.tagline || ""} onChange={(e) => onChange({ ...draft, tagline: e.target.value })} placeholder="Flexible commitment" />
        </div>
        <div>
          <label style={labelStyle}>Billing note</label>
          <input style={inputStyle} value={draft.billing_note || ""} onChange={(e) => onChange({ ...draft, billing_note: e.target.value })} placeholder="per month, minimum 3-month commitment" />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Discount badge (optional, shown on highlighted plan)</label>
        <input style={inputStyle} value={draft.discount_label || ""} onChange={(e) => onChange({ ...draft, discount_label: e.target.value })} placeholder="Save ₹10,000" />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Features (one per line)</label>
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          rows={4}
          value={draft.features.join("\n")}
          onChange={(e) => onChange({ ...draft, features: e.target.value.split("\n") })}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          <input type="checkbox" checked={draft.highlight} onChange={(e) => onChange({ ...draft, highlight: e.target.checked })} style={{ accentColor: "#FFDE02" }} />
          Highlighted plan (dominant, "best value" styling)
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          <input type="checkbox" checked={draft.active} onChange={(e) => onChange({ ...draft, active: e.target.checked })} style={{ accentColor: "#FFDE02" }} />
          Active (visible on the live site)
        </label>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={onSave}
          disabled={saving || !draft.name.trim()}
          style={{
            padding: "9px 20px", background: "#FFDE02", border: "none", borderRadius: "8px",
            color: "#07070A", fontSize: "13px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: saving || !draft.name.trim() ? "not-allowed" : "pointer", opacity: saving || !draft.name.trim() ? 0.5 : 1,
          }}
        >
          {saving ? "Saving…" : "Save plan"}
        </button>
        <button onClick={onCancel} style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#B7B9C3", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function RatesManager({ password }: { password: string }) {
  const [rates, setRates] = useState<PricingRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<DraftRate>(BLANK);
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  async function call(action: string, extra: Record<string, unknown> = {}) {
    const res = await fetch("/api/admin/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action, ...extra }),
    });
    return res.json();
  }

  async function load() {
    setLoading(true);
    const json = await call("list");
    setRates(json.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startNew() {
    setDraft(BLANK);
    setEditingId("new");
  }

  function startEdit(rate: PricingRate) {
    setDraft({ ...rate, features: [...rate.features] });
    setEditingId(rate.id);
  }

  async function save() {
    setSaving(true);
    if (editingId === "new") {
      await call("create", { ...draft, features: draft.features.filter((f) => f.trim()) });
    } else if (editingId) {
      await call("update", { rate: { ...draft, id: editingId, features: draft.features.filter((f) => f.trim()) } });
    }
    setSaving(false);
    setEditingId(null);
    load();
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    await call("delete", { id });
    load();
  }

  async function toggleActive(rate: PricingRate) {
    await call("update", { rate: { ...rate, active: !rate.active } });
    load();
  }

  function onDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const reordered = [...rates];
    const fromIdx = reordered.findIndex((r) => r.id === dragId);
    const toIdx = reordered.findIndex((r) => r.id === targetId);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setRates(reordered);
    call("reorder", { ids: reordered.map((r) => r.id) });
    setDragId(null);
  }

  if (loading) {
    return <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" }}>Loading rates…</p>;
  }

  return (
    <div>
      {rates.map((rate) => (
        <div key={rate.id}>
          <div
            draggable
            onDragStart={() => setDragId(rate.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(rate.id)}
            style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", marginBottom: "6px", opacity: rate.active ? 1 : 0.45, cursor: "grab",
            }}
          >
            <span style={{ color: "#4A4D57", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="4" cy="3" r="1.2" /><circle cx="10" cy="3" r="1.2" /><circle cx="4" cy="7" r="1.2" /><circle cx="10" cy="7" r="1.2" /><circle cx="4" cy="11" r="1.2" /><circle cx="10" cy="11" r="1.2" /></svg>
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{rate.name}</span>
                {rate.highlight && <span style={{ fontSize: "10px", color: "#FFDE02" }}>highlighted</span>}
              </div>
              <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {rate.currency === "INR" ? "₹" : rate.currency + " "}{rate.price.toLocaleString("en-IN")} · {rate.billing_note || "no billing note"}
              </span>
            </div>
            <button
              onClick={() => toggleActive(rate)}
              title={rate.active ? "Active, click to hide" : "Hidden, click to show"}
              style={{
                width: "36px", height: "20px", borderRadius: "999px", border: "none", cursor: "pointer",
                background: rate.active ? "#FFDE02" : "rgba(255,255,255,0.15)", position: "relative", flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: "2px", left: rate.active ? "18px" : "2px",
                width: "16px", height: "16px", borderRadius: "50%", background: rate.active ? "#07070A" : "#FFFFFF",
                transition: "left 0.15s ease",
              }} />
            </button>
            <button onClick={() => startEdit(rate)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "#B7B9C3", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
              Edit
            </button>
            <button onClick={() => remove(rate.id, rate.name)} style={{ padding: "6px 12px", background: "rgba(222,48,51,0.06)", border: "1px solid rgba(222,48,51,0.2)", borderRadius: "6px", color: "#DE3033", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
              Delete
            </button>
          </div>
          {editingId === rate.id && (
            <RateEditor draft={draft} onChange={setDraft} onSave={save} onCancel={() => setEditingId(null)} saving={saving} />
          )}
        </div>
      ))}

      {editingId === "new" ? (
        <RateEditor draft={draft} onChange={setDraft} onSave={save} onCancel={() => setEditingId(null)} saving={saving} />
      ) : (
        <button
          onClick={startNew}
          style={{
            width: "100%", padding: "14px", background: "rgba(255,222,2,0.05)", border: "1px dashed rgba(255,222,2,0.3)",
            borderRadius: "10px", color: "#FFDE02", fontSize: "13px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: "pointer", marginTop: "8px",
          }}
        >
          + Add plan
        </button>
      )}
    </div>
  );
}
