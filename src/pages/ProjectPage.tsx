import { Project } from '../data/projects'

interface ProjectPageProps {
  project: Project
}

/**
 * Renders a stat value string, replacing any `→` with a scaled-down Inter span
 * so it visually matches the surrounding Instrument Serif numerals rather than
 * dwarfing them with Inter's full-size arrow glyph metrics.
 */
function StatValue({ value }: { value: string }) {
  if (!value.includes('→')) return <>{value}</>
  const parts = value.split('→')
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '18px',
              fontWeight: 400,
              letterSpacing: 0,
              verticalAlign: 'middle',
              margin: '0 2px',
            }}>→</span>
          )}
        </span>
      ))}
    </>
  )
}

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <main
      className="relative page-enter"
      style={{ padding: '0 var(--margin-large)', marginTop: 'var(--margin-medium)' }}
    >
      {/* ── Divider ── */}
      <div className="page-divider" style={{ marginBottom: 'var(--margin-medium)' }} />

      {/* ── Caption + H1 block (gap 4px between them) ── */}
      <div
        className="flex flex-col"
        style={{ gap: 'var(--gap-medium)', marginBottom: 'var(--margin-medium)', maxWidth: '794px' }}
      >
        <p
          className="text-label-small"
          style={{ color: 'var(--color-text-subtle)', margin: 0 }}
        >
          {project.label}
        </p>
        <h1
          className="text-title-large"
          style={{ color: 'var(--color-text-accent)', margin: 0 }}
        >
          {project.title}
        </h1>
      </div>

      {/* ── Divider ── */}
      <div
        className="page-divider"
        style={{ marginBottom: 'var(--margin-medium)', maxWidth: '794px' }}
      />

      {/* ── Stat cards — equal flex widths, 20px gap ── */}
      {project.stats.length > 0 && (
        <div
          className="flex"
          style={{
            gap: 'var(--margin-small)',
            marginBottom: 'var(--margin-medium)',
            maxWidth: '794px',
          }}
        >
          {project.stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center"
              style={{
                flex: '1 0 0',
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--border-radius-medium)',
                padding: 'var(--padding-large)',
                gap: 'var(--gap-large)',
                transition: 'background-color 0.2s ease',
                minHeight: '112px',
              }}
            >
              {/* Value — Instrument Serif, accent colour */}
              <span
                className="text-title-medium"
                style={{ color: 'var(--color-text-accent)', whiteSpace: 'nowrap' }}
              >
                <StatValue value={stat.value} />
              </span>
              {/* Label — Inter Regular, subtle colour, centred */}
              <span
                className="text-copy-small"
                style={{
                  color: 'var(--color-text-subtle)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Divider ── */}
      <div
        className="page-divider"
        style={{ marginBottom: 'var(--margin-medium)', maxWidth: '794px' }}
      />

      {/* ── Content sections ── */}
      <div
        className="flex flex-col"
        style={{ gap: 'var(--margin-medium)', maxWidth: '794px' }}
      >
        {project.sections.map((section, i) => (
          <div key={i} className="flex flex-col" style={{ gap: 'var(--margin-medium)' }}>

            {/* Caption + H2 block (gap 4px between them) */}
            {(section.caption || section.heading) && (
              <div className="flex flex-col" style={{ gap: 'var(--gap-medium)' }}>
                {section.caption && (
                  <p
                    className="text-label-small"
                    style={{ color: 'var(--color-text-subtle)', margin: 0 }}
                  >
                    {section.caption}
                  </p>
                )}
                {section.heading && (
                  <h2
                    className="text-title-medium"
                    style={{ color: 'var(--color-text-primary)', margin: 0 }}
                  >
                    {section.heading}
                  </h2>
                )}
              </div>
            )}

            {/* Body — preserves \n as paragraph breaks */}
            <div className="flex flex-col" style={{ gap: 'var(--padding-large)' }}>
              {section.body.split('\n\n').map((para, j) => (
                <p
                  key={j}
                  className="text-copy-medium"
                  style={{ color: 'var(--color-text-primary)', margin: 0 }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Divider between sections (not after last) */}
            {i < project.sections.length - 1 && (
              <div className="page-divider" />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
