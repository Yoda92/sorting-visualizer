import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  faCirclePlay,
  faCircleStop,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { PlayAction } from 'src/actions/play.action';
import { ShuffleAction } from 'src/actions/shuffle.action';
import { SizeAction } from 'src/actions/size.action';
import { SortingChoiceAction } from 'src/actions/sortingChoice.action';
import { SpeedAction } from 'src/actions/speed.action';
import { Action } from 'src/models/action.model';
import { ActionState } from 'src/models/actionState.model';
import { ActionVisitor } from 'src/models/actionVisitor.model';
import { ChoiceItem } from 'src/models/choiceItem.model';
import { SortingType } from 'src/models/sortingType.model';
import { StateService } from 'src/services/stateService/state.service';
import { SortingAlgorithmUtility } from 'src/utilities/sortingAlgorithm.utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements ActionVisitor, OnInit {
  @ViewChild('hamburger') hamburger?: ElementRef<HTMLInputElement>;
  @ViewChild('navmenu') navmenu?: ElementRef<HTMLInputElement>;
  public faCirclePlay = faCirclePlay;
  public faCircleStop = faCircleStop;
  public faShuffle = faShuffle;
  public isPlaying: boolean;
  public speed: number;
  public size: number;
  public sortingAlgorithmChoices: Array<ChoiceItem<SortingType>>;
  public selectedSortingAlgorithm: ChoiceItem<SortingType>;

  constructor(private stateService: StateService) {
    let actionState: ActionState = this.stateService.getActionState();
    this.isPlaying = actionState.isPlaying;
    this.speed = actionState.speed;
    this.size = actionState.size;
    this.selectedSortingAlgorithm = actionState.sortingType;
    this.sortingAlgorithmChoices =
      SortingAlgorithmUtility.getSortingAlgorithmChoices();
    this.stateService
      .observeAction()
      .subscribe((action: Action) => this.handleAction(action));
  }

  ngOnInit(): void {
    document.querySelectorAll('.nav-item').forEach((navItem) => {
      navItem.addEventListener('click', () => this.closeHamburgerMenu());
    });
  }

  public closeHamburgerMenu(): void {
    this.hamburger?.nativeElement.classList.remove('active');
    this.navmenu?.nativeElement.classList.remove('active');
  }

  public onHamburgerClick(): void {
    this.hamburger?.nativeElement.classList.toggle('active');
    this.navmenu?.nativeElement.classList.toggle('active');
  }

  public onPlayAction(action: PlayAction): void {
    this.isPlaying = action.getValue();
  }

  public onShuffleAction(_: ShuffleAction): void {}

  public onSizeAction(_: SizeAction): void {}

  public onSpeedAction(_: SpeedAction): void {}

  public onSortingChoiceAction(_: SortingChoiceAction): void {}

  public onSortingChoiceChange(item: ChoiceItem<SortingType>): void {
    this.stateService.publishSortingChoice(item);
  }

  public onStartStopClick(): void {
    this.isPlaying = !this.isPlaying;
    this.stateService.publishIsPlaying(this.isPlaying);
    if (this.isPlaying) {
      this.closeHamburgerMenu();
    }
  }

  public onShuffleClick(): void {
    this.stateService.publishShuffle();
  }

  public onSpeedChange(): void {
    this.stateService.publishSpeed(this.speed);
  }

  public onSizeChange(): void {
    this.stateService.publishSize(this.size);
  }

  private handleAction(action: Action) {
    action.accept(this);
  }
}
