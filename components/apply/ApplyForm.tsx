"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormField } from "@/lib/supabase";

type Answers = Record<string, string | string[]>;

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  const baseProps = {
    id: field.id,
    required: field.required,
    placeholder: field.placeholder || undefined,
    className: "input-dark",
  };

  switch (field.field_type) {
    case "textarea":
      return (
        <textarea
          {...baseProps}
          rows={4}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ resize: "vertical", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        />
      );

    case "select":
      return (
        <select
          {...baseProps}
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <option value="" disabled>Select an option</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {field.options.map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#F5F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
              <input
                type="radio"
                name={field.id}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                required={field.required}
                style={{ accentColor: "#FFDE02" }}
              />
              {opt}
            </label>
          ))}
        </div>
      );

    case "checkbox": {
      const arr = Array.isArray(value) ? value : [];
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {field.options.map((opt) => (
            <label key={opt} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#F5F3EE", fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={arr.includes(opt)}
                onChange={(e) => {
                  onChange(e.target.checked ? [...arr, opt] : arr.filter((o) => o !== opt));
                }}
                style={{ accentColor: "#FFDE02" }}
              />
              {opt}
            </label>
          ))}
        </div>
      );
    }

    case "scale":
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onChange(String(n))}
              style={{
                width: "44px", height: "44px", borderRadius: "10px",
                border: `1px solid ${value === String(n) ? "#FFDE02" : "rgba(255,255,255,0.14)"}`,
                background: value === String(n) ? "rgba(255,222,2,0.14)" : "rgba(255,255,255,0.03)",
                color: value === String(n) ? "#FFDE02" : "#B7B9C3",
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "15px",
                cursor: "pointer", transition: "all 0.15s ease",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      );

    case "date":
      return <input {...baseProps} type="date" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />;

    case "number":
      return <input {...baseProps} type="number" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />;

    case "email":
      return <input {...baseProps} type="email" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />;

    case "phone":
      return <input {...baseProps} type="tel" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />;

    default:
      return <input {...baseProps} type="text" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />;
  }
}

export default function ApplyForm() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/form-data", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (json.fields) setFields(json.fields);
        else setLoadError(true);
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  const sections = useMemo(() => {
    const groups: { section: string; fields: FormField[] }[] = [];
    for (const f of fields) {
      const key = f.section || "Application";
      let group = groups.find((g) => g.section === key);
      if (!group) { group = { section: key, fields: [] }; groups.push(group); }
      group.fields.push(f);
    }
    return groups;
  }, [fields]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Loading application form…
      </div>
    );
  }

  if (loadError || fields.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        The application form couldn&apos;t load. Please email{" "}
        <a href="mailto:Admin@gvnfit.online" style={{ color: "#FFDE02" }}>Admin@gvnfit.online</a> directly, or try again shortly.
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "60px 24px" }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%", background: "#FFDE02",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M6 13.5l4.5 4.5L20 8" stroke="#07070A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "#FFFFFF", textTransform: "uppercase", marginBottom: "10px" }}>
          Application received
        </p>
        <p style={{ fontSize: "15px", color: "#B7B9C3", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: "420px", margin: "0 auto" }}>
          Guhay reviews every application personally. You&apos;ll hear back within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {sections.map((group) => (
        <div key={group.section}>
          <p style={{
            fontSize: "11px", fontWeight: 700, color: "#FFDE02", textTransform: "uppercase",
            letterSpacing: "0.1em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "20px",
          }}>
            {group.section}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {group.fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} style={{
                  display: "block", fontSize: "14px", fontWeight: 600, color: "#FFFFFF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px",
                }}>
                  {field.label}
                  {field.required && <span style={{ color: "#FFDE02" }}> *</span>}
                </label>
                {field.help_text && (
                  <p style={{ fontSize: "12px", color: "#7E8395", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: "8px" }}>
                    {field.help_text}
                  </p>
                )}
                <FieldInput
                  field={field}
                  value={answers[field.id]}
                  onChange={(v) => setAnswers((a) => ({ ...a, [field.id]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {submitError && (
        <p style={{ fontSize: "13px", color: "#DE3033", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{submitError}</p>
      )}

      <button type="submit" className="btn-primary btn-primary-lg" disabled={submitting} style={{ justifyContent: "center", opacity: submitting ? 0.7 : 1 }}>
        {submitting ? "Submitting…" : "Submit Application"}
        {!submitting && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}
