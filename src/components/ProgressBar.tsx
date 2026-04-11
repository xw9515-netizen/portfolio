interface ProgressBarProps {
  active: boolean
}

/**
 * A 2 px bar that animates across the top of the viewport when `active` is true.
 * The CSS class `.progress-bar` in index.css drives the scaleX keyframe animation.
 * A new DOM key is used each activation so the animation always restarts from scratch.
 */
export function ProgressBar({ active }: ProgressBarProps) {
  if (!active) return null
  return <div className="progress-bar" aria-hidden="true" />
}
