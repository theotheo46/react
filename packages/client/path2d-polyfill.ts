import { Path2D } from 'path2d-polyfill'
const Path2DPolyfill = typeof window !== 'undefined' ? window.Path2D : Path2D

export default Path2DPolyfill
