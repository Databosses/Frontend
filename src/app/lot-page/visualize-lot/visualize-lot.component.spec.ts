import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeLotComponent } from './visualize-lot.component';

describe('VisualizeLotComponent', () => {
  let component: VisualizeLotComponent;
  let fixture: ComponentFixture<VisualizeLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
