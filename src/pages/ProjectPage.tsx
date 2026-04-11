import { Project } from '../data/projects'

interface ProjectPageProps {
  project: Project
}

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <main
      className="relative page-enter"
      style={{ padding: '0 var(--margin-large)', marginTop: 'var(--margin-medium)' }}
    >
      {/* ── Dashed divider ── */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px dashed var(--color-border)',
          margin: '0 0 var(--margin-medium)',
          transition: 'border-color 0.2s ease',
        }}
      />

      {/* ── Title ── */}
      <h1
        className="text-title-large"
        style={{
          color: 'var(--color-text-primary)',
          margin: '0 0 var(--margin-medium)',
          maxWidth: '794px',
        }}
      >
        {project.title}
      </h1>

      {/* ── Stat cards ── */}
      {project.stats.length > 0 && (
        <div
          className="flex"
          style={{ gap: 'var(--gap-large)', margin: '0 0 var(--margin-medium)', flexWrap: 'wrap' }}
        >
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-large)',
                padding: 'var(--padding-large)',
                minWidth: '96px',
                gap: 'var(--gap-small)',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
            >
              <span
                className="text-title-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {stat.value}
              </span>
              <span
                className="text-label-small"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Dashed divider ── */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px dashed var(--color-border)',
          margin: '0 0 var(--margin-medium)',
          maxWidth: '794px',
          transition: 'border-color 0.2s ease',
        }}
      />

      {/* ── Content sections ── */}
      <div
        className="flex flex-col"
        style={{ gap: 'var(--margin-small)', maxWidth: '794px' }}
      >
        {project.sections.map((section, i) => (
          <div key={i} className="flex flex-col" style={{ gap: 'var(--gap-large)' }}>
            {section.heading && (
              <h2
                className="text-label-small"
                style={{ color: 'var(--color-text-subtle)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                {section.heading}
              </h2>
            )}
            <p
              className="text-copy-medium"
              style={{ color: 'var(--color-text-primary)', margin: 0 }}
            >
              {section.body}
            </p>
            {i < project.sections.length - 1 && (
              <hr
                style={{
                  border: 'none',
                  borderTop: '1px dashed var(--color-border)',
                  margin: '0',
                  transition: 'border-color 0.2s ease',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
