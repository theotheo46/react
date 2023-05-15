import Bottle from '../components/Bottle/index'
import React, { useEffect, useState } from 'react'
import FillTypeColor from '../components/Bottle/FillTypeColor'
import { FunctionArray } from '../utils/FunctionArray'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { useTimer } from '../hooks/useTimer'
import { setCurrentTime } from '../store/slices/gameSlice'

interface Props {
  initCountColor?: number
}

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
  '#89fade',
]

const LevelPage = ({ initCountColor = 2 }: Props) => {
  const [arrayCallbackBottleIsComplete, setArrayCallbackBottleIsComplete] =
    useState<(() => boolean)[]>([])

  const [callbackRemoveColorBottle, setCallbackRemoveColorBottle] =
    useState<() => () => void>()

  const [callbackUnSelectBottle, setCallbackUnSelectBottle] =
    useState<() => () => void>()

  const [arraySettingsBottle, setArraySettingsBottle] = useState<
    InfoForRenderBottle[]
  >([])

  const [selectColorBottle, setSelectColorBottle] = useState<
    InstanceType<typeof FillTypeColor>
  >(FillTypeColor.TypeEmptyColor)

  const [victoryLabelDisplay, setDisplay] = useState('none')

  const [selectKeyForBottle, setSelectKeyForBottle] = useState('-1')

  // const [countColor, setCountColor] = useState(initCountColor)

  // Три переменные из стора для инициализации уровя
  const { countColors, countEmptyBottles, countLayersInBottle } =
    useAppSelector(state => state.level)
  const { currentLevel } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { timerStart, timerStop, getTime } = useTimer()

  const [countColor, setCountColor] = useState(countColors)

  const saveCallbackFinishBottle = (callbackFinishBottle: () => boolean) => {
    arrayCallbackBottleIsComplete.push(callbackFinishBottle)
  }

  const updateVictoryLabel = () => {
    const allBottleIsComplete = arrayCallbackBottleIsComplete.every(
      bottleIsComplete => bottleIsComplete()
    )
    if (allBottleIsComplete) {
      // setDisplay('block')
      dispatch(setCurrentTime(getTime()))
      navigate('/finish')
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

  useEffect(() => {
    reCreateAllBottles()
    timerStart()
    return () => {
      timerStop()
    }
  }, [])

  function reCreateAllBottles() {
    setArraySettingsBottle(createArrayBottle())
  }

  function onChangeCountColorInLevel(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setCountColor(Number(event.target.value))
  }

  function activateFullscreen(element: Element) {
    if (element.requestFullscreen) {
      element.requestFullscreen() // W3C spec
    }
  }

  function deactivateFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  function fullScreenToggle() {
    let caption = document!.getElementById('toggler')!.innerHTML
    if (caption == 'Полный экран') {
      activateFullscreen(document.documentElement)
      caption = 'В окне'
    } else {
      deactivateFullscreen()
      caption = 'Полный экран'
    }
    document!.getElementById('toggler')!.innerHTML = caption
  }

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <label>Количество цветов: </label>
        <select onChange={onChangeCountColorInLevel}>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <button onClick={reCreateAllBottles} style={{ marginLeft: '20px' }}>
          Применить
        </button>
        <button
          id="toggler"
          onClick={fullScreenToggle}
          style={{ marginLeft: '20px' }}>
          Полный экран
        </button>
        <div>Время: {getTime()}</div>
        <div>Уровень: {currentLevel}</div>
      </div>
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
          display: victoryLabelDisplay,
        }}>
        <label>Победа!</label>
      </div>
    </div>
  )
}

export default LevelPage
