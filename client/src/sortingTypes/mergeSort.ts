import { Line } from 'src/models/line.model';
import { SortingType } from 'src/models/sortingType.model';
import { SortingVisitor } from 'src/models/sortingVisitor.model';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';

export class MergeSort implements SortingType {
  public async accept(
    visitor: SortingVisitor,
    lines: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return visitor.mergeSort(lines, sleepToken, cancellationToken);
  }
}
