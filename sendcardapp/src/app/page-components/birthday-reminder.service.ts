import { ReminderInt } from './reminderInt';
import Reminders from './mock-reminders';
import { Injectable } from '@angular/core';

@Injectable()
export class BirthdayReminderService {

  getReminders(): Promise<ReminderInt[]> {
    return Promise.resolve(Reminders);
  }

  getReminder(id: number): Promise<ReminderInt> {
    return this.getReminders().then(reminders =>
      reminders.find(reminder => {
        return reminder.id === id;
      }),
    );
  }

  // check if contacts birthday
  filterBirthdayContacts(contacts :ReminderInt[]): ReminderInt[] {
    return contacts.filter(contact => {
      console.log('contact: ' + contact.dob.substr(0,5) + ' today: ' + this.getTodaysDate().substr(5,5));
      return contact.dob.substr(0,5) === this.getTodaysDate().substr(5,5);
    });
  }

  getTodaysDate(): string {
    const rightNow = new Date();
    return rightNow.toISOString().slice(0,10).replace(/-/g,"/");
  }

  // send ecard
}
