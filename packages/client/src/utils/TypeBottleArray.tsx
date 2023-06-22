/* eslint-disable prefer-const */
// import TypeContourBottle from '../components/Bottle/TypeContourBottle'
import getTypeContourBottle from '../components/Bottle/TypeContourBottle'
import { UserThemes } from '../store/slices/userSlice/types'

let typeContourBottleForLevel: any[]

getTypeContourBottle().then(TypeContourBottle => {
  typeContourBottleForLevel = [
    new TypeContourBottle(
      0,
      'M19.9884 2.39825C19.7922 1.15284 20.7364 0 21.9972 0C28.3991 0 34.801 0 41.2029 0C42.4919 0 43.4418 1.2049 43.2 2.47106C39.982 19.3204 44.9518 33.4556 58.1096 44.8767C59.8356 46.3749 62.7226 50.3788 62.7123 54.0822C62.6089 91.239 62.0452 127.283 61.0212 164.438C61 165.208 60.543 165.906 59.809 166.139C53.968 167.998 41.5579 167.985 32.2192 168C22.7561 167.983 12.5093 167.302 3.40119 165.956C2.4336 165.813 1.7214 164.982 1.71472 164.003C1.47645 129.076 0.904873 94.1618 0 59.2603C0.106092 55.4722 1.03041 51.8945 2.77309 48.5269C2.84135 48.395 2.92549 48.2719 3.02216 48.1591C7.50323 42.9311 11.9843 37.7033 16.4654 32.4753C16.6107 32.3058 16.7271 32.1126 16.8077 31.9043C20.5157 22.3143 21.576 12.4789 19.9884 2.39825Z'
    ),
    new TypeContourBottle(
      1,
      'M6.62522 0C25.5837 0 44.5418 0 63.5002 0C65.3319 0.487889 66.6445 1.65456 67.4377 3.50001C68.5031 11.7924 69.524 19.9591 70.5002 28.0001C70.5002 40.2501 70.5002 52.5002 70.5002 64.7502C67.1714 81.878 63.6714 99.0862 60.0002 116.375C60.0002 116.813 60.0002 117.688 60.0002 117.688C60.0002 117.688 60.0002 116.375 60.0002 118.125C57.7566 131.136 58.34 148.052 63.5002 160.126C62.8967 163.996 60.855 166.621 57.3752 168.001C42.5002 168.001 27.6252 168.001 12.7502 168.001C9.81648 166.09 8.06653 163.32 7.50022 159.688C9.16177 155.87 10.4742 151.933 11.4377 147.876C12.0211 139.125 12.0211 130.375 11.4377 121.625C7.8938 102.52 4.24804 83.5615 0.500244 64.7502C0.500244 52.2085 0.500244 39.6668 0.500244 27.1251C1.10951 20.8217 1.83865 14.405 2.68773 7.87503C3.10048 4.71586 4.41296 2.09085 6.62522 0Z'
    ),
    new TypeContourBottle(
      2,
      'M4.85677 169L63.497 169C65.8931 169 67.7516 166.908 67.4691 164.528L52.8333 41.25L52.8333 5C52.8333 2.79086 51.0425 1 48.8333 1L20.0833 1C17.8742 1 16.0833 2.79087 16.0833 5L16.0833 41.25L0.886825 164.511C0.592758 166.896 2.45348 169 4.85677 169Z'
    ),
  ]
})

export class TypeBottleArray {
  public static getStepAnimation(): number {
    return 25
  }

  public static drawFillBackgroundBottle(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    offsetYForShadedPartBottle: number,
    colorShadedPart: string
  ) {
    context.beginPath()
    context.fillStyle = colorShadedPart
    context.fillRect(0, offsetYForShadedPartBottle, width, height)
    context.closePath()
  }

  public static drawStrokeBottle(
    context: CanvasRenderingContext2D,
    idTypeBottle: number,
    appTheme: UserThemes = 'light'
  ) {
    context.lineWidth = 3
    context.strokeStyle = appTheme === 'light' ? '#000' : '#e8e8f2'
    context.stroke(this.getPathContourBottleById(idTypeBottle))
    context.closePath()
  }

  public static clipStrokeBottle(
    context: CanvasRenderingContext2D,
    idTypeBottle: number,
    offsetYForSelectBottle: number
  ) {
    context.translate(10, 20 + offsetYForSelectBottle)
    context.clip(this.getPathContourBottleById(idTypeBottle))
  }

  public static getPathContourBottleById(idFind: number): Path2D {
    for (let typeContourBottleForLevelElement of typeContourBottleForLevel) {
      if (typeContourBottleForLevelElement.id === idFind) {
        return typeContourBottleForLevelElement.path
      }
    }
    return typeContourBottleForLevel[0].path
  }

  public static getStringPathContourBottleById(idFind: number): string {
    for (let typeContourBottleForLevelElement of typeContourBottleForLevel) {
      if (typeContourBottleForLevelElement.id === idFind) {
        return typeContourBottleForLevelElement.pathStr
      }
    }
    return typeContourBottleForLevel[0].pathStr
  }
}
