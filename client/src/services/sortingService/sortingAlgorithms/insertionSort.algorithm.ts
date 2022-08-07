import { Color } from 'src/models/color.model';
import { Line } from 'src/models/line.model';
import { SortingAlgorithm } from 'src/services/sortingService/sortingAlgorithms/sortingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class InsertionSortAlgorithm extends SortingAlgorithm {
  static override async sort(
    array: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!array || array.length <= 1) {
      return;
    }

    for (var i = 1; i < array.length; i++) {
      array[i].color = Color.Green;
      await this.sleep(sleepToken, cancellationToken);
      let j: number = i;
      while (j > 0 && array[j - 1].value > array[j].value) {
        let leftSwap: Line = new Line(
          array[j - 1].value,
          i === j ? Color.Green : Color.Default
        );
        let rightSwap: Line = new Line(array[j].value, Color.Red);
        [array[j], array[j - 1]] = [leftSwap, rightSwap];
        await this.sleep(sleepToken, cancellationToken);
        j--;
      }
      array[j].color = Color.Default;
      array[i].color = Color.Default;
    }
  }
}
