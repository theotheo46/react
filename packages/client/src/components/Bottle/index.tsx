import React, { useEffect, useRef, useState } from 'react'
import FillTypeColor from './FillTypeColor'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setSelectedColor,
  setSelectedKeyBottle,
  setCountColorNeedTransfuse,
} from '../../store/slices/levelSlice'
import { setCurrentAttempts } from '../../store/slices/gameSlice'
import { TypeBottleArray } from '../../utils/TypeBottleArray'

interface Props
  extends React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  height?: number
  width?: number
  offsetYForSelectBottle?: number
  onClickHandler: (
    isSelect: boolean,
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
  offsetYForSelectBottle = 0,
  onClickHandler,
  onSaveFinishCallback,
  keyHtmlElement,
  bottleColors = [],
}: Props) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isSelect, setSelect] = useState(false)

  const dispatch = useAppDispatch()
  const {
    countLayersInBottle,
    selectedColor,
    selectedKeyBottle,
    countColorNeedTransfuse,
    idTypeContourBottle,
  } = useAppSelector(state => state.level)

  const { currentAttempts } = useAppSelector(state => state.game)
  const { theme } = useAppSelector(state => state.user)

  const drawAnimationDeleteColorInBottle = (
    context: CanvasRenderingContext2D | null,
    needAnimationAdd: boolean,
    needAnimationDelete: boolean,
    fillTopLayer: number,
    countColorNeedChange: number,
    colorForAnimation = ''
  ) => {
    if (!context) return
    const heightCanvas = height - 30

    if (needAnimationDelete) {
      drawAnimationDelete(
        context,
        fillTopLayer,
        countColorNeedChange,
        colorForAnimation
      )
    } else {
      drawAnimationAdd(
        context,
        needAnimationAdd,
        fillTopLayer,
        countColorNeedChange
      )
    }

    function drawAnimationAdd(
      context: CanvasRenderingContext2D,
      needAnimationAdd: boolean,
      fillTopLayer: number,
      countColorNeedChange: number
    ) {
      const heightTopLayer =
        heightCanvas / countLayersInBottle / TypeBottleArray.getStepAnimation()
      fillTopLayer = fillTopLayer + heightTopLayer
      countColorNeedChange = Math.max(countColorNeedChange, 1)
      clearCanvas(context)
      context.save()
      TypeBottleArray.clipStrokeBottle(
        context,
        idTypeContourBottle,
        offsetYForSelectBottle
      )
      drawShadedPartOfBottleNew(
        context,
        heightCanvas,
        needAnimationAdd,
        false,
        fillTopLayer,
        countColorNeedChange,
        ''
      )
      TypeBottleArray.drawStrokeBottle(context, idTypeContourBottle, theme)
      context.restore()
      if (
        fillTopLayer <
        (heightCanvas / countLayersInBottle) * countColorNeedChange
      ) {
        requestAnimationFrame(
          drawAnimationAdd.bind(
            null,
            context,
            needAnimationAdd,
            fillTopLayer,
            countColorNeedChange
          )
        )
      }
    }

    function drawAnimationDelete(
      context: CanvasRenderingContext2D,
      fillTopLayer: number,
      countColorNeedChange: number,
      colorForAnimation: string
    ) {
      const diffTopLayer =
        heightCanvas / countLayersInBottle / TypeBottleArray.getStepAnimation()
      fillTopLayer = fillTopLayer - diffTopLayer
      countColorNeedChange = Math.max(countColorNeedChange, 1)
      clearCanvas(context)
      context.save()
      TypeBottleArray.clipStrokeBottle(
        context,
        idTypeContourBottle,
        offsetYForSelectBottle
      )
      drawShadedPartOfBottleNew(
        context,
        heightCanvas,
        false,
        true,
        fillTopLayer,
        countColorNeedChange,
        colorForAnimation
      )
      TypeBottleArray.drawStrokeBottle(context, idTypeContourBottle, theme)
      context.restore()

      if (fillTopLayer > 0)
        requestAnimationFrame(
          drawAnimationDelete.bind(
            null,
            context,
            fillTopLayer,
            countColorNeedChange,
            colorForAnimation
          )
        )
    }

    function clearCanvas(context: CanvasRenderingContext2D) {
      context.clearRect(0, 0, width, height)
      context.save()
      context.beginPath()
      context.rect(0, 0, width, height)
      context.clip()
      context.restore()
    }
  }

  const drawShadedPartOfBottleNew = (
    context: CanvasRenderingContext2D,
    heightCanvas: number,
    needAnimationAdd: boolean,
    needAnimationDelete: boolean,
    heightChangeTopLayer: number,
    countColorNeedChange: number,
    colorForDelete: string
  ) => {
    if (!context) return

    const heightLayer = heightCanvas / countLayersInBottle
    let offsetYForShadedPartBottle: number =
      (countLayersInBottle - bottleColors.length) * heightLayer
    let internalCountColorNeedChange = 1

    if (needAnimationAdd) {
      internalCountColorNeedChange = countColorNeedChange
      drawPartOfBottleAdd()
    }
    if (needAnimationDelete) {
      drawPartOfBottleDelete()
    }
    drawPartOfBottleGeneral()

    function drawPartOfBottleAdd() {
      offsetYForShadedPartBottle =
        offsetYForShadedPartBottle + heightLayer * internalCountColorNeedChange
      TypeBottleArray.drawFillBackgroundBottle(
        context,
        width,
        -heightChangeTopLayer,
        offsetYForShadedPartBottle + 1,
        bottleColors[bottleColors.length - 1].color
      )
      internalCountColorNeedChange++
    }

    function drawPartOfBottleDelete() {
      TypeBottleArray.drawFillBackgroundBottle(
        context,
        width,
        -heightChangeTopLayer,
        offsetYForShadedPartBottle -
          heightLayer * internalCountColorNeedChange +
          (heightCanvas / countLayersInBottle) * internalCountColorNeedChange +
          1,
        colorForDelete
      )
    }

    function drawPartOfBottleGeneral() {
      for (
        let i = bottleColors.length - internalCountColorNeedChange;
        i >= 0;
        i--
      ) {
        TypeBottleArray.drawFillBackgroundBottle(
          context,
          width,
          heightLayer + 1,
          offsetYForShadedPartBottle,
          bottleColors[i].color
        )
        offsetYForShadedPartBottle = offsetYForShadedPartBottle + heightLayer
      }
    }
  }

  const canvas = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!canvas || !canvas.current) return
    const newContext = canvas.current.getContext('2d')
    setContext(newContext)
    drawAnimationDeleteColorInBottle(newContext, false, false, 0, 1, '')
    onSaveFinishCallback(bottleIsComplete)
    setSelect(false)
  }, [bottleColors, theme])

  const unSelectBottle = (
    needAnimation: boolean,
    needAnimationDelete: boolean,
    color: string,
    countColorNeedChange = 1
  ) => {
    setSelect(false)
    offsetYForSelectBottle = 0
    if (needAnimationDelete) {
      drawAnimationDeleteColorInBottle(
        context,
        false,
        true,
        ((height - 30) / countLayersInBottle) * countColorNeedChange,
        countColorNeedChange,
        color
      )
    } else {
      drawAnimationDeleteColorInBottle(
        context,
        needAnimation,
        false,
        0,
        countColorNeedChange
      )
    }
  }

  const addNewColorInBottle = () => {
    let countColorNeedDelete = 0
    let needAnimation = false
    if (bottleColors.length < countLayersInBottle) {
      const currentTopColor: InstanceType<typeof FillTypeColor> =
        bottleColors.slice(-1)[0]
      const newColor: InstanceType<typeof FillTypeColor> =
        JSON.parse(selectedColor)
      if (bottleColors.length === 0 || currentTopColor.id === newColor.id) {
        const addAttempts = currentAttempts + 1
        dispatch(setCurrentAttempts(addAttempts))
        countColorNeedDelete = Math.min(
          countColorNeedTransfuse,
          countLayersInBottle - bottleColors.length
        )
        for (let i = 0; i < countColorNeedDelete; i++) {
          bottleColors.push(newColor)
        }
        needAnimation = true
      }
    }
    unSelectBottle(needAnimation, false, '', countColorNeedDelete)
    return countColorNeedDelete
  }

  const removeFirstTopColor = (countColorNeedDelete: number) => {
    let colorForDelete = ''
    if (bottleColors.length > 0) {
      for (let i = 0; i < countColorNeedDelete; i++) {
        colorForDelete = bottleColors.pop()!.color
      }
    }
    dispatch(setSelectedColor(JSON.stringify(FillTypeColor.TypeEmptyColor)))
    dispatch(setSelectedKeyBottle('-1'))
    unSelectBottle(false, true, colorForDelete, countColorNeedDelete)
  }

  const selectColorForTransfuse = () => {
    const currentSelectColor: InstanceType<typeof FillTypeColor> =
      bottleColors.slice(-1)[0]

    if (currentSelectColor !== undefined) {
      setSelect(prevState => !prevState)
      offsetYForSelectBottle = !isSelect ? -20 : 0
      drawAnimationDeleteColorInBottle(context, false, false, 0, 1)
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
      unSelectBottle(false, false, '')
      dispatch(setSelectedColor(JSON.stringify(FillTypeColor.TypeEmptyColor)))
      dispatch(setSelectedKeyBottle('-1'))
      return
    }
    selectColorForTransfuse()
    onClickHandler(!isSelect, addNewColorInBottle, removeFirstTopColor)
  }

  return (
    <canvas
      key={keyHtmlElement}
      onClick={clickEventOnBottle}
      ref={canvas}
      height={height}
      width={width}
      style={
        theme === 'dark'
          ? { filter: 'brightness(90%)' }
          : { filter: 'brightness(100%)' }
      }
    />
  )
}

export default Bottle
