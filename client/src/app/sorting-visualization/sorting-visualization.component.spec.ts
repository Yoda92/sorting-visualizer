import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineColorClassPipe } from 'src/pipes/lineColorClass.pipe';
import { LineHeightStylePipe } from 'src/pipes/lineHeightStyle.pipe';
import { LineWidthStylePipe } from 'src/pipes/lineWidthStyle.pipe';

import { SortingVisualizationComponent } from './sorting-visualization.component';

describe('SortingVisualizationComponent', () => {
  let component: SortingVisualizationComponent;
  let fixture: ComponentFixture<SortingVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SortingVisualizationComponent,
        LineColorClassPipe,
        LineHeightStylePipe,
        LineWidthStylePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
