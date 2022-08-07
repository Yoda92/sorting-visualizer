import { Action } from "src/models/action.model";
import { ActionVisitor } from "src/models/actionVisitor.model";
import { ChoiceItem } from "src/models/choiceItem.model";
import { SortingType } from "src/models/sortingType.model";

export class SortingChoiceAction implements Action {
    private value: ChoiceItem<SortingType>;
  
    constructor(value: ChoiceItem<SortingType>) {
      this.value = value;
    }
  
    getValue(): ChoiceItem<SortingType> {
      return this.value;
    }
  
    setValue(value: ChoiceItem<SortingType>): void {
      this.value = value;
    }
  
    accept(visitor: ActionVisitor) {
      visitor.onSortingChoiceAction(this);
    } 
  }
  