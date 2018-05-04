import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reminder } from './reminder.component';

describe('ReminderComponent', () => {
  let component: Reminder;
  let fixture: ComponentFixture<Reminder>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Reminder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reminder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
