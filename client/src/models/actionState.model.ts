import { ChoiceItem } from './choiceItem.model';
import { SortingType } from './sortingType.model';

export class ActionState {
  speed: number;
  size: number;
  isPlaying: boolean;
  sortingType: ChoiceItem<SortingType>;

  constructor(
    speed: number,
    size: number,
    isPlaying: boolean,
    sortingType: ChoiceItem<SortingType>
  ) {
    this.speed = speed;
    this.size = size;
    this.isPlaying = isPlaying;
    this.sortingType = sortingType;
  }
}
