import Bottle from '../components/Bottle/index'
import React, { useState } from 'react'
import FillTypeBottle from '../components/Bottle/FillTypeBottle'
import FillTypeColor from '../components/Bottle/FillTypeColor'


interface LevelProps {
  //arrayFillTypeBottle?: FillTypeBottle[]
  countColor?: number
}

const Color = ['#36d35d', '#fafa89', '#A78BFA', '#fa8989', '#fac289', '#89fade']

const LevelPage: React.FC<LevelProps> = ({ countColor = 2 }) => {

  const click = () => {
    console.log('sldhsiuhisu')
  }

  const [countColor2, setCountColor] = useState(() => {
    return countColor
  })

  function shuffleArray(array: FillTypeColor[]) {
    const arrayCopy = array
    let arrayCopy2: FillTypeColor[] = arrayCopy
    let lastValue: FillTypeColor = -1
    let countRepeated = 0
    let countInBottle = 0
    let restart = 1
    while (restart) {
      arrayCopy2 = arrayCopy
      restart = 0
      for (let i = arrayCopy2.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arrayCopy2[i]
        arrayCopy2[i] = arrayCopy2[j]
        arrayCopy2[j] = temp
        if (arrayCopy2[i].id === lastValue) {
          countRepeated = countRepeated + 1
        }
        if (countRepeated >= 3) {
          restart = 1
          lastValue = -1
          countInBottle = 0
          countRepeated = 0
          break
        }
        countInBottle = countInBottle + 1
        if (countInBottle >= 4) {
          countInBottle = 0
          countRepeated = 0
          lastValue = -1
        } else {
          lastValue = arrayCopy2[i].id
        }
      }
    }
    array = arrayCopy2
  }

  function createArrayBottle(): Bottle[] {
    const orderColor: FillTypeColor[] = []
    const arrayBottle: Bottle[] = []
    let keyBottle = '0'

    for (let i = 0; i < countColor2; i++) {
      for (let j = 0; j < 4; j++) {
        orderColor.push(new FillTypeColor(i, Color[i]))
      }
    }

    shuffleArray(orderColor)
    for (let i = 0; i < countColor2; i++) {
      const arrayFillTypeBottle = [
        new FillTypeBottle(true, orderColor.pop()),
        new FillTypeBottle(true, orderColor.pop()),
        new FillTypeBottle(true, orderColor.pop()),
        new FillTypeBottle(true, orderColor.pop())
      ]
      keyBottle = String(i)
      arrayBottle.push(
        <Bottle key={keyBottle} height={200} width={100} onClick={click} arrayFillTypeBottle={arrayFillTypeBottle}/>
      )
    }

    for (let i = 0; i < 2; i++) {
      keyBottle = String(countColor2 + i)
      arrayBottle.push(
        <Bottle key={keyBottle} height={200} width={100} onClick={click}/>
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
    </div>
  )
}

export default LevelPage
