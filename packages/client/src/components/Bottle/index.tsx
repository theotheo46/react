import React, { useEffect, useRef, useState } from 'react'
import FillTypeColor from './FillTypeColor'
import { AlgorithmDrawPartOfBottle } from '../../utils/AlgorithmDrawPartOfBottle'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setSelectedColor,
  setSelectedKeyBottle,
  setCountColorNeedTransfuse
} from '../../store/slices/levelSlice'
import { setCurrentCountAttempts } from '../../store/slices/gameSlice'

interface Props
  extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement> {
  height?: number
  width?: number
  offsetX?: number
  offsetY?: number
  offsetYForSelectBottle?: number
  onClickHandler: (
    isSelect: boolean,
    callbackUnSelect: () => void,
    callbackAddNewColor: () => number,
    callbackRemoveColor: (countColorNeedDelete: number) => void
  ) => void
  onSaveFinishCallback: (callbackFinishBottle: () => boolean) => void
  keyHtmlElement: string
  bottleColors?: InstanceType<typeof FillTypeColor>[]
}

const Bottle = ({
                  height = 50,
                  width = 50,
                  offsetX = 10,
                  offsetY = 20,
                  offsetYForSelectBottle = 0,
                  onClickHandler,
                  onSaveFinishCallback,
                  keyHtmlElement,
                  bottleColors = []
                }: Props) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isSelect, setSelect] = useState(false)

  const dispatch = useAppDispatch()
  let { countLayersInBottle, selectedColor, selectedKeyBottle, countColorNeedTransfuse } =
    useAppSelector(state => state.level)

  const { currentAttempts } =
    useAppSelector(state => state.game)

  const drawEntireBottle = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    const widthCanvas = width - offsetX * 2
    const heightCanvas = height - offsetY - widthCanvas / 2
    context.clearRect(0, 0, width, height)
    drawShadedPartOfBottle(context, widthCanvas, heightCanvas)
    drawStrokeBottle(context, widthCanvas, heightCanvas)
  }

  const drawShadedPartOfBottle = (
    context: CanvasRenderingContext2D,
    widthCanvas: number,
    heightCanvas: number
  ) => {
    let count = countLayersInBottle - bottleColors.length
    const heightLayer = heightCanvas / countLayersInBottle
    let offsetYForShadedPartBottle: number = offsetY + count * heightLayer
    drawAllPartOfBottle()

    function drawAllPartOfBottle() {
      if (!context) return
      for (let i = bottleColors.length - 1; i >= 0; i--) {
        const layerProps = {
          context: context,
          offsetX: offsetX,
          offsetY: offsetYForShadedPartBottle,
          offsetYForSelectBottle: offsetYForSelectBottle,
          width: widthCanvas,
          height: heightLayer + 1,
          colorShadedPart: bottleColors[i].color
        }
        AlgorithmDrawPartOfBottle.getDesiredAlgorithm(count, countLayersInBottle, layerProps)
        count++
        offsetYForShadedPartBottle = offsetYForShadedPartBottle + heightLayer
      }
    }
  }

  const drawStrokeBottle = (
    context: CanvasRenderingContext2D,
    widthCanvas: number,
    heightCanvas: number
  ) => {
    context.beginPath()
    context.moveTo(offsetX, offsetY + offsetYForSelectBottle)
    context.lineTo(offsetX, offsetY + heightCanvas + offsetYForSelectBottle)
    context.arcTo(
      offsetX + widthCanvas / 2,
      offsetY + heightCanvas + widthCanvas / 2 + offsetYForSelectBottle,
      offsetX + widthCanvas,
      offsetY + heightCanvas + offsetYForSelectBottle,
      widthCanvas / 2 + 10
    )

    context.lineTo(
      offsetX + widthCanvas,
      offsetY + heightCanvas + offsetYForSelectBottle
    )
    context.lineTo(offsetX + widthCanvas, offsetY + offsetYForSelectBottle)
    context.lineTo(offsetX, offsetY + offsetYForSelectBottle)
    context.stroke()
    context.closePath()
  }

  const canvas = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvas || !canvas.current) return
    const newContext = canvas.current.getContext('2d')
    setContext(newContext)
    drawEntireBottle(newContext)
    onSaveFinishCallback(bottleIsComplete)
  }, [bottleColors])

  const unSelectBottle = () => {
    setSelect(false)
    offsetYForSelectBottle = 0
    drawEntireBottle(context)
  }

  const addNewColorInBottle = () => {
    let countColorNeedDelete = 0
    if (bottleColors.length < countLayersInBottle) {
      const currentTopColor: InstanceType<typeof FillTypeColor> =
        bottleColors.slice(-1)[0]
      const newColor: InstanceType<typeof FillTypeColor> = JSON.parse(selectedColor)
      if ((bottleColors.length === 0) || (currentTopColor.id === newColor.id)) {
        const addAttempts = currentAttempts + 1
        dispatch(setCurrentCountAttempts(addAttempts))
        countColorNeedDelete = Math.min(countColorNeedTransfuse, countLayersInBottle - bottleColors.length)
        for (let i = 0; i < countColorNeedDelete; i++) {
          bottleColors.push(newColor)
        }
        unSelectBottle()
      }
    }
    return countColorNeedDelete
  }

  const removeFirstTopColor = (countColorNeedDelete: number) => {
    if (bottleColors.length > 0) {
      for (let i = 0; i < countColorNeedDelete; i++) {
        bottleColors.pop()
      }
      drawEntireBottle(context)
    }
  }

  const selectColorForTransfuse = () => {
    const currentSelectColor: InstanceType<typeof FillTypeColor> =
      bottleColors.slice(-1)[0]

    if (currentSelectColor !== undefined) {
      setSelect(prevState => !prevState)
      offsetYForSelectBottle = !isSelect ? -20 : 0
      drawEntireBottle(context)
      dispatch(setSelectedKeyBottle(keyHtmlElement))
      dispatch(setSelectedColor(JSON.stringify(currentSelectColor)))
      dispatch(setCountColorNeedTransfuse(getCountColorNeedTransfuse()))
    }

    function getCountColorNeedTransfuse(): number {
      let newCountColorNeedTransfuse = 1
      for (let i = bottleColors.length - 2; i >= 0; i--) {
        if (currentSelectColor.id === bottleColors[i].id) {
          newCountColorNeedTransfuse++
        } else {
          return newCountColorNeedTransfuse
        }
      }
      return newCountColorNeedTransfuse
    }
  }

  const bottleIsComplete = (): boolean => {
    const isEmpty = bottleColors.length === 0
    let isComplete = false
    if (bottleColors.length === countLayersInBottle) {
      const lastIdColor = bottleColors[0].id
      isComplete = !bottleColors.some(color => lastIdColor !== color.id)
    }
    return isComplete || isEmpty
  }

  const clickEventOnBottle = () => {
    if (selectedKeyBottle === keyHtmlElement) {
      unSelectBottle()
      dispatch(setSelectedColor(JSON.stringify(FillTypeColor.TypeEmptyColor)))
      dispatch(setSelectedKeyBottle('-1'))
      return
    }
    selectColorForTransfuse()
    onClickHandler(
      !isSelect,
      unSelectBottle,
      addNewColorInBottle,
      removeFirstTopColor
    )
  }

  return (
    <canvas
      key={keyHtmlElement}
      onClick={clickEventOnBottle}
      ref={canvas}
      height={height}
      width={width}
    />
  )
}

export default Bottle
