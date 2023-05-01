import React from 'react'
import FillTypeColor from './FillTypeColor'


interface BottleProps
  extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement> {
  height?: number
  width?: number
  canvas?: any
  pointStartX?: number
  pointStartY?: number
  onClick?: void
  checkFinishBottle: void
  keyBottle: string
  isSelect: boolean
  arrayFillTypeBottle?: FillTypeColor[]
}

interface FillLayerProps {
  context: CanvasRenderingContext2D
  pointStartX: number
  pointStartY: number
  pointSelectY: number
  height: number
  width: number
  color: string
}

// класс для сохранения алгоритмов отрисовки заполненой части бутылок
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
    // закрашенная прямоугольная область
    layerProps.context.beginPath()

    layerProps.context.fillStyle = layerProps.color
    layerProps.context.fillRect(layerProps.pointStartX, layerProps.pointStartY + layerProps.pointSelectY,
      layerProps.width, layerProps.height)

    layerProps.context.closePath()
  },
  bottom: (layerProps: FillLayerProps) => {
    // закрашенная полукруглая область
    layerProps.context.fillStyle = layerProps.color

    layerProps.context.beginPath()
    layerProps.context.moveTo(layerProps.pointStartX, layerProps.pointStartY + layerProps.pointSelectY)
    layerProps.context.lineTo(layerProps.pointStartX, layerProps.pointStartY + layerProps.height + layerProps.pointSelectY)
    layerProps.context.arcTo(layerProps.pointStartX + layerProps.width / 2, layerProps.pointStartY + layerProps.height + layerProps.width / 2 + layerProps.pointSelectY,
      layerProps.pointStartX + layerProps.width, layerProps.pointStartY + layerProps.height + layerProps.pointSelectY,
      layerProps.width / 2 + 10)

    layerProps.context.lineTo(layerProps.pointStartX + layerProps.width, layerProps.pointStartY + layerProps.height + layerProps.pointSelectY)
    layerProps.context.lineTo(layerProps.pointStartX + layerProps.width, layerProps.pointStartY + layerProps.pointSelectY)
    layerProps.context.lineTo(layerProps.pointStartX, layerProps.pointStartY + layerProps.pointSelectY)
    layerProps.context.closePath()

    layerProps.context.fill()
  }
}

const Bottle: React.FC<BottleProps> = (
  {
    height = 50,
    width = 50,
    pointStartX = 10,
    pointStartY = 20,
    onClick,
    checkFinishBottle,
    keyBottle,
    isSelect = false,
    arrayFillTypeBottle = []
  }) => {

  let context: CanvasRenderingContext2D
  let pointSelectY = 0

  // рисование всей бутылки
  const drawBottle = (context: CanvasRenderingContext2D) => {
    const widthCanvas = width - pointStartX * 2
    const heightCanvas = height - pointStartY - widthCanvas / 2
    context.clearRect(0, 0, width, height)
    drawFillBottle(context, widthCanvas, heightCanvas)
    drawStrokeBottle(context, widthCanvas, heightCanvas)
  }

  // отрисовка только заполненой цветом области
  const drawFillBottle = (context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) => {
    let count = (4 - arrayFillTypeBottle.length)
    const heightLayer = heightCanvas / 4
    let pointStartYLayer: number = pointStartY + count * heightLayer

    for (let i = arrayFillTypeBottle.length - 1; i >= 0; i--) {
      const layerProps = {
        context: context,
        pointStartX: pointStartX,
        pointStartY: pointStartYLayer,
        pointSelectY: pointSelectY,
        width: widthCanvas,
        height: heightLayer + 1,
        color: arrayFillTypeBottle[i].color
      }
      FunFillLayer.getFunctionFill(count, layerProps)
      count++
      pointStartYLayer = pointStartYLayer + heightLayer
    }
  }

  // отрисовка контура бутылки
  const drawStrokeBottle = (context: CanvasRenderingContext2D, widthCanvas: number, heightCanvas: number) => {
    context.beginPath()
    context.moveTo(pointStartX, pointStartY + pointSelectY)
    context.lineTo(pointStartX, pointStartY + heightCanvas + pointSelectY)
    context.arcTo(pointStartX + widthCanvas / 2, pointStartY + heightCanvas + widthCanvas / 2 + pointSelectY,
      pointStartX + widthCanvas, pointStartY + heightCanvas + pointSelectY,
      widthCanvas / 2 + 10)

    context.lineTo(pointStartX + widthCanvas, pointStartY + heightCanvas + pointSelectY)
    context.lineTo(pointStartX + widthCanvas, pointStartY + pointSelectY)
    context.lineTo(pointStartX, pointStartY + pointSelectY)
    context.stroke()
    context.closePath()
  }

  const canvas = React.useRef()
  React.useEffect(() => {
    context = canvas.current.getContext('2d')
    drawBottle(context)
    checkFinishBottle(isFullOrEmpty)
  })

// сброс выделения бутылки
  const unSelect = () => {
    isSelect = false
    pointSelectY = 0
    drawBottle(context)
  }

  // заполенние бутылки новым цветом
  const fillColor = (color: FillTypeColor) => {
    if (arrayFillTypeBottle.length < 4) {
      arrayFillTypeBottle.push(color)
      unSelect()
    }
  }

  // выливание из бутылки одного цвета
  const removeTopColor = () => {
    if (arrayFillTypeBottle.length > 0) {
      arrayFillTypeBottle.pop()
      drawBottle(context)
    }
  }

  // условие для готовности бутылки
  const isFullOrEmpty = (): boolean => {
    if (arrayFillTypeBottle.length === 0) {
      return true
    }
    if (arrayFillTypeBottle.length === 4) {
      const lastIdColor = arrayFillTypeBottle[0].id
      arrayFillTypeBottle.forEach(color => {
        if (lastIdColor !== color.id) {
          return false
        }
      })
      return true
    }
    return false
  }

  const click = () => {
    const selectColor: FillTypeColor = arrayFillTypeBottle.slice(-1)[0]

    if (selectColor !== undefined) {
      isSelect = !isSelect
      pointSelectY = (isSelect) ? -20 : 0
      drawBottle(context)
    }
    onClick(isSelect, selectColor, keyBottle, unSelect, fillColor, removeTopColor)

  }

  return (
    <canvas key={keyBottle} onClick={click} ref={canvas} height={height} width={width}/>
  )
}

export default Bottle
