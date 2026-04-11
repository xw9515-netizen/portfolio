import { projects } from '../data/projects'
import { useRouter } from '../context/RouterContext'

export function ProjectList() {
  const { navigate } = useRouter()

  return (
    <ul className="flex flex-col" style={{ gap: 'var(--gap-large)', listStyle: 'none', margin: 0, padding: 0 }}>
      {projects.map(project => (
        <li key={project.id}>
          <button
            onClick={() => navigate(project.id)}
            className="project-item flex items-center w-full text-left bg-transparent border-0 p-0"
            style={{
              gap: 'var(--gap-large)',
              color: 'var(--color-text-subtle)',
              cursor: 'pointer',
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
            <span className="text-copy-medium" style={{ color: 'var(--color-text-subtle)' }}>
              {project.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
