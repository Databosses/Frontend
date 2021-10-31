import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGridComponent } from './defect-grid.component';

describe('DefectGridComponent', () => {
  let component: DefectGridComponent;
  let fixture: ComponentFixture<DefectGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
