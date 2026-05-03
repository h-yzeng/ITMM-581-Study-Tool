import { S } from '../styles.js'

export function DarkToggle({ onClick, dk, border, cardBg }) {
  return (
    <button
      onClick={onClick}
      aria-label={dk ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ ...S.darkToggle, background: cardBg, border: `1.5px solid ${border}` }}
    >
      {dk ? '☀️' : '🌙'}
    </button>
  )
}
