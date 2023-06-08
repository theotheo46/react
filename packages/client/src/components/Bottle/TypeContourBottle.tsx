import Path2DPolyfill from '../../../path2d-polyfill'

export default async () => {
  const Path2D = await Path2DPolyfill()

  class TypeContourBottle {
    id: number
    pathStr: string
    path: Path2D

    constructor(id: number, pathStr: string) {
      this.id = id
      this.pathStr = pathStr
      this.path = new Path2D(pathStr)
    }
  }
  return TypeContourBottle
}

// export default TypeContourBottle
