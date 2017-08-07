import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpLogRecordComponent } from './ccp-log-record.component';

describe('CcpLogRecordComponent', () => {
  let component: CcpLogRecordComponent;
  let fixture: ComponentFixture<CcpLogRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcpLogRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpLogRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
