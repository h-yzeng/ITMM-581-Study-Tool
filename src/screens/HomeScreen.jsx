import { useState } from 'react'
import { CHAPTERS, TOPIC_CARDS, CHAPTER_COLORS, TOPICS_BY_CHAPTER } from '../data/chapters.js'
import { QUESTION_BANK } from '../data/questionBank.js'
import { qKey } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconPencil, IconClock, IconCards, IconFlag, IconBarChart, IconRepeat, IconTarget, IconZap } from '../components/Icons.jsx'

const BANK_SIZE   = QUESTION_BANK.length
const CHAPTER_IDS = [8, 9, 10, 12]

const MODES = [
  { id: 'practice',   Icon: IconPencil, label: 'Practice',   sub: 'Reveal as you go' },
  { id: 'exam',       Icon: IconClock,  label: 'Exam Sim',   sub: 'Timed & locked'   },
  { id: 'cram',       Icon: IconZap,    label: 'Cram',       sub: 'All questions, no timer' },
  { id: 'flashcards', Icon: IconCards,  label: 'Flashcards', sub: 'Flip-card review'  },
]

export function HomeScreen({
  theme, toggleDark,
  stats, wrongBank, flagged, weakQs, sessionHistory,
  mode, setMode, selChapter, setSelChapter,
  qType, setQType, selDiff, setSelDiff,
  qCount, setQCount,
  selTopics, setSelTopics,
  startSession, startWeakDrill, startRetry,
  setScreen,
}) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme

  const [chapOpen, setChapOpen] = useState(false)
  const pill  = active => ({ ...S.pill, background: active ? pillSel : cardBg, color: active ? '#fff' : text, border: `1.5px solid ${active ? pillSel : border}`, transition: 'opacity 0.15s' })
  const hov   = e => { e.currentTarget.style.opacity = '0.75' }
  const unhov = e => { e.currentTarget.style.opacity = '1' }

  const wCount   = wrongBank ? Object.keys(wrongBank).length : 0
  const fCount   = flagged   ? Object.keys(flagged).length   : 0
  const total    = stats?.totalAnswered || 0
  const qByChap  = QUESTION_BANK.reduce((a, q) => { a[q.chapter] = (a[q.chapter] || 0) + 1; return a }, {})

  const streak = (() => {
    if (!sessionHistory?.length) return 0
    const days = new Set(sessionHistory.map(s => s.date))
    const today = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
    if (!days.has(today) && !days.has(yesterday)) return 0
    let count = 0, d = new Date()
    if (!days.has(today)) d = new Date(Date.now() - 86400000)
    while (true) {
      const lbl = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
      if (!days.has(lbl)) break
      count++
      d = new Date(d.getTime() - 86400000)
    }
    return count
  })()

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
            {streak > 0 && (
              <div style={S.statsCell}>
                <span style={{ ...S.statsNum, color: '#f59e0b' }}>{streak}</span>
                <span style={{ ...S.statsLbl, color: subText }}>🔥 Streak</span>
              </div>
            )}
            <span style={{ ...S.statsArrow, color: subText, display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconBarChart size={14} /> &rarr;
            </span>
          </button>
        )}

        <div style={S.section}>
          <label style={{ ...S.label, color: subText }}>STUDY MODE</label>
          <div style={S.modeRow}>
            {MODES.map(({ id, Icon, label, sub }) => (
              <button key={id} onClick={() => setMode(id)} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...S.modeBtn, background: mode === id ? pillSel : cardBg, border: `1.5px solid ${mode === id ? pillSel : border}`, color: mode === id ? '#fff' : text, transition: 'opacity 0.15s' }}>
                <span style={{ color: mode === id ? '#c7d2fe' : subText, display: 'flex' }}><Icon size={22} /></span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{label}</span>
                <span style={{ fontSize: 10, color: mode === id ? '#c7d2fe' : subText, lineHeight: 1.3 }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={S.section}>
          <label style={{ ...S.label, color: subText }}>CHAPTER FOCUS</label>
          <div className="pill-row" style={S.pills}>
            {CHAPTERS.map(c => (
              <button key={c.id} onClick={() => { setSelChapter(c.id); setSelTopics([]) }} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...pill(selChapter === c.id), flexShrink: 0 }}>
                {c.label}
                {c.id !== 'all' && <span style={{ fontSize: 10, opacity: 0.65, marginLeft: 5 }}>({qByChap[parseInt(c.id)] || 0})</span>}
              </button>
            ))}
          </div>
        </div>

        {mode !== 'flashcards' && (<>
          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>QUESTION TYPE</label>
            <div className="pill-row" style={S.pills}>
              {[{ id: 'mcq', label: 'Multiple Choice' }, { id: 'tf', label: 'True / False' }, { id: 'mixed', label: 'Mixed' }].map(t => (
                <button key={t.id} onClick={() => setQType(t.id)} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...pill(qType === t.id), flexShrink: 0 }}>{t.label}</button>
              ))}
            </div>
          </div>
          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>DIFFICULTY</label>
            <div className="pill-row" style={S.pills}>
              {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }].map(d => (
                <button key={d.id} onClick={() => setSelDiff(d.id)} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...pill(selDiff === d.id), flexShrink: 0 }}>{d.label}</button>
              ))}
            </div>
          </div>
          {selChapter !== 'all' && TOPICS_BY_CHAPTER[parseInt(selChapter)]?.length > 0 && (
            <div style={S.section}>
              <label style={{ ...S.label, color: subText }}>TOPIC DRILL (optional - pick 1 or more)</label>
              <div style={S.pills}>
                {TOPICS_BY_CHAPTER[parseInt(selChapter)].map(t => {
                  const active = selTopics.includes(t)
                  return (
                    <button key={t} onMouseEnter={hov} onMouseLeave={unhov}
                      onClick={() => setSelTopics(prev => active ? prev.filter(x => x !== t) : [...prev, t])}
                      style={{ ...pill(active), fontSize: 12, padding: '6px 14px' }}>
                      {t}
                    </button>
                  )
                })}
                {selTopics.length > 0 && (
                  <button onClick={() => setSelTopics([])} onMouseEnter={hov} onMouseLeave={unhov}
                    style={{ ...S.pill, fontSize: 11, padding: '6px 12px', color: '#ef4444', border: `1.5px solid #ef4444`, background: cardBg, transition: 'opacity 0.15s' }}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
          {mode !== 'cram' && (<div style={S.section}>
            <label style={{ ...S.label, color: subText }}>NUMBER OF QUESTIONS</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => setQCount(q => Math.max(1, q - 1))} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...S.countBtn, minWidth: 40, padding: '0 12px', fontSize: 20, transition: 'opacity 0.15s' }}>−</button>
              <input
                type="number" min={1} max={201} value={qCount}
                onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1 && v <= 201) setQCount(v) }}
                style={{ width: 60, height: 44, borderRadius: 8, border: `1.5px solid ${border}`, background: cardBg, color: text, fontSize: 18, fontWeight: 700, textAlign: 'center', outline: 'none' }}
              />
              <button onClick={() => setQCount(q => Math.min(201, q + 1))} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...S.countBtn, minWidth: 40, padding: '0 12px', fontSize: 20, transition: 'opacity 0.15s' }}>+</button>
            </div>
          </div>)}
        </>)}

        {mode === 'exam' && (
          <div style={S.examBanner}><strong>Exam Sim:</strong> {qCount} min timer &middot; answers locked until you submit</div>
        )}
        {mode === 'cram' && (
          <div style={{ ...S.examBanner, background: dk ? '#1a1a3e' : '#ede9fe', border: '1px solid #8b5cf6', color: '#4c1d95' }}>
            <strong>Cram Mode:</strong> all questions matching your filters, shuffled, no timer &middot; reveal as you go
          </div>
        )}

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

        {mode !== 'flashcards' && (() => {
          let pool = QUESTION_BANK
          if (selChapter !== 'all')    pool = pool.filter(q => String(q.chapter) === selChapter)
          if (qType === 'mcq')         pool = pool.filter(q => q.type === 'mcq')
          if (qType === 'tf')          pool = pool.filter(q => q.type === 'tf')
          if (selDiff !== 'all')       pool = pool.filter(q => q.difficulty === selDiff)
          if (selTopics.length > 0)    pool = pool.filter(q => selTopics.includes(q.topic))
          const poolSize = pool.length
          return (
            <div style={{ textAlign: 'center', fontSize: 12, color: poolSize > 0 ? '#10b981' : '#ef4444', marginBottom: 8 }}>
              {poolSize > 0
                ? `${poolSize} question${poolSize !== 1 ? 's' : ''} match your filters - drawing ${Math.min(qCount, poolSize)}`
                : 'No questions match these filters - try adjusting Chapter, Type, or Difficulty'}
            </div>
          )
        })()}

        <button onClick={startSession} onMouseEnter={hov} onMouseLeave={unhov} style={{ ...S.startBtn, background: pillSel, transition: 'opacity 0.15s' }}>
          {mode === 'flashcards' ? 'Start Flashcards →' : mode === 'exam' ? 'Start Exam Simulation →' : mode === 'cram' ? 'Start Cram Session →' : 'Start Practice Quiz →'}
        </button>

        <div style={{ ...S.bankStatus, color: subText }}>
          <span style={{ ...S.bankDot, background: '#10b981' }} />
          {BANK_SIZE} questions ready &middot; no account required
        </div>

        <div style={{ marginTop: 8, marginBottom: 4 }}>
          <button onClick={() => setChapOpen(o => !o)} onMouseEnter={hov} onMouseLeave={unhov}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${border}`, background: cardBg, color: subText, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.15s' }}>
            {chapOpen ? '▲' : '▼'} Chapter Topics
          </button>
          {chapOpen && (
            <div style={{ ...S.topicsGrid, marginTop: 10 }}>
              {TOPIC_CARDS.map(item => (
                <div key={item.ch} style={{ ...S.topicCard, background: cardBg, borderTop: `3px solid ${CHAPTER_COLORS[item.ch]}` }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: CHAPTER_COLORS[item.ch] }}>{item.title}</span>
                    <span style={{ fontSize: 10, color: subText }}>{item.sub}</span>
                  </div>
                  {item.topics.map(t => <div key={t} style={{ ...S.topicItem, color: subText }}>&middot; {t}</div>)}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
