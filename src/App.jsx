import { useState, useEffect, useRef } from 'react'
import { CHAPTER_COLORS, CHAPTERS, TOPICS_BY_CHAPTER, TOPIC_CARDS, DIFF_COLORS } from './data/chapters.js'
import { FLASHCARDS } from './data/flashcards.js'
import { QUESTION_BANK } from './data/questionBank.js'
import { loadStore, saveStore, qKey } from './hooks/useStorage.js'
import { S } from './styles.js'

const CHAPTER_IDS = [8, 9, 10, 12]

function pullQuestions(count, ch, type, diff) {
  let pool = [...QUESTION_BANK]
  if (ch !== 'all')   pool = pool.filter(q => String(q.chapter) === ch)
  if (type === 'mcq') pool = pool.filter(q => q.type === 'mcq')
  if (type === 'tf')  pool = pool.filter(q => q.type === 'tf')
  if (diff !== 'all') pool = pool.filter(q => q.difficulty === diff)
  pool.sort(() => Math.random() - 0.5)
  while (pool.length < count && pool.length > 0) {
    const extra = [...QUESTION_BANK]
      .filter(q => ch === 'all'     || String(q.chapter) === ch)
      .filter(q => type === 'mixed' || q.type === type)
      .filter(q => diff === 'all'   || q.difficulty === diff)
      .sort(() => Math.random() - 0.5)
    pool = [...pool, ...extra]
  }
  return pool.slice(0, count)
}

const fcCardKey = c => `${c.ch}:${c.topic}:${(c.front || '').slice(0, 40)}`

export default function App() {
  // ── State ────────────────────────────────────────────────────────────────
  const [screen, setScreen]         = useState('home')
  const [mode, setMode]             = useState('practice')
  const [selChapter, setSelChapter] = useState('all')
  const [selDiff, setSelDiff]       = useState('all')
  const [qCount, setQCount]         = useState(10)
  const [qType, setQType]           = useState('mcq')

  const [questions, setQuestions]   = useState([])
  const [curIdx, setCurIdx]         = useState(0)
  const [answers, setAnswers]       = useState({})
  const [revealed, setRevealed]     = useState({})
  const [score, setScore]           = useState(null)

  const [timeLeft, setTimeLeft]     = useState(null)
  const timerRef                    = useRef(null)

  const [fcIdx, setFcIdx]           = useState(0)
  const [fcFlipped, setFcFlipped]   = useState(false)
  const [fcCh, setFcCh]             = useState('all')
  const [fcTopic, setFcTopic]       = useState('all')
  const [fcKnown, setFcKnown]       = useState({})

  const [stats, setStats]           = useState(null)
  const [wrongBank, setWrongBank]   = useState(null)
  const [rightBank, setRightBank]   = useState(null)
  const [flagged, setFlagged]       = useState({})
  const [darkMode, setDarkMode]     = useState(false)
  const [sessionHistory, setSessionHistory] = useState([])
  const [fcLastSeen, setFcLastSeen] = useState({})

  // ── Flashcard derived state (must be BEFORE the useEffects that reference them)
  const fcCardsRaw = FLASHCARDS.filter(c => {
    if (fcCh !== 'all' && c.ch !== parseInt(fcCh)) return false
    if (fcTopic !== 'all' && c.topic !== fcTopic) return false
    return true
  })

  // Spaced repetition sort: unseen first, then oldest-reviewed first
  const fcCards = [...fcCardsRaw].sort((a, b) => {
    const la = fcLastSeen[fcCardKey(a)] || 0
    const lb = fcLastSeen[fcCardKey(b)] || 0
    if (!la && lb)  return -1
    if (la && !lb)  return 1
    return la - lb
  })

  const fcCard       = fcCards[fcIdx] || fcCards[0]
  const fcTopics     = fcCh !== 'all' ? (TOPICS_BY_CHAPTER[parseInt(fcCh)] || []) : []
  const fcKnownCount = Object.values(fcKnown).filter(Boolean).length

  // doMarkCard also defined before the useEffect that calls it
  const doMarkCard = v => {
    setFcKnown(p => ({ ...p, [fcIdx]: v }))
    const card = fcCards[fcIdx]
    if (card) {
      setFcLastSeen(p => {
        const n = { ...p, [fcCardKey(card)]: Date.now() }
        saveStore('fcLastSeen', n)
        return n
      })
    }
    if (fcIdx < fcCards.length - 1) {
      setFcFlipped(false)
      setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100)
    }
  }

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const defaultStats = { totalAnswered: 0, byChapter: { 8: 0, 9: 0, 10: 0, 12: 0 }, byTopic: {}, sessions: 0 }
    setStats(loadStore('stats', defaultStats))
    setWrongBank(loadStore('wrongBank', {}))
    setRightBank(loadStore('rightBank', {}))
    setFlagged(loadStore('flagged', {}))
    setDarkMode(loadStore('darkMode', false))
    setSessionHistory(loadStore('sessionHistory', []))
    setFcLastSeen(loadStore('fcLastSeen', {}))
  }, [])

  const toggleDark = () => setDarkMode(d => { saveStore('darkMode', !d); return !d })

  // Exam timer
  useEffect(() => {
    if (screen === 'quiz' && mode === 'exam' && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timerRef.current)
    }
    if (screen === 'quiz' && mode === 'exam' && timeLeft === 0) finishQuiz()
  }, [screen, mode, timeLeft])

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // Keyboard shortcuts — quiz
  useEffect(() => {
    if (screen !== 'quiz') return
    const handler = e => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (['a','b','c','d'].includes(e.key.toLowerCase())) {
        const letter = e.key.toUpperCase()
        if (!revealed[curIdx]) setAnswers(p => ({ ...p, [curIdx]: letter }))
      } else if (e.key === ' ') {
        e.preventDefault()
        if (mode !== 'exam' && answers[curIdx] && !revealed[curIdx])
          setRevealed(r => ({ ...r, [curIdx]: true }))
      } else if (e.key === 'ArrowRight') {
        setCurIdx(i => Math.min(questions.length - 1, i + 1))
      } else if (e.key === 'ArrowLeft') {
        setCurIdx(i => Math.max(0, i - 1))
      } else if (e.key === 'f' || e.key === 'F') {
        const q = questions[curIdx]
        if (q) {
          const k = qKey(q)
          setFlagged(p => { const n = { ...p }; n[k] ? delete n[k] : (n[k] = true); saveStore('flagged', n); return n })
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen, curIdx, mode, questions, revealed, answers])

  // Keyboard shortcuts — flashcards (fcCards and doMarkCard are defined above)
  useEffect(() => {
    if (screen !== 'flashcards') return
    const handler = e => {
      if (e.key === ' ') { e.preventDefault(); setFcFlipped(f => !f) }
      else if (e.key === 'ArrowRight') { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100) }
      else if (e.key === 'ArrowLeft')  { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.max(0, i - 1)), 100) }
      else if (e.key === 'g' || e.key === 'G') doMarkCard(true)
      else if (e.key === 'x' || e.key === 'X') doMarkCard(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen, fcIdx, fcCards.length])

  // ── Helpers ──────────────────────────────────────────────────────────────
  const bankSize = QUESTION_BANK.length

  const toggleFlag = q => {
    const k = qKey(q)
    setFlagged(p => { const n = { ...p }; n[k] ? delete n[k] : (n[k] = true); saveStore('flagged', n); return n })
  }

  const computeWeakDrill = () => {
    if (!stats?.byTopic) return []
    const weakTopics = new Set()
    Object.entries(stats.byTopic).forEach(([key, d]) => {
      const tot = d.right + d.wrong
      if (tot >= 3 && d.wrong / tot >= 0.5) weakTopics.add(key.split(':').slice(1).join(':'))
    })
    return [...QUESTION_BANK].filter(q => weakTopics.has(q.topic)).sort(() => Math.random() - 0.5).slice(0, 20)
  }

  const startWeakDrill = () => {
    const qs = computeWeakDrill()
    if (!qs.length) return
    setQuestions(qs); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null); setTimeLeft(null)
    setScreen('quiz')
  }

  const startSession = () => {
    if (mode === 'flashcards') {
      setFcIdx(0); setFcFlipped(false); setFcKnown({})
      setFcCh(selChapter); setFcTopic('all')
      setScreen('flashcards'); return
    }
    const qs = pullQuestions(qCount, selChapter, qType, selDiff)
    setQuestions(qs); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null)
    if (mode === 'exam') setTimeLeft(qCount * 60)
    setScreen('quiz')
  }

  const startRetry = qs => {
    const shuffled = [...qs].sort(() => Math.random() - 0.5)
    setQuestions(shuffled); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null); setScreen('quiz')
  }

  const selectAnswer = (idx, letter) => {
    if (!revealed[idx]) setAnswers(p => ({ ...p, [idx]: letter }))
  }
  const revealAnswer = idx => { if (answers[idx]) setRevealed(p => ({ ...p, [idx]: true })) }

  const finishQuiz = () => {
    clearTimeout(timerRef.current)
    const correct = questions.filter((q, i) => answers[i] === q.answer).length
    setScore(correct); setScreen('results')
    if (!stats) return
    const nw = { ...wrongBank }, nr = { ...rightBank }
    const ns = {
      ...stats,
      totalAnswered: (stats.totalAnswered || 0) + questions.length,
      byChapter: { ...stats.byChapter },
      byTopic:   { ...stats.byTopic },
      sessions:  (stats.sessions || 0) + 1,
    }
    questions.forEach((q, i) => {
      const k = qKey(q), ch = q.chapter, tpKey = `${ch}:${q.topic || 'General'}`, ok = answers[i] === q.answer
      ns.byChapter[ch] = (ns.byChapter[ch] || 0) + 1
      if (!ns.byTopic[tpKey]) ns.byTopic[tpKey] = { right: 0, wrong: 0 }
      if (ok) {
        ns.byTopic[tpKey].right++
        nr[k] = { q, rightCount: ((nr[k]?.rightCount) || 0) + 1 }
        if (nw[k]) { nw[k].wrongCount--; if (nw[k].wrongCount <= 0) delete nw[k] }
      } else {
        ns.byTopic[tpKey].wrong++
        nw[k] = { q, wrongCount: ((nw[k]?.wrongCount) || 0) + 1 }
        if (nr[k]) delete nr[k]
      }
    })
    const pct = Math.round(correct / questions.length * 100)
    const newHist = [...sessionHistory, {
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
      pct, correct, total: questions.length,
    }].slice(-20)
    setStats(ns); setWrongBank(nw); setRightBank(nr); setSessionHistory(newHist)
    saveStore('stats', ns); saveStore('wrongBank', nw); saveStore('rightBank', nr)
    saveStore('sessionHistory', newHist)
  }

  const exportStats = () => {
    const data = { stats, wrongBank, rightBank, flagged, sessionHistory, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `study-stats-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Computed ──────────────────────────────────────────────────────────────
  const answeredAll = questions.length > 0 && Object.keys(answers).length === questions.length
  const prog = questions.length ? Math.round(Object.keys(answers).length / questions.length * 100) : 0

  // Dark-mode theme tokens
  const dk      = darkMode
  const bg      = dk ? '#0f172a' : '#f1f5f9'
  const cardBg  = dk ? '#1e293b' : '#fff'
  const text    = dk ? '#e2e8f0' : '#1e293b'
  const subText = dk ? '#94a3b8' : '#64748b'
  const border  = dk ? '#334155' : '#e2e8f0'
  const pillSel = dk ? '#4f46e5' : '#1e293b'

  const pill  = active => ({ ...S.pill,     background: active ? pillSel : cardBg, color: active ? '#fff' : text, border: `1.5px solid ${active ? pillSel : border}` })
  const count = active => ({ ...S.countBtn, background: active ? pillSel : cardBg, color: active ? '#fff' : text, border: `1.5px solid ${active ? pillSel : border}` })

  // ── Session history SVG chart ─────────────────────────────────────────────
  const SChart = () => {
    const pts = sessionHistory
    if (pts.length < 2) return (
      <div style={{ textAlign: 'center', padding: '18px 0', color: subText, fontSize: 12, fontFamily: 'sans-serif' }}>
        Complete at least 2 sessions to see your progress chart.
      </div>
    )
    const W = 560, H = 130, PL = 34, PR = 10, PT = 14, PB = 20
    const maxX = pts.length - 1
    const sx = i => PL + (i / maxX) * (W - PL - PR)
    const sy = p => PT + ((100 - p.pct) / 100) * (H - PT - PB)
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(i).toFixed(1)} ${sy(p).toFixed(1)}`).join(' ')
    return (
      <div style={{ overflowX: 'auto' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto', minWidth: 240 }}>
          {[0, 25, 50, 70, 90, 100].map(v => {
            const yv = sy({ pct: v })
            return (
              <g key={v}>
                <line x1={PL} y1={yv} x2={W - PR} y2={yv} stroke={dk ? '#334155' : '#e2e8f0'} strokeWidth={1} strokeDasharray={v === 70 || v === 90 ? '4 3' : undefined} />
                <text x={PL - 4} y={yv + 3.5} textAnchor="end" fontSize={9} fill={subText} fontFamily="monospace">{v}</text>
              </g>
            )
          })}
          <path d={pathD} fill="none" stroke="#6366f1" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={sx(i)} cy={sy(p)} r={4} fill={p.pct >= 90 ? '#10b981' : p.pct >= 70 ? '#f59e0b' : '#ef4444'} stroke={cardBg} strokeWidth={2} />
              {pts.length <= 10 && (
                <text x={sx(i)} y={sy(p) - 8} textAnchor="middle" fontSize={9} fill={p.pct >= 70 ? '#10b981' : '#ef4444'} fontFamily="monospace" fontWeight="700">{p.pct}%</text>
              )}
            </g>
          ))}
          {pts.map((p, i) => (
            (pts.length <= 8 || i % Math.ceil(pts.length / 7) === 0 || i === pts.length - 1) ? (
              <text key={i} x={sx(i)} y={H - 3} textAnchor="middle" fontSize={8} fill={subText} fontFamily="sans-serif">{p.date}</text>
            ) : null
          ))}
        </svg>
      </div>
    )
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === 'home') {
    const wCount = wrongBank ? Object.keys(wrongBank).length : 0
    const fCount = flagged   ? Object.keys(flagged).length   : 0
    const total  = stats?.totalAnswered || 0
    const weakQs = computeWeakDrill()
    return (
      <div style={{ ...S.page, background: bg }}>
        <div style={S.container}>
          <div style={S.header}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={S.badge}>EXAM PREP</div>
              <button onClick={toggleDark} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 20, padding: '3px 11px', cursor: 'pointer', fontSize: 11, color: subText, fontFamily: 'monospace' }}>
                {dk ? '☀ Light' : '🌙 Dark'}
              </button>
            </div>
            <h1 style={{ ...S.title, color: dk ? '#f1f5f9' : '#0f172a' }}>IT Entrepreneurship</h1>
            <p style={{ ...S.subtitle, color: subText }}>Kuratko 12e · Chapters 8, 9, 10 & 12</p>
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
              <span style={{ ...S.statsArrow, color: subText }}>📊 →</span>
            </button>
          )}

          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>STUDY MODE</label>
            <div style={S.modeRow}>
              {[
                { id: 'practice',   icon: '📝', label: 'Practice',   sub: 'Reveal as you go' },
                { id: 'exam',       icon: '⏱',  label: 'Exam Sim',   sub: 'Timed & locked'  },
                { id: 'flashcards', icon: '🃏', label: 'Flashcards', sub: 'Flip-card review' },
              ].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} style={{ ...S.modeBtn, background: mode === m.id ? pillSel : cardBg, border: `1.5px solid ${mode === m.id ? pillSel : border}`, color: mode === m.id ? '#fff' : text }}>
                  <span style={{ fontSize: 22 }}>{m.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{m.label}</span>
                  <span style={{ fontSize: 10, color: mode === m.id ? '#c7d2fe' : subText, lineHeight: 1.3 }}>{m.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={S.section}>
            <label style={{ ...S.label, color: subText }}>CHAPTER FOCUS</label>
            <div style={S.pills}>
              {CHAPTERS.map(c => (
                <button key={c.id} onClick={() => setSelChapter(c.id)} style={pill(selChapter === c.id)}>{c.label}</button>
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
                {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: '🟢 Easy' }, { id: 'medium', label: '🟡 Medium' }, { id: 'hard', label: '🔴 Hard' }].map(d => (
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
            <div style={S.examBanner}>⏱ <strong>Exam Sim:</strong> {qCount} min timer · answers locked until you submit</div>
          )}

          <div style={S.topicsGrid}>
            {TOPIC_CARDS.map(item => (
              <div key={item.ch} style={{ ...S.topicCard, background: cardBg, borderTop: `3px solid ${CHAPTER_COLORS[item.ch]}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: CHAPTER_COLORS[item.ch] }}>{item.title}</span>
                  <span style={{ fontSize: 10, color: subText, fontFamily: 'sans-serif' }}>{item.sub}</span>
                </div>
                {item.topics.map(t => <div key={t} style={{ ...S.topicItem, color: subText }}>· {t}</div>)}
              </div>
            ))}
          </div>

          {weakQs.length > 0 && mode !== 'flashcards' && (
            <button onClick={startWeakDrill} style={{ ...S.retryPoolBtn, background: dk ? '#1c1917' : '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }}>
              🎯 Study Weak Spots — {weakQs.length} questions from your lowest-scoring topics
            </button>
          )}
          {wrongBank && Object.keys(wrongBank).length > 0 && (
            <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} style={{ ...S.retryPoolBtn, background: dk ? '#1c1917' : '#fef3c7', borderColor: '#f59e0b', color: '#92400e' }}>
              🔁 Retry Pool — {Object.keys(wrongBank).length} question{Object.keys(wrongBank).length !== 1 ? 's' : ''} you've gotten wrong (shuffled)
            </button>
          )}
          {fCount > 0 && (
            <button onClick={() => {
              const flaggedQs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean)
              startRetry(flaggedQs)
            }} style={{ ...S.retryPoolBtn, background: dk ? '#1a1a2e' : '#ede9fe', borderColor: '#8b5cf6', color: '#4c1d95' }}>
              🚩 Flagged Questions — {fCount} question{fCount !== 1 ? 's' : ''} you marked as confusing
            </button>
          )}

          <button onClick={startSession} style={{ ...S.startBtn, background: pillSel }}>
            {mode === 'flashcards' ? 'Start Flashcards →' : mode === 'exam' ? 'Start Exam Simulation →' : 'Start Practice Quiz →'}
          </button>

          <div style={{ ...S.bankStatus, color: subText }}>
            <span style={{ ...S.bankDot, background: '#10b981' }} />
            {bankSize} questions ready · no account required
          </div>
        </div>
      </div>
    )
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === 'quiz') {
    const q = questions[curIdx]
    const isExam = mode === 'exam', isRev = revealed[curIdx], chosen = answers[curIdx]
    const tw = timeLeft !== null && timeLeft < 120
    const isFlagged = q && flagged[qKey(q)]
    return (
      <div style={{ ...S.page, background: bg }}>
        <div style={S.container}>
          <div style={S.topBar}>
            <button onClick={() => { clearTimeout(timerRef.current); setScreen('home') }} style={{ ...S.backBtn, color: subText }}>← Back</button>
            <div style={S.progWrap}>
              <div style={{ ...S.progTrack, background: dk ? '#334155' : '#e2e8f0' }}>
                <div style={{ ...S.progFill, width: `${prog}%` }} />
              </div>
              <span style={{ ...S.progText, color: subText }}>{Object.keys(answers).length}/{questions.length}</span>
            </div>
            {isExam && timeLeft !== null && (
              <div style={{ ...S.timerBadge, background: tw ? '#ef4444' : (dk ? '#334155' : '#1e293b') }}>⏱ {fmt(timeLeft)}</div>
            )}
            <button onClick={finishQuiz} disabled={!answeredAll} style={{ ...S.finishBtn, opacity: answeredAll ? 1 : 0.4 }}>
              {isExam ? 'Submit' : 'Finish'}
            </button>
          </div>

          <div style={S.qNav}>
            {questions.map((_, i) => (
              <button key={i} onClick={() => setCurIdx(i)} style={{
                ...S.qDot,
                background: i === curIdx ? (dk ? '#6366f1' : '#1e293b') : !isExam && revealed[i] ? (answers[i] === questions[i].answer ? '#10b981' : '#ef4444') : answers[i] ? '#6366f1' : (dk ? '#334155' : '#e2e8f0'),
                color: (i === curIdx || answers[i]) ? '#fff' : (dk ? '#64748b' : '#94a3b8'),
              }}>{i + 1}</button>
            ))}
          </div>

          <div style={{ ...S.qCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none', boxShadow: dk ? 'none' : '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ ...S.chTag, background: CHAPTER_COLORS[q.chapter] + '22', color: CHAPTER_COLORS[q.chapter] }}>Ch.{q.chapter}</span>
                {q.topic && <span style={{ ...S.topicTag, background: dk ? '#334155' : '#f1f5f9', color: dk ? '#94a3b8' : '#475569' }}>{q.topic}</span>}
                {!isExam && <span style={{ ...S.diffTag, background: DIFF_COLORS[q.difficulty]?.bg, color: DIFF_COLORS[q.difficulty]?.text }}>{DIFF_COLORS[q.difficulty]?.label}</span>}
                {q.type === 'tf' && <span style={{ ...S.diffTag, background: '#f0f9ff', color: '#0369a1' }}>T/F</span>}
                <span style={{ ...S.qNum, color: subText }}>Q{curIdx + 1}/{questions.length}</span>
              </div>
              <button onClick={() => toggleFlag(q)} title="Flag as confusing (F key)" style={{ flexShrink: 0, background: isFlagged ? '#ede9fe' : 'none', border: `1px solid ${isFlagged ? '#8b5cf6' : border}`, borderRadius: 6, padding: '3px 9px', cursor: 'pointer', fontSize: 13, color: isFlagged ? '#7c3aed' : subText, marginLeft: 8 }}>
                🚩
              </button>
            </div>
            <p style={{ ...S.qText, color: text }}>{q.question}</p>
            <div style={{ ...S.options, ...(q.type === 'tf' ? { flexDirection: 'row', gap: 12 } : {}) }}>
              {q.options.map(opt => {
                const letter = opt[0], isChosen = chosen === letter, isCorrect = q.answer === letter
                let bg2 = dk ? '#0f172a' : '#f8fafc', bdr = border, col = text
                if (!isExam && isRev) {
                  if (isCorrect)     { bg2 = '#d1fae5'; bdr = '#10b981'; col = '#065f46' }
                  else if (isChosen) { bg2 = '#fee2e2'; bdr = '#ef4444'; col = '#991b1b' }
                } else if (isChosen) { bg2 = '#ede9fe'; bdr = '#8b5cf6'; col = '#4c1d95' }
                const isTF = q.type === 'tf'
                return (
                  <button key={letter} onClick={() => selectAnswer(curIdx, letter)}
                    style={{ ...S.optBtn, ...(isTF ? { flex: 1, justifyContent: 'center', fontSize: 15, fontWeight: 700, padding: '16px 0' } : {}), background: bg2, border: `1.5px solid ${bdr}`, color: col }}>
                    {!isTF && <span style={S.optLetter}>{letter}</span>}
                    <span>{opt.slice(3)}</span>
                    {!isExam && isRev && isCorrect  && <span style={S.checkmark}>✓</span>}
                    {!isExam && isRev && isChosen && !isCorrect && <span style={S.cross}>✗</span>}
                  </button>
                )
              })}
            </div>
            {!isExam && chosen && !isRev && (
              <button onClick={() => revealAnswer(curIdx)} style={{ ...S.revealBtn, background: pillSel }}>Check Answer</button>
            )}
            {!isExam && isRev && (
              <div style={{ ...S.explanation, background: dk ? '#0f172a' : '#f8fafc', border: `1px solid ${border}`, color: subText }}>
                <strong style={{ color: text }}>Explanation:</strong> {q.explanation}
              </div>
            )}
          </div>

          <div style={{ ...S.navRow, marginBottom: 6 }}>
            <button onClick={() => setCurIdx(Math.max(0, curIdx - 1))} disabled={curIdx === 0} style={{ ...S.navBtn, background: cardBg, border: `1.5px solid ${border}`, color: text, opacity: curIdx === 0 ? 0.3 : 1 }}>← Prev</button>
            <button onClick={() => setCurIdx(Math.min(questions.length - 1, curIdx + 1))} disabled={curIdx === questions.length - 1} style={{ ...S.navBtn, background: cardBg, border: `1.5px solid ${border}`, color: text, opacity: curIdx === questions.length - 1 ? 0.3 : 1 }}>Next →</button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 10, color: subText, fontFamily: 'monospace', paddingBottom: 4 }}>
            ← → navigate · A/B/C/D select · Space reveal · F flag
          </div>
        </div>
      </div>
    )
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === 'results') {
    const pct   = Math.round(score / questions.length * 100)
    const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F'
    const gc    = pct >= 80 ? '#10b981' : pct >= 70 ? '#f59e0b' : '#ef4444'
    const chBreak = CHAPTER_IDS.map(ch => {
      const cqs = questions.map((q, i) => ({ q, i })).filter(({ q }) => q.chapter === ch)
      return { ch, total: cqs.length, correct: cqs.filter(({ q, i }) => answers[i] === q.answer).length }
    }).filter(x => x.total > 0)
    const wrongQs = questions.filter((_, i) => answers[i] !== questions[i].answer)
    return (
      <div style={{ ...S.page, background: bg }}>
        <div style={S.container}>
          <div style={{ ...S.resultsCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: gc, lineHeight: 1 }}>{grade}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: text, margin: '8px 0' }}>{score}/{questions.length} Correct</div>
              <div style={{ fontSize: 16, color: subText }}>{pct}%</div>
            </div>
            <div style={S.breakdown}>
              {chBreak.map(({ ch, total, correct }) => {
                const p = Math.round(correct / total * 100)
                return (
                  <div key={ch} style={S.bRow}>
                    <span style={{ color: CHAPTER_COLORS[ch], fontWeight: 600, minWidth: 50, fontSize: 13 }}>Ch.{ch}</span>
                    <div style={{ ...S.barWrap, background: dk ? '#334155' : '#f1f5f9' }}>
                      <div style={{ ...S.bar, width: `${p}%`, background: CHAPTER_COLORS[ch] }} />
                    </div>
                    <span style={{ color: subText, fontSize: 12, minWidth: 70, textAlign: 'right', fontFamily: 'monospace' }}>{correct}/{total} ({p}%)</span>
                  </div>
                )
              })}
            </div>
            {wrongQs.length > 0
              ? <button onClick={() => startRetry(wrongQs)} style={S.retryBtn}>🔁 Retry {wrongQs.length} Wrong (Shuffled)</button>
              : <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 14, color: '#10b981', fontWeight: 700 }}>🎉 Perfect score!</div>}
            <div style={S.resBtns}>
              <button onClick={() => setScreen('review')} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text }}>Review</button>
              <button onClick={() => setScreen('stats')}  style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text }}>📊 Stats</button>
              <button onClick={() => setScreen('home')}   style={{ ...S.homeBtn, background: pillSel }}>New Exam</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── REVIEW ────────────────────────────────────────────────────────────────
  if (screen === 'review') {
    return (
      <div style={{ ...S.page, background: bg }}>
        <div style={S.container}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => setScreen('results')} style={{ ...S.backBtn, color: subText }}>← Results</button>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: text }}>Full Review</h2>
          </div>
          {questions.map((q, i) => {
            const ok = answers[i] === q.answer
            return (
              <div key={i} style={{ ...S.reviewCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none', borderLeft: `4px solid ${ok ? '#10b981' : '#ef4444'}` }}>
                <div style={S.qMeta}>
                  <span style={{ ...S.chTag, background: CHAPTER_COLORS[q.chapter] + '22', color: CHAPTER_COLORS[q.chapter] }}>Ch.{q.chapter}</span>
                  {q.topic && <span style={{ ...S.topicTag, background: dk ? '#334155' : '#f1f5f9', color: dk ? '#94a3b8' : '#475569' }}>{q.topic}</span>}
                  <span style={{ fontWeight: 600, fontSize: 12, color: ok ? '#10b981' : '#ef4444' }}>{ok ? '✓ Correct' : '✗ Incorrect'}</span>
                </div>
                <p style={{ margin: '8px 0 10px', fontWeight: 600, color: text, fontSize: 14 }}>{i + 1}. {q.question}</p>
                {q.options.map(opt => {
                  const letter = opt[0], isChosen = answers[i] === letter, isAns = q.answer === letter
                  let st = { ...S.reviewOpt, background: dk ? '#0f172a' : '#f8fafc', border: `1px solid ${border}`, color: subText }
                  if (isAns)         st = { ...st, background: '#d1fae5', border: '1px solid #10b981', color: '#065f46' }
                  else if (isChosen) st = { ...st, background: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b' }
                  return <div key={letter} style={st}>{opt}{isAns ? ' ✓' : ''}</div>
                })}
                <div style={{ ...S.explanation, background: dk ? '#0f172a' : '#f8fafc', border: `1px solid ${border}`, color: subText }}>
                  <strong style={{ color: text }}>Explanation:</strong> {q.explanation}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── STATS & HEATMAP ───────────────────────────────────────────────────────
  if (screen === 'stats') {
    const total   = stats?.totalAnswered || 0
    const byChap  = stats?.byChapter    || {}
    const byTopic = stats?.byTopic      || {}
    const wCount  = Object.keys(wrongBank || {}).length
    const rCount  = Object.keys(rightBank || {}).length
    const fCount  = Object.keys(flagged  || {}).length
    const heatmap = CHAPTER_IDS.map(ch => ({
      ch,
      topics: TOPICS_BY_CHAPTER[ch].map(tp => {
        const d   = byTopic[`${ch}:${tp}`] || { right: 0, wrong: 0 }
        const tot = d.right + d.wrong
        return { tp, tot, right: d.right, wrong: d.wrong, rate: tot > 0 ? d.wrong / tot : null }
      }),
    }))
    const hColor = r => r === null ? (dk ? '#1e293b' : '#f1f5f9') : r === 0 ? '#d1fae5' : r < 0.3 ? '#fef9c3' : r < 0.6 ? '#fed7aa' : '#fee2e2'
    const hText  = r => r === null ? (dk ? '#475569' : '#94a3b8') : r === 0 ? '#065f46' : r < 0.3 ? '#713f12' : r < 0.6 ? '#9a3412' : '#991b1b'
    return (
      <div style={{ ...S.page, background: bg }}>
        <div style={S.container}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: subText }}>← Home</button>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: text }}>📊 Stats & Heatmap</h2>
          </div>

          <div style={S.sumGrid}>
            {[
              { label: 'Total Answered', val: total,                c: text      },
              { label: 'Sessions',       val: stats?.sessions || 0, c: '#6366f1' },
              { label: 'Mastered ✓',    val: rCount,               c: '#10b981' },
              { label: 'Retry Pool ✗',  val: wCount,               c: '#ef4444' },
            ].map(x => (
              <div key={x.label} style={{ ...S.sumCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: x.c }}>{x.val}</div>
                <div style={{ fontSize: 10, color: subText, fontFamily: 'sans-serif', marginTop: 2 }}>{x.label}</div>
              </div>
            ))}
          </div>

          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ ...S.secTitle, color: text, margin: 0 }}>Score Over Time</h3>
              {sessionHistory.length > 0 && <span style={{ fontSize: 11, color: subText, fontFamily: 'monospace' }}>last {sessionHistory.length} session{sessionHistory.length !== 1 ? 's' : ''}</span>}
            </div>
            <SChart />
          </div>

          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <h3 style={{ ...S.secTitle, color: text }}>Questions Answered by Chapter</h3>
            {CHAPTER_IDS.map(ch => {
              const n = byChap[ch] || 0, max = Math.max(...CHAPTER_IDS.map(c => byChap[c] || 0), 1)
              return (
                <div key={ch} style={{ ...S.bRow, marginBottom: 10 }}>
                  <span style={{ color: CHAPTER_COLORS[ch], fontWeight: 700, minWidth: 50, fontSize: 13 }}>Ch.{ch}</span>
                  <div style={{ ...S.barWrap, background: dk ? '#334155' : '#f1f5f9' }}>
                    <div style={{ ...S.bar, width: `${n / max * 100}%`, background: CHAPTER_COLORS[ch] }} />
                  </div>
                  <span style={{ color: subText, fontSize: 12, minWidth: 36, textAlign: 'right', fontFamily: 'monospace' }}>{n}</span>
                </div>
              )
            })}
          </div>

          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <h3 style={{ ...S.secTitle, color: text }}>Chapter & Topic Weakness Heatmap</h3>
            <div style={{ fontSize: 11, color: subText, fontFamily: 'sans-serif', marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[{ bg: '#d1fae5', tc: '#065f46', lbl: '0% miss' }, { bg: '#fef9c3', tc: '#713f12', lbl: '<30%' }, { bg: '#fed7aa', tc: '#9a3412', lbl: '<60%' }, { bg: '#fee2e2', tc: '#991b1b', lbl: '60%+' }, { bg: dk ? '#1e293b' : '#f1f5f9', tc: dk ? '#475569' : '#94a3b8', lbl: 'No data' }].map(x => (
                <span key={x.lbl} style={{ background: x.bg, color: x.tc, padding: '2px 7px', borderRadius: 3, fontSize: 10, fontWeight: 600 }}>{x.lbl}</span>
              ))}
            </div>
            {heatmap.map(({ ch, topics }) => (
              <div key={ch} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: CHAPTER_COLORS[ch] }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: CHAPTER_COLORS[ch] }}>Chapter {ch}</span>
                  <span style={{ fontSize: 11, color: subText, fontFamily: 'sans-serif' }}>{byChap[ch] || 0} answered</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {topics.map(({ tp, tot, right, wrong, rate }) => (
                    <div key={tp} style={{ background: hColor(rate), color: hText(rate), borderRadius: 8, padding: '8px 11px', fontSize: 11, fontFamily: 'sans-serif', fontWeight: rate !== null && rate >= 0.3 ? 700 : 400, minWidth: 90 }}>
                      <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11 }}>{tp}</div>
                      <div style={{ fontSize: 10, opacity: 0.85 }}>{tot > 0 ? `${wrong}✗ / ${right}✓` : '— no data'}</div>
                      {rate !== null && <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>{Math.round(rate * 100)}% miss</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {fCount > 0 && (
            <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
              <h3 style={{ ...S.secTitle, color: text }}>🚩 Flagged Questions ({fCount})</h3>
              <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', marginBottom: 12 }}>Questions you marked as confusing during practice.</p>
              {Object.keys(flagged).map(k => {
                const q = QUESTION_BANK.find(q => qKey(q) === k)
                if (!q) return null
                return (
                  <div key={k} style={{ ...S.reviewCard, background: dk ? '#0f172a' : '#fff', border: `1px solid ${border}`, borderLeft: '4px solid #8b5cf6', padding: '10px 14px', marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 13, color: text }}>{q.question}</p>
                    <div style={{ fontSize: 11, color: subText, marginTop: 4, fontFamily: 'sans-serif' }}>Ch.{q.chapter} · {q.topic}</div>
                  </div>
                )
              })}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => { const qs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean); startRetry(qs) }} style={{ ...S.retryBtn, margin: 0, flex: 1 }}>🔁 Drill Flagged Questions</button>
                <button onClick={() => { setFlagged({}); saveStore('flagged', {}) }} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: subText, flex: 0, padding: '12px 14px', fontSize: 12 }}>Clear All</button>
              </div>
            </div>
          )}

          {wCount > 0 && (
            <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
              <h3 style={{ ...S.secTitle, color: text }}>Retry Pool — {wCount} questions</h3>
              <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', marginBottom: 12 }}>Red border = gotten wrong 2+ times. These are your biggest gaps.</p>
              {Object.values(wrongBank).sort((a, b) => b.wrongCount - a.wrongCount).map((item, i) => (
                <div key={i} style={{ ...S.reviewCard, background: dk ? '#0f172a' : '#fff', border: dk ? `1px solid ${border}` : 'none', borderLeft: `4px solid ${item.wrongCount >= 2 ? '#ef4444' : '#f59e0b'}`, padding: '10px 14px', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 13, color: text, flex: 1 }}>{item.q?.question}</p>
                    <span style={{ background: item.wrongCount >= 2 ? '#fee2e2' : '#fef3c7', color: item.wrongCount >= 2 ? '#991b1b' : '#92400e', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>✗ ×{item.wrongCount}</span>
                  </div>
                  <div style={{ fontSize: 11, color: subText, marginTop: 4, fontFamily: 'sans-serif' }}>Ch.{item.q?.chapter} · {item.q?.topic}</div>
                </div>
              ))}
              <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} style={{ ...S.retryBtn, marginTop: 6 }}>🔁 Start Retry Pool (Shuffled)</button>
            </div>
          )}

          {rCount > 0 && (
            <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
              <h3 style={{ ...S.secTitle, color: text }}>✓ Mastered ({rCount} questions)</h3>
              <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', margin: 0 }}>Re-added to retry pool if you get them wrong again.</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setScreen('home')} style={{ ...S.homeBtn, background: pillSel, flex: 1 }}>← Back to Home</button>
            <button onClick={exportStats} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text, flex: 0, padding: '11px 16px', fontSize: 12, whiteSpace: 'nowrap' }}>⬇ Export JSON</button>
          </div>
        </div>
      </div>
    )
  }

  // ── FLASHCARDS ────────────────────────────────────────────────────────────
  if (screen === 'flashcards') {
    const fcProg   = fcCards.length > 0 ? Math.round((fcIdx + 1) / fcCards.length * 100) : 0
    const isKnown  = fcKnown[fcIdx]
    const curCard  = fcCards[fcIdx]
    const lastSeen = curCard ? fcLastSeen[fcCardKey(curCard)] : null
    const daysSince = lastSeen ? Math.floor((Date.now() - lastSeen) / 86400000) : null

    const goNext = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100) }
    const goPrev = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.max(0, i - 1)), 100) }

    return (
      <div style={{ background: '#0f172a', minHeight: '100vh', padding: '20px 16px 48px', fontFamily: S.page.fontFamily }}>
        <div style={S.container}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: '#94a3b8' }}>← Back</button>
            <div style={{ flex: 1 }}>
              <div style={{ ...S.progTrack, background: '#1e293b' }}>
                <div style={{ ...S.progFill, width: `${fcProg}%`, background: '#6366f1' }} />
              </div>
            </div>
            <span style={{ color: '#64748b', fontSize: 12, fontFamily: 'monospace' }}>{fcIdx + 1}/{fcCards.length}</span>
            <span style={{ color: '#10b981', fontSize: 12, fontFamily: 'monospace' }}>✓ {fcKnownCount}</span>
          </div>

          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
            {[{ id: 'all', lbl: 'All' }, ...CHAPTER_IDS.map(n => ({ id: String(n), lbl: `Ch.${n}` }))].map(c => (
              <button key={c.id} onClick={() => { setFcCh(c.id); setFcIdx(0); setFcFlipped(false); setFcTopic('all') }}
                style={{ ...S.pill, background: fcCh === c.id ? '#6366f1' : '#1e293b', color: fcCh === c.id ? '#fff' : '#94a3b8', border: '1px solid #334155', fontSize: 11, padding: '4px 10px' }}>
                {c.lbl}
              </button>
            ))}
          </div>

          {fcCh !== 'all' && fcTopics.length > 0 && (
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
              <button onClick={() => { setFcTopic('all'); setFcIdx(0); setFcFlipped(false) }}
                style={{ ...S.pill, background: fcTopic === 'all' ? '#334155' : '#1a2332', color: fcTopic === 'all' ? '#e2e8f0' : '#64748b', border: '1px solid #334155', fontSize: 10, padding: '3px 9px' }}>
                All Topics
              </button>
              {fcTopics.map(t => (
                <button key={t} onClick={() => { setFcTopic(t); setFcIdx(0); setFcFlipped(false) }}
                  style={{ ...S.pill, background: fcTopic === t ? '#334155' : '#1a2332', color: fcTopic === t ? '#e2e8f0' : '#64748b', border: '1px solid #334155', fontSize: 10, padding: '3px 9px' }}>
                  {t}
                </button>
              ))}
            </div>
          )}

          {fcCard && (
            <div onClick={() => setFcFlipped(f => !f)} style={{ ...S.fcCard, borderColor: isKnown === true ? '#10b981' : isKnown === false ? '#ef4444' : '#334155' }}>
              <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#475569' }}>{fcFlipped ? 'ANSWER' : 'QUESTION'} · tap or Space</span>
                {daysSince !== null ? (
                  <span style={{ fontSize: 9, fontFamily: 'monospace', padding: '1px 6px', borderRadius: 3, background: '#0f172a', color: daysSince === 0 ? '#10b981' : daysSince <= 2 ? '#f59e0b' : '#ef4444' }}>
                    {daysSince === 0 ? 'seen today' : `${daysSince}d ago`}
                  </span>
                ) : (
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#6366f1', background: '#1a1a3e', padding: '1px 6px', borderRadius: 3 }}>new</span>
                )}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 4, fontFamily: 'monospace', background: CHAPTER_COLORS[fcCard.ch] + '33', color: CHAPTER_COLORS[fcCard.ch] }}>
                Ch.{fcCard.ch} · {fcCard.topic}
              </div>
              <p style={{ fontSize: fcFlipped ? 14 : 17, fontWeight: fcFlipped ? 400 : 600, color: '#f1f5f9', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line', textAlign: 'center' }}>
                {fcFlipped ? fcCard.back : fcCard.front}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button onClick={() => doMarkCard(false)} style={S.fcNo}>✗ Still Learning (X)</button>
            <button onClick={() => doMarkCard(true)}  style={S.fcYes}>✓ Got It (G)</button>
          </div>

          <div style={S.navRow}>
            <button onClick={goPrev} disabled={fcIdx === 0} style={{ ...S.navBtn, opacity: fcIdx === 0 ? 0.3 : 1, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}>← Prev</button>
            <button onClick={goNext} disabled={fcIdx === fcCards.length - 1} style={{ ...S.navBtn, opacity: fcIdx === fcCards.length - 1 ? 0.3 : 1, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}>Next →</button>
          </div>

          <div style={{ textAlign: 'center', fontSize: 10, color: '#475569', fontFamily: 'monospace', marginTop: 8 }}>
            ← → navigate · Space flip · G got it · X still learning
          </div>

          {fcIdx === fcCards.length - 1 && (
            <div style={{ textAlign: 'center', marginTop: 16, color: '#64748b', fontFamily: 'sans-serif', fontSize: 13 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{fcKnownCount === fcCards.length ? '🎉' : '📚'}</div>
              <div>{fcKnownCount}/{fcCards.length} marked as known</div>
              <button onClick={() => { setFcIdx(0); setFcFlipped(false); setFcKnown({}) }}
                style={{ ...S.homeBtn, width: 'auto', marginTop: 10, padding: '10px 24px', background: '#6366f1' }}>
                Restart Deck
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
