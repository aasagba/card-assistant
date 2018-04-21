import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import { Reminder } from "./reminder.component";

@Component({
  selector: 'reminder-form',
  template: `
    <div class="card card-block container">
      <h4 class="card-title">Create Reminder</h4>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Firstname"
           #firstname>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Surname"
           #surname>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Date of birth"
           #dob>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Email"
           #email>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Greeting"
           #greeting>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Gender"
           #gender>
      </div>
      <button type="button"
          class="btn btn-primary"
          (click)="createReminder(firstname.value, surname.value, dob.value, email.value, greeting.value, gender.value)">Create
      </button>
    </div>
  `
})
export class ReminderFormComponent {
  @Output() reminderCreated = new EventEmitter<Reminder>();

  createReminder(firstname: string, surname: string, dob: Date,
                 email: string, greeting: string, gender: string) {
    console.log('reminderFormComponent: ', firstname, surname, dob, email, greeting, gender);
    this.reminderCreated.emit(new Reminder(firstname, surname, dob, email, greeting, gender));
  }
}
