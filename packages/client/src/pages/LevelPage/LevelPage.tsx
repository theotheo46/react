import Bottle from '../../components/Bottle/index'
import React, { useCallback, useEffect, useState } from 'react'
import FillTypeColor from '../../components/Bottle/FillTypeColor'
import { FunctionArray } from '../../utils/FunctionArray'
import {
  FaArrowLeft,
  FaSync,
  FaCompressArrowsAlt,
  FaExpand, FaReply
} from 'react-icons/fa'
import Button from '../../components/Button/index'
import './LevelPage.pcss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

class InfoForRenderBottle {
  bottleColors: InstanceType<typeof FillTypeColor>[]

  constructor(bottleColors: InstanceType<typeof FillTypeColor>[]) {
    this.bottleColors = bottleColors
  }
}

const colorForLevel = [
  '#36d35d',
  '#fafa89',
  '#A78BFA',
  '#fa8989',
  '#fac289',
  '#89fade'
]

const LevelPage = () => {
  const iconStyle = { fill: 'var(--color-white)', fontSize: '1.25rem' }
  const [arrayCallbackBottleIsComplete, setArrayCallbackBottleIsComplete] =
    useState<(() => boolean)[]>([])

  const [callbackRemoveColorBottle, setCallbackRemoveColorBottle] =
    useState<() => () => void>()

  const [callbackUnSelectBottle, setCallbackUnSelectBottle] =
    useState<() => () => void>()

  const [arraySettingsBottle, setArraySettingsBottle] = useState<InfoForRenderBottle[]>([])

  const [selectColorBottle, setSelectColorBottle] = useState<InstanceType<typeof FillTypeColor>>(FillTypeColor.TypeEmptyColor)

  const [victoryLabelDisplay, setDisplay] = useState('none')
  const [iconFullScreenDisplay, setIconFullScreenDisplay] = useState('block')
  const [iconNotFullScreenDisplay, setIconNotFullScreenDisplay] = useState('none')

  const [selectKeyForBottle, setSelectKeyForBottle] = useState('-1')

  const { countColors, countEmptyBottles, countLayersInBottle } =
    useAppSelector(state => state.level)

  const [countColor, setCountColor] = useState(countColors)

  const saveCallbackFinishBottle = (callbackFinishBottle: () => boolean) => {
    arrayCallbackBottleIsComplete.push(callbackFinishBottle)
  }

  const updateVictoryLabel = () => {
    const allBottleIsComplete = arrayCallbackBottleIsComplete.every(
      bottleIsComplete => bottleIsComplete()
    )
    if (allBottleIsComplete) {
      setDisplay('block')
    }
  }

  const onClickHandler = (
    isSelect: boolean,
    selectColor: InstanceType<typeof FillTypeColor>,
    keyHtmlElement: string,
    callbackUnSelect: () => void,
    callbackAddNewColor: (color: InstanceType<typeof FillTypeColor>) => void,
    callbackRemoveColor: () => void
  ) => {
    const needAddSelectedColorInBottle =
      selectColorBottle !== FillTypeColor.TypeEmptyColor
    const needSelectColorFromBottle = isSelect && !needAddSelectedColorInBottle
    if (selectKeyForBottle === keyHtmlElement) {
      clearSelectedColor()
    } else {
      if (needSelectColorFromBottle) {
        selectColorFromBottle()
      } else {
        addSelectedColorInBottle()
      }
    }

    function selectColorFromBottle() {
      setSelectKeyForBottle(keyHtmlElement)
      setCallbackUnSelectBottle(() => callbackUnSelect)
      setCallbackRemoveColorBottle(() => callbackRemoveColor)
      setSelectColorBottle(selectColor)
    }

    function addSelectedColorInBottle() {
      if (needAddSelectedColorInBottle) {
        callbackAddNewColor(selectColorBottle)
        if (callbackRemoveColorBottle !== undefined) {
          callbackRemoveColorBottle()
        }
        clearSelectedColor()
        updateVictoryLabel()
      }
    }

    function clearSelectedColor() {
      if (callbackUnSelectBottle !== undefined) {
        callbackUnSelectBottle()
      }
      setSelectColorBottle(FillTypeColor.TypeEmptyColor)
      setSelectKeyForBottle('-1')
    }
  }

  function createArrayBottle(): InfoForRenderBottle[] {
    const infoForRenderBottle: InfoForRenderBottle[] = []
    setDisplay('none')
    setArrayCallbackBottleIsComplete([])
    const orderColor: InstanceType<typeof FillTypeColor>[] = []

    for (let i = 0; i < countColor; i++) {
      for (let j = 0; j < 4; j++) {
        orderColor.push(new FillTypeColor(i, colorForLevel[i]))
      }
    }

    FunctionArray.shuffleArray(orderColor)

    for (let i = 0; i < countColor; i++) {
      const bottleColors = orderColor.splice(0, 4)
      infoForRenderBottle.push(new InfoForRenderBottle(bottleColors))
    }

    for (let i = 0; i < 2; i++) {
      infoForRenderBottle.push(new InfoForRenderBottle([]))
    }

    return infoForRenderBottle
  }

  function reCreateAllBottles() {
    setArraySettingsBottle(createArrayBottle())
  }

  function onChangeFullScreenState() {
    if (iconFullScreenDisplay === 'block') {
      activateFullScreen(document.documentElement)
    }
    else {
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

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitFullScreenHandler)
    document.addEventListener('webkitfullscreenchange', exitFullScreenHandler)
    document.addEventListener('mozfullscreenchange', exitFullScreenHandler)
    document.addEventListener('MSFullscreenChange', exitFullScreenHandler)
    reCreateAllBottles()
    return () => {
      document.removeEventListener('fullscreenchange', exitFullScreenHandler)
      document.removeEventListener('webkitfullscreenchange', exitFullScreenHandler)
      document.removeEventListener('mozfullscreenchange', exitFullScreenHandler)
      document.removeEventListener('MSFullscreenChange', exitFullScreenHandler)
    }
  }, [])

  return (
    <div className="page-wrap page-wrap_lightblue">
      <main className="container">
        <div className="level-page">
          <div className="level-page-top">
            <Button styleType="primary">
              <FaArrowLeft style={iconStyle}/>
              Выйти
            </Button>
            <div style={{ fontSize: '40px' }}>Решите головоломку</div>
            <Button styleType="primary" onClick={onChangeFullScreenState}>
              <FaExpand style={{
                fill: 'var(--color-white)',
                fontSize: '1.25rem',
                display: iconFullScreenDisplay
              }}/>
              <FaCompressArrowsAlt style={{
                fill: 'var(--color-white)',
                fontSize: '1.25rem',
                display: iconNotFullScreenDisplay
              }}/>
            </Button>
          </div>
          <div className="level-page-middle">
            <div className="panel-with-buttons-middle">
              <Button styleType="primary" onClick={reCreateAllBottles}>
                <FaSync style={iconStyle}/>
              </Button>
              <Button style={{ display: 'none' }} styleType="primary" onClick={reCreateAllBottles}>
                <FaReply style={iconStyle}/>
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
              <div
                style={{
                  marginTop: '20px',
                  marginLeft: '20px',
                  display: victoryLabelDisplay
                }}>
                <label>Победа!</label>
              </div>
            </div>
            <div className="panel-with-info-middle">
              <div style={{ marginBottom: '10px' }}>Переливаний: 1</div>
              <div>Время: 05:55</div>
              <div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LevelPage
