import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllScoresComponent } from './get-all-scores.component';

describe('GetAllScoresComponent', () => {
  let component: GetAllScoresComponent;
  let fixture: ComponentFixture<GetAllScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
