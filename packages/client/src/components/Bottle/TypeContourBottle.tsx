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

export default TypeContourBottle
