"use client";

import { useEffect, useState } from "react";
import type { FormField, FormFieldType } from "@/lib/supabase";

const FIELD_TYPES: { value: FormFieldType; label: string; hasOptions: boolean }[] = [
  { value: "text", label: "Short text", hasOptions: false },
  { value: "textarea", label: "Long text", hasOptions: false },
  { value: "email", label: "Email", hasOptions: false },
  { value: "phone", label: "Phone", hasOptions: false },
  { value: "number", label: "Number", hasOptions: false },
  { value: "date", label: "Date", hasOptions: false },
  { value: "select", label: "Dropdown", hasOptions: true },
  { value: "radio", label: "Single choice", hasOptions: true },
  { value: "checkbox", label: "Multiple choice", hasOptions: true },
  { value: "scale", label: "Scale (1-5)", hasOptions: false },
];

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

type DraftField = Omit<FormField, "id"> & { id?: string };

const BLANK: DraftField = {
  order_index: 0, section: "", label: "", help_text: "", field_type: "text",
  options: [], placeholder: "", required: false, active: true,
};

function FieldEditor({
  draft, onChange, onSave, onCancel, saving,
}: {
  draft: DraftField;
  onChange: (d: DraftField) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const typeInfo = FIELD_TYPES.find((t) => t.value === draft.field_type);
  return (
    <div style={{ background: "rgba(255,222,2,0.03)", border: "1px solid rgba(255,222,2,0.18)", borderRadius: "12px", padding: "20px", marginTop: "8px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Question</label>
          <input style={inputStyle} value={draft.label} onChange={(e) => onChange({ ...draft, label: e.target.value })} placeholder="e.g. What's your primary goal?" />
        </div>
        <div>
          <label style={labelStyle}>Section</label>
          <input style={inputStyle} value={draft.section || ""} onChange={(e) => onChange({ ...draft, section: e.target.value })} placeholder="e.g. Goals" />
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={labelStyle}>Help text (optional)</label>
        <input style={inputStyle} value={draft.help_text || ""} onChange={(e) => onChange({ ...draft, help_text: e.target.value })} placeholder="Shown beneath the question" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Answer type</label>
          <select
            style={inputStyle}
            value={draft.field_type}
            onChange={(e) => onChange({ ...draft, field_type: e.target.value as FormFieldType })}
          >
            {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Placeholder (optional)</label>
          <input style={inputStyle} value={draft.placeholder || ""} onChange={(e) => onChange({ ...draft, placeholder: e.target.value })} disabled={typeInfo?.hasOptions} />
        </div>
      </div>

      {typeInfo?.hasOptions && (
        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>Options (one per line)</label>
          <textarea
            style={{ ...inputStyle, resize: "vertical" }}
            rows={4}
            value={draft.options.join("\n")}
            onChange={(e) => onChange({ ...draft, options: e.target.value.split("\n") })}
            placeholder={"Fat loss\nMuscle gain\nBody recomposition"}
          />
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          <input type="checkbox" checked={draft.required} onChange={(e) => onChange({ ...draft, required: e.target.checked })} style={{ accentColor: "#FFDE02" }} />
          Required
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          <input type="checkbox" checked={draft.active} onChange={(e) => onChange({ ...draft, active: e.target.checked })} style={{ accentColor: "#FFDE02" }} />
          Active (visible on the live application form)
        </label>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={onSave}
          disabled={saving || !draft.label.trim()}
          style={{
            padding: "9px 20px", background: "#FFDE02", border: "none", borderRadius: "8px",
            color: "#07070A", fontSize: "13px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: saving || !draft.label.trim() ? "not-allowed" : "pointer", opacity: saving || !draft.label.trim() ? 0.5 : 1,
          }}
        >
          {saving ? "Saving…" : "Save question"}
        </button>
        <button onClick={onCancel} style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#B7B9C3", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function FormBuilder({ password }: { password: string }) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<DraftField>(BLANK);
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  async function call(action: string, extra: Record<string, unknown> = {}) {
    const res = await fetch("/api/admin/form-fields", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action, ...extra }),
    });
    return res.json();
  }

  async function load() {
    setLoading(true);
    const json = await call("list");
    setFields(json.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startNew() {
    setDraft({ ...BLANK, section: fields[fields.length - 1]?.section || "" });
    setEditingId("new");
  }

  function startEdit(field: FormField) {
    setDraft({ ...field, options: [...field.options] });
    setEditingId(field.id);
  }

  async function save() {
    setSaving(true);
    if (editingId === "new") {
      await call("create", {
        section: draft.section, label: draft.label, help_text: draft.help_text,
        field_type: draft.field_type, options: draft.options.filter((o) => o.trim()),
        placeholder: draft.placeholder, required: draft.required, active: draft.active,
      });
    } else if (editingId) {
      await call("update", { field: { ...draft, id: editingId, options: draft.options.filter((o) => o.trim()) } });
    }
    setSaving(false);
    setEditingId(null);
    load();
  }

  async function remove(id: string, label: string) {
    if (!confirm(`Delete "${label}"? This can't be undone.`)) return;
    await call("delete", { id });
    load();
  }

  async function toggleActive(field: FormField) {
    await call("update", { field: { ...field, active: !field.active } });
    load();
  }

  function onDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const reordered = [...fields];
    const fromIdx = reordered.findIndex((f) => f.id === dragId);
    const toIdx = reordered.findIndex((f) => f.id === targetId);
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    setFields(reordered);
    call("reorder", { ids: reordered.map((f) => f.id) });
    setDragId(null);
  }

  const grouped = fields.reduce<Record<string, FormField[]>>((acc, f) => {
    const key = f.section || "Ungrouped";
    (acc[key] ||= []).push(f);
    return acc;
  }, {});

  if (loading) {
    return <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" }}>Loading form…</p>;
  }

  return (
    <div>
      {fields.length === 0 && editingId !== "new" && (
        <div style={{ padding: "32px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px", marginBottom: "20px" }}>
          <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px", marginBottom: "12px" }}>
            No questions yet. This means the Supabase migration probably hasn&apos;t been run, or the form is intentionally empty.
          </p>
        </div>
      )}

      {Object.entries(grouped).map(([section, sectionFields]) => (
        <div key={section} style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#FFDE02", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "10px" }}>
            {section}
          </p>
          {sectionFields.map((field) => (
            <div key={field.id}>
              <div
                draggable
                onDragStart={() => setDragId(field.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(field.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px", marginBottom: "6px", opacity: field.active ? 1 : 0.45,
                  cursor: "grab",
                }}
              >
                <span style={{ color: "#4A4D57", cursor: "grab", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="4" cy="3" r="1.2" /><circle cx="10" cy="3" r="1.2" /><circle cx="4" cy="7" r="1.2" /><circle cx="10" cy="7" r="1.2" /><circle cx="4" cy="11" r="1.2" /><circle cx="10" cy="11" r="1.2" /></svg>
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{field.label}</span>
                    {field.required && <span style={{ fontSize: "10px", color: "#FFDE02" }}>required</span>}
                  </div>
                  <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {FIELD_TYPES.find((t) => t.value === field.field_type)?.label}
                  </span>
                </div>
                <button
                  onClick={() => toggleActive(field)}
                  title={field.active ? "Active, click to hide" : "Hidden, click to show"}
                  style={{
                    width: "36px", height: "20px", borderRadius: "999px", border: "none", cursor: "pointer",
                    background: field.active ? "#FFDE02" : "rgba(255,255,255,0.15)", position: "relative", flexShrink: 0,
                  }}
                >
                  <span style={{
                    position: "absolute", top: "2px", left: field.active ? "18px" : "2px",
                    width: "16px", height: "16px", borderRadius: "50%", background: field.active ? "#07070A" : "#FFFFFF",
                    transition: "left 0.15s ease",
                  }} />
                </button>
                <button onClick={() => startEdit(field)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "#B7B9C3", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
                  Edit
                </button>
                <button onClick={() => remove(field.id, field.label)} style={{ padding: "6px 12px", background: "rgba(222,48,51,0.06)", border: "1px solid rgba(222,48,51,0.2)", borderRadius: "6px", color: "#DE3033", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
                  Delete
                </button>
              </div>
              {editingId === field.id && (
                <FieldEditor draft={draft} onChange={setDraft} onSave={save} onCancel={() => setEditingId(null)} saving={saving} />
              )}
            </div>
          ))}
        </div>
      ))}

      {editingId === "new" ? (
        <FieldEditor draft={draft} onChange={setDraft} onSave={save} onCancel={() => setEditingId(null)} saving={saving} />
      ) : (
        <button
          onClick={startNew}
          style={{
            width: "100%", padding: "14px", background: "rgba(255,222,2,0.05)", border: "1px dashed rgba(255,222,2,0.3)",
            borderRadius: "10px", color: "#FFDE02", fontSize: "13px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: "pointer", marginTop: "8px",
          }}
        >
          + Add question
        </button>
      )}
    </div>
  );
}
