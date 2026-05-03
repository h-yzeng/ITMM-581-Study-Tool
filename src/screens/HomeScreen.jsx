import { CHAPTERS, TOPIC_CARDS, CHAPTER_COLORS } from '../data/chapters.js'
import { QUESTION_BANK } from '../data/questionBank.js'
import { qKey } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconPencil, IconClock, IconCards, IconFlag, IconBarChart, IconRepeat, IconTarget } from '../components/Icons.jsx'

const BANK_SIZE   = QUESTION_BANK.length
const CHAPTER_IDS = [8, 9, 10, 12]

const MODES = [
  { id: 'practice',   Icon: IconPencil, label: 'Practice',   sub: 'Reveal as you go' },
  { id: 'exam',       Icon: IconClock,  label: 'Exam Sim',   sub: 'Timed & locked'   },
  { id: 'flashcards', Icon: IconCards,  label: 'Flashcards', sub: 'Flip-card review'  },
]

export function HomeScreen({
  theme, toggleDark,
  stats, wrongBank, flagged, weakQs,
  mode, setMode, selChapter, setSelChapter,
  qType, setQType, selDiff, setSelDiff,
  qCount, setQCount,
  startSession, startWeakDrill, startRetry,
  setScreen,
}) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme

  const pill  = active => ({ ...S.pill,     background: active ? pillSel : cardBg, color: active ? '#fff' : text, border: `1.5px solid ${active ? pillSel : border}` })
  const count = active => ({ ...S.countBtn, background: active ? pillSel : cardBg, color: active ? '#fff' : text, border: `1.5px solid ${active ? pillSel : border}` })

  const wCount   = wrongBank ? Object.keys(wrongBank).length : 0
  const fCount   = flagged   ? Object.keys(flagged).length   : 0
  const total    = stats?.totalAnswered || 0
  const qByChap  = QUESTION_BANK.reduce((a, q) => { a[q.chapter] = (a[q.chapter] || 0) + 1; return a }, {})

  return (
    <div style={{ ...S.page, background: bg }}>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={S.header}>
          <div style={S.badge}>EXAM PREP</div>
          <h1 style={{ ...S.title, color: dk ? '#f1f5f9' : '#0f172a' }}>IT Entrepreneurship</h1>
          <p style={{ ...S.subtitle, color: subText }}>Kuratko 12e &middot; Chapters 8, 9, 10 &amp; 12</p>
        </div>

        {stats && (
          <button onClick={() => setScreen('stats')} style={{ ...S.statsBar, background: cardBg, border: `1px solid ${border}` }}>
            <div style={S.statsCell}>
              <span style={{ ...S.statsNum, color: text }}>{total}</span>
              <span style={{ ...S.statsLbl, color: subText }}>Total</span>
            </div>
            {CHAPTER_IDS.map(ch => (
              <div key={ch} style={S.statsCell}>
                <span style={{ ...S.statsNum, color: CHAPTER_COLORS[ch] }}>{stats?.byChapter?.[ch] || 0}</span>
                <span style={{ ...S.statsLbl, color: subText }}>Ch.{ch}</span>
              </div>
            ))}
            <div style={S.statsCell}>
              <span style={{ ...S.statsNum, color: '#ef4444' }}>{wCount}</span>
              <span style={{ ...S.statsLbl, color: subText }}>Retry</span>
            </div>
            <span style={{ ...S.statsArrow, color: subText, display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconBarChart size={14} /> &rarr;
            </span>
          </button>
        )}

        <div style={S.section}>
          <label style={{ ...S.label, color: subText }}>STUDY MODE</label>
          <div style={S.modeRow}>
            {MODES.map(({ id, Icon, label, sub }) => (
              <button key={id} onClick={() => setMode(id)} style={{ ...S.modeBtn, background: mode === id ? pillSel : cardBg, border: `1.5px solid ${mode === id ? pillSel : border}`, color: mode === id ? '#fff' : text }}>
                <span style={{ color: mode === id ? '#c7d2fe' : subText, display: 'flex' }}><Icon size={22} /></span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{label}</span>
                <span style={{ fontSize: 10, color: mode === id ? '#c7d2fe' : subText, lineHeight: 1.3 }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={S.section}>
          <label style={{ ...S.label, color: subText }}>CHAPTER FOCUS</label>
          <div style={S.pills}>
            {CHAPTERS.map(c => (
              <button key={c.id} onClick={() => setSelChapter(c.id)} style={pill(selChapter === c.id)}>
                {c.label}
                {c.id !== 'all' && <span style={{ fontSize: 10, opacity: 0.65, marginLeft: 5 }}>({qByChap[parseInt(c.id)] || 0})</span>}
              </button>
            ))}
          </div>
        </div>

        {mode !== 'flashcards' && (<>
          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>QUESTION TYPE</label>
            <div style={S.pills}>
              {[{ id: 'mcq', label: 'Multiple Choice' }, { id: 'tf', label: 'True / False' }, { id: 'mixed', label: 'Mixed' }].map(t => (
                <button key={t.id} onClick={() => setQType(t.id)} style={pill(qType === t.id)}>{t.label}</button>
              ))}
            </div>
          </div>
          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>DIFFICULTY</label>
            <div style={S.pills}>
              {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }].map(d => (
                <button key={d.id} onClick={() => setSelDiff(d.id)} style={pill(selDiff === d.id)}>{d.label}</button>
              ))}
            </div>
          </div>
          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>NUMBER OF QUESTIONS</label>
            <div style={S.countRow}>
              {[5, 10, 15, 20, 40].map(n => (
                <button key={n} onClick={() => setQCount(n)} style={count(qCount === n)}>{n}</button>
              ))}
            </div>
          </div>
        </>)}

        {mode === 'exam' && (
          <div style={S.examBanner}><strong>Exam Sim:</strong> {qCount} min timer &middot; answers locked until you submit</div>
        )}

        <div style={S.topicsGrid}>
          {TOPIC_CARDS.map(item => (
            <div key={item.ch} style={{ ...S.topicCard, background: cardBg, borderTop: `3px solid ${CHAPTER_COLORS[item.ch]}` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: CHAPTER_COLORS[item.ch] }}>{item.title}</span>
                <span style={{ fontSize: 10, color: subText, fontFamily: 'sans-serif' }}>{item.sub}</span>
              </div>
              {item.topics.map(t => <div key={t} style={{ ...S.topicItem, color: subText }}>&middot; {t}</div>)}
            </div>
          ))}
        </div>

        {weakQs.length > 0 && mode !== 'flashcards' && (
          <button onClick={startWeakDrill} style={{ ...S.retryPoolBtn, background: dk ? '#1c1917' : '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconTarget size={14} /> Study Weak Spots &mdash; {weakQs.length} questions from your lowest-scoring topics
            </span>
          </button>
        )}
        {wCount > 0 && (
          <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} style={{ ...S.retryPoolBtn, background: dk ? '#1c1917' : '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconRepeat size={14} /> Retry Pool &mdash; {wCount} question{wCount !== 1 ? 's' : ''} you&apos;ve gotten wrong (shuffled)
            </span>
          </button>
        )}
        {fCount > 0 && (
          <button onClick={() => {
            const flaggedQs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean)
            startRetry(flaggedQs)
          }} style={{ ...S.retryPoolBtn, background: dk ? '#1a1a2e' : '#ede9fe', borderColor: '#8b5cf6', color: '#4c1d95' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconFlag size={14} filled color="#8b5cf6" /> Flagged Questions &mdash; {fCount} question{fCount !== 1 ? 's' : ''} you marked as confusing
            </span>
          </button>
        )}

        <button onClick={startSession} style={{ ...S.startBtn, background: pillSel }}>
          {mode === 'flashcards' ? 'Start Flashcards →' : mode === 'exam' ? 'Start Exam Simulation →' : 'Start Practice Quiz →'}
        </button>

        <div style={{ ...S.bankStatus, color: subText }}>
          <span style={{ ...S.bankDot, background: '#10b981' }} />
          {BANK_SIZE} questions ready &middot; no account required
        </div>

      </div>
    </div>
  )
}
