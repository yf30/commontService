import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDataDetailComponent } from './live-data-detail.component';

describe('LiveDataDetailComponent', () => {
  let component: LiveDataDetailComponent;
  let fixture: ComponentFixture<LiveDataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDataDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
