import {Component, EventEmitter, OnInit} from '@angular/core';
import { Reminder } from './reminder.component';
import { ReminderInt } from '../reminderInt';
import { ReminderFacade } from '../reminder/current-reminder.facade';

@Component({
  selector: 'reminder-list',
  template: `
    
    <div class="content-container">
    <div class="content-area">

    <section class="title">
      <h2 class="welcome">Good Evening, Kelly</h2>
      <h5 class="hint" style="color: #0095D3;margin-top: 0.5rem;">Summer is in full swing!</h5>
    </section>

    <div class="row">
      <div class="col-xs-3 offset-xs-4" style="text-align: center;">
        <button
          (click)="toggleModal()"
          class="btn btn-primary btn-icon">
          <clr-icon shape="plus"></clr-icon>
          Add Reminder
        </button>
      </div>
    </div>
      
      <div class="row">
        <div class="col-xs-12">
            <h4>My Reminders</h4>
        </div>
      </div>
      
    <clr-modal 
      [(clrModalOpen)]="modalOpen" 
      [clrModalClosable]="false" 
      [clrModalStaticBackdrop]="false">
      
      <h3 class="modal-title">Add New Reminder</h3>
      
      <div class="modal-body">
        <reminder-form 
          (reminderCreated)="addReminder($event)"
          [toggleModal]="toggleModalFunc">
        </reminder-form>
      </div>
      
    </clr-modal>
    
    <reminder 
      *ngFor="let j of reminders" 
      [reminder]="j" 
      (reminderDeleted)="deleteReminder($event)" 
      (reminderEdited)="editReminder($event)" 
      [toggleModal]="toggleModalFunc">
    </reminder>
      
    </div>
      
    <nav class="sidenav">
      <section class="sidenav-content">
        <birthdays></birthdays>
      </section>
    </nav>
    </div>
  `,
})
export class ReminderListComponent implements OnInit {
  reminders: ReminderInt[];
  reminder: Reminder;
  modalOpen = false;

  constructor(
    private reminderFacade: ReminderFacade
  ) {}

  ngOnInit(): void {
    // this.reminders = this.reminderFacade.getReminderList();
    this.reminderFacade.getReminderList().subscribe((users: Array<Reminder>) => {
      this.reminders = users;
    });
  }

  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
  }

  get toggleModalFunc() {
    return this.toggleModal.bind(this);
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
