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
  { id: 'practice',   Icon: IconPencil, label: 'Practice',   sub: 'Reveal as you go'       },
  { id: 'exam',       Icon: IconClock,  label: 'Exam Sim',   sub: 'Timed & locked'          },
  { id: 'cram',       Icon: IconZap,    label: 'Cram',       sub: 'All questions, no timer' },
  { id: 'flashcards', Icon: IconCards,  label: 'Flashcards', sub: 'Flip-card review'        },
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

  const fBtn = active => ({
    ...S.filterBtn,
    background: active ? pillSel : cardBg,
    color:      active ? '#fff'  : text,
    border:     `1.5px solid ${active ? pillSel : border}`,
    transition: 'opacity 0.15s',
  })
  const hov   = e => { e.currentTarget.style.opacity = '0.75' }
  const unhov = e => { e.currentTarget.style.opacity = '1'    }

  const wCount  = wrongBank ? Object.keys(wrongBank).length : 0
  const fCount  = flagged   ? Object.keys(flagged).length   : 0
  const total   = stats?.totalAnswered || 0
  const qByChap = QUESTION_BANK.reduce((a, q) => { a[q.chapter] = (a[q.chapter] || 0) + 1; return a }, {})

  const streak = (() => {
    if (!sessionHistory?.length) return 0
    const days      = new Set(sessionHistory.map(s => s.date))
    const today     = new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })
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

  const chapterCards = (
    <>
      {TOPIC_CARDS.map(item => (
        <div key={item.ch} style={{ ...S.topicCard, background: cardBg, borderTop: `3px solid ${CHAPTER_COLORS[item.ch]}`, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: CHAPTER_COLORS[item.ch] }}>{item.title}</span>
            <span style={{ fontSize: 10, color: subText }}>{item.sub}</span>
          </div>
          {item.topics.map(t => <div key={t} style={{ ...S.topicItem, color: subText }}>&middot; {t}</div>)}
        </div>
      ))}
    </>
  )

  return (
    <div className="home-wrap" style={{ background: bg }}>

      {/* Dark toggle — fixed at right:22, sits naturally inside the 260px sidebar */}
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />

      {streak > 0 && (
        <div style={{ position: 'fixed', top: 20, left: 22, zIndex: 101, background: '#f59e0b', color: '#fff', padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
          {streak} DAY STREAK
        </div>
      )}

      {/* ── Fixed right sidebar — desktop only (hidden on mobile via CSS) ── */}
      <div className="sidebar-fixed" style={{ background: bg, borderLeft: `1px solid ${border}` }}>
        <label style={{ ...S.label, color: subText }}>CHAPTER TOPICS</label>
        {chapterCards}
      </div>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '14px 28px 8px' }}>
        <div style={S.badge}>EXAM PREP</div>
        <h1 style={{ ...S.title, color: dk ? '#f1f5f9' : '#0f172a' }}>IT Entrepreneurship</h1>
        <p style={{ ...S.subtitle, color: subText }}>Kuratko 12e &middot; Chapters 8, 9, 10 &amp; 12</p>
      </div>

      {/* ── Stats bar ── */}
      {stats && (
        <div style={{ padding: '0 28px 8px' }}>
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
        </div>
      )}

      {/* ── Main sections ── */}
      <div className="home-sections">

        {/* Study Mode — fixed 96px height, no unbounded growth */}
        <div style={{ flexShrink: 0 }}>
          <label style={{ ...S.label, color: subText }}>STUDY MODE</label>
          <div style={{ display: 'flex', gap: 8, height: 96, marginTop: 6 }}>
            {MODES.map(({ id, Icon, label, sub }) => (
              <button key={id} onClick={() => setMode(id)} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.modeBtn, flex: 1, height: '100%', justifyContent: 'center', background: mode === id ? pillSel : cardBg, border: `1.5px solid ${mode === id ? pillSel : border}`, color: mode === id ? '#fff' : text, transition: 'opacity 0.15s' }}>
                <span style={{ color: mode === id ? '#c7d2fe' : subText, display: 'flex' }}><Icon size={24} /></span>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{label}</span>
                <span style={{ fontSize: 11, color: mode === id ? '#c7d2fe' : subText, lineHeight: 1.3 }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Focus */}
        <div style={{ flexShrink: 0 }}>
          <label style={{ ...S.label, color: subText }}>CHAPTER FOCUS</label>
          <div style={{ ...S.filterRow, flexWrap: 'wrap', marginTop: 6 }}>
            {CHAPTERS.map(c => (
              <button key={c.id}
                onClick={() => { setSelChapter(c.id); setSelTopics([]) }}
                onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...fBtn(selChapter === c.id), flex: 1 }}>
                {c.id === 'all' ? 'All Chapters' : `Ch. ${c.id}`}
                {c.id !== 'all' && <span style={{ fontSize: 10, opacity: 0.65, marginLeft: 4 }}>({qByChap[parseInt(c.id)] || 0})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Question Type + Difficulty side by side */}
        {mode !== 'flashcards' && (
          <div className="qtype-diff" style={{ flexShrink: 0 }}>
            <div>
              <label style={{ ...S.label, color: subText }}>QUESTION TYPE</label>
              <div style={{ ...S.filterRow, marginTop: 6 }}>
                {[{ id: 'mcq', label: 'Multiple Choice' }, { id: 'tf', label: 'True / False' }, { id: 'mixed', label: 'Mixed' }].map(t => (
                  <button key={t.id} onClick={() => setQType(t.id)} onMouseEnter={hov} onMouseLeave={unhov}
                    style={{ ...fBtn(qType === t.id), flex: 1 }}>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ ...S.label, color: subText }}>DIFFICULTY</label>
              <div style={{ ...S.filterRow, marginTop: 6 }}>
                {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }].map(d => (
                  <button key={d.id} onClick={() => setSelDiff(d.id)} onMouseEnter={hov} onMouseLeave={unhov}
                    style={{ ...fBtn(selDiff === d.id), flex: 1 }}>{d.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Topic Drill */}
        {mode !== 'flashcards' && selChapter !== 'all' && TOPICS_BY_CHAPTER[parseInt(selChapter)]?.length > 0 && (
          <div style={{ flexShrink: 0 }}>
            <label style={{ ...S.label, color: subText }}>
              TOPIC DRILL <span style={{ fontSize: 9, fontWeight: 400, letterSpacing: 0 }}>(optional)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 6 }}>
              {TOPICS_BY_CHAPTER[parseInt(selChapter)].map(t => {
                const active = selTopics.includes(t)
                return (
                  <button key={t} onMouseEnter={hov} onMouseLeave={unhov}
                    onClick={() => setSelTopics(prev => active ? prev.filter(x => x !== t) : [...prev, t])}
                    style={{ ...fBtn(active), fontSize: 12, padding: '6px 12px' }}>
                    {t}
                  </button>
                )
              })}
              {selTopics.length > 0 && (
                <button onClick={() => setSelTopics([])} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.filterBtn, fontSize: 11, padding: '5px 10px', color: '#ef4444', border: `1.5px solid #ef4444`, background: cardBg, transition: 'opacity 0.15s' }}>
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Number of Questions */}
        {mode !== 'flashcards' && mode !== 'cram' && (
          <div style={{ flexShrink: 0 }}>
            <label style={{ ...S.label, color: subText }}>NUMBER OF QUESTIONS</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 }}>
              <button onClick={() => setQCount(q => Math.max(1, q - 1))} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.countBtn, minWidth: 40, padding: '0 12px', fontSize: 20, transition: 'opacity 0.15s' }}>−</button>
              <input
                type="number" min={1} max={201} value={qCount}
                onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1 && v <= 201) setQCount(v) }}
                style={{ width: 64, height: 44, borderRadius: 8, border: `1.5px solid ${border}`, background: cardBg, color: text, fontSize: 18, fontWeight: 700, textAlign: 'center', outline: 'none' }}
              />
              <button onClick={() => setQCount(q => Math.min(201, q + 1))} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.countBtn, minWidth: 40, padding: '0 12px', fontSize: 20, transition: 'opacity 0.15s' }}>+</button>
            </div>
          </div>
        )}

        {/* ── Bottom zone: pushed to bottom via marginTop auto ── */}
        <div style={{ marginTop: 'auto', flexShrink: 0 }}>

          {mode === 'exam' && (
            <div style={{ ...S.examBanner, marginBottom: 8 }}><strong>Exam Sim:</strong> {qCount} min timer &middot; answers locked until you submit</div>
          )}
          {mode === 'cram' && (
            <div style={{ ...S.examBanner, background: dk ? '#1a1a3e' : '#ede9fe', border: '1px solid #8b5cf6', color: '#4c1d95', marginBottom: 8 }}>
              <strong>Cram Mode:</strong> all questions matching your filters, shuffled, no timer &middot; reveal as you go
            </div>
          )}

          {(weakQs.length > 0 || wCount > 0 || fCount > 0) && mode !== 'flashcards' && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {weakQs.length > 0 && (
                <button onClick={startWeakDrill} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '8px 10px', fontSize: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconTarget size={13} /> Weak Spots ({weakQs.length})
                  </span>
                </button>
              )}
              {wCount > 0 && (
                <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '8px 10px', fontSize: 12 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconRepeat size={13} /> Retry Pool ({wCount})
                  </span>
                </button>
              )}
              {fCount > 0 && (
                <button onClick={() => {
                  const flaggedQs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean)
                  startRetry(flaggedQs)
                }} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '8px 10px', fontSize: 12, background: dk ? '#1a1a2e' : '#ede9fe', borderColor: '#8b5cf6', color: '#4c1d95' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconFlag size={13} filled color="#8b5cf6" /> Flagged ({fCount})
                  </span>
                </button>
              )}
            </div>
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

          <button onClick={startSession} onMouseEnter={hov} onMouseLeave={unhov}
            style={{ ...S.startBtn, background: pillSel, transition: 'opacity 0.15s' }}>
            {mode === 'flashcards' ? 'Start Flashcards →' : mode === 'exam' ? 'Start Exam Simulation →' : mode === 'cram' ? 'Start Cram Session →' : 'Start Practice Quiz →'}
          </button>

          <div style={{ ...S.bankStatus, color: subText }}>
            <span style={{ ...S.bankDot, background: '#10b981' }} />
            {BANK_SIZE} questions ready &middot; no account required
          </div>

        </div>
      </div>

      {/* ── Mobile collapsible chapter topics — hidden on desktop via CSS ── */}
      <div className="sidebar-mobile-wrap">
        <button
          onClick={() => setChapOpen(o => !o)}
          onMouseEnter={hov} onMouseLeave={unhov}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '10px', borderRadius: 8, border: `1px solid ${border}`, background: cardBg, color: subText, fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 8, transition: 'opacity 0.15s' }}>
          {chapOpen ? '▲' : '▼'} Chapter Topics
        </button>
        {chapOpen && (
          <div style={{ padding: '4px 0' }}>
            {chapterCards}
          </div>
        )}
      </div>

    </div>
  )
}
