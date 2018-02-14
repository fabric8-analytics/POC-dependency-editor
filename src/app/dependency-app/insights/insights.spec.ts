import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightComponent } from './insights.component';

describe('CurrentprojectComponent', () => {
  let component: InsightComponent;
  let fixture: ComponentFixture<InsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
