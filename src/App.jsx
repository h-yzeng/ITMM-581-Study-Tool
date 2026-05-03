import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { FLASHCARDS }        from './data/flashcards.js'
import { QUESTION_BANK }     from './data/questionBank.js'
import { TOPICS_BY_CHAPTER } from './data/chapters.js'
import { loadStore, saveStore, qKey } from './hooks/useStorage.js'
import { pullQuestions, fcCardKey }   from './utils/quiz.js'
import { HomeScreen }       from './screens/HomeScreen.jsx'
import { QuizScreen }       from './screens/QuizScreen.jsx'
import { ResultsScreen }    from './screens/ResultsScreen.jsx'
import { ReviewScreen }     from './screens/ReviewScreen.jsx'
import { StatsScreen }      from './screens/StatsScreen.jsx'
import { FlashcardsScreen } from './screens/FlashcardsScreen.jsx'

export default function App() {
  // ── State ─────────────────────────────────────────────────────────────────
  const [screen, setScreen]         = useState('home')
  const [mode, setMode]             = useState('practice')
  const [selChapter, setSelChapter] = useState('all')
  const [selDiff, setSelDiff]       = useState('all')
  const [qCount, setQCount]         = useState(10)
  const [qType, setQType]           = useState('mcq')
  const [selTopics, setSelTopics]   = useState([])

  const [questions, setQuestions]   = useState([])
  const [curIdx, setCurIdx]         = useState(0)
  const [answers, setAnswers]       = useState({})
  const [revealed, setRevealed]     = useState({})
  const [score, setScore]           = useState(null)

  const [timeLeft, setTimeLeft]     = useState(null)
  const timerRef                    = useRef(null)
  const finishQuizRef               = useRef(null)

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
  const [fcWeakOnly, setFcWeakOnly]   = useState(false)
  const [fcShuffle, setFcShuffle]     = useState(false)
  const [fcDiff, setFcDiff]           = useState('all')
  const [fcDailyOnly, setFcDailyOnly] = useState(false)

  // ── Flashcard derived state (memoized) ────────────────────────────────────
  const fcCardsBase = useMemo(() => FLASHCARDS.filter(c => {
    if (fcCh !== 'all' && c.ch !== parseInt(fcCh)) return false
    if (fcTopic !== 'all' && c.topic !== fcTopic) return false
    if (fcDiff !== 'all' && c.diff && c.diff !== fcDiff) return false
    return true
  }), [fcCh, fcTopic, fcDiff])

  const fcKnownVal = k => {
    const v = fcKnown[k]
    if (v === undefined || v === null) return undefined
    if (typeof v === 'boolean') return v
    return v.known
  }

  const fcCardsRaw = useMemo(() => {
    let base = fcCardsBase
    if (fcWeakOnly)   base = base.filter(c => fcKnownVal(fcCardKey(c)) === false)
    if (fcDailyOnly)  base = base.filter(c => {
      const v = fcKnown[fcCardKey(c)]
      if (!v) return true // new card = always due
      const nextReview = typeof v === 'object' ? v?.nextReview : null
      return !nextReview || nextReview <= Date.now()
    })
    return base
  }, [fcCardsBase, fcWeakOnly, fcDailyOnly, fcKnown])

  const fcCardsSorted = useMemo(() => [...fcCardsRaw].sort((a, b) => {
    const ka = fcCardKey(a), kb = fcCardKey(b)
    const va = fcKnown[ka], vb = fcKnown[kb]
    // Cards with nextReview sort by how overdue they are (ascending = most overdue first)
    const ra = (typeof va === 'object' ? va?.nextReview : null) || (fcLastSeen[ka] || 0)
    const rb = (typeof vb === 'object' ? vb?.nextReview : null) || (fcLastSeen[kb] || 0)
    if (!ra && rb) return -1
    if (ra && !rb) return 1
    return ra - rb
  }), [fcCardsRaw, fcLastSeen, fcKnown])

  const fcCardsShuffled = useMemo(() => [...fcCardsRaw].sort(() => Math.random() - 0.5), [fcCardsRaw])

  const fcCards = fcShuffle ? fcCardsShuffled : fcCardsSorted

  const fcCard       = fcCards[fcIdx] || fcCards[0]
  const fcTopics     = useMemo(() => fcCh !== 'all' ? (TOPICS_BY_CHAPTER[parseInt(fcCh)] || []) : [], [fcCh])
  const fcKnownCount = useMemo(() => Object.entries(fcKnown).filter(([, v]) => {
    if (typeof v === 'boolean') return v
    return v?.known === true
  }).length, [fcKnown])

  const doMarkCard = useCallback(v => {
    const card = fcCards[fcIdx]
    if (card) {
      const key = fcCardKey(card)
      setFcKnown(p => {
        const prev = p[key]
        // SRS: double the interval on "got it", reset to 1 day on "still learning"
        const prevInterval = (typeof prev === 'object' ? prev?.interval : null) || 1
        const interval = v ? Math.min(prevInterval * 2, 60) : 1
        const nextReview = Date.now() + interval * 86400000
        const n = { ...p, [key]: { known: v, interval, nextReview } }
        saveStore('fcKnown', n)
        return n
      })
      setFcLastSeen(p => {
        const n = { ...p, [key]: Date.now() }
        saveStore('fcLastSeen', n)
        return n
      })
    }
    if (fcIdx < fcCards.length - 1) {
      setFcFlipped(false)
      setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100)
    }
  }, [fcIdx, fcCards])

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const defaultStats = { totalAnswered: 0, byChapter: { 8: 0, 9: 0, 10: 0, 12: 0 }, byTopic: {}, sessions: 0 }
    setStats(loadStore('stats', defaultStats))
    setWrongBank(loadStore('wrongBank', {}))
    setRightBank(loadStore('rightBank', {}))
    setFlagged(loadStore('flagged', {}))
    setDarkMode(loadStore('darkMode', false))
    setSessionHistory(loadStore('sessionHistory', []))
    setFcLastSeen(loadStore('fcLastSeen', {}))
    setFcKnown(loadStore('fcKnown', {}))
  }, [])

  const toggleDark = useCallback(() => setDarkMode(d => { saveStore('darkMode', !d); return !d }), [])

  // Sync body background to match dark mode - prevents white border from browser body margin
  useEffect(() => {
    document.body.style.background = darkMode ? '#0f172a' : '#f1f5f9'
  }, [darkMode])

  // Exam timer - ref pattern keeps finishQuiz fresh without adding it to deps
  useEffect(() => {
    if (screen === 'quiz' && mode === 'exam' && timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      return () => clearTimeout(timerRef.current)
    }
    if (screen === 'quiz' && mode === 'exam' && timeLeft === 0) finishQuizRef.current?.()
  }, [screen, mode, timeLeft])

  // Quiz keyboard shortcuts
  useEffect(() => {
    if (screen !== 'quiz') return
    const handler = e => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const letter = e.key.toUpperCase()
        if (!revealed[curIdx]) setAnswers(p => ({ ...p, [curIdx]: letter }))
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (mode !== 'exam' && answers[curIdx] && !revealed[curIdx])
          setRevealed(r => ({ ...r, [curIdx]: true }))
        else if (mode !== 'exam' && revealed[curIdx] && e.key === 'Enter')
          setCurIdx(i => Math.min(questions.length - 1, i + 1))
      } else if (e.key === 'ArrowRight') {
        setCurIdx(i => Math.min(questions.length - 1, i + 1))
      } else if (e.key === 'ArrowLeft') {
        setCurIdx(i => Math.max(0, i - 1))
      } else if (e.key === 'f' || e.key === 'F') {
        const q = questions[curIdx]
        if (q) toggleFlag(q)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen, curIdx, mode, questions, revealed, answers])

  // Flashcard keyboard shortcuts
  useEffect(() => {
    if (screen !== 'flashcards') return
    const handler = e => {
      if (e.key === ' ')          { e.preventDefault(); setFcFlipped(f => !f) }
      else if (e.key === 'ArrowRight') { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100) }
      else if (e.key === 'ArrowLeft')  { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.max(0, i - 1)), 100) }
      else if (e.key === 'g' || e.key === 'G') doMarkCard(true)
      else if (e.key === 'x' || e.key === 'X') doMarkCard(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [screen, fcIdx, fcCards.length, doMarkCard])

  // ── Callbacks ─────────────────────────────────────────────────────────────
  const weakQs = useMemo(() => {
    if (!stats?.byTopic) return []
    const weakTopics = new Set()
    Object.entries(stats.byTopic).forEach(([key, d]) => {
      const tot = d.right + d.wrong
      if (tot >= 3 && d.wrong / tot >= 0.5) weakTopics.add(key.split(':').slice(1).join(':'))
    })
    return [...QUESTION_BANK].filter(q => weakTopics.has(q.topic)).sort(() => Math.random() - 0.5).slice(0, 20)
  }, [stats])

  const toggleFlag = useCallback(q => {
    const k = qKey(q)
    setFlagged(p => { const n = { ...p }; n[k] ? delete n[k] : (n[k] = true); saveStore('flagged', n); return n })
  }, [])

  const startWeakDrill = useCallback(() => {
    if (!weakQs.length) return
    setQuestions(weakQs); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null); setTimeLeft(null)
    setScreen('quiz')
  }, [weakQs])

  const startSession = useCallback(() => {
    if (mode === 'flashcards') {
      setFcIdx(0); setFcFlipped(false)
      setFcCh(selChapter); setFcTopic('all')
      setFcWeakOnly(false); setFcShuffle(false)
      setScreen('flashcards'); return
    }
    if (mode === 'cram') {
      // Cram: all questions matching filters, shuffled, no timer
      let pool = [...QUESTION_BANK]
      if (selChapter !== 'all') pool = pool.filter(q => String(q.chapter) === selChapter)
      if (qType === 'mcq')      pool = pool.filter(q => q.type === 'mcq')
      if (qType === 'tf')       pool = pool.filter(q => q.type === 'tf')
      if (selDiff !== 'all')    pool = pool.filter(q => q.difficulty === selDiff)
      if (selTopics.length > 0) pool = pool.filter(q => selTopics.includes(q.topic))
      pool.sort(() => Math.random() - 0.5)
      setQuestions(pool); setAnswers({}); setRevealed({})
      setCurIdx(0); setScore(null); setTimeLeft(null)
      setScreen('quiz'); return
    }
    const qs = pullQuestions(qCount, selChapter, qType, selDiff, selTopics)
    setQuestions(qs); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null)
    if (mode === 'exam') setTimeLeft(qCount * 60)
    setScreen('quiz')
  }, [mode, selChapter, qType, selDiff, qCount, selTopics])

  const startRetry = useCallback(qs => {
    const shuffled = [...qs].sort(() => Math.random() - 0.5)
    setQuestions(shuffled); setAnswers({}); setRevealed({})
    setCurIdx(0); setScore(null); setScreen('quiz')
  }, [])

  const selectAnswer = useCallback((idx, letter) => {
    if (!revealed[idx]) setAnswers(p => ({ ...p, [idx]: letter }))
  }, [revealed])

  const revealAnswer = useCallback(idx => {
    if (answers[idx]) setRevealed(p => ({ ...p, [idx]: true }))
  }, [answers])

  // Keep ref current every render so the timer effect always calls the latest version
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
  finishQuizRef.current = finishQuiz

  const resetStats = useCallback(() => {
    const defaultStats = { totalAnswered: 0, byChapter: { 8: 0, 9: 0, 10: 0, 12: 0 }, byTopic: {}, sessions: 0 }
    setStats(defaultStats); setWrongBank({}); setRightBank({})
    setFlagged({}); setSessionHistory([])
    saveStore('stats', defaultStats); saveStore('wrongBank', {}); saveStore('rightBank', {})
    saveStore('flagged', {}); saveStore('sessionHistory', [])
  }, [])

  const exportStats = useCallback(() => {
    const data = { stats, wrongBank, rightBank, flagged, sessionHistory, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `study-stats-${new Date().toISOString().slice(0, 10)}.json`
    a.click(); URL.revokeObjectURL(url)
  }, [stats, wrongBank, rightBank, flagged, sessionHistory])

  // ── Theme (memoized - only recomputes when darkMode flips) ───────────────────
  const theme = useMemo(() => {
    const dk      = darkMode
    const bg      = dk ? '#0f172a' : '#f1f5f9'
    const cardBg  = dk ? '#1e293b' : '#fff'
    const text    = dk ? '#e2e8f0' : '#1e293b'
    const subText = dk ? '#94a3b8' : '#64748b'
    const border  = dk ? '#334155' : '#e2e8f0'
    const pillSel = dk ? '#4f46e5' : '#1e293b'
    return { dk, bg, cardBg, text, subText, border, pillSel }
  }, [darkMode])

  const answeredAll = questions.length > 0 && Object.keys(answers).length === questions.length
  const prog        = questions.length ? Math.round(Object.keys(answers).length / questions.length * 100) : 0
  const common      = { theme, toggleDark }

  // ── Routing ────────────────────────────────────────────────────────────────
  if (screen === 'home') return (
    <HomeScreen {...common}
      stats={stats} wrongBank={wrongBank} flagged={flagged} weakQs={weakQs} sessionHistory={sessionHistory}
      mode={mode} setMode={setMode}
      selChapter={selChapter} setSelChapter={setSelChapter}
      qType={qType} setQType={setQType}
      selDiff={selDiff} setSelDiff={setSelDiff}
      qCount={qCount} setQCount={setQCount}
      selTopics={selTopics} setSelTopics={setSelTopics}
      startSession={startSession} startWeakDrill={startWeakDrill} startRetry={startRetry}
      setScreen={setScreen}
    />
  )

  if (screen === 'quiz') return (
    <QuizScreen {...common}
      questions={questions} curIdx={curIdx} setCurIdx={setCurIdx}
      answers={answers} revealed={revealed}
      mode={mode} timeLeft={timeLeft}
      flagged={flagged}
      selectAnswer={selectAnswer} revealAnswer={revealAnswer}
      finishQuiz={finishQuiz} toggleFlag={toggleFlag}
      answeredAll={answeredAll} prog={prog}
      setScreen={setScreen}
    />
  )

  if (screen === 'results') return (
    <ResultsScreen {...common}
      questions={questions} answers={answers} score={score}
      startRetry={startRetry} setScreen={setScreen}
    />
  )

  if (screen === 'review') return (
    <ReviewScreen {...common}
      questions={questions} answers={answers}
      setScreen={setScreen}
    />
  )

  if (screen === 'stats') return (
    <StatsScreen {...common}
      stats={stats} wrongBank={wrongBank} rightBank={rightBank}
      flagged={flagged} sessionHistory={sessionHistory}
      setFlagged={setFlagged} startRetry={startRetry}
      setScreen={setScreen} exportStats={exportStats} resetStats={resetStats}
    />
  )

  if (screen === 'flashcards') return (
    <FlashcardsScreen {...common}
      fcCards={fcCards} fcIdx={fcIdx} setFcIdx={setFcIdx}
      fcFlipped={fcFlipped} setFcFlipped={setFcFlipped}
      fcCh={fcCh} setFcCh={setFcCh}
      fcTopic={fcTopic} setFcTopic={setFcTopic}
      fcKnown={fcKnown} setFcKnown={setFcKnown} fcKnownCount={fcKnownCount}
      fcLastSeen={fcLastSeen} fcCard={fcCard} fcTopics={fcTopics}
      fcWeakOnly={fcWeakOnly} setFcWeakOnly={setFcWeakOnly}
      fcShuffle={fcShuffle} setFcShuffle={setFcShuffle}
      fcDiff={fcDiff} setFcDiff={setFcDiff}
      fcDailyOnly={fcDailyOnly} setFcDailyOnly={setFcDailyOnly}
      doMarkCard={doMarkCard} setScreen={setScreen}
    />
  )
}
