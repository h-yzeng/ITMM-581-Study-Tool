import { S } from '../styles.js'
import { IconSun, IconMoon } from './Icons.jsx'

export function DarkToggle({ onClick, dk, border, cardBg }) {
  return (
    <button
      onClick={onClick}
      aria-label={dk ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ ...S.darkToggle, background: cardBg, border: `1.5px solid ${border}`, color: dk ? '#f59e0b' : '#334155' }}
    >
      {dk ? <IconSun size={22} /> : <IconMoon size={22} />}
    </button>
  )
}
