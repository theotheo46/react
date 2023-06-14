import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setIdTypeContourBottle } from '../../store/slices/levelSlice'
import { TypeBottleArray } from '../../utils/TypeBottleArray'

export interface Props {
  height: number
  width: number
}

const SpinBottle = ({ height, width }: Props) => {
  const [svgPathBottle, setSvgPathBottle] = useState<string>()
  const [scaleHeight, setScaleHeight] = useState<string>()
  const dispatch = useAppDispatch()
  const { idTypeContourBottle } = useAppSelector(state => state.level)

  useEffect(() => {
    setSvgPathBottle(
      TypeBottleArray.getStringPathContourBottleById(idTypeContourBottle)
    )
    setScaleHeight(
      'scale(' + height / 180.0 + ', ' + height / 180.0 + ') translate(50,5)'
    )
  }, [idTypeContourBottle])

  const nextBottle = () => {
    dispatch(setIdTypeContourBottle(idTypeContourBottle + 1))
  }

  const prevBottle = () => {
    dispatch(setIdTypeContourBottle(idTypeContourBottle - 1))
  }

  return (
    <div style={{ display: 'inline-flex', width: width, height: height }}>
      <div style={{ width: width - 40, height: height }}>
        <svg height={height} width={width - 40}>
          <path
            strokeWidth="3"
            transform={scaleHeight}
            d={svgPathBottle}
            fill="transparent"
            stroke="var(--color-orange)"
          />
        </svg>
      </div>
      <div style={{ width: 40, height: height }}>
        <div style={{ width: 40, height: height / 2 }} onClick={prevBottle}>
          <svg height={height / 2} width={40}>
            <path
              transform="translate(5,20)"
              d="M1.3296 13.2737L29.0855 13.2737C30.0376 13.2737 30.451 12.0689 29.6994 11.4843L15.5596 0.486721C15.1931 0.201648 14.6786 0.206374 14.3173 0.498131L0.701259 11.4957C-0.0322915 12.0882 0.386658 13.2737 1.3296 13.2737Z"
              fill="var(--color-orange)"
            />
          </svg>
        </div>
        <div style={{ width: 40, height: height / 2 }} onClick={nextBottle}>
          <svg height={height / 2} width={40}>
            <path
              transform="translate(5,20)"
              d="M29.1704 0H1.41454C0.462381 0 0.04901 1.20479 0.800596 1.78935L14.9404 12.787C15.3069 13.072 15.8214 13.0673 16.1827 12.7756L29.7987 1.77794C30.5323 1.18546 30.1133 0 29.1704 0Z"
              fill="var(--color-orange)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SpinBottle
