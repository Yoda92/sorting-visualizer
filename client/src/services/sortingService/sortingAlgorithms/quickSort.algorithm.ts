import { Color } from 'src/models/color.model';
import { Line } from 'src/models/line.model';
import { SortingAlgorithm } from 'src/services/sortingService/sortingAlgorithms/sortingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class QuickSortAlgorithm extends SortingAlgorithm {
  static override async sort(
    array: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!array || array.length <= 1) {
      return;
    }

    await this.quickkSortRec(
      array,
      0,
      array.length - 1,
      sleepToken,
      cancellationToken
    );
  }

  private static async quickkSortRec(
    array: Array<Line>,
    start: number,
    end: number,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ) {
    if (start >= end) {
      return;
    }

    let p: number = await this.partition(
      array,
      start,
      end,
      sleepToken,
      cancellationToken
    );

    await this.quickkSortRec(array, start, p - 1, sleepToken, cancellationToken);
    await this.quickkSortRec(array, p + 1, end, sleepToken, cancellationToken);
  }

  private static async partition(
    array: Array<Line>,
    start: number,
    end: number,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<number> {
    let pivot: number = array[end].value;
    array[end].color = Color.Green;
    let i: number = start - 1;
    for (var j = start; j < end; j++) {
      if (array[j].value < pivot) {
        i++;
        array[i].color = Color.Red;
        array[j].color = Color.Red;
        await this.sleep(sleepToken, cancellationToken);
        [array[i], array[j]] = [array[j], array[i]];
        array[i].color = Color.Default;
        array[j].color = Color.Default;
      }
    }
    array[i + 1].color = Color.Red;
    await this.sleep(sleepToken, cancellationToken);
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    array[i + 1].color = Color.Default;
    array[end].color = Color.Default;
    return i + 1;
  }
}
