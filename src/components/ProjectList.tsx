interface Project {
  id: string
  label: string
  icon: string
  href: string
}

const projects: Project[] = [
  {
    id: 'protocol-import',
    label: 'Protocol Import with AI',
    icon: '/import.svg',
    href: '#protocol-import',
  },
  {
    id: 'protocol-authoring',
    label: 'Protocol Authoring with AI (Word Add-in)',
    icon: '/author.svg',
    href: '#protocol-authoring',
  },
  {
    id: 'schedule',
    label: 'Schedule of Activities manager',
    icon: '/schedule.svg',
    href: '#schedule',
  },
  {
    id: 'tip-jar',
    label: 'Tip top jar',
    icon: '/tip.svg',
    href: '#tip-jar',
  },
]

export function ProjectList() {
  return (
    <ul className="flex flex-col" style={{ gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
      {projects.map(project => (
        <li key={project.id}>
          <a
            href={project.href}
            className="project-item flex items-center"
            style={{
              gap: '10px',
              color: 'var(--color-text-subtle)',
              textDecoration: 'none',
            }}
          >
            {/* Icon wrapper: tilted -15° by default, straightens on hover */}
            <span className="project-icon-wrap flex-shrink-0">
              <img
                src={project.icon}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 block"
                style={{ borderRadius: 'var(--border-radius-small)' }}
              />
            </span>
            <span className="text-sm" style={{ color: 'var(--color-text-subtle)' }}>
              {project.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
