import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatByIdComponent } from './chat-by-id.component';

describe('ChatByIdComponent', () => {
  let component: ChatByIdComponent;
  let fixture: ComponentFixture<ChatByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
