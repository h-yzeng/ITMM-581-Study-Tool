import { CHAPTER_COLORS, DIFF_COLORS } from '../data/chapters.js'
import { qKey } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function QuizScreen({
  theme, toggleDark,
  questions, curIdx, setCurIdx,
  answers, revealed, mode, timeLeft,
  flagged, selectAnswer, revealAnswer, finishQuiz, toggleFlag,
  answeredAll, prog, setScreen,
}) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme
  const q        = questions[curIdx]
  const isExam   = mode === 'exam'
  const isRev    = revealed[curIdx]
  const chosen   = answers[curIdx]
  const tw       = timeLeft !== null && timeLeft < 120
  const isFlagged = q && flagged[qKey(q)]

  return (
    <div style={{ ...S.page, background: bg }}>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={S.topBar}>
          <button onClick={() => { setScreen('home') }} style={{ ...S.backBtn, color: subText }}>← Back</button>
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
