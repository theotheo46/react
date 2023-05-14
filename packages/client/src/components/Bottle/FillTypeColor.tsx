class FillTypeColor {
  id: number
  color: string

  constructor(id: number, color: string) {
    this.id = id
    this.color = color
  }

  public static TypeEmptyColor = new FillTypeColor(-1, '')
  public static isEmptyColor = (strTypeColor: string): boolean => {
    const typeColor = JSON.parse(strTypeColor)
    return (typeColor.id === FillTypeColor.TypeEmptyColor.id) &&
      (typeColor.color === FillTypeColor.TypeEmptyColor.color)
  }
}

export default FillTypeColor
