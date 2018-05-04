import { Component, OnInit } from '@angular/core';

import { ReminderInt } from './reminderInt';
import { BirthdayReminderService } from './birthday-reminder.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  reminders: ReminderInt[] = [];

  constructor(private birthdayReminderService: BirthdayReminderService) {}

  ngOnInit(): void {
    this.birthdayReminderService
      .getReminders()
      .then(reminders => (this.reminders = reminders.slice(1, 5)));
    console.log(`reminders: ${this.reminders}`);
  }
}
