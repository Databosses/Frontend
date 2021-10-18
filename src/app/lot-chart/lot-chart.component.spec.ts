import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotChartComponent } from './lot-chart.component';

describe('LotChartComponent', () => {
  let component: LotChartComponent;
  let fixture: ComponentFixture<LotChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
