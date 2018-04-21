import {Component} from "@angular/core";
import { Reminder } from "./reminder.component";

@Component({
  selector: 'reminder-list',
  template: `
<reminder-form (reminderCreated)="addReminder($event)"></reminder-form>
<reminder *ngFor="let j of reminders" [reminder]="j" (reminderDeleted)="deleteReminder($event)"></reminder>
  `
})
export class ReminderListComponent {
  reminders: Reminder[];

  constructor() {
    this.reminders = [
      new Reminder("Jane", "Bloggs", new Date('01/01/1984'), "j.bloggs@gmail.com", "Happy Birthday!", 'Female')
    ];
  }

  addReminder(reminder) {
    this.reminders.unshift(reminder);
  }

  deleteReminder(reminder) {
    let indexToDelete = this.reminders.indexOf(reminder);
    if (indexToDelete !== -1) {
      this.reminders.splice(indexToDelete,1);
    }
  }
}
