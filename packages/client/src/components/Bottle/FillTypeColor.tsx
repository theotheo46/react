class FillTypeColor {
  id: number
  color: string

  constructor(id: number, color: string) {
    this.id = id
    this.color = color
  }

  public static TypeEmptyColor = new FillTypeColor(-1, '')
}

export default FillTypeColor
