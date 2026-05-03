import { FLASHCARDS } from '../data/flashcards.js'
import { CHAPTER_IDS, CHAPTER_COLORS } from '../data/chapters.js'
import { fcCardKey } from '../utils/quiz.js'
import { saveStore } from '../hooks/useStorage.js'
import { S } from '../styles.js'
import { DarkToggle } from '../components/DarkToggle.jsx'
import { IconStar, IconBook, IconRepeat } from '../components/Icons.jsx'

export function FlashcardsScreen({
  theme, toggleDark,
  fcCards, fcIdx, setFcIdx, fcFlipped, setFcFlipped,
  fcCh, setFcCh, fcTopic, setFcTopic,
  fcKnown, setFcKnown, fcKnownCount, fcLastSeen, fcCard, fcTopics,
  fcWeakOnly, setFcWeakOnly,
  fcShuffle, setFcShuffle,
  fcDiff, setFcDiff,
  fcDailyOnly, setFcDailyOnly,
  doMarkCard, setScreen,
}) {
  const { dk, bg, border, cardBg, text, subText } = theme
  const fcByChap = FLASHCARDS.reduce((a, c) => { a[c.ch] = (a[c.ch] || 0) + 1; return a }, {})

  const readKnownVal = v => { if (v === undefined || v === null) return undefined; if (typeof v === 'boolean') return v; return v.known }
  const dueCount = FLASHCARDS.filter(c => {
    const v = fcKnown[fcCardKey(c)]
    if (!v) return true
    const nextReview = typeof v === 'object' ? v?.nextReview : null
    return !nextReview || nextReview <= Date.now()
  }).length

  const fcProg           = fcCards.length > 0 ? Math.round((fcIdx + 1) / fcCards.length * 100) : 0
  const readKnown = readKnownVal
  const rawKnown         = fcCard ? fcKnown[fcCardKey(fcCard)] : undefined
  const isKnown          = readKnown(rawKnown)
  const lastSeen         = fcCard ? fcLastSeen[fcCardKey(fcCard)] : null
  const daysSince        = lastSeen ? Math.floor((Date.now() - lastSeen) / 86400000) : null
  const nextReviewDays   = typeof rawKnown === 'object' && rawKnown?.nextReview
    ? Math.ceil((rawKnown.nextReview - Date.now()) / 86400000) : null
  const stillLearning    = fcWeakOnly ? fcCards.length : fcCards.filter(c => readKnown(fcKnown[fcCardKey(c)]) === false).length

  const goNext = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.min(i + 1, fcCards.length - 1)), 100) }
  const goPrev = () => { setFcFlipped(false); setTimeout(() => setFcIdx(i => Math.max(0, i - 1)), 100) }

  const resetDeck = () => {
    setFcIdx(0); setFcFlipped(false); setFcWeakOnly(false)
    setFcKnown({}); saveStore('fcKnown', {})
  }

  const changeCh = id => {
    setFcCh(id); setFcIdx(0); setFcFlipped(false); setFcTopic('all'); setFcWeakOnly(false); setFcDiff('all')
  }
  const changeTopic = t => {
    setFcTopic(t); setFcIdx(0); setFcFlipped(false)
  }
  const toggleShuffle = () => {
    setFcShuffle(s => !s); setFcIdx(0); setFcFlipped(false)
  }
  const toggleWeak = () => {
    setFcWeakOnly(w => !w); setFcIdx(0); setFcFlipped(false)
  }

  const lastSeenBadge = daysSince !== null ? (
    <span style={{ fontSize: 9, fontFamily: 'monospace', padding: '1px 6px', borderRadius: 3, background: dk ? '#0f172a' : '#f1f5f9', color: daysSince === 0 ? '#10b981' : daysSince <= 2 ? '#f59e0b' : '#ef4444' }}>
      {daysSince === 0 ? 'seen today' : `${daysSince}d ago`}
    </span>
  ) : (
    <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#6366f1', background: dk ? '#1a1a3e' : '#ede9fe', padding: '1px 6px', borderRadius: 3 }}>new</span>
  )

  const nextReviewBadge = nextReviewDays !== null ? (
    <span style={{ fontSize: 9, fontFamily: 'monospace', padding: '1px 6px', borderRadius: 3, background: nextReviewDays <= 0 ? '#fee2e2' : dk ? '#0f172a' : '#f1f5f9', color: nextReviewDays <= 0 ? '#ef4444' : '#10b981' }}>
      {nextReviewDays <= 0 ? 'due now' : `review in ${nextReviewDays}d`}
    </span>
  ) : null

  const cardBorderColor = isKnown === true ? '#10b981' : isKnown === false ? '#ef4444' : border

  const faceStyle = {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 18,
    border: `2px solid ${cardBorderColor}`,
    padding: '52px 32px 36px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 16,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    transition: 'border-color 0.2s',
    overflow: 'hidden',
  }

  return (
    <div style={{ ...S.page, background: bg }}>
      <DarkToggle onClick={toggleDark} dk={dk} border={border} cardBg={cardBg} />
      <div style={S.container}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button onClick={() => setScreen('home')} style={{ ...S.backBtn, color: subText }}>&larr; Back</button>
          <div style={{ flex: 1 }}>
            <div style={{ ...S.progTrack, background: dk ? '#334155' : '#e2e8f0' }}>
              <div style={{ ...S.progFill, width: `${fcProg}%`, background: '#6366f1' }} />
            </div>
          </div>
          <span style={{ color: subText, fontSize: 12, fontFamily: 'monospace' }}>{fcIdx + 1}/{fcCards.length}</span>
          <span style={{ color: '#10b981', fontSize: 12, fontFamily: 'monospace' }}>&#10003; {fcKnownCount}</span>
        </div>

        {/* Chapter filter */}
        <div role="group" aria-label="Filter by chapter" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
          {[{ id: 'all', lbl: 'All' }, ...CHAPTER_IDS.map(n => ({ id: String(n), lbl: `Ch.${n}` }))].map(c => (
            <button
              key={c.id}
              onClick={() => changeCh(c.id)}
              aria-pressed={fcCh === c.id}
              style={{ ...S.pill, background: fcCh === c.id ? '#6366f1' : cardBg, color: fcCh === c.id ? '#fff' : subText, border: `1px solid ${fcCh === c.id ? '#6366f1' : border}`, fontSize: 11, padding: '4px 10px' }}
            >
              {c.lbl}
              {c.id !== 'all' && <span style={{ fontSize: 9, opacity: 0.65, marginLeft: 4 }}>({fcByChap[parseInt(c.id)] || 0})</span>}
            </button>
          ))}
        </div>

        {/* Topic filter */}
        {fcCh !== 'all' && fcTopics.length > 0 && (
          <div role="group" aria-label="Filter by topic" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
            <button
              onClick={() => changeTopic('all')}
              aria-pressed={fcTopic === 'all'}
              style={{ ...S.pill, background: fcTopic === 'all' ? (dk ? '#334155' : '#e2e8f0') : cardBg, color: fcTopic === 'all' ? text : subText, border: `1px solid ${border}`, fontSize: 10, padding: '3px 9px' }}
            >
              All Topics
            </button>
            {fcTopics.map(t => (
              <button
                key={t}
                onClick={() => changeTopic(t)}
                aria-pressed={fcTopic === t}
                style={{ ...S.pill, background: fcTopic === t ? (dk ? '#334155' : '#e2e8f0') : cardBg, color: fcTopic === t ? text : subText, border: `1px solid ${border}`, fontSize: 10, padding: '3px 9px' }}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Difficulty filter */}
        <div role="group" aria-label="Filter by difficulty" style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
          {[{ id: 'all', label: 'All Levels' }, { id: 'easy', label: 'Easy' }, { id: 'medium', label: 'Medium' }, { id: 'hard', label: 'Hard' }].map(d => (
            <button key={d.id} onClick={() => { setFcDiff(d.id); setFcIdx(0); setFcFlipped(false) }} aria-pressed={fcDiff === d.id}
              style={{ ...S.pill, background: fcDiff === d.id ? (dk ? '#334155' : '#e2e8f0') : cardBg, color: fcDiff === d.id ? text : subText, border: `1px solid ${border}`, fontSize: 10, padding: '3px 9px' }}>
              {d.label}
            </button>
          ))}
        </div>

        {/* Deck tools */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          <button
            onClick={toggleShuffle}
            aria-pressed={fcShuffle}
            style={{ ...S.pill, background: fcShuffle ? '#6366f1' : cardBg, color: fcShuffle ? '#fff' : subText, border: `1px solid ${fcShuffle ? '#6366f1' : border}`, fontSize: 10, padding: '3px 9px', display: 'inline-flex', alignItems: 'center', gap: 5 }}
          >
            <IconRepeat size={11} /> Shuffle
          </button>
          {(stillLearning > 0 || fcWeakOnly) && (
            <button
              onClick={toggleWeak}
              aria-pressed={fcWeakOnly}
              style={{ ...S.pill, background: fcWeakOnly ? '#ef4444' : cardBg, color: fcWeakOnly ? '#fff' : '#ef4444', border: `1px solid #ef4444`, fontSize: 10, padding: '3px 9px' }}
            >
              &#10007; Still Learning{!fcWeakOnly && `: ${stillLearning}`}
            </button>
          )}
          <button
            onClick={() => { setFcDailyOnly(d => !d); setFcIdx(0); setFcFlipped(false) }}
            aria-pressed={fcDailyOnly}
            style={{ ...S.pill, background: fcDailyOnly ? '#f59e0b' : cardBg, color: fcDailyOnly ? '#fff' : '#f59e0b', border: `1px solid #f59e0b`, fontSize: 10, padding: '3px 9px' }}
          >
            &#9733; Daily Review{!fcDailyOnly && `: ${dueCount}`}
          </button>
        </div>

        {/* Empty state */}
        {fcCards.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', fontFamily: 'sans-serif' }}>
            {fcDailyOnly ? (
              <>
                <div style={{ fontSize: 28, color: '#f59e0b', marginBottom: 10 }}>&#9733;</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: text, marginBottom: 6 }}>No cards due for review today!</div>
                <div style={{ fontSize: 12, color: subText, marginBottom: 16 }}>Come back tomorrow or switch to full deck.</div>
                <button onClick={() => setFcDailyOnly(false)} style={{ ...S.pill, background: '#f59e0b', color: '#fff', border: 'none', fontSize: 12, padding: '6px 18px', cursor: 'pointer' }}>Show All Cards</button>
              </>
            ) : fcWeakOnly ? (
              <>
                <div style={{ fontSize: 28, color: '#10b981', marginBottom: 10 }}>&#10003;</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: text, marginBottom: 6 }}>All cards in this set are known!</div>
                <div style={{ fontSize: 12, color: subText, marginBottom: 16 }}>Switch back to see the full deck.</div>
                <button onClick={() => setFcWeakOnly(false)} style={{ ...S.pill, background: '#10b981', color: '#fff', border: 'none', fontSize: 12, padding: '6px 18px', cursor: 'pointer' }}>Show All Cards</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14, marginBottom: 8, color: subText }}>No flashcards match this filter.</div>
                <div style={{ fontSize: 12, color: dk ? '#475569' : '#94a3b8' }}>Try selecting a different chapter or topic.</div>
              </>
            )}
          </div>
        )}

        {/* Flashcard - 3D flip */}
        {fcCard && (
          <div
            onClick={() => setFcFlipped(f => !f)}
            role="button"
            tabIndex={0}
            aria-label={fcFlipped ? 'Answer side. Press Enter or Space to see question.' : 'Question side. Press Enter or Space to flip to answer.'}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFcFlipped(f => !f) } }}
            style={{ position: 'relative', minHeight: 280, perspective: '1200px', marginBottom: 14, cursor: 'pointer' }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: fcFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}>

              {/* FRONT - question */}
              <div style={{ ...faceStyle, background: cardBg }}>
                <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: subText }}>QUESTION &middot; tap or Space</span>
                  {lastSeenBadge}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 4, fontFamily: 'monospace', background: CHAPTER_COLORS[fcCard.ch] + '33', color: CHAPTER_COLORS[fcCard.ch] }}>
                  Ch.{fcCard.ch} &middot; {fcCard.topic}
                </div>
                <p style={{ fontSize: 17, fontWeight: 600, color: text, lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line', textAlign: 'center' }}>
                  {fcCard.front}
                </p>
              </div>

              {/* BACK - answer */}
              <div style={{ ...faceStyle, background: dk ? '#0f172a' : '#f1f5f9', transform: 'rotateY(180deg)' }}>
                <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: subText }}>ANSWER &middot; tap or Space</span>
                  <div style={{ display: 'flex', gap: 4 }}>{lastSeenBadge}{nextReviewBadge}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 4, fontFamily: 'monospace', background: CHAPTER_COLORS[fcCard.ch] + '33', color: CHAPTER_COLORS[fcCard.ch] }}>
                  Ch.{fcCard.ch} &middot; {fcCard.topic}
                </div>
                <p style={{ fontSize: 14, fontWeight: 400, color: text, lineHeight: 1.65, margin: 0, whiteSpace: 'pre-line', textAlign: 'center' }}>
                  {fcCard.back}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Mark buttons */}
        {fcCard && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button onClick={() => doMarkCard(false)} style={S.fcNo}>&#10007; Still Learning (X)</button>
            <button onClick={() => doMarkCard(true)}  style={S.fcYes}>&#10003; Got It (G)</button>
          </div>
        )}

        {/* Navigation */}
        <div style={S.navRow}>
          <button onClick={goPrev} disabled={fcIdx === 0} style={{ ...S.navBtn, opacity: fcIdx === 0 ? 0.3 : 1, background: cardBg, color: subText, border: `1px solid ${border}` }}>&larr; Prev</button>
          <button onClick={goNext} disabled={fcIdx === fcCards.length - 1} style={{ ...S.navBtn, opacity: fcIdx === fcCards.length - 1 ? 0.3 : 1, background: cardBg, color: subText, border: `1px solid ${border}` }}>Next &rarr;</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: subText, fontFamily: 'monospace', marginTop: 8 }}>
          &larr; &rarr; navigate &middot; Space flip &middot; G got it &middot; X still learning
        </div>

        {/* End of deck */}
        {fcCards.length > 0 && fcIdx === fcCards.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: 16, color: subText, fontFamily: 'sans-serif', fontSize: 13 }}>
            <div style={{ color: fcKnownCount === fcCards.length ? '#10b981' : subText, marginBottom: 6, display: 'flex', justifyContent: 'center' }}>
              {fcKnownCount === fcCards.length ? <IconStar size={28} /> : <IconBook size={28} />}
            </div>
            <div style={{ marginBottom: 4 }}>{fcKnownCount}/{fcCards.length} marked as known</div>
            {stillLearning > 0 && !fcWeakOnly && (
              <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 8 }}>{stillLearning} still learning &mdash; drill them?</div>
            )}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {stillLearning > 0 && !fcWeakOnly && (
                <button onClick={toggleWeak} style={{ ...S.homeBtn, width: 'auto', padding: '10px 20px', background: '#ef4444', fontSize: 13 }}>
                  &#10007; Drill Still Learning
                </button>
              )}
              <button onClick={resetDeck} style={{ ...S.homeBtn, width: 'auto', padding: '10px 20px', background: '#6366f1', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <IconRepeat size={13} /> Restart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
