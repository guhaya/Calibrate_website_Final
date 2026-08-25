import { createClient } from "@supabase/supabase-js";

export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}


export type FormFieldType =
  | "text" | "textarea" | "email" | "phone" | "number"
  | "select" | "radio" | "checkbox" | "date" | "scale";

export interface FormField {
  id: string;
  order_index: number;
  section: string | null;
  label: string;
  help_text: string | null;
  field_type: FormFieldType;
  options: string[];
  placeholder: string | null;
  required: boolean;
  active: boolean;
}

export interface PricingRate {
  id: string;
  order_index: number;
  name: string;
  tagline: string | null;
  price: number;
  currency: string;
  billing_note: string | null;
  discount_label: string | null;
  features: string[];
  highlight: boolean;
  active: boolean;
}

export type TeamCategory = "head_coach" | "trainer" | "specialist";

export interface TeamStat {
  value: string;
  label: string;
}

export interface TeamMember {
  id: string;
  category: TeamCategory;
  order_index: number;
  name: string;
  handle: string | null;
  role: string | null;
  location: string | null;
  experience: string | null;
  specialisation: string | null;
  credentials_line: string | null;
  description: string | null;
  bio: string[] | null;
  credentials: string[] | null;
  stats: TeamStat[] | null;
  color: string | null;
  initials: string | null;
  active: boolean;
}
