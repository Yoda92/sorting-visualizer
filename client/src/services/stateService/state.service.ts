import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlayAction } from 'src/actions/play.action';
import { ShuffleAction } from 'src/actions/shuffle.action';
import { SizeAction } from 'src/actions/size.action';
import { SortingChoiceAction } from 'src/actions/sortingChoice.action';
import { SpeedAction } from 'src/actions/speed.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { SortingType } from 'src/models/sortingType.model';
import { StateServiceHelper } from './stateServiceHelper';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private actionSubject: Subject<Action>;
  private actionState: ActionState;

  private constructor() {
    this.actionSubject = new Subject();
    this.actionState = StateServiceHelper.createInitActionState();
  }

  public getActionState(): ActionState {
    return this.actionState;
  }

  public observeAction(): Observable<Action> {
    return this.actionSubject.asObservable();
  }

  public publishIsPlaying(value: boolean): void {
    this.actionState.isPlaying = value;
    this.publishAction(new PlayAction(this.actionState.isPlaying));
  }

  public publishShuffle(): void {
    this.publishAction(new ShuffleAction());
  }

  public publishSpeed(value: number): void {
    this.actionState.speed = value;
    this.publishAction(new SpeedAction(this.actionState.speed));
  }

  public publishSize(value: number): void {
    this.actionState.size = value;
    this.publishAction(new SizeAction(this.actionState.size));
  }

  public publishSortingChoice(value: ChoiceItem<SortingType>): void {
    this.actionState.sortingType = value;
    this.publishAction(new SortingChoiceAction(this.actionState.sortingType));
  }

  private publishAction(action: Action): void {
    this.actionSubject.next(action);
  }
}
