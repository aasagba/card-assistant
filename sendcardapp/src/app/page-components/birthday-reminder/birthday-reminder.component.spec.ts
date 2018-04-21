import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayReminderComponent } from './birthday-reminder.component';

describe('BirthdayReminderComponent', () => {
  let component: BirthdayReminderComponent;
  let fixture: ComponentFixture<BirthdayReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthdayReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
