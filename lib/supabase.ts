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
