"use client";

import { useEffect, useState } from "react";
import type { TeamMember, TeamCategory, TeamStat } from "@/lib/supabase";

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

const CATEGORY_LABELS: Record<TeamCategory, string> = {
  head_coach: "Head Coach",
  trainer: "Certified Trainers",
  specialist: "On-Call Specialists",
};

type DraftMember = Omit<TeamMember, "id" | "order_index"> & { id?: string; order_index?: number };

function blankFor(category: TeamCategory): DraftMember {
  return {
    category, name: "", handle: "", role: "", location: "", experience: "",
    specialisation: "", credentials_line: "", description: "", bio: [], credentials: [],
    stats: [], color: "#FFDE02", initials: "", active: true,
  };
}

function statsToLines(stats: TeamStat[] | null): string {
  return (stats || []).map((s) => `${s.value}|${s.label}`).join("\n");
}

function linesToStats(text: string): TeamStat[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const [value, ...rest] = l.split("|");
    return { value: (value || "").trim(), label: rest.join("|").trim() };
  });
}

function MemberEditor({
  draft, onChange, onSave, onCancel, saving,
}: {
  draft: DraftMember;
  onChange: (d: DraftMember) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const isHeadCoach = draft.category === "head_coach";
  const isTrainer = draft.category === "trainer";
  const isSpecialist = draft.category === "specialist";

  return (
    <div style={{ background: "rgba(255,222,2,0.03)", border: "1px solid rgba(255,222,2,0.18)", borderRadius: "12px", padding: "20px", marginTop: "8px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div>
          <label style={labelStyle}>Name</label>
          <input style={inputStyle} value={draft.name} onChange={(e) => onChange({ ...draft, name: e.target.value })} placeholder="Full name" />
        </div>
        <div>
          <label style={labelStyle}>Role / title</label>
          <input style={inputStyle} value={draft.role || ""} onChange={(e) => onChange({ ...draft, role: e.target.value })} placeholder="Founder & Head Coach" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isHeadCoach ? "1fr 1fr" : "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
        {isHeadCoach && (
          <div>
            <label style={labelStyle}>Social handle</label>
            <input style={inputStyle} value={draft.handle || ""} onChange={(e) => onChange({ ...draft, handle: e.target.value })} placeholder="@handle" />
          </div>
        )}
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} value={draft.location || ""} onChange={(e) => onChange({ ...draft, location: e.target.value })} placeholder="Chennai, Tamil Nadu" />
        </div>
        {isTrainer && (
          <>
            <div>
              <label style={labelStyle}>Experience</label>
              <input style={inputStyle} value={draft.experience || ""} onChange={(e) => onChange({ ...draft, experience: e.target.value })} placeholder="10+ years" />
            </div>
            <div>
              <label style={labelStyle}>Specialisation</label>
              <input style={inputStyle} value={draft.specialisation || ""} onChange={(e) => onChange({ ...draft, specialisation: e.target.value })} placeholder="Strength & Conditioning" />
            </div>
          </>
        )}
        {isSpecialist && (
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Credentials line</label>
            <input style={inputStyle} value={draft.credentials_line || ""} onChange={(e) => onChange({ ...draft, credentials_line: e.target.value })} placeholder="Registered Dietician · 10+ years" />
          </div>
        )}
      </div>

      {isHeadCoach ? (
        <>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Bio (one paragraph per line)</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} value={(draft.bio || []).join("\n")} onChange={(e) => onChange({ ...draft, bio: e.target.value.split("\n") })} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Credentials (one per line)</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} value={(draft.credentials || []).join("\n")} onChange={(e) => onChange({ ...draft, credentials: e.target.value.split("\n") })} />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>Stat tiles (one per line, format: value|label)</label>
            <textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} value={statsToLines(draft.stats)} onChange={(e) => onChange({ ...draft, stats: linesToStats(e.target.value) })} placeholder="10+|Active clients" />
          </div>
        </>
      ) : (
        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} value={draft.description || ""} onChange={(e) => onChange({ ...draft, description: e.target.value })} />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div>
          <label style={labelStyle}>Avatar color</label>
          <input style={inputStyle} value={draft.color || ""} onChange={(e) => onChange({ ...draft, color: e.target.value })} placeholder="#FFDE02" />
        </div>
        <div>
          <label style={labelStyle}>Avatar initials</label>
          <input style={inputStyle} value={draft.initials || ""} onChange={(e) => onChange({ ...draft, initials: e.target.value.slice(0, 2).toUpperCase() })} placeholder="G" maxLength={2} />
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", marginBottom: "16px" }}>
        <input type="checkbox" checked={draft.active} onChange={(e) => onChange({ ...draft, active: e.target.checked })} style={{ accentColor: "#FFDE02" }} />
        Active (visible on the live site)
      </label>

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
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#B7B9C3", fontSize: "13px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function CategorySection({
  category, members, editingId, draft, saving, dragId,
  onStartNew, onStartEdit, onChange, onSave, onCancel, onRemove, onToggleActive, onDragStart, onDrop,
}: {
  category: TeamCategory;
  members: TeamMember[];
  editingId: string | "new" | null;
  draft: DraftMember;
  saving: boolean;
  dragId: string | null;
  onStartNew: (category: TeamCategory) => void;
  onStartEdit: (m: TeamMember) => void;
  onChange: (d: DraftMember) => void;
  onSave: () => void;
  onCancel: () => void;
  onRemove: (id: string, name: string) => void;
  onToggleActive: (m: TeamMember) => void;
  onDragStart: (id: string) => void;
  onDrop: (category: TeamCategory, targetId: string) => void;
}) {
  const isNewHere = editingId === "new" && draft.category === category;
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", color: "#FFFFFF", marginBottom: "12px" }}>{CATEGORY_LABELS[category]}</h3>
      {members.map((m) => (
        <div key={m.id}>
          <div
            draggable
            onDragStart={() => onDragStart(m.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(category, m.id)}
            style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", marginBottom: "6px", opacity: m.active ? 1 : 0.45, cursor: "grab",
            }}
          >
            <span style={{ color: "#4A4D57", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="4" cy="3" r="1.2" /><circle cx="10" cy="3" r="1.2" /><circle cx="4" cy="7" r="1.2" /><circle cx="10" cy="7" r="1.2" /><circle cx="4" cy="11" r="1.2" /><circle cx="10" cy="11" r="1.2" /></svg>
            </span>
            <div
              style={{
                width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                background: `${m.color || "#FFDE02"}22`, border: `1px solid ${m.color || "#FFDE02"}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 800, color: m.color || "#FFDE02", fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {m.initials || m.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "block" }}>{m.name}</span>
              <span style={{ fontSize: "11px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{m.role || "no role set"}</span>
            </div>
            <button
              onClick={() => onToggleActive(m)}
              title={m.active ? "Active, click to hide" : "Hidden, click to show"}
              style={{
                width: "36px", height: "20px", borderRadius: "999px", border: "none", cursor: "pointer",
                background: m.active ? "#FFDE02" : "rgba(255,255,255,0.15)", position: "relative", flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: "2px", left: m.active ? "18px" : "2px",
                width: "16px", height: "16px", borderRadius: "50%", background: m.active ? "#07070A" : "#FFFFFF",
                transition: "left 0.15s ease",
              }} />
            </button>
            <button onClick={() => onStartEdit(m)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "#B7B9C3", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
              Edit
            </button>
            <button onClick={() => onRemove(m.id, m.name)} style={{ padding: "6px 12px", background: "rgba(222,48,51,0.06)", border: "1px solid rgba(222,48,51,0.2)", borderRadius: "6px", color: "#DE3033", fontSize: "12px", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer", flexShrink: 0 }}>
              Delete
            </button>
          </div>
          {editingId === m.id && (
            <MemberEditor draft={draft} onChange={onChange} onSave={onSave} onCancel={onCancel} saving={saving} />
          )}
        </div>
      ))}

      {isNewHere ? (
        <MemberEditor draft={draft} onChange={onChange} onSave={onSave} onCancel={onCancel} saving={saving} />
      ) : (
        <button
          onClick={() => onStartNew(category)}
          style={{
            width: "100%", padding: "12px", background: "rgba(255,222,2,0.05)", border: "1px dashed rgba(255,222,2,0.3)",
            borderRadius: "10px", color: "#FFDE02", fontSize: "13px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif",
            cursor: "pointer", marginTop: "8px",
          }}
        >
          + Add {category === "head_coach" ? "head coach" : category === "trainer" ? "trainer" : "specialist"}
        </button>
      )}
    </div>
  );
}

export default function TeamManager({ password }: { password: string }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<DraftMember>(blankFor("trainer"));
  const [saving, setSaving] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  async function call(action: string, extra: Record<string, unknown> = {}) {
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, action, ...extra }),
    });
    return res.json();
  }

  async function load() {
    setLoading(true);
    const json = await call("list");
    setMembers(json.data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function startNew(category: TeamCategory) {
    setDraft(blankFor(category));
    setEditingId("new");
  }

  function startEdit(m: TeamMember) {
    setDraft({ ...m, bio: m.bio ? [...m.bio] : [], credentials: m.credentials ? [...m.credentials] : [], stats: m.stats ? [...m.stats] : [] });
    setEditingId(m.id);
  }

  async function save() {
    setSaving(true);
    const cleanBio = (draft.bio || []).filter((b) => b.trim());
    const cleanCreds = (draft.credentials || []).filter((c) => c.trim());
    const cleanStats = (draft.stats || []).filter((s) => s.value.trim() || s.label.trim());
    if (editingId === "new") {
      await call("create", { ...draft, bio: cleanBio, credentials: cleanCreds, stats: cleanStats });
    } else if (editingId) {
      await call("update", { member: { ...draft, id: editingId, bio: cleanBio, credentials: cleanCreds, stats: cleanStats } });
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

  async function toggleActive(m: TeamMember) {
    await call("update", { member: { ...m, active: !m.active } });
    load();
  }

  function onDrop(category: TeamCategory, targetId: string) {
    if (!dragId || dragId === targetId) return;
    const inCategory = members.filter((m) => m.category === category);
    const others = members.filter((m) => m.category !== category);
    const fromIdx = inCategory.findIndex((m) => m.id === dragId);
    if (fromIdx === -1) return;
    const toIdx = inCategory.findIndex((m) => m.id === targetId);
    const [moved] = inCategory.splice(fromIdx, 1);
    inCategory.splice(toIdx, 0, moved);
    setMembers([...others, ...inCategory]);
    call("reorder", { ids: inCategory.map((m) => m.id) });
    setDragId(null);
  }

  if (loading) {
    return <p style={{ color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" }}>Loading team…</p>;
  }

  const byCategory = (category: TeamCategory) =>
    members.filter((m) => m.category === category).sort((a, b) => a.order_index - b.order_index);

  return (
    <div>
      {(["head_coach", "trainer", "specialist"] as TeamCategory[]).map((category) => (
        <CategorySection
          key={category}
          category={category}
          members={byCategory(category)}
          editingId={editingId}
          draft={draft}
          saving={saving}
          dragId={dragId}
          onStartNew={startNew}
          onStartEdit={startEdit}
          onChange={setDraft}
          onSave={save}
          onCancel={() => setEditingId(null)}
          onRemove={remove}
          onToggleActive={toggleActive}
          onDragStart={setDragId}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}
