import { PlayAction } from 'src/actions/play.action';
import { ShuffleAction } from 'src/actions/shuffle.action';
import { SizeAction } from 'src/actions/size.action';
import { SortingChoiceAction } from 'src/actions/sortingChoice.action';
import { SpeedAction } from 'src/actions/speed.action';

export interface ActionVisitor {
  onPlayAction(action: PlayAction): void;
  onShuffleAction(action: ShuffleAction): void;
  onSizeAction(action: SizeAction): void;
  onSpeedAction(action: SpeedAction): void;
  onSortingChoiceAction(action: SortingChoiceAction): void;
}
