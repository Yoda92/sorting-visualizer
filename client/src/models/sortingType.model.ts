import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Line } from './line.model';
import { SortingVisitor } from './sortingVisitor.model';

export interface SortingType {
  accept(
    visitor: SortingVisitor,
    lines: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): void;
}
