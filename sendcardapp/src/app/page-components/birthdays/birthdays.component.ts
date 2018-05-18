import { Component, OnInit } from '@angular/core';
import { BirthdayReminderService } from '../birthday-reminder.service';
import { ReminderInt } from "../reminderInt";

@Component({
  selector: 'birthdays',
  templateUrl: './birthdays.component.html',
})
export class BirthdaysComponent implements OnInit {
  reminders: ReminderInt[] = [];

  constructor(private birthdayReminderService: BirthdayReminderService) {
  }

  ngOnInit(): void {
    this.birthdayReminderService
      .getReminders()
      .then(reminders => {
        console.log(reminders.length);
        this.reminders = this.birthdayReminderService
        .filterBirthdayContacts(reminders);
        console.log(this.reminders);
      });
  }

}
