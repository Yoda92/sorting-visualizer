import { ActionState } from 'src/models/actionState.model';
import { SortingAlgorithmUtility } from 'src/utilities/sortingAlgorithm.utility';

export class StateServiceHelper {
  private static readonly defaultSpeed: number = 250;
  private static readonly defaultSize: number = 50;
  private static readonly defaultIsPlaying: boolean = false;
  private static readonly defaultSortingAlgorithmChoice =
    SortingAlgorithmUtility.getSortingAlgorithmChoices()[0];

  public static createInitActionState(): ActionState {
    let actionState: ActionState = new ActionState(
      StateServiceHelper.defaultSpeed,
      StateServiceHelper.defaultSize,
      StateServiceHelper.defaultIsPlaying,
      StateServiceHelper.defaultSortingAlgorithmChoice
    );

    return actionState;
  }
}
