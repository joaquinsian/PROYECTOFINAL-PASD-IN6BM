import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingRequestsComponent } from './awaiting-requests.component';

describe('AwaitingRequestsComponent', () => {
  let component: AwaitingRequestsComponent;
  let fixture: ComponentFixture<AwaitingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
