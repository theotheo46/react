const createPath2DPolyfill = async () => {
  let Path2DPolyfill: Path2DConstructor | null = null

  if (typeof window == 'undefined') {
    //@ts-ignore
    global.window = {}
    const { Path2D } = await import('path2d-polyfill')
    /*
      Path2DPolyfill = Path2D || function(){}
      Только с помощью такой странной конструкции получилось запустить сборку
      Допускаю, что я недоконца понимаю как имплементировать библиотеку с полифилом
      Поэтому если в Path2D undefined, то я создаю пустую функцию у которой есть конструктор
      в это случае пропадает ошибка TypeError: Path2D2 is not a constructor, которая ломает сборку
    */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Path2DPolyfill = Path2D || function () {}
  } else {
    Path2DPolyfill = window.Path2D
  }

  return Path2DPolyfill
}

export default createPath2DPolyfill
