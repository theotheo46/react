import Bottle from '../components/Bottle/index'
import React, { useState } from 'react'
import FillTypeColor from '../components/Bottle/FillTypeColor'
import { FunctionArray } from '../utils/FunctionArray'


interface Props {
  initCountColor?: number
}

const colorForLevel = ['#36d35d', '#fafa89', '#A78BFA', '#fa8989', '#fac289', '#89fade']

const LevelPage = ({ initCountColor = 2 }: Props) => {

  let selectColorBottle: InstanceType<typeof FillTypeColor>

  let arrayCallbackBottleIsComplete: (() => boolean)[] = []
  let callbackUnSelectBottle: () => void
  let callbackRemoveColorBottle: () => void

  const [victoryLabelDisplay, setDisplay] = useState(() => {
    return 'none'
  })

  const [selectKeyForBottle, setSelectKeyForBottle] = useState(() => {
    return '-1'
  })

  const [countColor, setCountColor] = useState(() => {
    return initCountColor
  })

  const saveCallbackFinishBottle = (callbackFinishBottle: () => boolean) => {
    arrayCallbackBottleIsComplete.push(callbackFinishBottle)
  }

  const updateVictoryLabel = () => {
    const allBottleIsComplete = arrayCallbackBottleIsComplete.every(bottleIsComplete => bottleIsComplete())
    if (allBottleIsComplete) {
      setDisplay('block')
    }
  }

  const onClickHandler = (isSelect: boolean, selectColor: InstanceType<typeof FillTypeColor>,
                          keyHtmlElement: string,
                          callbackUnSelect: () => void,
                          callbackAddNewColor: (color: InstanceType<typeof FillTypeColor>) => void,
                          callbackRemoveColor: () => void
  ) => {
    const needAddSelectedColorInBottle = selectColorBottle !== undefined
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
      callbackUnSelectBottle = callbackUnSelect
      callbackRemoveColorBottle = callbackRemoveColor
      selectColorBottle = selectColor
    }

    function addSelectedColorInBottle() {
      if (needAddSelectedColorInBottle) {
        callbackAddNewColor(selectColorBottle)
        callbackRemoveColorBottle()
        clearSelectedColor()
        updateVictoryLabel()
      }
    }

    function clearSelectedColor() {
      if (callbackUnSelectBottle !== undefined) {
        callbackUnSelectBottle()
      }
      selectColorBottle = undefined
      setSelectKeyForBottle('-1')
    }
  }

  function createArrayBottle(): Bottle[] {
    setDisplay('none')
    arrayCallbackBottleIsComplete = []
    const orderColor: InstanceType<typeof FillTypeColor>[] = []
    const arrayBottle: Bottle[] = []
    let keyBottle = '0'

    for (let i = 0; i < countColor; i++) {
      for (let j = 0; j < 4; j++) {
        orderColor.push(new FillTypeColor(i, colorForLevel[i]))
      }
    }

    FunctionArray.shuffleArray(orderColor) // перестановка будущих цвето

    // заполнение бутылок цветом
    for (let i = 0; i < countColor; i++) {
      const arrayFillTypeBottle = [
        orderColor.pop(), orderColor.pop(),
        orderColor.pop(), orderColor.pop()
      ]
      keyBottle = String(i)
      arrayBottle.push(
        <Bottle onSaveFinishCallback={saveCallbackFinishBottle}
                key={keyBottle} keyHtmlElement={keyBottle}
                height={200} width={100} onClickHandler={onClickHandler}
                bottleColors={arrayFillTypeBottle}/>
      )
    }

    // пустые бутылки для переливания
    for (let i = 0; i < 2; i++) {
      keyBottle = String(countColor + i)
      arrayBottle.push(
        <Bottle onSaveFinishCallback={saveCallbackFinishBottle}
                key={keyBottle} keyHtmlElement={keyBottle}
                height={200} width={100} onClickHandler={onClickHandler}/>
      )
    }

    return arrayBottle
  }

  const [arrayBottle, setArrayBottle] = useState(() => {
    return createArrayBottle()
  })

  function reCreateAllBottles() {
    setArrayBottle(createArrayBottle())
  }

  function onChangeCountColorInLevel(event: React.ChangeEvent<HTMLSelectElement>) {
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
        <button onClick={reCreateAllBottles} style={{ 'marginLeft': '20px' }}>Применить</button>
      </div>
      {arrayBottle}
      <div style={{ marginTop: '20px', marginLeft: '20px', display: victoryLabelDisplay }}>
        <label>Победа!</label>
      </div>
    </div>
  )
}

export default LevelPage
