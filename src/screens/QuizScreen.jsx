import { CHAPTER_COLORS, DIFF_COLORS } from '../data/chapters.js'
import { qKey } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconFlag } from '../components/Icons.jsx'

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export function QuizScreen({
  theme, toggleDark,
  questions, curIdx, setCurIdx,
  answers, revealed, mode, timeLeft,
  flagged, selectAnswer, revealAnswer, finishQuiz, toggleFlag,
  answeredAll, prog, setScreen,
}) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme
  const q         = questions[curIdx]
  const isExam    = mode === 'exam'
  const isRev     = revealed[curIdx]
  const chosen    = answers[curIdx]
  const tw        = timeLeft !== null && timeLeft < 120
  const isFlagged = q && flagged[qKey(q)]

  const announcement = !isExam && isRev
    ? answers[curIdx] === q?.answer ? 'Correct!' : 'Incorrect.'
    : ''

  return (
    <div style={{ ...S.page, background: bg }}>
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>{announcement}</div>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={S.topBar}>
          <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: subText }}>&larr; Back</button>
          <div style={S.progWrap}>
            <div style={{ ...S.progTrack, background: dk ? '#334155' : '#e2e8f0' }}>
              <div style={{ ...S.progFill, width: `${prog}%` }} />
            </div>
            <span style={{ ...S.progText, color: subText }}>{Object.keys(answers).length}/{questions.length}</span>
          </div>
          {isExam && timeLeft !== null && (
            <div style={{ ...S.timerBadge, background: tw ? '#ef4444' : (dk ? '#334155' : '#1e293b') }}>{fmt(timeLeft)}</div>
          )}
          <button onClick={finishQuiz} disabled={!answeredAll} style={{ ...S.finishBtn, opacity: answeredAll ? 1 : 0.4 }}>
            {isExam ? 'Submit' : 'Finish'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 6, fontSize: 10, fontFamily: 'monospace', color: subText }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: dk ? '#334155' : '#e2e8f0', display: 'inline-block' }} /> Unanswered</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#6366f1', display: 'inline-block' }} /> Answered</span>
          {!isExam && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#10b981', display: 'inline-block' }} /> Correct</span>}
          {!isExam && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#ef4444', display: 'inline-block' }} /> Wrong</span>}
        </div>
        <div role="group" aria-label="Question navigation" style={{ ...S.qNav, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 4, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}>
          {questions.map((_, i) => {
            let dotLabel = `Question ${i + 1}`
            if (i === curIdx) dotLabel += ', current'
            if (answers[i]) dotLabel += ', answered'
            if (!isExam && revealed[i]) dotLabel += answers[i] === questions[i].answer ? ', correct' : ', incorrect'
            return (
              <button key={i} onClick={() => setCurIdx(i)}
                aria-label={dotLabel}
                aria-current={i === curIdx ? 'step' : undefined}
                style={{
                  ...S.qDot, flexShrink: 0,
                  background: i === curIdx ? (dk ? '#6366f1' : '#1e293b') : !isExam && revealed[i] ? (answers[i] === questions[i].answer ? '#10b981' : '#ef4444') : answers[i] ? '#6366f1' : (dk ? '#334155' : '#e2e8f0'),
                  color: (i === curIdx || answers[i]) ? '#fff' : (dk ? '#64748b' : '#94a3b8'),
                }}>{i + 1}</button>
            )
          })}
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
            <button
              onClick={() => toggleFlag(q)}
              title="Flag as confusing (F key)"
              style={{ flexShrink: 0, background: isFlagged ? '#ede9fe' : 'none', border: `1px solid ${isFlagged ? '#8b5cf6' : border}`, borderRadius: 6, padding: '5px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: 8 }}
            >
              <IconFlag size={14} filled={isFlagged} color={isFlagged ? '#7c3aed' : subText} />
            </button>
          </div>

          <p id="question-text" style={{ ...S.qText, color: text }}>{q.question}</p>

          <div role="radiogroup" aria-labelledby="question-text" style={{ ...S.options, ...(q.type === 'tf' ? { flexDirection: 'row', gap: 12 } : {}) }}>
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
                  role="radio" aria-checked={isChosen}
                  style={{ ...S.optBtn, ...(isTF ? { flex: 1, justifyContent: 'center', fontSize: 15, fontWeight: 700, padding: '16px 0' } : {}), background: bg2, border: `1.5px solid ${bdr}`, color: col }}>
                  {!isTF && <span style={S.optLetter}>{letter}</span>}
                  <span>{opt.slice(3)}</span>
                  {!isExam && isRev && isCorrect           && <span style={{ ...S.checkmark, fontSize: 11 }}>&#10003; Correct</span>}
                  {!isExam && isRev && isChosen && !isCorrect && <span style={{ ...S.cross, fontSize: 11 }}>&#10007; Wrong</span>}
                </button>
              )
            })}
          </div>

          {!isExam && chosen && !isRev && (
            <button onClick={() => revealAnswer(curIdx)} style={{ ...S.revealBtn, background: pillSel }}>Check Answer</button>
          )}
          {!isExam && isRev && (
            <>
              <div style={{ ...S.explanation, background: dk ? '#0f172a' : '#f8fafc', border: `1px solid ${border}`, color: subText }}>
                <strong style={{ color: text }}>Explanation:</strong> {q.explanation}
              </div>
              {curIdx < questions.length - 1 && (
                <button
                  onClick={() => setCurIdx(i => i + 1)}
                  style={{ ...S.revealBtn, background: '#10b981', marginTop: 10 }}
                >
                  Next Question &rarr;
                </button>
              )}
              {curIdx === questions.length - 1 && (
                <button
                  onClick={finishQuiz}
                  style={{ ...S.revealBtn, background: '#10b981', marginTop: 10 }}
                >
                  {answeredAll ? 'Finish Quiz ✓' : 'Finish Quiz'}
                </button>
              )}
            </>
          )}
        </div>

        <div style={{ ...S.navRow, marginBottom: 6 }}>
          <button onClick={() => setCurIdx(Math.max(0, curIdx - 1))} disabled={curIdx === 0} style={{ ...S.navBtn, background: cardBg, border: `1.5px solid ${border}`, color: text, opacity: curIdx === 0 ? 0.3 : 1 }}>&larr; Prev</button>
          <button onClick={() => setCurIdx(Math.min(questions.length - 1, curIdx + 1))} disabled={curIdx === questions.length - 1} style={{ ...S.navBtn, background: cardBg, border: `1.5px solid ${border}`, color: text, opacity: curIdx === questions.length - 1 ? 0.3 : 1 }}>Next &rarr;</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: subText, fontFamily: 'monospace', paddingBottom: 4, lineHeight: 1.6 }}>
          &larr; &rarr; navigate &middot; A/B/C/D select &middot; Space reveal &middot; Enter next &middot; F flag
        </div>

      </div>
    </div>
  )
}
