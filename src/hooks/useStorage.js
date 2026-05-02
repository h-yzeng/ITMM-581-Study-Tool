const PREFIX = 'entro_v3_'

export function loadStore(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveStore(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {}
}

export function qKey(q) {
  return (q.question || '').slice(0, 80).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
}
