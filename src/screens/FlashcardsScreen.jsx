import { CHAPTER_IDS, CHAPTER_COLORS } from '../data/chapters.js'
import { fcCardKey } from '../utils/quiz.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconStar, IconBook } from '../components/Icons.jsx'

export function FlashcardsScreen({
  theme, toggleDark,
  fcCards, fcIdx, setFcIdx, fcFlipped, setFcFlipped,
  fcCh, setFcCh, fcTopic, setFcTopic,
  fcKnown, fcKnownCount, fcLastSeen, fcCard, fcTopics,
  doMarkCard, setScreen,
}) {
  const { dk, border, cardBg } = theme
  const fcProg    = fcCards.length > 0 ? Math.round((fcIdx + 1) / fcCards.length * 100) : 0
  const isKnown   = fcKnown[fcIdx]
  const lastSeen  = fcCard ? fcLastSeen[fcCardKey(fcCard)] : null
  const daysSince = lastSeen ? Math.floor((Date.now() - lastSeen) / 86400000) : null

  const goNext = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100) }
  const goPrev = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.max(0, i - 1)), 100) }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', padding: '28px 20px 16px', fontFamily: S.page.fontFamily }}>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: '#94a3b8' }}>&larr; Back</button>
          <div style={{ flex: 1 }}>
            <div style={{ ...S.progTrack, background: '#1e293b' }}>
              <div style={{ ...S.progFill, width: `${fcProg}%`, background: '#6366f1' }} />
            </div>
          </div>
          <span style={{ color: '#64748b', fontSize: 12, fontFamily: 'monospace' }}>{fcIdx + 1}/{fcCards.length}</span>
          <span style={{ color: '#10b981', fontSize: 12, fontFamily: 'monospace' }}>&#10003; {fcKnownCount}</span>
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
              <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#475569' }}>{fcFlipped ? 'ANSWER' : 'QUESTION'} &middot; tap or Space</span>
              {daysSince !== null ? (
                <span style={{ fontSize: 9, fontFamily: 'monospace', padding: '1px 6px', borderRadius: 3, background: '#0f172a', color: daysSince === 0 ? '#10b981' : daysSince <= 2 ? '#f59e0b' : '#ef4444' }}>
                  {daysSince === 0 ? 'seen today' : `${daysSince}d ago`}
                </span>
              ) : (
                <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#6366f1', background: '#1a1a3e', padding: '1px 6px', borderRadius: 3 }}>new</span>
              )}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 4, fontFamily: 'monospace', background: CHAPTER_COLORS[fcCard.ch] + '33', color: CHAPTER_COLORS[fcCard.ch] }}>
              Ch.{fcCard.ch} &middot; {fcCard.topic}
            </div>
            <p style={{ fontSize: fcFlipped ? 14 : 17, fontWeight: fcFlipped ? 400 : 600, color: '#f1f5f9', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line', textAlign: 'center' }}>
              {fcFlipped ? fcCard.back : fcCard.front}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <button onClick={() => doMarkCard(false)} style={S.fcNo}>&#10007; Still Learning (X)</button>
          <button onClick={() => doMarkCard(true)}  style={S.fcYes}>&#10003; Got It (G)</button>
        </div>

        <div style={S.navRow}>
          <button onClick={goPrev} disabled={fcIdx === 0} style={{ ...S.navBtn, opacity: fcIdx === 0 ? 0.3 : 1, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}>&larr; Prev</button>
          <button onClick={goNext} disabled={fcIdx === fcCards.length - 1} style={{ ...S.navBtn, opacity: fcIdx === fcCards.length - 1 ? 0.3 : 1, background: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }}>Next &rarr;</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: '#475569', fontFamily: 'monospace', marginTop: 8 }}>
          &larr; &rarr; navigate &middot; Space flip &middot; G got it &middot; X still learning
        </div>

        {fcIdx === fcCards.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: 16, color: '#64748b', fontFamily: 'sans-serif', fontSize: 13 }}>
            <div style={{ color: fcKnownCount === fcCards.length ? '#10b981' : '#64748b', marginBottom: 6, display: 'flex', justifyContent: 'center' }}>
              {fcKnownCount === fcCards.length ? <IconStar size={28} /> : <IconBook size={28} />}
            </div>
            <div>{fcKnownCount}/{fcCards.length} marked as known</div>
            <button onClick={() => { setFcIdx(0); setFcFlipped(false) }}
              style={{ ...S.homeBtn, width: 'auto', marginTop: 10, padding: '10px 24px', background: '#6366f1' }}>
              Restart Deck
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
