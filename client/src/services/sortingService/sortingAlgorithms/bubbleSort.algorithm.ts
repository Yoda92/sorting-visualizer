import { Color } from 'src/models/color.model';
import { Line } from 'src/models/line.model';
import { SortingAlgorithm } from 'src/services/sortingService/sortingAlgorithms/sortingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class BubbleSortAlgorithm extends SortingAlgorithm {
  static override async sort(
    array: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!array || array.length <= 1) {
      return;
    }

    let swapped: boolean = true;

    while (swapped) {
      swapped = false;
      for (var i = 1; i < array.length; i++) {
        if (array[i - 1].value > array[i].value) {
          array[i - 1].color = Color.Red;
          array[i].color = Color.Red;
          await this.sleep(sleepToken, cancellationToken);
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
          array[i - 1].color = Color.Default;
          array[i].color = Color.Default;
          swapped = true;
        }
      }
    }
  }
}
