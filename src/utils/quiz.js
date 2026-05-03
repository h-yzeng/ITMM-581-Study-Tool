import { QUESTION_BANK } from '../data/questionBank.js'

export function pullQuestions(count, ch, type, diff, topics = []) {
  let pool = [...QUESTION_BANK]
  if (ch !== 'all')      pool = pool.filter(q => String(q.chapter) === ch)
  if (type === 'mcq')    pool = pool.filter(q => q.type === 'mcq')
  if (type === 'tf')     pool = pool.filter(q => q.type === 'tf')
  if (diff !== 'all')    pool = pool.filter(q => q.difficulty === diff)
  if (topics.length > 0) pool = pool.filter(q => topics.includes(q.topic))
  if (!pool.length) return []

  pool.sort(() => Math.random() - 0.5)

  // If filtered pool is smaller than requested count, pad by repeating the pool
  // (keeps duplicates bounded to pool size rather than re-filtering the full bank)
  const base = [...pool]
  while (pool.length < count) {
    pool.push(...base.sort(() => Math.random() - 0.5))
  }

  return pool.slice(0, count)
}

export const fcCardKey = c => `${c.ch}:${c.topic}:${(c.front || '').slice(0, 40)}`
