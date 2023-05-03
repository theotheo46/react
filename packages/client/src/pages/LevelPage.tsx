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
  let selectKey: string

  let checkFinnishBottle: any[] = []

  let callbackUnSelectBottle: () => void
  let callbackRemoveColorBottle: () => void

  const [victoryDisplay, setDisplay] = useState(() => {
    return 'none'
  })

  const saveCallbackFinishBottle = (callbackFinishBottle: () => boolean) => {
    checkFinnishBottle.push(callbackFinishBottle)
  }

  // Фунуция проверки на заполненость всех бутылок
  const checkAllBottle = () => {
    let result = true
    checkFinnishBottle.forEach(value => {
      result = result && value()
    })
    if (result) {
      setDisplay('block')
    }
  }

  // Фунуция вызывающаяся после нажатия на бутыку
  const onClickHandler = (isSelect: boolean, selectColor: InstanceType<typeof FillTypeColor>,
                 keyHtmlElement: string,
                 callbackUnSelect: () => void,
                 callbackFillColor: (color: InstanceType<typeof FillTypeColor>) => void,
                 callbackRemoveColor: () => void
  ) => {
    if (selectKey === keyHtmlElement) {
      // убрать выделение текущей бутылки
      unSelectColor()
      selectKey = '-1'
    } else {
      if (isSelect && selectColorBottle === undefined) {
        // выбор бутылки для будущего переливания
        selectKey = keyHtmlElement
        callbackUnSelectBottle = callbackUnSelect
        callbackRemoveColorBottle = callbackRemoveColor
        selectColorBottle = selectColor
      } else {
        // перелить запомненый цвет
        if (selectColorBottle !== undefined) {
          callbackFillColor(selectColorBottle)
          callbackRemoveColorBottle()
          unSelectColor()
          checkAllBottle()
          selectKey = '-1'
        }
      }
    }
  }

  // скинуть выбраный цвет
  const unSelectColor = () => {
    if (callbackUnSelectBottle !== undefined) {
      callbackUnSelectBottle()
    }
    selectColorBottle = undefined
  }

  const [countColor, setCountColor] = useState(() => {
    return initCountColor
  })

  // создание бутылок в зависимость от количества цветов
  function createArrayBottle(): Bottle[] {
    setDisplay('none')
    checkFinnishBottle = []
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

  function updateBottle() {
    setArrayBottle(createArrayBottle())
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCountColor(Number(event.target.value))
  }

  const [arrayBottle, setArrayBottle] = useState(() => {
    return createArrayBottle()
  })


  return (
    <div>
      <div style={{ margin: '20px' }}>
        <label>Количество цветов: </label>
        <select onChange={onChange}>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <button onClick={updateBottle} style={{ 'marginLeft': '20px' }}>Применить</button>
      </div>
      {arrayBottle}
      <div style={{ marginTop: '20px', marginLeft: '20px', display: victoryDisplay }}>
        <label>Победа!</label>
      </div>
    </div>
  )
}

export default LevelPage
