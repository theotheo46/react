import Bottle from '../../components/Bottle/index'
import React, { useEffect, useState } from 'react'
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
import { setSelectedColor, setStartColorsForRestart } from '../../store/slices/levelSlice'

class InfoForRenderBottle {
  bottleColors: InstanceType<typeof FillTypeColor>[]

  constructor(bottleColors: InstanceType<typeof FillTypeColor>[]) {
    this.bottleColors = bottleColors
  }
}

const LevelPage = () => {
  const dispatch = useAppDispatch()
  const iconStyle = { fill: 'var(--color-white)', fontSize: '1.25rem' }
  const [arrayCallbackBottleIsComplete, setArrayCallbackBottleIsComplete] =
    useState<(() => boolean)[]>([])

  const [callbackRemoveColorBottle, setCallbackRemoveColorBottle] =
    useState<() => () => void>()

  const [callbackUnSelectBottle, setCallbackUnSelectBottle] =
    useState<() => () => void>()

  const [arraySettingsBottle, setArraySettingsBottle] = useState<InfoForRenderBottle[]>([])

  const [victoryLabelDisplay, setDisplay] = useState('none')
  const [iconFullScreenDisplay, setIconFullScreenDisplay] = useState('block')
  const [iconNotFullScreenDisplay, setIconNotFullScreenDisplay] = useState('none')

  const [selectKeyForBottle, setSelectKeyForBottle] = useState('-1')

  const {
    countColors, countEmptyBottles, countLayersInBottle,
    startColorsForRestart, selectedColor
  } =
    useAppSelector(state => state.level)

  const { currentAttempts } =
    useAppSelector(state => state.game)

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
    callbackAddNewColor: () => void,
    callbackRemoveColor: () => void
  ) => {
    const needAddSelectedColorInBottle = !FillTypeColor.isEmptyColor(selectedColor)
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
      dispatch(setSelectedColor(JSON.stringify(selectColor)))
    }

    function addSelectedColorInBottle() {
      if (needAddSelectedColorInBottle) {
        callbackAddNewColor()
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
      dispatch(setSelectedColor(JSON.stringify(FillTypeColor.TypeEmptyColor)))
      setSelectKeyForBottle('-1')
    }
  }

  function createArrayBottle(): InfoForRenderBottle[] {
    let orderColorFromSave: string[] = []
    const orderColor: InstanceType<typeof FillTypeColor>[] =
      FunctionArray.getShuffledArrayByNumberColor(countColors, countLayersInBottle)

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

  function createArrayBottleByArrayOrderColor(orderColor: InstanceType<typeof FillTypeColor>[]): InfoForRenderBottle[] {
    const infoForRenderBottle: InfoForRenderBottle[] = []
    setDisplay('none')
    setArrayCallbackBottleIsComplete([])

    for (let i = 0; i < countColors; i++) {
      const bottleColors = orderColor.splice(0, countLayersInBottle)
      infoForRenderBottle.push(new InfoForRenderBottle(bottleColors))
    }

    for (let i = 0; i < countEmptyBottles; i++) {
      infoForRenderBottle.push(new InfoForRenderBottle([]))
    }

    return infoForRenderBottle
  }

  function restartLevel() {
    setArraySettingsBottle(repeatCreateStartArrayBottle())
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
    setArraySettingsBottle(createArrayBottle())
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
              <Button styleType="primary" onClick={restartLevel}>
                <FaSync style={iconStyle}/>
              </Button>
              <Button style={{ display: 'none' }} styleType="primary">
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
              <div style={{ marginBottom: '10px' }}>Переливаний: {currentAttempts}</div>
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
