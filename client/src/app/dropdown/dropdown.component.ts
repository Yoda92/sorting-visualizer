import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { SortingType } from 'src/models/sortingType.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class DropdownComponent {
  @Input() items: Array<ChoiceItem<SortingType>>;
  @Input() selectedItem: ChoiceItem<SortingType> | undefined;
  @Input() disabled: boolean;
  @Output() selectedItemChange: EventEmitter<ChoiceItem<SortingType>>;
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (
      !!event.target &&
      !this.elementRef?.nativeElement?.contains(event.target)
    ) {
      this.isActive = false;
    }
  }
  public faChevronDown = faChevronDown;
  public faChevronUp = faChevronUp;
  public isActive: boolean;
  constructor(private elementRef: ElementRef) {
    this.items = [];
    this.isActive = false;
    this.disabled = false;
    this.selectedItemChange = new EventEmitter<ChoiceItem<SortingType>>();
  }

  public onOpenCloseClick(): void {
    this.isActive = !this.isActive;
  }

  public onItemClick(item: ChoiceItem<SortingType>) {
    this.selectedItem = item;
    this.isActive = false;
    this.selectedItemChange.emit(item);
  }
}
