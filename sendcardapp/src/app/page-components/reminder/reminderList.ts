import { Component } from '@angular/core';
import { Reminder } from './reminder.component';
import Reminders from '../mock-reminders';
import { ReminderInt } from '../reminderInt';

@Component({
  selector: 'reminder-list',
  template: `
<reminder-form (reminderCreated)="addReminder($event)" [reminder]="reminder"></reminder-form>
<reminder *ngFor="let j of reminders" [reminder]="j" (reminderDeleted)="deleteReminder($event)" (reminderEdited)="editReminder($event)"></reminder>
  `,
})
export class ReminderListComponent {
  reminders: ReminderInt[];
  reminder: Reminder;

  constructor() {
    this.resetForm();
  }

  ngOnInit(): void {
    this.reminders = Reminders;
  }

  addReminder(newReminder): void {
    // if existing edit
    let isNew = true;
    console.log('addReminder: ', newReminder.firstname);

    this.reminders = this.reminders.map((reminder) => {
      if (reminder.id === newReminder.id) {
        alert('Edit: ' + newReminder.id);
        isNew = false;
        return newReminder;
      } else {
        return reminder;
      }
    });

    console.log(newReminder.id);
    console.log(newReminder.firstname);

    if (isNew) {
      // if new add
      this.reminders.unshift(newReminder);
      alert('new, id: ' + newReminder.id);
    }

    // clear form
    this.resetForm();
  }

  resetForm(): void {
    this.reminder = new Reminder(null, '', '', null, '', '', '');
  }

  deleteReminder(reminder) {
    let indexToDelete = this.reminders.indexOf(reminder);
    if (indexToDelete !== -1) {
      this.reminders.splice(indexToDelete, 1);
    }
  }

  editReminder(reminder) {
    alert(reminder + ' ' + reminder.firstname);
    this.reminder = reminder;
    // set form values
  }
}
