export function SChart({ sessionHistory, dk, cardBg, subText }) {
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
