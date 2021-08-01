import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPollComponent } from './initial-poll.component';

describe('InitialPollComponent', () => {
  let component: InitialPollComponent;
  let fixture: ComponentFixture<InitialPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialPollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
