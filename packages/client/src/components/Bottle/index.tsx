import React from 'react'
import FillTypeBottle from './FillTypeBottle'


interface BottleProps
  extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement> {
  height?: number
  width?: number
  canvas?: any
  pointStartX?: number
  pointStartY?: number
  onClick?: void
  key: string
  arrayFillTypeBottle?: FillTypeBottle[]
}

interface FillLayerProps {
  context: CanvasRenderingContext2D
  pointStartX: number
  pointStartY: number
  height: number
  width: number
  color: string
}

const FunFillLayer = {

  getFunctionFill: (count: number, layerProps: FillLayerProps) => {
    if (count <= 0) {
      FunFillLayer.top(layerProps)
    } else if (count === 1) {
      FunFillLayer.preTop(layerProps)
    } else if (count === 2) {
      FunFillLayer.preBottom(layerProps)
    } else {
      FunFillLayer.bottom(layerProps)
    }
  },

  top: (layerProps: FillLayerProps) => {
    FunFillLayer.fillRect(layerProps)
  },
  preTop: (layerProps: FillLayerProps) => {
    FunFillLayer.fillRect(layerProps)
  },
  preBottom: (layerProps: FillLayerProps) => {
    FunFillLayer.fillRect(layerProps)
  },
  fillRect: (layerProps: FillLayerProps) => {
    layerProps.context.beginPath()

    layerProps.context.fillStyle = layerProps.color
    layerProps.context.fillRect(layerProps.pointStartX, layerProps.pointStartY,
      layerProps.width, layerProps.height)

    layerProps.context.closePath()
  },
  bottom: (layerProps: FillLayerProps) => {
    layerProps.context.fillStyle = layerProps.color

    layerProps.context.beginPath()
    layerProps.context.moveTo(layerProps.pointStartX, layerProps.pointStartY)
    layerProps.context.lineTo(layerProps.pointStartX, layerProps.pointStartY + layerProps.height)
    layerProps.context.arcTo(layerProps.pointStartX + layerProps.width / 2, layerProps.pointStartY + layerProps.height + layerProps.width / 2,
      layerProps.pointStartX + layerProps.width, layerProps.pointStartY + layerProps.height,
      layerProps.width / 2 + 10)

    layerProps.context.lineTo(layerProps.pointStartX + layerProps.width, layerProps.pointStartY + layerProps.height)
    layerProps.context.lineTo(layerProps.pointStartX + layerProps.width, layerProps.pointStartY)
    layerProps.context.lineTo(layerProps.pointStartX, layerProps.pointStartY)
    layerProps.context.closePath()

    layerProps.context.fill()
  }
}

const Bottle: React.FC<BottleProps> = (
  {
    height = 50,
    width = 50,
    pointStartX = 10,
    pointStartY = 10,
    onClick,
    key,
    arrayFillTypeBottle = []
  }) => {

  const drawBottle = (context: CanvasRenderingContext2D) => {
    const widthCanvas = width - pointStartX * 2
    const heightCanvas = height - pointStartY - widthCanvas / 2
    context.clearRect(0, 0, width, height)
    drawFillBottle(context, widthCanvas, heightCanvas)
    drawStrokeBottle(context, widthCanvas, heightCanvas)
  }

  const drawFillBottle = (context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) => {

    let count = 0
    const heightLayer = heightCanvas / 4
    let pointStartYLayer: number = pointStartY

    arrayFillTypeBottle.forEach(fillBottle => {
      if (fillBottle.isFill) {
        const layerProps = {
          context: context,
          pointStartX: pointStartX,
          pointStartY: pointStartYLayer,
          width: widthCanvas,
          height: heightLayer + 1,
          color: fillBottle.color.color
        }
        FunFillLayer.getFunctionFill(count, layerProps)
      }
      count++
      pointStartYLayer = pointStartYLayer + heightLayer
    })
  }

  const drawStrokeBottle = (context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) => {
    context.beginPath()
    context.moveTo(pointStartX, pointStartY)
    context.lineTo(pointStartX, pointStartY + heightCanvas)
    context.arcTo(pointStartX + widthCanvas / 2, pointStartY + heightCanvas + widthCanvas / 2,
      pointStartX + widthCanvas, pointStartY + heightCanvas,
      widthCanvas / 2 + 10)

    context.lineTo(pointStartX + widthCanvas, pointStartY + heightCanvas)
    context.lineTo(pointStartX + widthCanvas, pointStartY)
    context.lineTo(pointStartX, pointStartY)
    context.stroke()
    context.closePath()
  }

  const canvas = React.useRef()
  React.useEffect(() => {
    const context = canvas.current.getContext('2d')
    drawBottle(context)
  })

  return (
    <canvas key={key} onClick={onClick} ref={canvas} height={height} width={width}/>
  )
}

export default Bottle
