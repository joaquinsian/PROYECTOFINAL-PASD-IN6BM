import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameByIdComponent } from './game-by-id.component';

describe('GameByIdComponent', () => {
  let component: GameByIdComponent;
  let fixture: ComponentFixture<GameByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
