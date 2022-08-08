import { ChoiceItem } from 'src/models/choiceItem.model';
import { SortingType } from 'src/models/sortingType.model';
import { BubbleSort } from 'src/sortingTypes/bubbleSort';
import { InsertionSort } from 'src/sortingTypes/insertionSort';
import { MergeSort } from 'src/sortingTypes/mergeSort';
import { QuickSort } from 'src/sortingTypes/quickSort';

export class SortingAlgorithmUtility {
  public static getSortingAlgorithmChoices(): Array<ChoiceItem<SortingType>> {
    let sortingAlgorithmChoices: Array<ChoiceItem<SortingType>> = [
      { label: 'Insertion Sort', value: new InsertionSort() },
      { label: 'Merge Sort', value: new MergeSort() },
      { label: 'Bubble Sort', value: new BubbleSort() },
      { label: 'Quick Sort', value: new QuickSort() },
    ];

    return sortingAlgorithmChoices;
  }
}
