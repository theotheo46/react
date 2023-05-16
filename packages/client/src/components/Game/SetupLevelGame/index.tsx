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
import './SetupLevelGame.pcss'

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
      <div className="setup-level-header">
        <h1 className="setup-level-header__title">Головоломка</h1>
        <div className="setup-level-header__subtitle">
          Настройте начальный уровень сложности
        </div>
      </div>
      <div className="setup-level-body">
        <div className="setup-level-body__selector">
          <label className="setup-level-body__label">Количество цветов:</label>
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
        <div className="setup-level-body__selector">
          <label className="setup-level-body__label">
            Количество ярусов в бутылке:
          </label>
          <select
            onChange={e => dispatch(setCountLayersInBottle(+e.target.value))}
            value={countLayersInBottle}>
            {getLayersRange().map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="setup-level-body__selector">
          <label className="setup-level-body__label">
            Количество пустых бутылок:
          </label>
          <select
            onChange={e => dispatch(setCountEmptyBottles(+e.target.value))}
            value={countEmptyBottles}>
            {getBottlesRange().map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="setup-level-btn">
        <Button onClick={onStart}>Начать</Button>
      </div>
    </div>
  )
}

export default SetupLevelGame
