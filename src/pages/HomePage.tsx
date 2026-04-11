import { ProjectList } from '../components/ProjectList'

export function HomePage() {
  return (
    <main
      className="relative page-enter"
      style={{ padding: '0 var(--margin-large)', marginTop: 'var(--margin-medium)' }}
    >
      <hr
        style={{
          border: 'none',
          borderTop: '1px dashed var(--color-border)',
          margin: '0 0 var(--margin-medium)',
          transition: 'border-color 0.2s ease',
        }}
      />

      <p
        className="text-copy-medium"
        style={{
          maxWidth: '794px',
          color: 'var(--color-text-primary)',
          margin: '0 0 var(--margin-medium)',
        }}
      >
        I&apos;m Xiang Wang, a product designer with five years of experience at{' '}
        [Company], a B2B SaaS startup where I was one of three designers. In a small
        team, ownership isn&apos;t optional — I&apos;ve taken projects from early problem
        framing to shipped product, working closely with engineers and PMs throughout.
        Below is a selection of work across product design and design systems.
      </p>

      <hr
        style={{
          border: 'none',
          borderTop: '1px dashed var(--color-border)',
          margin: '0 0 var(--margin-medium)',
          maxWidth: '794px',
          transition: 'border-color 0.2s ease',
        }}
      />

      <ProjectList />
    </main>
  )
}
