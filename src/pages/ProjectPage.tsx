import { Project, SectionBlock } from '../data/projects'

interface ProjectPageProps {
  project: Project
}

// ── Block renderers ───────────────────────────────────────────────────────────

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{
        width: '100%',
        padding: '80px var(--padding-large)',
        backgroundColor: 'var(--color-bg-dark-hue-hover)',
        borderRadius: 'var(--border-radius-large)',
        gap: 'var(--gap-large)',
        transition: 'background-color 0.2s ease',
      }}
    >
      <span className="text-copy-medium" style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>
        Image placeholder
      </span>
      <span className="text-copy-medium" style={{ color: 'var(--color-text-subtle)' }}>
        {label}
      </span>
    </div>
  )
}

function ItemBlock({ tag, body }: { tag: string; body: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-large)' }}>
      {/* Pill tag */}
      <span
        className="text-label-small"
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          padding: '4px 8px',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '0.5px solid var(--color-border)',
          borderRadius: 'var(--border-radius-medium)',
          color: 'var(--color-text-primary)',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        {tag}
      </span>
      <p className="text-copy-medium" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
        {body}
      </p>
    </div>
  )
}

/**
 * Renders a single block. Paragraph text supports \n\n for multi-paragraph.
 */
function Block({ block }: { block: SectionBlock }) {
  if (block.type === 'image') return <ImagePlaceholder label={block.label} />
  if (block.type === 'item')  return <ItemBlock tag={block.tag} body={block.body} />
  // type === 'text'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--padding-large)' }}>
      {block.content.split('\n\n').map((para, i) => (
        <p key={i} className="text-copy-medium" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
          {para}
        </p>
      ))}
    </div>
  )
}

// ── Stat value — scales → arrow down to Inter so it doesn't dwarf the digits ──

function StatValue({ value }: { value: string }) {
  if (!value.includes('→')) return <>{value}</>
  return (
    <>
      {value.split('→').map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '16px',
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

// ── Page ─────────────────────────────────────────────────────────────────────

export const PROJECT_TOP_ID = 'top'

export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <main className="relative page-enter">
      {/* Centred content column — 580 px, matching Figma */}
      <article
        style={{
          width: '580px',
          maxWidth: 'calc(100% - 2 * var(--margin-large))',
          margin: '0 auto',
          marginTop: 'var(--margin-medium)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--margin-medium)',
        }}
      >
        {/* ── Hero ── */}
        <header
          id={PROJECT_TOP_ID}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-medium)',
            scrollMarginTop: '120px',
          }}
        >
          {project.category && (
            <p className="text-label-small" style={{ color: 'var(--color-text-subtle)', margin: 0 }}>
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
              style={{ color: 'var(--color-text-primary)', margin: '8px 0 0' }}
            >
              {project.subtitle}
            </p>
          )}
        </header>

        {/* ── Divider ── */}
        <div className="page-divider" />

        {/* ── Hero image ── */}
        {project.heroImage && (
          project.heroImage.src ? (
            <img
              src={project.heroImage.src}
              alt={project.heroImage.alt ?? ''}
              style={{ display: 'block', width: '100%', borderRadius: 'var(--border-radius-large)' }}
            />
          ) : (
            <ImagePlaceholder label={project.heroImage.placeholderLabel ?? ''} />
          )
        )}

        {/* ── Stat cards ── */}
        {project.stats.length > 0 && (
          <div className="flex" style={{ gap: 'var(--margin-small)' }}>
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
                  minHeight: '100px',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <span
                  className="text-stats-medium"
                  style={{ color: 'var(--color-text-accent)', whiteSpace: 'nowrap' }}
                >
                  <StatValue value={stat.value} />
                </span>
                <span
                  className="text-copy-small"
                  style={{ color: 'var(--color-text-subtle)', textAlign: 'center', width: '100%' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Sections ── */}
        {project.sections.map((section, i) => (
          <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--margin-medium)' }}>
            {/* Divider before each section */}
            <div className="page-divider" />

            <section
              id={section.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--margin-medium)',
                scrollMarginTop: '120px',
              }}
            >
              {/* Caption + heading */}
              {(section.caption || section.heading) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-medium)' }}>
                  {section.caption && (
                    <p className="text-label-small" style={{ color: 'var(--color-text-subtle)', margin: 0 }}>
                      {section.caption}
                    </p>
                  )}
                  {section.heading && (
                    <h2 className="text-title-medium" style={{ color: 'var(--color-text-primary)', margin: 0 }}>
                      {section.heading}
                    </h2>
                  )}
                </div>
              )}

              {/* Blocks */}
              {section.blocks.map((block, j) => (
                <Block key={j} block={block} />
              ))}
            </section>

            {/* Spacer after last section for breathing room */}
            {i === project.sections.length - 1 && (
              <div style={{ height: 'var(--margin-large)' }} />
            )}
          </div>
        ))}
      </article>
    </main>
  )
}
