import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpLogDetailComponent } from './ccp-log-detail.component';

describe('CcpLogDetailComponent', () => {
  let component: CcpLogDetailComponent;
  let fixture: ComponentFixture<CcpLogDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcpLogDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpLogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
