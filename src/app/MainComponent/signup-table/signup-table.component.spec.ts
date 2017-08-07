import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTableComponent } from './signup-table.component';

describe('SignupTableComponent', () => {
  let component: SignupTableComponent;
  let fixture: ComponentFixture<SignupTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
