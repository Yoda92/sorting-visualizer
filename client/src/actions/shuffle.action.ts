import { Action } from 'src/models/action.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';

export class ShuffleAction implements Action {
  constructor() {}
  accept(visitor: ActionVisitor) {
    visitor.onShuffleAction(this);
  }
}
