import { Component } from '@angular/core';
import { PlayAction } from 'src/actions/play.action';
import { ShuffleAction } from 'src/actions/shuffle.action';
import { SizeAction } from 'src/actions/size.action';
import { SpeedAction } from 'src/actions/speed.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';
import { Color } from 'src/models/color.model';
import { Line } from 'src/models/line.model';
import { SortingType } from 'src/models/sortingType.model';
import { StateService } from 'src/services/stateService/state.service';
import { SortingService } from 'src/services/sortingService/sorting.service';
import { CancellationToken } from 'src/tokens/cancelation.token';
import { SleepToken } from 'src/tokens/sleep.token';
import { ArrayUtility } from 'src/utilities/array.utility';
import { SortingChoiceAction } from 'src/actions/sortingChoice.action';
import { ChoiceItem } from 'src/models/choiceItem.model';

@Component({
  selector: 'app-sorting-visualization',
  templateUrl: './sorting-visualization.component.html',
  styleUrls: ['./sorting-visualization.component.css'],
})
export class SortingVisualizationComponent implements ActionVisitor {
  public lines: Array<Line>;
  public linesMaxValue: number;
  private sortingChoice: ChoiceItem<SortingType>
  private sleepToken: SleepToken;
  private cancellationToken: CancellationToken;

  constructor(private stateService: StateService, private sortingService: SortingService) {
    this.stateService.observeAction().subscribe((action: Action) => this.handleAction(action))
    let actionState: ActionState = this.stateService.getActionState();
    this.lines = this.generateLines(actionState.size);
    ArrayUtility.shuffle(this.lines);
    this.linesMaxValue = ArrayUtility.max(this.lines.map(line => line.value));
    this.sleepToken = new SleepToken(actionState.speed);
    this.cancellationToken = new CancellationToken(actionState.isPlaying);
    this.sortingChoice = actionState.sortingType;
  }

  public onShuffleAction(_: ShuffleAction): void {
    if (!this.lines || this.lines.length <= 0) {
      return;
    }
    ArrayUtility.shuffle(this.lines);
  }

  public onPlayAction(action: PlayAction): void {
    if(action.getValue()) {
      this.cancellationToken.setCancelled(false);
      this.play();
    } else {
      this.cancellationToken.setCancelled(true);
      this.clear();
    }
  }

  public onSizeAction(action: SizeAction): void {
    this.lines = this.generateLines(action.getValue());
    ArrayUtility.shuffle(this.lines);
    this.linesMaxValue = ArrayUtility.max(this.lines.map(line => line.value));
  }

  public onSpeedAction(action: SpeedAction): void {
    this.sleepToken.setValue(action.getValue());
  }

  public onSortingChoiceAction(action: SortingChoiceAction): void {
    this.sortingChoice = action.getValue();
  }

  private handleAction(action: Action) {
    action.accept(this);
  }

  private async play() {
    await this.sortingService.sort(this.lines, this.sleepToken, this.cancellationToken, this.sortingChoice.value)
    .finally(() => this.stateService.publishIsPlaying(false))
  }

  private generateLines(amount: number): Array<Line> {
    let generatedLines: Array<Line> = new Array<Line>;

    for(var i = 1; i <= amount; i++) {
      let line: Line = {
        value: i,
        color: Color.Default
      };

      generatedLines.push(line);
    }

    return generatedLines;
  }

  private clear(): void {
    if (!this.lines) {
      return;
    }

    this.lines.forEach(line => line.color = Color.Default);
  }
}
