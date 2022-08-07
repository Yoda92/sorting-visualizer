import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingVisualizationComponent } from './sorting-visualization.component';

describe('SortingVisualizationComponent', () => {
  let component: SortingVisualizationComponent;
  let fixture: ComponentFixture<SortingVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingVisualizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
