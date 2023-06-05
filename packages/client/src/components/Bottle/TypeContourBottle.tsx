import Path2DPolyfill from '../../../path2d-polyfill'

// console.log('Path2DPolyfill', Path2DPolyfill, typeof window)

export default async () => {
  const P = await Path2DPolyfill()

  class TypeContourBottle {
    id: number
    pathStr: string
    path: Path2D

    constructor(id: number, pathStr: string) {
      this.id = id
      this.pathStr = pathStr
      // this.path = new Path2D(pathStr)
      this.path = new P(pathStr)
    }
  }
  return TypeContourBottle
}

// export default TypeContourBottle
