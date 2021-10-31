import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectDetailsGridComponent } from './defect-details-grid.component';

describe('DefectDetailsGridComponent', () => {
  let component: DefectDetailsGridComponent;
  let fixture: ComponentFixture<DefectDetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectDetailsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectDetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
