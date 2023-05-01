import FillTypeColor from './FillTypeColor'

class FillTypeBottle {
  isFill: boolean;
  color: FillTypeColor;


  constructor(isFill: boolean, color: FillTypeColor) {
    this.isFill = isFill
    this.color = color
  }
}

export default FillTypeBottle

