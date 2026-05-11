import { Project } from '../data/projects'
import { TableOfContents } from '../components/TableOfContents'

interface ProjectPageProps {
  project: Project
}

/**
 * Renders a stat value, scaling `→` down to Inter so it visually sits with the
 * surrounding Instrument Serif numerals.
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
  const TOP_ID = 'top'
  const hasSections = project.sections.length > 0

  return (
    <main
      className="relative page-enter"
      style={{ marginTop: 'var(--margin-medium)' }}
    >
      <div
        className="project-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 720px) minmax(0, 1fr)',
          gap: 'var(--margin-medium)',
          padding: '0 var(--margin-large)',
          alignItems: 'start',
        }}
      >
        {/* ── Left margin: sticky TOC ── */}
        <aside className="project-toc-col">
          {hasSections && (
            <TableOfContents
              topId={TOP_ID}
              topLabel={project.title}
              sections={project.sections}
            />
          )}
        </aside>

        {/* ── Centre column: hero + body ── */}
        <article style={{ display: 'flex', flexDirection: 'column', gap: 'var(--margin-medium)' }}>

          {/* ── Hero block ── */}
          <header id={TOP_ID} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-medium)', alignItems: 'center', textAlign: 'center', paddingTop: 'var(--margin-medium)' }}>
            {project.category && (
              <p
                className="text-label-small"
                style={{ color: 'var(--color-text-subtle)', margin: 0 }}
              >
                {project.category}
              </p>
            )}
            <h1
              className="text-title-large"
              style={{ color: 'var(--color-text-accent)', margin: 0 }}
            >
              {project.title}
            </h1>
            {project.subtitle && (
              <p
                className="text-copy-medium"
                style={{
                  color: 'var(--color-text-primary)',
                  margin: 'var(--gap-large) 0 0',
                  maxWidth: '600px',
                }}
              >
                {project.subtitle}
              </p>
            )}
          </header>

          {/* ── Divider ── */}
          <div className="page-divider" />

          {/* ── Hero image ── */}
          {project.heroImage && (
            <figure style={{ margin: 0 }}>
              {project.heroImage.src ? (
                <img
                  src={project.heroImage.src}
                  alt={project.heroImage.alt ?? ''}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    borderRadius: 'var(--border-radius-large)',
                  }}
                />
              ) : (
                <div
                  className="project-hero-placeholder flex flex-col items-center justify-center"
                  style={{
                    width: '100%',
                    aspectRatio: '16 / 9',
                    backgroundColor: 'var(--color-image-placeholder)',
                    borderRadius: 'var(--border-radius-large)',
                    gap: 'var(--gap-medium)',
                    padding: 'var(--padding-large)',
                  }}
                >
                  <span
                    className="text-copy-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Image placeholder
                  </span>
                  {project.heroImage.placeholderLabel && (
                    <span
                      className="text-copy-small"
                      style={{ color: 'var(--color-text-subtle)' }}
                    >
                      {project.heroImage.placeholderLabel}
                    </span>
                  )}
                </div>
              )}
              {project.heroImage.caption && (
                <figcaption
                  className="text-copy-small"
                  style={{ color: 'var(--color-text-subtle)', marginTop: 'var(--gap-medium)', textAlign: 'center' }}
                >
                  {project.heroImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* ── Stat cards ── */}
          {project.stats.length > 0 && (
            <div
              className="flex"
              style={{ gap: 'var(--margin-small)' }}
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
                  <span
                    className="text-title-medium"
                    style={{ color: 'var(--color-text-accent)', whiteSpace: 'nowrap' }}
                  >
                    <StatValue value={stat.value} />
                  </span>
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

          {/* ── Divider before sections ── */}
          {hasSections && <div className="page-divider" />}

          {/* ── Sections ── */}
          {project.sections.map((section, i) => (
            <section
              id={section.id}
              key={section.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--margin-small)',
                scrollMarginTop: '120px', // so anchor scroll lands below the sticky header
              }}
            >
              {/* caption + heading block */}
              {(section.caption || section.heading) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-medium)' }}>
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

              {/* Body paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--padding-large)' }}>
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

              {/* Divider between sections */}
              {i < project.sections.length - 1 && <div className="page-divider" style={{ marginTop: 'var(--margin-small)' }} />}
            </section>
          ))}
        </article>

        {/* ── Right margin: sticky music control slot (filled by App via portal) ── */}
        <aside className="project-right-col" />
      </div>
    </main>
  )
}
