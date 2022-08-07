import { ChoiceItem } from 'src/models/choiceItem.model';
import { SortingType } from 'src/models/sortingType.model';
import { InsertionSort } from 'src/sortingTypes/insertionSort';
import { MergeSort } from 'src/sortingTypes/mergeSort';

export class SortingAlgorithmUtility {
  public static getSortingAlgorithmChoices(): Array<ChoiceItem<SortingType>> {
    let sortingAlgorithmChoices: Array<ChoiceItem<SortingType>> = [
      { label: 'Insertion Sort', value: new InsertionSort() },
      { label: 'Merge Sort', value: new MergeSort() },
    ];

    return sortingAlgorithmChoices;
  }
}
