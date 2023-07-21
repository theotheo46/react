function sanitizeUserInput(string: string) {
  const map: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '/': '&#x2F;',
  }
  const reg = /[<>/]/gi
  return string.replace(reg, match => map[match])
}

export default sanitizeUserInput
