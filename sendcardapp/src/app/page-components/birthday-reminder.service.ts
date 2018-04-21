import { ReminderInt } from './reminderInt';
import Reminders from './mock-reminders';
import { Injectable } from '@angular/core';

@Injectable()
export class BirthdayReminderService {
  getReminders(): Promise<ReminderInt[]> {
    return Promise.resolve(Reminders);
  }

  getReminder(id: number): Promise<ReminderInt> {
    return this.getReminders()
      .then(reminders =>
        reminders.find((reminder) => {
          return reminder.id === id
        }));
  }
}
