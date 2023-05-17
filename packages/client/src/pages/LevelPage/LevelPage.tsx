import Bottle from '../../components/Bottle/index'
import React, { useEffect, useState } from 'react'
import FillTypeColor from '../../components/Bottle/FillTypeColor'
import { FunctionArray } from '../../utils/FunctionArray'
import {
  FaArrowLeft,
  FaSync,
  FaCompressArrowsAlt,
  FaExpand,
  FaReply,
} from 'react-icons/fa'
import Button from '../../components/Button/index'
import './LevelPage.pcss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setSelectedColor,
  setStartColorsForRestart,
  setSelectedKeyBottle,
} from '../../store/slices/levelSlice'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '../../hooks/useTimer'
import {
  setCurrentAttempts,
  setCurrentTime,
  setMode,
} from '../../store/slices/gameSlice'

class InfoForRenderBottle {
  bottleColors: InstanceType<typeof FillTypeColor>[]

  constructor(bottleColors: InstanceType<typeof FillTypeColor>[]) {
    this.bottleColors = bottleColors
  }
}

const LevelPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { timerStart, timerStop, getTime, timerReset } = useTimer()
  const iconStyle = { fill: 'var(--color-white)', fontSize: '1.25rem' }
  const [arrayCallbackBottleIsComplete, setArrayCallbackBottleIsComplete] =
    useState<(() => boolean)[]>([])

  const [callbackRemoveColorBottle, setCallbackRemoveColorBottle] =
    useState<
      (countColorNeedDelete: number) => (countColorNeedDelete: number) => void
    >()

  const [arraySettingsBottle, setArraySettingsBottle] = useState<
    InfoForRenderBottle[]
  >([])

  const [iconFullScreenDisplay, setIconFullScreenDisplay] = useState('block')
  const [iconNotFullScreenDisplay, setIconNotFullScreenDisplay] =
    useState('none')

  const {
    countColors,
    countEmptyBottles,
    countLayersInBottle,
    startColorsForRestart,
    selectedColor,
  } = useAppSelector(state => state.level)

  const { currentAttempts, currentLevel } = useAppSelector(state => state.game)

  const saveCallbackFinishBottle = (callbackFinishBottle: () => boolean) => {
    arrayCallbackBottleIsComplete.push(callbackFinishBottle)
  }

  const updateVictoryLabel = () => {
    const allBottleIsComplete = arrayCallbackBottleIsComplete.every(
      bottleIsComplete => bottleIsComplete()
    )
    if (allBottleIsComplete) {
      dispatch(setCurrentTime(getTime()))
      navigate('/finish')
    }
  }

  const onClickHandler = (
    isSelect: boolean,
    callbackAddNewColor: () => number,
    callbackRemoveColor: (countColorNeedDelete: number) => void
  ) => {
    const needSelectColorFromBottle =
      isSelect && FillTypeColor.isEmptyColor(selectedColor)
    if (needSelectColorFromBottle) {
      selectColorFromBottle()
    } else {
      addSelectedColorInBottle()
    }

    function selectColorFromBottle() {
      setCallbackRemoveColorBottle(() => callbackRemoveColor)
    }

    function addSelectedColorInBottle() {
      if (callbackRemoveColorBottle !== undefined) {
        callbackRemoveColorBottle(callbackAddNewColor())
      }
      updateVictoryLabel()
    }
  }

  function createArrayBottle(): InfoForRenderBottle[] {
    let orderColorFromSave: string[] = []
    const orderColor: InstanceType<typeof FillTypeColor>[] =
      FunctionArray.getShuffledArrayByNumberColor(
        countColors,
        countLayersInBottle
      )

    orderColor.forEach(color => {
      orderColorFromSave.push(JSON.stringify(color))
    })
    dispatch(setStartColorsForRestart(orderColorFromSave))

    return createArrayBottleByArrayOrderColor(orderColor)
  }

  function repeatCreateStartArrayBottle(): InfoForRenderBottle[] {
    let orderColor: InstanceType<typeof FillTypeColor>[] = []
    startColorsForRestart.forEach(color => {
      orderColor.push(JSON.parse(color))
    })

    return createArrayBottleByArrayOrderColor(orderColor)
  }

  function createArrayBottleByArrayOrderColor(
    orderColor: InstanceType<typeof FillTypeColor>[]
  ): InfoForRenderBottle[] {
    const infoForRenderBottle: InfoForRenderBottle[] = []
    clearAllState()

    for (let i = 0; i < countColors; i++) {
      const bottleColors = orderColor.splice(0, countLayersInBottle)
      infoForRenderBottle.push(new InfoForRenderBottle(bottleColors))
    }

    for (let i = 0; i < countEmptyBottles; i++) {
      infoForRenderBottle.push(new InfoForRenderBottle([]))
    }

    return infoForRenderBottle

    function clearAllState() {
      setArrayCallbackBottleIsComplete([])
      dispatch(setSelectedColor(JSON.stringify(FillTypeColor.TypeEmptyColor)))
      dispatch(setSelectedKeyBottle('-1'))
    }
  }

  function restartLevel() {
    setArraySettingsBottle(repeatCreateStartArrayBottle())
    timerReset()
  }

  function onChangeFullScreenState() {
    if (iconFullScreenDisplay === 'block') {
      activateFullScreen(document.documentElement)
    } else {
      deactivateFullScreen()
    }

    function activateFullScreen(element: Element) {
      if (element.requestFullscreen) {
        setIconFullScreenDisplay('none')
        setIconNotFullScreenDisplay('block')
        element.requestFullscreen()
      }
    }

    function deactivateFullScreen() {
      if (document.exitFullscreen) {
        setIconFullScreenDisplay('block')
        setIconNotFullScreenDisplay('none')
        document.exitFullscreen()
      }
    }
  }

  function exitFullScreenHandler() {
    if (!document.fullscreenElement) {
      setIconFullScreenDisplay('block')
      setIconNotFullScreenDisplay('none')
    }
  }

  function exitGameHandler() {
    dispatch(setCurrentTime(''))
    dispatch(setCurrentAttempts(0))
    dispatch(setMode(null))
    navigate('/start')
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitFullScreenHandler)
    document.addEventListener('webkitfullscreenchange', exitFullScreenHandler)
    document.addEventListener('mozfullscreenchange', exitFullScreenHandler)
    document.addEventListener('MSFullscreenChange', exitFullScreenHandler)
    setArraySettingsBottle(createArrayBottle())
    timerStart()
    return () => {
      timerStop()
      document.removeEventListener('fullscreenchange', exitFullScreenHandler)
      document.removeEventListener(
        'webkitfullscreenchange',
        exitFullScreenHandler
      )
      document.removeEventListener('mozfullscreenchange', exitFullScreenHandler)
      document.removeEventListener('MSFullscreenChange', exitFullScreenHandler)
    }
  }, [])

  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <div className="level-page">
          <div className="level-page-top">
            <Button styleType="primary" onClick={exitGameHandler}>
              <FaArrowLeft style={iconStyle} />
              Назад
            </Button>
            <div style={{ fontSize: '40px' }}>Решите головоломку</div>
            <Button styleType="primary" onClick={onChangeFullScreenState}>
              <FaExpand
                style={{
                  fill: 'var(--color-white)',
                  fontSize: '1.25rem',
                  display: iconFullScreenDisplay,
                }}
              />
              <FaCompressArrowsAlt
                style={{
                  fill: 'var(--color-white)',
                  fontSize: '1.25rem',
                  display: iconNotFullScreenDisplay,
                }}
              />
            </Button>
          </div>
          <div className="level-page-middle">
            <div className="panel-with-buttons-middle">
              <Button styleType="primary" onClick={restartLevel}>
                <FaSync style={iconStyle} />
              </Button>
              <Button style={{ display: 'none' }} styleType="primary">
                <FaReply style={iconStyle} />
              </Button>
            </div>
            <div className="panel-with-bottles-middle">
              {arraySettingsBottle.map((bottle, idx) => (
                <Bottle
                  onSaveFinishCallback={saveCallbackFinishBottle}
                  key={idx}
                  keyHtmlElement={String(idx)}
                  bottleColors={bottle.bottleColors}
                  height={200}
                  width={100}
                  onClickHandler={onClickHandler}
                />
              ))}
            </div>
            <div className="panel-with-info-middle">
              <div style={{ marginBottom: '10px' }}>
                Переливаний: {currentAttempts}
              </div>
              <div style={{ marginBottom: '10px' }}>Время: {getTime()}</div>
              <div>Уровень: {currentLevel}</div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LevelPage
