import createRange from '../../../helpers/createRange'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  setCountColors,
  setCountEmptyBottles,
  setCountLayersInBottle,
  updateLayersInBottle,
} from '../../../store/slices/levelSlice'
import Button from '../../Button'
import { FaArrowLeft } from 'react-icons/fa'

interface Props {
  onCancelSettings: () => void
  onStart: () => void
}

const SetupLevelGame = ({ onCancelSettings, onStart }: Props) => {
  const iconBackStyle = { fill: 'var(--color-text-gray)', fontSize: '1.25rem' }

  const {
    countColors,
    countLayersInBottle,
    countEmptyBottles,
    minCountColors,
    maxCountColors,
    minCountLayersInBottle,
    maxCountLayersInBottle,
    minCountEmptyBottles,
    maxCountEmptyBottles,
  } = useAppSelector(state => state.level)

  const dispatch = useAppDispatch()

  const getColorsRange = () => {
    return createRange(minCountColors, maxCountColors)
  }

  const getLayersRange = () => {
    return createRange(minCountLayersInBottle, maxCountLayersInBottle)
  }

  const getBottlesRange = () => {
    return createRange(minCountEmptyBottles, maxCountEmptyBottles)
  }

  return (
    <div className="card card_full">
      <Button onClick={onCancelSettings} styleType="tertiary">
        <FaArrowLeft style={iconBackStyle} />
        Назад
      </Button>
      <h1>Головоломка</h1>
      <p>Настройте начальный уровень сложности</p>
      <div>
        <div>
          Количество цветов:
          <select
            onChange={e => {
              dispatch(setCountColors(+e.target.value))
              dispatch(updateLayersInBottle())
            }}
            value={countColors}>
            {getColorsRange().map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          Количество ярусов в бутылке:
          <select
            onChange={e => dispatch(setCountLayersInBottle(+e.target.value))}
            value={countEmptyBottles}>
            {getLayersRange().map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          Количество пустых бутылок:
          <select
            onChange={e => dispatch(setCountEmptyBottles(+e.target.value))}
            value={countLayersInBottle}>
            {getBottlesRange().map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button onClick={onStart}>Start</Button>
    </div>
  )
}

export default SetupLevelGame
