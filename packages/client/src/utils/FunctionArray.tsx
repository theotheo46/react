import FillTypeColor from '../components/Bottle/FillTypeColor'

export class FunctionArray {
  // Статическая функция для перемешивания цветов.
  // Плюс чтобы не было цельной бутылки с одним цветом
  // Обязательно цвета должны отличатся
  public static shuffleArray(array: FillTypeColor[]) {
    const arrayCopy = array
    let resultArray: FillTypeColor[] = arrayCopy
    let lastValue: FillTypeColor = -1
    let countRepeated = 0
    let countInBottle = 0
    let restart = 1
    while (restart) {
      resultArray = arrayCopy
      restart = 0
      for (let i = resultArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = resultArray[i]
        resultArray[i] = resultArray[j]
        resultArray[j] = temp
        if (resultArray[i].id === lastValue) {
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
          lastValue = resultArray[i].id
        }
      }
    }
    array = resultArray
  }
}
