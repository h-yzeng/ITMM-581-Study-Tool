import { CHAPTER_IDS, CHAPTER_COLORS, TOPICS_BY_CHAPTER } from '../data/chapters.js'
import { QUESTION_BANK } from '../data/questionBank.js'
import { qKey, saveStore } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { SChart } from '../components/SChart.jsx'
import { IconBarChart, IconFlag, IconRepeat } from '../components/Icons.jsx'

export function StatsScreen({
  theme, toggleDark,
  stats, wrongBank, rightBank, flagged, sessionHistory,
  setFlagged, startRetry, setScreen, exportStats,
}) {
  const { dk, bg, cardBg, text, subText, border, pillSel } = theme

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
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: subText }}>&larr; Home</button>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: text, display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconBarChart size={20} /> Stats &amp; Heatmap
          </h2>
        </div>

        <div style={S.sumGrid}>
          {[
            { label: 'Total Answered', val: total,                c: text      },
            { label: 'Sessions',       val: stats?.sessions || 0, c: '#6366f1' },
            { label: 'Mastered',       val: rCount,               c: '#10b981' },
            { label: 'Retry Pool',     val: wCount,               c: '#ef4444' },
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
          <SChart sessionHistory={sessionHistory} dk={dk} cardBg={cardBg} subText={subText} />
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
          <h3 style={{ ...S.secTitle, color: text }}>Chapter &amp; Topic Weakness Heatmap</h3>
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
                {topics.map(({ tp, tot, right, wrong, rate }) => {
                  const topicQs = QUESTION_BANK.filter(q => q.chapter === ch && q.topic === tp)
                  return (
                    <button
                      key={tp}
                      onClick={() => topicQs.length > 0 && startRetry(topicQs)}
                      title={topicQs.length > 0 ? `Drill ${tp} — ${topicQs.length} questions` : 'No questions for this topic'}
                      style={{ background: hColor(rate), color: hText(rate), borderRadius: 8, padding: '8px 11px', fontSize: 11, fontFamily: 'sans-serif', fontWeight: rate !== null && rate >= 0.3 ? 700 : 400, minWidth: 90, border: 'none', cursor: topicQs.length > 0 ? 'pointer' : 'default', textAlign: 'left', transition: 'opacity 0.15s', opacity: 1 }}
                      onMouseEnter={e => { if (topicQs.length > 0) e.currentTarget.style.opacity = '0.8' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11 }}>{tp}</div>
                      <div style={{ fontSize: 10, opacity: 0.85 }}>{tot > 0 ? `${wrong}✗ / ${right}✓` : '— no data'}</div>
                      {rate !== null && <div style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>{Math.round(rate * 100)}% miss</div>}
                      {topicQs.length > 0 && <div style={{ fontSize: 9, marginTop: 4, opacity: 0.7 }}>&#9654; Drill {topicQs.length}q</div>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {fCount > 0 && (
          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <h3 style={{ ...S.secTitle, color: text, display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconFlag size={16} filled color="#8b5cf6" /> Flagged Questions ({fCount})
            </h3>
            <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', marginBottom: 12 }}>Questions you marked as confusing during practice.</p>
            {Object.keys(flagged).map(k => {
              const q = QUESTION_BANK.find(q => qKey(q) === k)
              if (!q) return null
              return (
                <div key={k} style={{ ...S.reviewCard, background: dk ? '#0f172a' : '#fff', border: `1px solid ${border}`, borderLeft: '4px solid #8b5cf6', padding: '10px 14px', marginBottom: 8 }}>
                  <p style={{ margin: 0, fontSize: 13, color: text }}>{q.question}</p>
                  <div style={{ fontSize: 11, color: subText, marginTop: 4, fontFamily: 'sans-serif' }}>Ch.{q.chapter} &middot; {q.topic}</div>
                </div>
              )
            })}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button onClick={() => { const qs = Object.keys(flagged).map(k => QUESTION_BANK.find(q => qKey(q) === k)).filter(Boolean); startRetry(qs) }} style={{ ...S.retryBtn, margin: 0, flex: 1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><IconRepeat size={14} /> Drill Flagged Questions</span>
              </button>
              <button onClick={() => { setFlagged({}); saveStore('flagged', {}) }} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: subText, flex: 0, padding: '12px 14px', fontSize: 12 }}>Clear All</button>
            </div>
          </div>
        )}

        {wCount > 0 && (
          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <h3 style={{ ...S.secTitle, color: text }}>Retry Pool &mdash; {wCount} questions</h3>
            <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', marginBottom: 12 }}>Red border = gotten wrong 2+ times. These are your biggest gaps.</p>
            {Object.values(wrongBank).sort((a, b) => b.wrongCount - a.wrongCount).map((item, i) => (
              <div key={i} style={{ ...S.reviewCard, background: dk ? '#0f172a' : '#fff', border: dk ? `1px solid ${border}` : 'none', borderLeft: `4px solid ${item.wrongCount >= 2 ? '#ef4444' : '#f59e0b'}`, padding: '10px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 13, color: text, flex: 1 }}>{item.q?.question}</p>
                  <span style={{ background: item.wrongCount >= 2 ? '#fee2e2' : '#fef3c7', color: item.wrongCount >= 2 ? '#991b1b' : '#92400e', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>&#10007; &times;{item.wrongCount}</span>
                </div>
                <div style={{ fontSize: 11, color: subText, marginTop: 4, fontFamily: 'sans-serif' }}>Ch.{item.q?.chapter} &middot; {item.q?.topic}</div>
              </div>
            ))}
            <button onClick={() => startRetry(Object.values(wrongBank).map(x => x.q))} style={{ ...S.retryBtn, marginTop: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><IconRepeat size={14} /> Start Retry Pool (Shuffled)</span>
            </button>
          </div>
        )}

        {rCount > 0 && (
          <div style={{ ...S.secCard, background: cardBg, border: dk ? `1px solid ${border}` : 'none' }}>
            <h3 style={{ ...S.secTitle, color: text }}>Mastered ({rCount} questions)</h3>
            <p style={{ fontSize: 12, color: subText, fontFamily: 'sans-serif', margin: 0 }}>Re-added to retry pool if you get them wrong again.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setScreen('home')} style={{ ...S.homeBtn, background: pillSel, flex: 1 }}>&larr; Back to Home</button>
          <button onClick={exportStats} style={{ ...S.revBtn, background: dk ? '#334155' : '#f1f5f9', color: text, flex: 0, padding: '11px 16px', fontSize: 12, whiteSpace: 'nowrap' }}>Export JSON</button>
        </div>

      </div>
    </div>
  )
}
