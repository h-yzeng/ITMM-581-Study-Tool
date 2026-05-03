import { CHAPTER_IDS, CHAPTER_COLORS } from '../data/chapters.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconRepeat, IconBarChart } from '../components/Icons.jsx'

export function ResultsScreen({ theme, toggleDark, questions, answers, score, startRetry, setScreen }) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme

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
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
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

          {wrongQs.length > 0 ? (
            <button onClick={() => startRetry(wrongQs)} style={S.retryBtn}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <IconRepeat size={14} /> Retry {wrongQs.length} Wrong (Shuffled)
              </span>
            </button>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 14, color: '#10b981', fontWeight: 700 }}>Perfect score!</div>
          )}

          <div style={S.resBtns}>
            <button onClick={() => setScreen('review')} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text }}>Review</button>
            <button onClick={() => setScreen('stats')}  style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <IconBarChart size={14} /> Stats
            </button>
            <button onClick={() => setScreen('home')} style={{ ...S.homeBtn, background: pillSel }}>New Exam</button>
          </div>
        </div>
      </div>
    </div>
  )
}
