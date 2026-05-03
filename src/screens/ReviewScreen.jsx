import { CHAPTER_COLORS } from '../data/chapters.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'

export function ReviewScreen({ theme, toggleDark, questions, answers, setScreen }) {
  const { dk, bg, cardBg, text, subText, border } = theme

  return (
    <div style={{ ...S.page, background: bg }}>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => setScreen('results')} style={{ ...S.backBtn, color: subText }}>&larr; Results</button>
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
