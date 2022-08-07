import { Color } from 'src/models/color.model';
import { Line } from 'src/models/line.model';
import { SortingAlgorithm } from 'src/services/sortingService/sortingAlgorithms/sortingAlgorithm';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class MergeSortAlgorithm extends SortingAlgorithm {
  static override async sort(
    array: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (!array || array.length <= 1) {
      return;
    }

    await this.mergeSortRec(array, 0, array.length - 1, sleepToken, cancellationToken);
  }

  private static async mergeSortRec(
    array: Array<Line>,
    left: number,
    right: number,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ) {
    if (left === right) {
      return;
    }
    let mid: number = Math.floor((left + right) / 2);
    await this.mergeSortRec(array, left, mid, sleepToken, cancellationToken);
    await this.mergeSortRec(array, mid + 1, right, sleepToken, cancellationToken);
    await this.merge(array, left, mid, mid + 1, right, sleepToken, cancellationToken);
  }

  private static async merge(
    array: Array<Line>,
    leftIndex1: number,
    rightIndex1: number,
    leftIndex2: number,
    rightIndex2: number,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ) {
    for (var i = leftIndex1; i <= rightIndex2; i++) {
      array[i].color = Color.Red;
    }
    let temp: Array<number> = new Array();
    let leftIndex1Pointer: number = leftIndex1;
    let leftIndex2Pointer: number = leftIndex2;
    while (
      leftIndex1Pointer <= rightIndex1 ||
      leftIndex2Pointer <= rightIndex2
    ) {
      if (
        leftIndex2Pointer > rightIndex2 ||
        (leftIndex1Pointer <= rightIndex1 &&
          array[leftIndex1Pointer].value < array[leftIndex2Pointer].value)
      ) {
        temp.push(array[leftIndex1Pointer].value);
        leftIndex1Pointer++;
      } else {
        temp.push(array[leftIndex2Pointer].value);
        leftIndex2Pointer++;
      }
    }
    for (var i = 0; i <= rightIndex2 - leftIndex1; i++) {
      array[i + leftIndex1].color = Color.Green;
      await this.sleep(sleepToken, cancellationToken);
      array[i + leftIndex1].value = temp[i];
      array[i + leftIndex1].color = Color.Default;
    }
  }
}
