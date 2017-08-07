/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessageChartComponent } from './messageChart.component';

describe('MessageChartComponent', () => {
  let component: MessageChartComponent;
  let fixture: ComponentFixture<MessageChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});