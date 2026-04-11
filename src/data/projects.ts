const base = import.meta.env.BASE_URL

export interface StatCard {
  value: string
  label: string
}

export interface ProjectSection {
  /** Small label above the section heading, e.g. "01 — The problem" */
  caption?: string
  /** H2 title */
  heading?: string
  body: string
}

export interface Project {
  id: string
  /** List-item label (shown in ProjectList and as the caption above H1 on the project page) */
  label: string
  icon: string
  /** Short breadcrumb label for the nav pill */
  shortLabel: string
  /** H1 title on the project page */
  title: string
  stats: StatCard[]
  sections: ProjectSection[]
}

export const projects: Project[] = [
  {
    id: 'protocol-import',
    label: 'Protocol Import with AI',
    shortLabel: 'Protocol Import',
    icon: `${base}import.svg`,
    title: 'Protocol Import with AI',
    stats: [
      { value: '3', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '4', label: 'Engineers' },
    ],
    sections: [
      {
        caption: '01 — Overview',
        heading: 'Importing protocols at scale',
        body: 'Clinical teams receive protocol documents in dozens of formats — Word, PDF, sponsor templates — and must manually recreate every schedule entry. This project introduced an AI-assisted import flow that parses incoming documents and maps them to the correct data model, cutting import time from hours to minutes.',
      },
    ],
  },
  {
    id: 'protocol-authoring',
    label: 'Protocol Authoring with AI (Word Add-in)',
    shortLabel: 'Protocol Authoring',
    icon: `${base}author.svg`,
    title: 'Protocol Authoring with AI',
    stats: [
      { value: '5', label: 'Months' },
      { value: '2', label: 'Designers' },
      { value: '6', label: 'Engineers' },
    ],
    sections: [
      {
        caption: '01 — Overview',
        heading: 'Writing where writers already work',
        body: 'A Microsoft Word Add-in that brings AI-assisted drafting directly into the tool where clinical writers already work. The add-in surfaces relevant protocol templates, flags compliance issues in real time, and suggests structured language based on therapeutic area.',
      },
    ],
  },
  {
    id: 'schedule',
    label: 'Schedule of Activities manager',
    shortLabel: 'SOA Manager',
    icon: `${base}schedule.svg`,
    title: 'Redesigning the SOA Rule Builder',
    stats: [
      { value: '85%', label: 'reduction in time-to-task' },
      { value: '0', label: 'support tickets post-launch for rule confusion' },
      { value: '45→5', label: 'minutes to configure a full schedule' },
    ],
    sections: [
      {
        caption: '01 — The problem',
        heading: 'The linearity bottleneck',
        body: 'Clinical coordinators arrive at the scheduling tool with a fully-realized plan already on paper — a Schedule of Activities (SOA) laying out every visit, sample, and procedure across the entire study timeline. The system, however, treated each entry as an isolated event: open modal → configure one rule → save → repeat.\n\nFor a typical study with 20+ activity types, this forced a mismatch between the user\'s holistic mental model and the system\'s atomic workflow. The result was "modal fatigue" — constant context switching, repetitive form-filling, and no ability to see the full picture until every individual step was committed.',
      },
    ],
  },
  {
    id: 'tip-jar',
    label: 'Tip top jar',
    shortLabel: 'Tip Jar',
    icon: `${base}tip.svg`,
    title: 'Tip Top Jar',
    stats: [
      { value: '2', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '2', label: 'Engineers' },
    ],
    sections: [
      {
        caption: '01 — Overview',
        heading: 'Tipping without friction',
        body: 'A lightweight tipping experience designed for small service businesses. The goal was to make leaving a tip as frictionless as tapping once — no app download, no account required.',
      },
    ],
  },
]

/** Look up a project by id. Returns undefined if not found. */
export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
