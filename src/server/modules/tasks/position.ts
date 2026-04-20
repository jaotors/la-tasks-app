const BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const MIN = 0
const MAX = BASE.length - 1

function charIndex(c?: string): number {
  if (!c) return MIN
  const i = BASE.indexOf(c)
  return i === -1 ? MIN : i
}

function charAt(str: string, i: number): number {
  if (i >= str.length) return MIN
  return charIndex(str[i])
}

export function midpoint(a: string, b: string): string {
  let result = ''
  let i = 0

  while (true) {
    const ai = charAt(a, i)
    const bi = i < b.length ? charIndex(b[i]) : MAX

    // space exists
    if (bi - ai > 1) {
      const mid = Math.floor((ai + bi) / 2)
      return result + BASE[mid]
    }

    // no space → extend
    result += BASE[ai]
    i++
  }
}

export function generateBetween(a: string, b: string): string {
  if (a === b) {
    throw new Error('INVALID_ORDER')
  }
  return midpoint(a, b)
}

export function generateBefore(a: string): string {
  return midpoint('', a)
}

export function generateAfter(a: string): string {
  return midpoint(a, '')
}

export function needsRebalance(position: string): boolean {
  return position.length > 20
}

export const computePosition = (
  beforeTask: { position: string } | undefined,
  afterTask: { position: string } | undefined,
): string => {
  if (beforeTask && afterTask) {
    return generateBetween(beforeTask.position, afterTask.position)
  }

  if (!beforeTask && afterTask) {
    return generateBefore(afterTask.position)
  }

  if (beforeTask && !afterTask) {
    return generateAfter(beforeTask.position)
  }

  return 'm'
}
