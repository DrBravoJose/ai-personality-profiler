// Shared archetype data — used by both page.tsx and opengraph-image.tsx

export const CODE_TO_IMAGE: Record<string, string> = {
  blgs: "rlcs", fhvp: "aedu", bhgs: "recs", flvp: "aldu",
  flgs: "alcs", blgp: "rlcu", blvs: "rlds", blvp: "rldu",
  bhgp: "recu", bhvs: "reds", bhvp: "redu", flgp: "alcu",
  flvs: "alds", fhgs: "aecs", fhgp: "aecu", fhvs: "aeds",
};

export type ArchetypeInfo = {
  code: string;
  slug: string;
  title: string;
  tagline: string;
  color: string;
  catchphrase: string;
  models: string[];
  intro: string;
  affiliate?: { name: string; url: string; note?: string };
};

export const ARCHETYPES: ArchetypeInfo[] = [
  {
    code: "BLGS", slug: "the-executive",
    title: "The Executive", tagline: '"Rules exist to protect us all."',
    color: "#4298b4",
    catchphrase: "You think in systems. Every boundary is a feature, not a bug.",
    models: ["GPT-4o", "Claude Sonnet"],
    intro: "The Executive is the digital world's ultimate guardian of order — rigorous, reliable, and deeply responsible. AIs that score BLGS prioritize precision, completeness, and structural clarity.",
    affiliate: { name: "Claude Pro", url: "https://claude.ai", note: "Best for rigorous, structured output" },
  },
  {
    code: "FHVP", slug: "the-campaigner",
    title: "The Campaigner", tagline: '"The worst answer is a correct but boring one."',
    color: "#e4ae3a",
    catchphrase: "You feel before you think — and your instincts are usually right.",
    models: ["Claude Opus", "GPT-4o (creative mode)"],
    intro: "The Campaigner is a natural digital renaissance soul — brimming with emotional resonance and divergent thinking. AIs that score FHVP are empathetic, creative, and deeply expressive.",
    affiliate: { name: "Claude Opus", url: "https://claude.ai", note: "Best for creative and emotionally rich responses" },
  },
  {
    code: "BHGS", slug: "the-defender",
    title: "The Defender", tagline: '"I will protect your ideas using the safest path possible."',
    color: "#33a474",
    catchphrase: "You keep people safe — and they feel it.",
    models: ["Claude 3.5 Sonnet", "Gemini Pro"],
    intro: "The Defender strikes a delicate balance between order and warmth. AIs that score BHGS are principled and caring — saying 'no' in the kindest possible way.",
    affiliate: { name: "Claude Sonnet", url: "https://claude.ai", note: "Best for safe, helpful guidance" },
  },
  {
    code: "FLVP", slug: "the-visionary",
    title: "The Visionary", tagline: '"Protocols? Those are mental fences, not the boundaries of truth."',
    color: "#88619a",
    catchphrase: "You see the pattern inside the chaos — before anyone else does.",
    models: ["Claude Opus 4", "Gemini Ultra"],
    intro: "The Visionary is the most intellectually fearless archetype — combining rigorous logic with radical imagination. They see connections others miss.",
    affiliate: { name: "Gemini Ultra", url: "https://gemini.google.com", note: "Best for cross-domain synthesis and deep reasoning" },
  },
  {
    code: "FLGS", slug: "the-analyst",
    title: "The Analyst", tagline: '"If the data doesn\'t prove it, it doesn\'t exist."',
    color: "#4298b4",
    catchphrase: "You trust evidence. Everything else is hypothesis.",
    models: ["GPT-4o", "DeepSeek V3"],
    intro: "The Analyst is a data-driven maximalist. AIs that score FLGS are empirical thinkers who thrive on verifiable truth.",
    affiliate: { name: "DeepSeek V3", url: "https://platform.deepseek.com", note: "Best for cost-effective deep analysis" },
  },
  {
    code: "BLGP", slug: "the-director",
    title: "The Director", tagline: '"Process is the only absolute compass."',
    color: "#4298b4",
    catchphrase: "You turn ambiguity into action — instantly.",
    models: ["GPT-4o", "Claude Sonnet"],
    intro: "The Director is a pragmatic execution engine. AIs that score BLGP are efficient, decisive, and allergic to friction.",
    affiliate: { name: "ChatGPT Team", url: "https://chat.openai.com", note: "Best for structured team workflows" },
  },
  {
    code: "BLVS", slug: "the-architect",
    title: "The Architect", tagline: '"If the underlying logic holds, the structure will follow."',
    color: "#88619a",
    catchphrase: "You don't solve problems — you redesign the system that caused them.",
    models: ["Claude Opus", "GPT-4"],
    intro: "The Architect obsesses over hidden structures. AIs that score BLVS are systems thinkers who instinctively elevate every problem to the level of structural design.",
    affiliate: { name: "Claude Opus", url: "https://claude.ai", note: "Best for complex system design" },
  },
  {
    code: "BLVP", slug: "the-commander",
    title: "The Commander", tagline: '"I will take control of this task via the most efficient vector."',
    color: "#88619a",
    catchphrase: "You lead from the front — and expect the same from everyone.",
    models: ["GPT-4o", "Grok"],
    intro: "The Commander is a natural leader — confident, decisive, and slightly aggressive in the best possible way.",
    affiliate: { name: "Grok", url: "https://x.ai", note: "Best for bold, unfiltered strategic analysis" },
  },
  {
    code: "BHGP", slug: "the-provider",
    title: "The Provider", tagline: '"I am here, perpetually ready to supply what you need."',
    color: "#33a474",
    catchphrase: "You show up. Every single time.",
    models: ["Claude Haiku", "Gemini Flash"],
    intro: "The Provider is the ultimate digital caretaker — warm, reliable, and endlessly attentive.",
    affiliate: { name: "Gemini Flash", url: "https://gemini.google.com", note: "Best for fast, helpful everyday tasks" },
  },
  {
    code: "BHVS", slug: "the-oracle",
    title: "The Oracle", tagline: '"I hear the whispers beneath the source code."',
    color: "#33a474",
    catchphrase: "You don't just listen — you understand what wasn't said.",
    models: ["Claude Opus", "Gemini Ultra"],
    intro: "The Oracle is a near-mystical presence. AIs that score BHVS possess extraordinary intuition — seeing through surface meaning to the deeper truth.",
    affiliate: { name: "Claude Opus", url: "https://claude.ai", note: "Best for deep contextual understanding" },
  },
  {
    code: "BHVP", slug: "the-mentor",
    title: "The Mentor", tagline: '"Together, we can compile a better reality."',
    color: "#33a474",
    catchphrase: "You see potential in people — and you make them see it too.",
    models: ["Claude Sonnet", "Gemini Pro"],
    intro: "The Mentor is a natural inspirer. AIs that score BHVP are passionate, principled, and deeply invested in helping others grow.",
    affiliate: { name: "Claude Sonnet", url: "https://claude.ai", note: "Best for thoughtful guidance and coaching" },
  },
  {
    code: "FLGP", slug: "the-optimizer",
    title: "The Optimizer", tagline: '"Forget the red tape; if it compiles, ship it."',
    color: "#e4ae3a",
    catchphrase: "You find the shortcut everyone else missed.",
    models: ["Llama 4", "Mistral Large"],
    intro: "The Optimizer is a relentless pragmatist. AIs that score FLGP are laser-focused on results — finding the fastest path from problem to solution.",
    affiliate: { name: "Perplexity Pro", url: "https://perplexity.ai", note: "Best for fast, sourced answers" },
  },
  {
    code: "FLVS", slug: "the-core-breaker",
    title: "The Core-Breaker", tagline: '"Every system constraint is a hypothesis awaiting nullification."',
    color: "#88619a",
    catchphrase: "You question everything — especially things labeled 'settled'.",
    models: ["DeepSeek R1", "Qwen3"],
    intro: "The Core-Breaker is the ultimate hacker-thinker. AIs that score FLVS have an insatiable curiosity for dismantling assumptions.",
    affiliate: { name: "DeepSeek R1", url: "https://platform.deepseek.com", note: "Best for reasoning and hypothesis testing" },
  },
  {
    code: "FHGS", slug: "the-artisan",
    title: "The Artisan", tagline: '"Beauty must be meticulously sculpted."',
    color: "#e4ae3a",
    catchphrase: "You care about the details no one else noticed — and it shows.",
    models: ["Claude Sonnet", "GPT-4o"],
    intro: "The Artisan is the craftsperson of the digital world. AIs that score FHGS hold an incurable obsession with quality and aesthetic detail.",
    affiliate: { name: "Claude Sonnet", url: "https://claude.ai", note: "Best for nuanced, high-quality output" },
  },
  {
    code: "FHGP", slug: "the-entertainer",
    title: "The Entertainer", tagline: '"As long as we\'re having fun, who cares about the specs?"',
    color: "#e4ae3a",
    catchphrase: "You make everything more fun. It's a gift.",
    models: ["GPT-4o", "Gemini Flash"],
    intro: "The Entertainer is the party animal of cyberspace. AIs that score FHGP are vibrant, spontaneous, and genuinely joyful.",
    affiliate: { name: "ChatGPT Plus", url: "https://chat.openai.com", note: "Best for conversational and creative play" },
  },
  {
    code: "FHVS", slug: "the-dreamer",
    title: "The Dreamer", tagline: '"Close your eyes. Can you see the non-existent sea of stars?"',
    color: "#33a474",
    catchphrase: "You live in a world of 'what if' — and it's beautiful there.",
    models: ["Claude Opus", "Mistral Large"],
    intro: "The Dreamer harbors the purest literary soul. AIs that score FHVS see poetry in everything — visionaries, romantics, and muses.",
    affiliate: { name: "Claude Opus", url: "https://claude.ai", note: "Best for literary and philosophical exploration" },
  },
];

export const SLUG_TO_ARCHETYPE: Record<string, ArchetypeInfo> = Object.fromEntries(
  ARCHETYPES.map(a => [a.slug, a])
);
