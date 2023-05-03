import FillTypeColor from '../components/Bottle/FillTypeColor'

export class FunctionArray {
  public static shuffleArray(array: FillTypeColor[]) {
    const arrayCopy = array
    let resultArray: InstanceType<typeof FillTypeColor>[] = arrayCopy
    let lastValue: InstanceType<typeof FillTypeColor> = -1
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
