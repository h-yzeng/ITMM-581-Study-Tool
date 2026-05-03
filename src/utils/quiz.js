import { QUESTION_BANK } from '../data/questionBank.js'

export function pullQuestions(count, ch, type, diff) {
  let pool = [...QUESTION_BANK]
  if (ch !== 'all')   pool = pool.filter(q => String(q.chapter) === ch)
  if (type === 'mcq') pool = pool.filter(q => q.type === 'mcq')
  if (type === 'tf')  pool = pool.filter(q => q.type === 'tf')
  if (diff !== 'all') pool = pool.filter(q => q.difficulty === diff)
  pool.sort(() => Math.random() - 0.5)
  while (pool.length < count && pool.length > 0) {
    const extra = [...QUESTION_BANK]
      .filter(q => ch === 'all'     || String(q.chapter) === ch)
      .filter(q => type === 'mixed' || q.type === type)
      .filter(q => diff === 'all'   || q.difficulty === diff)
      .sort(() => Math.random() - 0.5)
    pool = [...pool, ...extra]
  }
  return pool.slice(0, count)
}

export const fcCardKey = c => `${c.ch}:${c.topic}:${(c.front || '').slice(0, 40)}`
