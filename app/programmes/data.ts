export type Quality = { name: string; means: string; train: string };

export type Pillar = {
  id: string;
  number: string;
  name: string;
  line: string;
  goals: string[];
  qualities: Quality[];
};

export const pillars: Pillar[] = [
  {
    id: "aesthetic",
    number: "01",
    name: "Aesthetic",
    line: "Change how your body looks, with a plan that protects muscle and makes the result last.",
    goals: [
      "Fat loss",
      "Muscle gain",
      "Body recomposition",
      "Improved muscle definition",
      "Improved physique proportions",
      "Weight maintenance",
    ],
    qualities: [
      { name: "Strength gain", means: "Increasing the amount of force you can produce.", train: "Powerlifting and progressive resistance training." },
      { name: "Work capacity", means: "Doing more physical work before fatigue limits you.", train: "Circuits, sled pushes, carries and conditioning." },
    ],
  },
  {
    id: "performance",
    number: "02",
    name: "Performance",
    line: "Get measurably better at something: heavier, faster, longer, sharper.",
    goals: [
      "Lift heavier weights",
      "Run faster or longer",
      "Improve strength-to-weight ratio",
      "Increase stamina",
      "Improve sprinting, jumping, agility or power",
      "Prepare for Hyrox, a marathon or another event",
    ],
    qualities: [
      { name: "Muscular endurance", means: "Performing repeated contractions without tiring quickly.", train: "High-repetition training and circuits." },
      { name: "Speed", means: "Moving your body or limbs quickly.", train: "Sprints, resisted runs and speed drills." },
      { name: "Power", means: "Producing force rapidly.", train: "Olympic lifts, jumps and medicine-ball throws." },
      { name: "Agility", means: "Changing direction quickly while maintaining control.", train: "Cone drills, shuttle runs and sports drills." },
      { name: "Sport performance", means: "Improving abilities specific to a sport or activity.", train: "Hyrox, cricket, football, martial arts and running." },
    ],
  },
  {
    id: "health",
    number: "03",
    name: "Health",
    line: "Train for the numbers your doctor watches, and for the decades ahead.",
    goals: [
      "Support healthier blood pressure, blood glucose and cholesterol markers",
      "Improve cardiovascular fitness",
      "Improve bone density",
      "Improve sleep quality",
      "Reduce sedentary behaviour",
      "Support healthy aging",
    ],
    qualities: [
      { name: "Cardiovascular endurance", means: "Improving the ability of your heart and lungs to support prolonged activity.", train: "Running, cycling, swimming and zone-2 cardio." },
      { name: "Healthy aging", means: "Maintaining strength, mobility, balance, bone health and independence.", train: "Resistance training, balance work, walking and power training." },
      { name: "Injury prevention", means: "Increasing resilience and reducing avoidable injury risk.", train: "Strengthening weak areas, technique training and load management." },
    ],
  },
  {
    id: "movement",
    number: "04",
    name: "Movement",
    line: "Move freely, stand taller and get back to doing things without pain.",
    goals: [
      "Improve mobility and flexibility",
      "Improve posture",
      "Reduce movement limitations",
      "Improve balance and coordination",
      "Improve core control",
      "Return to pain-free movement",
    ],
    qualities: [
      { name: "Mobility", means: "Controlling movement through a joint's available range.", train: "Mobility drills, controlled stretches and loaded movements." },
      { name: "Flexibility", means: "Increasing passive range of motion.", train: "Static stretching and yoga." },
      { name: "Balance and stability", means: "Controlling your body during stationary and moving tasks.", train: "Single-leg exercises, carries and proprioception work." },
      { name: "Coordination", means: "Making different body parts work together efficiently.", train: "Skill drills, athletic movements and boxing." },
      { name: "Posture and movement quality", means: "Improving alignment, control and movement mechanics.", train: "Corrective exercise, core training and mobility work." },
      { name: "Rehabilitation", means: "Restoring function after an injury, surgery or pain condition.", train: "Progressive strength and mobility work, coached alongside your physiotherapist's plan." },
    ],
  },
  {
    id: "lifestyle",
    number: "05",
    name: "Lifestyle & Mind",
    line: "Build the routine, energy and confidence that make every other goal stick.",
    goals: [
      "Build consistency",
      "Reduce stress",
      "Improve confidence",
      "Develop discipline and routine",
      "Increase energy in daily life",
      "Maintain independence and physical capability",
    ],
    qualities: [
      { name: "Stress management and mental wellbeing", means: "Using exercise to improve mood, sleep, confidence and stress tolerance.", train: "Moderate cardio, strength training, yoga and outdoor activity." },
      { name: "Lifestyle fitness", means: "Building sustainable habits around activity, sleep, nutrition and recovery.", train: "Daily steps, consistent workouts and recovery routines." },
    ],
  },
];

export type Track = {
  id: string;
  name: string;
  kicker: string;
  line: string;
  points: string[];
  note?: string;
};

export const tracks: Track[] = [
  {
    id: "longevity",
    name: "Longevity",
    kicker: "Healthspan, not just lifespan",
    line: "Training aimed at the capacities that keep you strong, mobile and independent for decades: aerobic fitness, muscle, power, balance and bone.",
    points: [
      "Zone-2 base work plus harder intervals for cardiorespiratory fitness",
      "Strength and power training to protect muscle and bone as you age",
      "Balance and stability work built into every week",
      "HRV, resting heart rate and sleep trended in Vemisis, alongside your lab reports",
    ],
  },
  {
    id: "glp1",
    name: "GLP-1 Support",
    kicker: "For clients prescribed GLP-1 medication",
    line: "GLP-1 medication can drive fast weight loss. Our job is to make sure the weight you lose is fat, not the muscle and strength you need to keep it off.",
    points: [
      "Resistance training prioritised to preserve lean muscle",
      "Protein-first nutrition targets that work with a smaller appetite",
      "Sessions adjusted around how you feel week to week",
      "A plan for life after medication, so results hold if your doctor tapers it",
    ],
    note: "We coach alongside your prescribing doctor. We never prescribe, dose or advise on medication.",
  },
  {
    id: "hybrid",
    name: "Hybrid & Hyrox",
    kicker: "Strong and fit at the same time",
    line: "Strength and endurance programmed together, so neither one undermines the other. Ideal for Hyrox, running events or simply being capable at everything.",
    points: [
      "Concurrent strength and conditioning, sequenced to limit interference",
      "Event-specific blocks for Hyrox stations, race pacing and transitions",
      "Run, sled, carry and erg volume progressed week by week",
      "Taper and race-week plan built into your calendar",
    ],
  },
  {
    id: "metabolic",
    name: "Metabolic Health",
    kicker: "Training for your health markers",
    line: "Structured activity and nutrition to support healthier blood pressure, blood glucose and cholesterol markers, with progress tracked alongside your doctor.",
    points: [
      "Zone-2 cardio, strength training and daily step targets",
      "Nutrition habits built around blood-sugar-friendly meals",
      "Your lab reports stored and reviewed in Vemisis",
      "Sedentary time reduced in small, sustainable steps",
    ],
    note: "Not a substitute for medical treatment. Keep your doctor involved and follow their advice.",
  },
  {
    id: "return",
    name: "Return to Training",
    kicker: "After injury, surgery or pain",
    line: "A gradual, confidence-building path back to full training once your physiotherapist or doctor has cleared you to load again.",
    points: [
      "Progressive loading that respects your clearance and limits",
      "Mobility, stability and movement-quality work first",
      "Clear criteria before each step up in intensity",
      "Coaching that fits around your physio plan, never against it",
    ],
    note: "We work alongside your physiotherapist. Rehabilitation itself stays with your clinician.",
  },
];

export const faqs = [
  {
    q: "Can I train for more than one goal?",
    a: "Yes, and most clients do. A typical plan combines an aesthetic goal like fat loss with health or performance goals. Your coach sets the priority order, then adjusts the balance every week based on your data.",
  },
  {
    q: "I'm on GLP-1 medication. Can CALIBRATE help?",
    a: "Yes. GLP-1 Support focuses on preserving muscle and strength while you lose weight, with protein-first nutrition and a plan for life after medication. We work alongside your prescribing doctor and never advise on the medication itself, so please tell us about it when you apply.",
  },
  {
    q: "Do I need a medical condition to choose Longevity or Metabolic Health?",
    a: "No. These tracks suit anyone who wants to protect their long-term health. If you do have a diagnosed condition, we ask that your doctor is aware of your training and that you share any restrictions with us.",
  },
  {
    q: "Do specialist tracks cost extra?",
    a: "No. Every goal and specialist track is delivered within the standard CALIBRATE Monthly and Quarterly plans. Your programme is simply written for the outcome you're chasing.",
  },
  {
    q: "I'm a beginner or have little equipment. Is that a problem?",
    a: "Not at all. Every programme is written around your experience, schedule and the equipment you actually have, whether that's a full gym, a home setup or a hotel room.",
  },
];
