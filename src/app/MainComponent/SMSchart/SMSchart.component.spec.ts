/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SMSchartComponent } from './SMSchart.component';

describe('SMSchartComponent', () => {
  let component: SMSchartComponent;
  let fixture: ComponentFixture<SMSchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMSchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMSchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});