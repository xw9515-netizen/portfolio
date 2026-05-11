const base = import.meta.env.BASE_URL

export interface StatCard {
  value: string
  label: string
}

export interface HeroImage {
  /** When provided, render <img>; otherwise render placeholder block */
  src?: string
  alt?: string
  /** Sub-caption shown inside the placeholder or below the image */
  placeholderLabel?: string
  caption?: string
}

export interface ProjectSection {
  /** Anchor id for TOC scrolling, e.g. "the-problem" */
  id: string
  /** Caption above heading, e.g. "01 — The problem" */
  caption?: string
  /** H2 title, e.g. "The linearity bottleneck" */
  heading?: string
  /** Body content; \n\n splits paragraphs */
  body: string
}

export interface Project {
  id: string
  /** Long label shown in ProjectList */
  label: string
  /** Project icon in the nav breadcrumb pill */
  icon: string
  /** Short label for the breadcrumb pill */
  shortLabel: string

  // ── Hero ──
  /** Pre-title caption, e.g. "Case study 01 · B2B Product Design" */
  category?: string
  /** H1 title */
  title: string
  /** Lead paragraph below H1 */
  subtitle?: string
  /** Optional hero image */
  heroImage?: HeroImage

  // ── Stats row ──
  stats: StatCard[]

  // ── Body sections ──
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    id: 'protocol-import',
    label: 'Protocol Import with AI',
    shortLabel: 'Protocol Import',
    icon: `${base}import.svg`,
    category: 'Case study · AI / Clinical Tooling',
    title: 'Protocol Import with AI',
    subtitle: 'How an AI-assisted import flow cut clinical protocol setup from hours of manual data entry to a few minutes of review.',
    heroImage: {
      placeholderLabel: 'Before manual entry, after AI import',
    },
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
        body: 'Clinical teams receive protocol documents in dozens of formats — Word, PDF, sponsor templates — and must manually recreate every schedule entry. This project introduced an AI-assisted import flow that parses incoming documents and maps them to the correct data model.',
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
        body: 'A Microsoft Word Add-in that brings AI-assisted drafting directly into the tool where clinical writers already work. The add-in surfaces relevant protocol templates, flags compliance issues in real time, and suggests structured language based on therapeutic area.',
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
    subtitle:
      'How I reduced clinical schedule configuration time by 85% by shifting from a transactional modal to a batch workspace — and why I deliberately chose not to solve one of the hardest problems along the way.',
    heroImage: {
      placeholderLabel: 'Before SoA and after digitalized',
    },
    stats: [
      { value: '85%', label: 'reduction in time-to-task' },
      { value: '0', label: 'support tickets post-launch for rule confusion' },
      { value: '45→5', label: 'minutes to configure a full schedule' },
    ],
    sections: [
      {
        id: 'the-problem',
        caption: '01 — The problem',
        heading: 'The linearity bottleneck',
        body: 'Clinical coordinators arrive at the scheduling tool with a fully-realized plan already on paper — a Schedule of Activities (SOA) laying out every visit, sample, and procedure across the entire study timeline. The system, however, treated each entry as an isolated event: open modal → configure one rule → save → repeat.\n\nFor a typical study with 20+ activity types, this forced a mismatch between the user\'s holistic mental model and the system\'s atomic workflow. The result was "modal fatigue" — constant context switching, repetitive form-filling, and no ability to see the full picture until every individual step was committed.',
      },
      {
        id: 'strategic-decision',
        caption: '02 — Strategic decision',
        heading: 'Trading scope for fit',
        body: 'Rather than chase a fully-fledged visual rule editor — which would have required a year-long engineering investment — I scoped a batch workspace: a single canvas where coordinators could configure all rules at once, see the full schedule emerge as they worked, and commit in one pass.\n\nThis meant intentionally not solving the trickiest edge cases (conditional dependency rules between visits). Those still required the legacy modal flow, but for fewer than 5% of rules. The trade was explicit: cover the 95% beautifully, accept friction on the 5%.',
      },
      {
        id: 'systems-thinking',
        caption: '03 — Systems thinking',
        heading: 'Designing the canvas',
        body: 'The batch workspace was built around a single mental model: the SOA as a table, with rows for activities and columns for visits. Every interaction reinforced that grid — bulk-edit, copy across columns, fill down — borrowing affordances from spreadsheets without becoming one.\n\nUnderneath, each cell still resolved to the same atomic rule object the engine had always consumed. The redesign was purely an interface change; no migration needed.',
      },
      {
        id: 'intentional-design-debt',
        caption: '04 — Intentional design debt',
        heading: 'The 5% we left behind',
        body: 'The legacy modal stayed available for conditional rules — accessed via a "Configure advanced rule" link from any cell. I designed the entry/exit to make it feel like a deliberate detour rather than the primary path: a clear breadcrumb back, a summary of what would happen on save, and inline previews of how the advanced rule would surface in the main canvas.\n\nThis was logged as design debt to revisit in a future quarter, with a clear hypothesis: the conditional-rule volume is low enough that the legacy flow can persist for another two release cycles without measurable user pain.',
      },
      {
        id: 'outcome',
        caption: '05 — Outcome',
        heading: 'Numbers and quiet wins',
        body: 'In the three months after launch, average rule-configuration time dropped 85% and the SOA-related support queue went silent — zero tickets for "rule confusion," the historical top category.\n\nThe quieter win: onboarding time for new coordinators fell from two weeks to two days, because the canvas matched the SOA documents they already brought from the sponsor — no translation step required.',
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
        body: 'The goal was to make leaving a tip as frictionless as tapping once — no app download, no account required.',
      },
    ],
  },
]

/** Look up a project by id. Returns undefined if not found. */
export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
