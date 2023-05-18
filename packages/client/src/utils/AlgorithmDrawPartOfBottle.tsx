interface Props {
  context: CanvasRenderingContext2D
  offsetX: number
  offsetY: number
  offsetYForSelectBottle: number
  height: number
  width: number
  colorShadedPart: string
}

export const AlgorithmDrawPartOfBottle = {
  getDesiredAlgorithm: (
    count: number,
    countLayersInBottle: number,
    layerProps: Props
  ) => {
    if (count < countLayersInBottle - 1) {
      AlgorithmDrawPartOfBottle.fillRect(layerProps)
    } else {
      AlgorithmDrawPartOfBottle.bottom(layerProps)
    }
  },
  fillRect: (layerProps: Props) => {
    layerProps.context.beginPath()

    layerProps.context.fillStyle = layerProps.colorShadedPart
    layerProps.context.fillRect(
      layerProps.offsetX,
      layerProps.offsetY + layerProps.offsetYForSelectBottle,
      layerProps.width,
      layerProps.height
    )

    layerProps.context.closePath()
  },
  bottom: (layerProps: Props) => {
    layerProps.context.fillStyle = layerProps.colorShadedPart

    layerProps.context.beginPath()
    layerProps.context.moveTo(
      layerProps.offsetX,
      layerProps.offsetY + layerProps.offsetYForSelectBottle
    )
    layerProps.context.lineTo(
      layerProps.offsetX,
      layerProps.offsetY + layerProps.height + layerProps.offsetYForSelectBottle
    )
    layerProps.context.arcTo(
      layerProps.offsetX + layerProps.width / 2,
      layerProps.offsetY +
        layerProps.height +
        layerProps.width / 2 +
        layerProps.offsetYForSelectBottle,
      layerProps.offsetX + layerProps.width,
      layerProps.offsetY +
        layerProps.height +
        layerProps.offsetYForSelectBottle,
      layerProps.width / 2 + 10
    )

    layerProps.context.lineTo(
      layerProps.offsetX + layerProps.width,
      layerProps.offsetY + layerProps.height + layerProps.offsetYForSelectBottle
    )
    layerProps.context.lineTo(
      layerProps.offsetX + layerProps.width,
      layerProps.offsetY + layerProps.offsetYForSelectBottle
    )
    layerProps.context.lineTo(
      layerProps.offsetX,
      layerProps.offsetY + layerProps.offsetYForSelectBottle
    )
    layerProps.context.closePath()

    layerProps.context.fill()
  },
}
