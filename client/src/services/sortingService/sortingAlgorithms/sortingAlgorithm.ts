import { CancelError } from 'src/errors/cancel.error';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { Line } from '../../../models/line.model';

export abstract class SortingAlgorithm {
  static async sort(_: Array<Line>, __: SleepToken, ___: CancellationToken): Promise<void> {
    throw new Error('Operation not supported.');
  }

  protected static async sleep(
    sleepToken: SleepToken,
    cancellationToken: CancellationToken
  ): Promise<void> {
    if (cancellationToken.isCancelled()) {
      throw new CancelError();
    }
    await sleepToken.sleep();
    if (cancellationToken.isCancelled()) {
      throw new CancelError();
    }
  }
}
