import { supabaseAdmin } from "@/lib/supabase";
import type { TeamMember } from "@/lib/supabase";

// The site presents CALIBRATE as a worldwide coaching team, so Indian city
// names are not shown on coach cards. Locations that name one are replaced,
// and credential lines that only state a city are dropped.
const INDIAN_PLACE = /\b(chennai|bangalore|bengaluru|mumbai|coimbatore|hyderabad|delhi|pune|kochi|madurai|tamil nadu|karnataka|kerala|maharashtra|india)\b/i;

function worldwide(m: TeamMember): TeamMember {
  const fallback = m.category === "head_coach" ? "Coaching clients worldwide" : "Online coaching";
  return {
    ...m,
    location: m.location && INDIAN_PLACE.test(m.location) ? fallback : m.location,
    credentials: m.credentials ? m.credentials.filter((c) => !/^based in\b/i.test(c) || !INDIAN_PLACE.test(c)) : m.credentials,
  };
}

// Shown when Supabase is unreachable or returns nothing, so the team never
// disappears from /coaches. Mirrors the live team_members rows (Oct 2026).
const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "fallback-guhay", category: "head_coach", order_index: 0, name: "Guhayavarman", handle: "@fitguhay",
    role: "Founder & Head Coach", location: "Coaching clients worldwide", experience: null, specialisation: null,
    credentials_line: null, description: null,
    bio: [
      "I started CALIBRATE because I kept seeing the same pattern: smart, motivated people failing to reach their goals, not from lack of effort, but from lack of the right system. Engineers, founders, product managers putting in the work but getting nowhere.",
      "The fitness industry profits from confusion. CALIBRATE is built on the opposite principle, the same data-driven frameworks used in precision engineering, applied to body optimisation. Your body is a process. Processes can be optimised.",
    ],
    credentials: [
      "Level 4 Personal Training Certification",
      "Sports Nutrition Specialist",
      "DMAIC-certified performance protocol",
      "Competitive athlete background",
    ],
    stats: [
      { value: "45", label: "Active clients" },
      { value: "5+", label: "Years coaching" },
      { value: "10", label: "Countries reached" },
    ],
    color: "#FFDE02", initials: "G", photo_url: null, active: true,
  },
  {
    id: "fallback-ashok", category: "trainer", order_index: 1, name: "Ashok", handle: null,
    role: "Personal Trainer - Certified Strength & Conditioning Coach", location: "Online coaching", experience: "10+ years",
    specialisation: "Strength & Conditioning", credentials_line: null,
    description: "Ashok brings over a decade of strength and conditioning expertise to CALIBRATE. As an online trainer, he designs progressive programming for clients across all levels, from foundational strength work to performance-focused conditioning cycles.",
    bio: null, credentials: null, stats: null, color: null, initials: "A", photo_url: null, active: true,
  },
  {
    id: "fallback-rajavel", category: "trainer", order_index: 2, name: "Rajavel", handle: null,
    role: "Certified Personal Trainer", location: "Online coaching", experience: "8+ years",
    specialisation: "Personal Training", credentials_line: null,
    description: "Rajavel is a certified personal trainer with eight years of experience working with clients across diverse goals and backgrounds. His coaching is grounded in building sustainable habits and consistent progress, no extremes, no shortcuts.",
    bio: null, credentials: null, stats: null, color: null, initials: "R", photo_url: null, active: true,
  },
  {
    id: "fallback-balaji", category: "trainer", order_index: 3, name: "Balaji", handle: null,
    role: "NASM CPT - Online Trainer", location: "Online coaching", experience: "5+ years",
    specialisation: "NASM Certified Training", credentials_line: null,
    description: "Balaji is NASM-certified and specialises in online coaching, delivering structured, evidence-based programmes remotely. His methodical approach ensures clients get expert-level training regardless of where they are based.",
    bio: null, credentials: null, stats: null, color: null, initials: "B", photo_url: null, active: true,
  },
  {
    id: "fallback-naren", category: "specialist", order_index: 1, name: "Naren", handle: null,
    role: "Nutritionist & Fitness Data Analyst", location: "Malaysia", experience: null, specialisation: null,
    credentials_line: "Nutritionist - Fitness Data Analyst - 10+ years",
    description: "Naren combines nutritional expertise with data-driven fitness analysis, a rare combination that lets him translate raw client metrics into precise dietary strategies. With over a decade of experience, he handles complex nutrition protocols and performance-level goals.",
    bio: null, credentials: null, stats: null, color: null, initials: "N", photo_url: "/images/coaches/naren.webp", active: true,
  },
  {
    id: "fallback-karthika", category: "specialist", order_index: 2, name: "Karthika D'Souza", handle: null,
    role: "Dietician & Clinical Health Analyst", location: "Malaysia", experience: null, specialisation: null,
    credentials_line: "Registered Dietician - Clinical Health Analyst - 10+ years",
    description: "Karthika brings clinical-grade expertise to the team, managing medical dietary requirements, health risk analysis, and evidence-based nutrition intervention for clients who need specialist-level dietary support.",
    bio: null, credentials: null, stats: null, color: null, initials: "K", photo_url: "/images/coaches/karthika-dsouza.webp", active: true,
  },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("active", true)
      .order("category", { ascending: true })
      .order("order_index", { ascending: true });
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return FALLBACK_TEAM;
    return (data as TeamMember[]).map(worldwide);
  } catch (e) {
    console.error("[getTeamMembers] using fallback team:", e instanceof Error ? e.message : e);
    return FALLBACK_TEAM;
  }
}
