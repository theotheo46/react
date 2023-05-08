import Bottle from '../components/Bottle/index'
import React, { useState } from 'react'
import FillTypeColor from '../components/Bottle/FillTypeColor'
import { FunctionArray } from '../utils/FunctionArray'

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

  const [countColor, setCountColor] = useState(initCountColor)

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

  function onChangeCountColorInLevel(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setCountColor(Number(event.target.value))
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
