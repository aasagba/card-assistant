import { Component, OnInit } from '@angular/core';
import { Reminder } from './reminder.component';
import { ReminderInt } from '../reminderInt';
import { ReminderFacade } from '../reminder/current-reminder.facade';

@Component({
  selector: 'reminder-list',
  template: `
<reminder-form (reminderCreated)="addReminder($event)"></reminder-form>
<birthdays></birthdays>
<reminder *ngFor="let j of reminders" [reminder]="j" (reminderDeleted)="deleteReminder($event)" (reminderEdited)="editReminder($event)"></reminder>
  `,
})
export class ReminderListComponent implements OnInit {
  reminders: ReminderInt[];
  reminder: Reminder;

  constructor(
    private reminderFacade: ReminderFacade
  ) {}

  ngOnInit(): void {
    // this.reminders = this.reminderFacade.getReminderList();
    this.reminderFacade.getReminderList().subscribe((users: Array<Reminder>) => {
      this.reminders = users;
    });
  }

  addReminder(newReminder): void {
    // if existing edit
    let isNew = true;
    let remindersList: Reminder[] = this.reminders;

    console.log('addReminder: ', newReminder);
    console.log("facade remindersList: ", remindersList.length);
    console.log(remindersList);

    this.reminders = remindersList.map((reminder) => {
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
      // this.reminders.unshift(newReminder);
      this.reminderFacade.updateReminderList(newReminder);
      alert('new, id: ' + newReminder.id);
    } else {
      // update facade list
      this.reminderFacade.editReminderList(this.reminders);
    }

    // clear current reminder. ToDo is there better way to do this
    this.reminderFacade.updateCurrentReminder(null);
  }

  deleteReminder(reminder) {
    let indexToDelete = this.reminders.indexOf(reminder);
    if (indexToDelete !== -1) {
      this.reminders.splice(indexToDelete, 1);
    }
  }

  editReminder(reminder) {
    alert(reminder + ' ' + reminder.firstname);
    this.reminderFacade.updateCurrentReminder(reminder);
  }
}
