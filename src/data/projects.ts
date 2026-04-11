const base = import.meta.env.BASE_URL

export interface StatCard {
  value: string
  label: string
}

export interface ProjectSection {
  /** Optional section heading */
  heading?: string
  body: string
}

export interface Project {
  id: string
  label: string
  icon: string
  /** Short page-nav label (e.g. "Protocol Import") */
  shortLabel: string
  /** Full page title shown on the project page */
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
    title: 'Redesigning the SOA Rule Builder',
    stats: [
      { value: '3', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '4', label: 'Engineers' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: 'The SOA (Schedule of Activities) Rule Builder is a core configuration tool used by clinical trial coordinators to define complex scheduling logic. The original interface required users to hand-code rules in a proprietary syntax, leading to frequent errors and long onboarding times.',
      },
      {
        heading: 'Problem',
        body: 'Coordinators spent an average of 45 minutes configuring a single SOA rule. Syntax errors accounted for 30% of all support tickets. New users needed 2–3 weeks of training before they could work independently.',
      },
      {
        heading: 'Approach',
        body: 'I ran five contextual-inquiry sessions with coordinators, then facilitated a design sprint with the product and engineering team. We moved from a free-form code editor to a structured visual builder that generates the underlying rule syntax automatically.',
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
        heading: 'Overview',
        body: 'A Microsoft Word Add-in that brings AI-assisted drafting directly into the tool where clinical writers already work. The add-in surfaces relevant protocol templates, flags compliance issues in real time, and suggests structured language based on therapeutic area.',
      },
    ],
  },
  {
    id: 'schedule',
    label: 'Schedule of Activities manager',
    shortLabel: 'SOA Manager',
    icon: `${base}schedule.svg`,
    title: 'Schedule of Activities Manager',
    stats: [
      { value: '4', label: 'Months' },
      { value: '1', label: 'Designer' },
      { value: '3', label: 'Engineers' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: 'A dedicated management interface for creating, versioning, and comparing Schedules of Activities across clinical trial protocols. Built to replace a fragmented spreadsheet workflow used by 200+ study coordinators.',
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
        heading: 'Overview',
        body: 'A lightweight tipping experience designed for small service businesses. The goal was to make leaving a tip as frictionless as tapping once — no app download, no account required.',
      },
    ],
  },
]

/** Look up a project by id. Returns undefined if not found. */
export function getProject(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
