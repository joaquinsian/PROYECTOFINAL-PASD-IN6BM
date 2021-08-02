import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotesComponent } from './edit-quotes.component';

describe('EditQuotesComponent', () => {
  let component: EditQuotesComponent;
  let fixture: ComponentFixture<EditQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
