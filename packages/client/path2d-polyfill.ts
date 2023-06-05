const createPath2DPolyfill = async () => {
  let Path2DPolyfill: Path2DConstructor | null = null

  if (typeof window == 'undefined') {
    // import('path2d-polyfill').then(m => (Path2DPolyfill = m.default.Path2D))
    Path2DPolyfill = (await import('path2d-polyfill')).default.Path2D
  } else {
    Path2DPolyfill = window.Path2D
  }

  return Path2DPolyfill
}

export default createPath2DPolyfill
