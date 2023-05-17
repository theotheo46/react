const createRange = (start: number, end: number): number[] => {
  const step = 1
  return Array.from(
    { length: (end - start) / step + 1 },
    (value, index) => start + index * step
  )
}

export default createRange
