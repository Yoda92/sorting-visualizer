import { Injectable } from '@angular/core';
import { Line } from 'src/models/line.model';
import { InsertionSortAlgorithm } from './sortingAlgorithms/insertionSort.algorithm';
import { SleepToken } from 'src/tokens/sleep.token';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { CancelError } from 'src/errors/cancel.error';
import { SortingType } from 'src/models/sortingType.model';
import { SortingVisitor } from 'src/models/sortingVisitor.model';
import { MergeSortAlgorithm } from './sortingAlgorithms/mergeSort.algorithm';

@Injectable({
  providedIn: 'root',
})
export class SortingService implements SortingVisitor {
  constructor() {}
  public async sort(
    lines: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken,
    sortingType: SortingType
  ): Promise<void> {
    return sortingType.accept(this, lines, sleepToken, cancellationToken);
  }

  public async mergeSort(
    lines: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return MergeSortAlgorithm.sort(lines, sleepToken, cancellationToken).catch(
        this.handleError
      );
  }

  public async insertionSort(
    lines: Array<Line>,
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    return InsertionSortAlgorithm.sort(lines, sleepToken, cancellationToken).catch(
      this.handleError
    );
  }

  private handleError(error: unknown): void {
    if (error instanceof CancelError) {
      return;
    }

    throw error;
  }
}
