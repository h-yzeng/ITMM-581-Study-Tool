import { CHAPTERS, TOPIC_CARDS, CHAPTER_COLORS, TOPICS_BY_CHAPTER } from '../data/chapters.js'
import { QUESTION_BANK } from '../data/questionBank.js'
import { qKey } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconPencil, IconClock, IconCards, IconFlag, IconBarChart, IconRepeat, IconTarget, IconZap } from '../components/Icons.jsx'

const BANK_SIZE   = QUESTION_BANK.length
const CHAPTER_IDS = [8, 9, 10, 12]

const MODES = [
  { id: 'practice',   Icon: IconPencil, label: 'Practice',   sub: 'Pick count · instant feedback'  },
  { id: 'exam',       Icon: IconClock,  label: 'Exam Sim',   sub: 'Timed & locked'                 },
  { id: 'cram',       Icon: IconZap,    label: 'Cram',       sub: 'All matching · no limit'        },
  { id: 'flashcards', Icon: IconCards,  label: 'Flashcards', sub: 'Flip-card review'               },
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

  const fBtn = active => ({
    ...S.filterBtn,
    fontSize: 15,
    padding: '11px 10px',
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

  const poolSize = (() => {
    let p = QUESTION_BANK
    if (selChapter !== 'all') p = p.filter(q => String(q.chapter) === selChapter)
    if (qType === 'mcq')       p = p.filter(q => q.type === 'mcq')
    if (qType === 'tf')        p = p.filter(q => q.type === 'tf')
    if (selDiff !== 'all')     p = p.filter(q => q.difficulty === selDiff)
    if (selTopics.length > 0)  p = p.filter(q => selTopics.includes(q.topic))
    return p.length
  })()

  const lbl = { ...S.label, fontSize: 12, color: subText }

  return (
    <div className="home-wrap" style={{ background: bg }}>

      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />

      {streak > 0 && (
        <div style={{ position: 'fixed', top: 20, left: 22, zIndex: 101, background: '#f59e0b', color: '#fff', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
          {streak} DAY STREAK
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '14px 28px 8px' }}>
        <div style={S.badge}>EXAM PREP</div>
        <h1 style={{ ...S.title, fontSize: 38, color: dk ? '#f1f5f9' : '#0f172a' }}>IT Entrepreneurship</h1>
        <p style={{ ...S.subtitle, fontSize: 16, color: subText }}>Kuratko 12e &middot; Chapters 8, 9, 10 &amp; 12</p>
      </div>

      {/* ── Stats bar ── */}
      {stats && (
        <div style={{ padding: '0 28px 8px' }}>
          <button onClick={() => setScreen('stats')} style={{ ...S.statsBar, background: cardBg, border: `1px solid ${border}` }}>
            <div style={S.statsCell}>
              <span style={{ ...S.statsNum, fontSize: 22, color: text }}>{total}</span>
              <span style={{ ...S.statsLbl, fontSize: 12, color: subText }}>Total</span>
            </div>
            {CHAPTER_IDS.map(ch => (
              <div key={ch} style={S.statsCell}>
                <span style={{ ...S.statsNum, fontSize: 22, color: CHAPTER_COLORS[ch] }}>{stats?.byChapter?.[ch] || 0}</span>
                <span style={{ ...S.statsLbl, fontSize: 12, color: subText }}>Ch.{ch}</span>
              </div>
            ))}
            <div style={S.statsCell}>
              <span style={{ ...S.statsNum, fontSize: 22, color: '#ef4444' }}>{wCount}</span>
              <span style={{ ...S.statsLbl, fontSize: 12, color: subText }}>Retry</span>
            </div>
            <span style={{ ...S.statsArrow, color: subText, display: 'flex', alignItems: 'center', gap: 4 }}>
              <IconBarChart size={16} /> &rarr;
            </span>
          </button>
        </div>
      )}

      {/* ── Last session chip ── */}
      {sessionHistory?.length > 0 && (() => {
        const last = sessionHistory[sessionHistory.length - 1]
        return (
          <div style={{ padding: '0 28px 6px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: '5px 16px', fontSize: 13, color: subText, display: 'inline-flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: subText }}>Last session:</span>
              <span style={{ color: text }}>{last.date}</span>
              <span style={{ fontWeight: 800, fontFamily: 'monospace', color: last.pct >= 70 ? '#10b981' : '#ef4444' }}>{last.pct}%</span>
              <span>{last.correct}/{last.total} correct</span>
            </div>
          </div>
        )
      })()}

      {/* ── Per-chapter accuracy row ── */}
      {stats?.totalAnswered > 0 && (() => {
        const chapStats = CHAPTER_IDS.reduce((acc, ch) => {
          const keys = Object.keys(stats.byTopic || {}).filter(k => k.startsWith(`${ch}:`))
          const right = keys.reduce((s, k) => s + (stats.byTopic[k].right || 0), 0)
          const wrong = keys.reduce((s, k) => s + (stats.byTopic[k].wrong || 0), 0)
          const tot = right + wrong
          acc[ch] = { total: tot, pct: tot > 0 ? Math.round(right / tot * 100) : null }
          return acc
        }, {})
        return (
          <div style={{ padding: '0 28px 8px', display: 'flex', gap: 8 }}>
            {CHAPTER_IDS.map(ch => {
              const cs = chapStats[ch]
              const pct = cs.pct
              return (
                <div key={ch}
                  onClick={() => { setSelChapter(String(ch)); setSelTopics([]) }}
                  onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ flex: 1, background: cardBg, border: `1px solid ${selChapter === String(ch) ? CHAPTER_COLORS[ch] : border}`, borderRadius: 8, padding: '9px 10px', textAlign: 'center', cursor: 'pointer', transition: 'opacity 0.15s' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: CHAPTER_COLORS[ch], marginBottom: 2 }}>Ch.{ch}</div>
                  {pct !== null ? (
                    <>
                      <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'monospace', color: pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444' }}>{pct}%</div>
                      <div style={{ height: 3, background: dk ? '#334155' : '#e2e8f0', borderRadius: 2, marginTop: 3, marginBottom: 2 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: CHAPTER_COLORS[ch], borderRadius: 2, transition: 'width 0.4s' }} />
                      </div>
                      <div style={{ fontSize: 11, color: subText, fontFamily: 'monospace' }}>{cs.total}q</div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12, color: subText, marginTop: 4 }}>—</div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })()}

      {/* ── Main sections ── */}
      <div className="home-sections">

        {/* Study Mode */}
        <div style={{ flexShrink: 0 }}>
          <label style={lbl}>STUDY MODE</label>
          <div style={{ display: 'flex', gap: 8, height: 112, marginTop: 6 }}>
            {MODES.map(({ id, Icon, label, sub }) => (
              <button key={id} onClick={() => setMode(id)} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.modeBtn, flex: 1, height: '100%', justifyContent: 'center', background: mode === id ? pillSel : cardBg, border: `1.5px solid ${mode === id ? pillSel : border}`, color: mode === id ? '#fff' : text, transition: 'opacity 0.15s' }}>
                <span style={{ color: mode === id ? '#c7d2fe' : subText, display: 'flex' }}><Icon size={28} /></span>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{label}</span>
                <span style={{ fontSize: 12, color: mode === id ? '#c7d2fe' : subText, lineHeight: 1.3 }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chapter Focus */}
        <div style={{ flexShrink: 0 }}>
          <label style={lbl}>CHAPTER FOCUS</label>
          <div style={{ ...S.filterRow, flexWrap: 'wrap', marginTop: 6 }}>
            {CHAPTERS.map(c => (
              <button key={c.id}
                onClick={() => { setSelChapter(c.id); setSelTopics([]) }}
                onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...fBtn(selChapter === c.id), flex: 1 }}>
                {c.id === 'all' ? 'All Chapters' : `Ch. ${c.id}`}
                {c.id !== 'all' && <span style={{ fontSize: 11, opacity: 0.65, marginLeft: 4 }}>({qByChap[parseInt(c.id)] || 0})</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Question Type + Difficulty — hidden for flashcards */}
        {mode !== 'flashcards' && (
          <div className="qtype-diff" style={{ flexShrink: 0 }}>
            <div>
              <label style={lbl}>QUESTION TYPE</label>
              <div style={{ ...S.filterRow, marginTop: 6 }}>
                {[{ id: 'mcq', label: 'Multiple Choice' }, { id: 'tf', label: 'True / False' }, { id: 'mixed', label: 'Mixed' }].map(t => (
                  <button key={t.id} onClick={() => setQType(t.id)} onMouseEnter={hov} onMouseLeave={unhov}
                    style={{ ...fBtn(qType === t.id), flex: 1 }}>{t.label}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={lbl}>DIFFICULTY</label>
              <div style={{ ...S.filterRow, marginTop: 6 }}>
                {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }].map(d => (
                  <button key={d.id} onClick={() => setSelDiff(d.id)} onMouseEnter={hov} onMouseLeave={unhov}
                    style={{ ...fBtn(selDiff === d.id), flex: 1 }}>{d.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Topic Drill — shown for all modes when a chapter is selected */}
        {selChapter !== 'all' && TOPICS_BY_CHAPTER[parseInt(selChapter)]?.length > 0 && (
          <div style={{ flexShrink: 0 }}>
            <label style={lbl}>
              TOPIC DRILL <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 0 }}>(optional)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 6 }}>
              {TOPICS_BY_CHAPTER[parseInt(selChapter)].map(t => {
                const active = selTopics.includes(t)
                return (
                  <button key={t} onMouseEnter={hov} onMouseLeave={unhov}
                    onClick={() => setSelTopics(prev => active ? prev.filter(x => x !== t) : [...prev, t])}
                    style={{ ...fBtn(active), fontSize: 13, padding: '8px 14px' }}>
                    {t}
                  </button>
                )
              })}
              {selTopics.length > 0 && (
                <button onClick={() => setSelTopics([])} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.filterBtn, fontSize: 13, padding: '7px 12px', color: '#ef4444', border: `1.5px solid #ef4444`, background: cardBg, transition: 'opacity 0.15s' }}>
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Number of Questions — practice only */}
        {mode !== 'flashcards' && mode !== 'cram' && (
          <div style={{ flexShrink: 0 }}>
            <label style={lbl}>NUMBER OF QUESTIONS</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6 }}>
              <button onClick={() => setQCount(q => Math.max(1, q - 1))} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.countBtn, minWidth: 44, padding: '0 14px', fontSize: 22, transition: 'opacity 0.15s' }}>−</button>
              <input
                type="number" min={1} max={201} value={qCount}
                onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 1 && v <= 201) setQCount(v) }}
                style={{ width: 72, height: 48, borderRadius: 8, border: `1.5px solid ${border}`, background: cardBg, color: text, fontSize: 20, fontWeight: 700, textAlign: 'center', outline: 'none' }}
              />
              <button onClick={() => setQCount(q => Math.min(201, q + 1))} onMouseEnter={hov} onMouseLeave={unhov}
                style={{ ...S.countBtn, minWidth: 44, padding: '0 14px', fontSize: 22, transition: 'opacity 0.15s' }}>+</button>
            </div>
          </div>
        )}

        {/* Chapter Topics — flex:1 fills remaining space */}
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <label style={lbl}>CHAPTER TOPICS</label>
          <div style={{ ...S.topicsGrid, marginBottom: 0, marginTop: 6 }}>
            {TOPIC_CARDS.map(item => (
              <div key={item.ch} style={{ ...S.topicCard, background: cardBg, borderTop: `3px solid ${CHAPTER_COLORS[item.ch]}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: CHAPTER_COLORS[item.ch] }}>{item.title}</span>
                  <span style={{ fontSize: 12, color: subText }}>{item.sub}</span>
                </div>
                {TOPICS_BY_CHAPTER[item.ch].map(t => (
                  <div key={t}
                    onClick={() => { setSelChapter(String(item.ch)); setSelTopics([t]) }}
                    onMouseEnter={e => { e.currentTarget.style.color = CHAPTER_COLORS[item.ch] }}
                    onMouseLeave={e => { e.currentTarget.style.color = subText }}
                    style={{ ...S.topicItem, fontSize: 13, lineHeight: 1.6, marginTop: 5, color: subText, cursor: 'pointer' }}>
                    &middot; {t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom zone: start button and supporting rows ── */}
        <div style={{ flexShrink: 0 }}>

          {mode === 'exam' && (
            <div style={{ ...S.examBanner, fontSize: 14, marginBottom: 8 }}><strong>Exam Sim:</strong> {qCount} min timer &middot; answers locked until you submit</div>
          )}
          {mode === 'cram' && (
            <div style={{ ...S.examBanner, fontSize: 14, background: dk ? '#1a1a3e' : '#ede9fe', border: '1px solid #8b5cf6', color: '#4c1d95', marginBottom: 8 }}>
              <strong>Cram Mode:</strong> {poolSize > 0 ? `${poolSize} question${poolSize !== 1 ? 's' : ''} queued` : 'No questions match'} &middot; shuffled &middot; no timer, reveal as you go
            </div>
          )}

          {(weakQs.length > 0 || wCount > 0 || fCount > 0) && mode !== 'flashcards' && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {weakQs.length > 0 && (
                <button onClick={startWeakDrill} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '9px 10px', fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconTarget size={14} /> Weak Spots ({weakQs.length})
                  </span>
                </button>
              )}
              {wCount > 0 && (
                <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '9px 10px', fontSize: 13 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconRepeat size={14} /> Retry Pool ({wCount})
                  </span>
                </button>
              )}
              {fCount > 0 && (
                <button onClick={() => {
                  const flaggedQs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean)
                  startRetry(flaggedQs)
                }} onMouseEnter={hov} onMouseLeave={unhov}
                  style={{ ...S.retryPoolBtn, flex: 1, marginBottom: 0, padding: '9px 10px', fontSize: 13, background: dk ? '#1a1a2e' : '#ede9fe', borderColor: '#8b5cf6', color: '#4c1d95' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <IconFlag size={14} filled color="#8b5cf6" /> Flagged ({fCount})
                  </span>
                </button>
              )}
            </div>
          )}

          {mode !== 'flashcards' && (
            <div style={{ textAlign: 'center', fontSize: 14, color: poolSize > 0 ? '#10b981' : '#ef4444', marginBottom: 8 }}>
              {poolSize > 0
                ? `${poolSize} question${poolSize !== 1 ? 's' : ''} match your filters${mode === 'cram' ? '' : ` - drawing ${Math.min(qCount, poolSize)}`}`
                : 'No questions match these filters - try adjusting Chapter, Type, or Difficulty'}
            </div>
          )}

          <button onClick={startSession} onMouseEnter={hov} onMouseLeave={unhov}
            style={{ ...S.startBtn, fontSize: 20, background: pillSel, transition: 'opacity 0.15s' }}>
            {mode === 'flashcards' ? 'Start Flashcards →' : mode === 'exam' ? 'Start Exam Simulation →' : mode === 'cram' ? 'Start Cram Session →' : 'Start Practice Quiz →'}
          </button>

          <div style={{ ...S.bankStatus, fontSize: 13, color: subText }}>
            <span style={{ ...S.bankDot, background: '#10b981' }} />
            {BANK_SIZE} questions ready &middot; no account required
          </div>

        </div>
      </div>

    </div>
  )
}
