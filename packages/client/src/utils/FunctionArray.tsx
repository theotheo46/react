import FillTypeColor from '../components/Bottle/FillTypeColor'

const colorForLevel = [
  '#36d35d',
  '#fafa89',
  '#A78BFA',
  '#e65353',
  '#fac289',
  '#3a4743',
  '#9c6805',
  '#069370',
  '#930606',
  '#060693',
]

export class FunctionArray {
  public static getShuffledArrayByNumberColor(
    countColors: number,
    countLayersInBottle: number
  ): InstanceType<typeof FillTypeColor>[] {
    const orderColor: InstanceType<typeof FillTypeColor>[] = []
    for (let i = 0; i < countColors; i++) {
      for (let j = 0; j < countLayersInBottle; j++) {
        orderColor.push(new FillTypeColor(i, colorForLevel[i]))
      }
    }

    this.shuffleArray(orderColor)
    return orderColor
  }

  public static shuffleArray(array: InstanceType<typeof FillTypeColor>[]) {
    const arrayCopy = array
    let resultArray: InstanceType<typeof FillTypeColor>[] = arrayCopy
    let lastValue = -1
    let countRepeated = 0
    let countInBottle = 0
    let restart = 1
    while (restart) {
      resultArray = arrayCopy
      restart = 0
      fillArrayWithColors()
    }
    array = resultArray

    function fillArrayWithColors() {
      for (let i = resultArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = resultArray[i]
        resultArray[i] = resultArray[j]
        resultArray[j] = temp
        if (resultArray[i].id === lastValue) {
          countRepeated = countRepeated + 1
        } else {
          countRepeated = 0
        }
        if (countRepeated >= 3) {
          setRestartValues()
          break
        }
        countInBottle = countInBottle + 1
        if (countInBottle >= 4) {
          resetRestrictions()
        } else {
          lastValue = resultArray[i].id
        }
      }
    }

    function resetRestrictions() {
      countInBottle = 0
      countRepeated = 0
      lastValue = -1
    }

    function setRestartValues() {
      restart = 1
      resetRestrictions()
    }
  }
}
