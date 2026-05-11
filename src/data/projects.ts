const base = import.meta.env.BASE_URL

export interface StatCard {
  value: string
  label: string
}

// ── Section block union type ──────────────────────────────────────────────────
// A section is composed of an ordered list of blocks. This allows mixing
// paragraphs, image placeholders, and labelled sub-items in any order,
// making it easy to add new block types as the design evolves.

export type SectionBlock =
  | { type: 'text';  content: string }
  | { type: 'image'; label: string }
  | { type: 'item';  tag: string; body: string }

export interface ProjectSection {
  /** Anchor id for TOC navigation, e.g. "the-problem" */
  id: string
  /** Small caption above the heading, e.g. "01 — The problem" */
  caption?: string
  /** H2 heading */
  heading?: string
  /** Ordered list of content blocks rendered below the heading */
  blocks: SectionBlock[]
}

export interface HeroImage {
  src?: string
  alt?: string
  /** Shown when src is absent */
  placeholderLabel?: string
}

export interface Project {
  id: string
  label: string
  icon: string
  shortLabel: string

  // ── Hero ──
  category?: string
  title: string
  subtitle?: string
  heroImage?: HeroImage

  // ── Stats ──
  stats: StatCard[]

  // ── Body ──
  sections: ProjectSection[]
}

// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'protocol-import',
    label: 'Protocol Import with AI',
    shortLabel: 'Protocol Import',
    icon: `${base}import.svg`,
    category: 'Case study · AI / Clinical Tooling',
    title: 'Protocol Import with AI',
    subtitle: 'How an AI-assisted import flow cut clinical protocol setup from hours of manual data entry to a few minutes of review.',
    heroImage: { placeholderLabel: 'Before manual entry, after AI import' },
    stats: [
      { value: '3', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '4', label: 'Engineers' },
    ],
    sections: [
      {
        id: 'overview',
        caption: '01 — Overview',
        heading: 'Importing protocols at scale',
        blocks: [
          { type: 'text', content: 'Clinical teams receive protocol documents in dozens of formats — Word, PDF, sponsor templates — and must manually recreate every schedule entry. This project introduced an AI-assisted import flow that parses incoming documents and maps them to the correct data model.' },
          { type: 'image', label: 'AI parsing pipeline: raw document → structured SOA rows' },
        ],
      },
    ],
  },

  {
    id: 'protocol-authoring',
    label: 'Protocol Authoring with AI (Word Add-in)',
    shortLabel: 'Protocol Authoring',
    icon: `${base}author.svg`,
    category: 'Case study · AI / Word Add-in',
    title: 'Protocol Authoring with AI',
    subtitle: 'A Microsoft Word Add-in that brings AI-assisted drafting and real-time compliance checks into the tool where clinical writers already work.',
    heroImage: { placeholderLabel: 'Word Add-in panel mockup' },
    stats: [
      { value: '5', label: 'Months' },
      { value: '2', label: 'Designers' },
      { value: '6', label: 'Engineers' },
    ],
    sections: [
      {
        id: 'overview',
        caption: '01 — Overview',
        heading: 'Writing where writers already work',
        blocks: [
          { type: 'text', content: 'A Microsoft Word Add-in that brings AI-assisted drafting directly into the tool where clinical writers already work. The add-in surfaces relevant protocol templates, flags compliance issues in real time, and suggests structured language based on therapeutic area.' },
          { type: 'image', label: 'Word Add-in side panel with suggestion cards' },
        ],
      },
    ],
  },

  {
    id: 'schedule',
    label: 'Schedule of Activities manager',
    shortLabel: 'Schedule of Activities manager',
    icon: `${base}schedule.svg`,
    category: 'Case study 01 · B2B Product Design',
    title: 'Redesigning the SOA Rule Builder',
    subtitle: 'How I reduced clinical schedule configuration time by 85% by shifting from a transactional modal to a batch workspace — and why I deliberately chose not to solve one of the hardest problems along the way.',
    heroImage: { placeholderLabel: 'Before SoA and after digitalized' },
    stats: [
      { value: '85%', label: 'reduction in time-to-task' },
      { value: '0',   label: 'support tickets post-launch for rule confusion' },
      { value: '45→5', label: 'minutes to configure a full schedule' },
    ],
    sections: [
      {
        id: 'the-problem',
        caption: '01 — The problem',
        heading: 'The linearity bottleneck',
        blocks: [
          { type: 'text', content: 'Clinical coordinators arrive at the scheduling tool with a fully-realized plan already on paper — a Schedule of Activities (SOA) laying out every visit, sample, and procedure across the entire study timeline. The system, however, treated each entry as an isolated event: open modal → configure one rule → save → repeat.' },
          { type: 'image', label: 'To show old flow and new flow' },
          { type: 'text', content: 'For a typical study with 20+ activity types, this forced a mismatch between the user\'s holistic mental model and the system\'s atomic workflow. The result was "modal fatigue" — constant context switching, repetitive form-filling, and no ability to see the full picture until every individual step was committed.' },
        ],
      },
      {
        id: 'strategic-decision',
        caption: '02 — Strategic decision',
        heading: 'Choice architecture: The self-documenting menu',
        blocks: [
          { type: 'text', content: 'Before the Rule Builder, selecting a rule type meant clicking through a segmented control with 7+ options and no context. The labels assumed fluency with clinical terminology — a barrier for anyone new to the application.\n\nThe compounding problem: this wasn\'t just a UX inconvenience. It was a recurring source of confusion that had been an open question across the team. Nobody had solved it because the obvious fix (a tooltip or training doc) treated it as a knowledge problem, not a design problem.' },
          { type: 'image', label: 'Before/after: Segmented control (tabs, no context) vs. Educational Entry Sheet (icons, labels, descriptions, examples)' },
          { type: 'text', content: 'My solution was an Educational Entry Sheet — a long-sheet menu that opens when initiating a new rule. Each rule type gets a distinct custom icon, a clear label, a short description, and a concrete example. The types are grouped by behavior: range-based rules first, column-creating rules next, and "Custom" deliberately last as a safety net.\n\nThe result was a "silent" success: no training sessions scheduled, no support tickets raised, no user complaints. In B2B, silence is the highest praise. It meant the feature became invisible — exactly as intended.' },
        ],
      },
      {
        id: 'systems-thinking',
        caption: '03 — Systems thinking',
        heading: 'Preventing the bulk mess: Real-time validation',
        blocks: [
          { type: 'text', content: 'Bulk entry introduces a new risk: bulk errors. If a user configures 10 rules at once and submits bad data, the entire batch fails — a frustrating and disorienting experience in a high-stakes clinical context.\n\nRather than letting errors surface at submission, I implemented real-time logic validation inline. As a user fills in a rule, the system checks for logical conflicts immediately — for example, an end date that precedes a start date.' },
          { type: 'image', label: '3-state validation strip: State A (error — yellow outline, Save disabled) → State B (fixed — outline clears, Save activates)' },
          { type: 'text', content: 'The primary Save button remains disabled until all conflicts are resolved. This small constraint prevents database pollution without blocking the user\'s momentum — they can keep configuring other rules while one field is still being fixed.' },
        ],
      },
      {
        id: 'intentional-design-debt',
        caption: '04 — Intentional design debt',
        heading: 'The overlap decision: Choosing visibility over conflict resolution',
        blocks: [
          { type: 'text', content: 'Stakeholders raised a natural question early in the project: what happens when two rules overlap on the timeline? Should the system block the overlap? Auto-resolve it? Flag it as an error?\n\nThrough user research, I discovered that overlaps weren\'t always mistakes — coordinators sometimes intentionally scheduled two activities at the same time point. Building a full "Conflict Resolution Engine" would have cost months of engineering effort to solve a problem users didn\'t actually have.' },
          { type: 'image', label: 'Macro zoom (200%) of timeline: recurring bar (blue) + single time point (dark dot with white knockout border) overlapping — with annotation callout' },
          { type: 'text', content: 'My solution: a visual-only treatment. Single time point dots sit on top of recurring rule bars, with a white knockout border around each dot. The border ensures the dot is always legible regardless of bar color, using shape differentiation (not just color) to communicate the overlap — an accessibility-aware choice.' },
        ],
      },
      {
        id: 'outcome',
        caption: '05 — Outcome',
        heading: 'Results & reflection',
        blocks: [
          { type: 'item', tag: 'Quantitative', body: '~85% reduction in time-to-task. 45-minute SOA configuration compressed to under 5 minutes. Zero confusion-related support tickets post-launch.' },
          { type: 'item', tag: 'Qualitative',  body: 'Immediate adoption. No onboarding sessions required. The "silent success" of a feature so natural that users had nothing to comment on.' },
          { type: 'text', content: 'The most important judgment call on this project wasn\'t a design decision — it was a non-design decision. Choosing not to engineer a conflict resolution system required as much reasoning and advocacy as any screen I shipped. Knowing when to stop building is as valuable as knowing what to build. The "Silence is Praise" metric — zero complaints, zero tickets — proved that the right solution often disappears into the background completely.' },
        ],
      },
    ],
  },

  {
    id: 'tip-jar',
    label: 'Tip top jar',
    shortLabel: 'Tip Jar',
    icon: `${base}tip.svg`,
    category: 'Side project · Payments',
    title: 'Tip Top Jar',
    subtitle: 'A lightweight tipping experience designed for small service businesses — no app download, no account required.',
    heroImage: { placeholderLabel: 'One-tap tip flow' },
    stats: [
      { value: '2', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '2', label: 'Engineers' },
    ],
    sections: [
      {
        id: 'overview',
        caption: '01 — Overview',
        heading: 'Tipping without friction',
        blocks: [
          { type: 'text', content: 'The goal was to make leaving a tip as frictionless as tapping once — no app download, no account required.' },
          { type: 'image', label: 'One-tap tip screen on mobile' },
        ],
      },
    ],
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
