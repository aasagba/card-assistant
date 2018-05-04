import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reminder } from './reminder.component';

@Component({
  selector: 'reminder-form',
  template: `
    <div class="card card-block container">
      <h4 class="card-title">Create Reminder</h4>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Firstname"
           [ngModel]="data.firstname"
           #firstname>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Surname" 
           [ngModel]="data.surname"
           #surname>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Date of birth"
           [ngModel]="data.dob"
           #dob>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Email"
           [ngModel]="data.email"
           #email>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Greeting"
           [ngModel]="data.greeting"
           #greeting>
      </div>
      <div class="form-group">
        <input type="text"
           class="form-control"
           placeholder="Gender"
           [ngModel]="data.gender"
           #gender>
      </div>
      <button type="button"
          class="btn btn-primary"
          (click)="createReminder(data.id, firstname.value, surname.value, dob.value, email.value, greeting.value, gender.value)">Save
      </button>
    </div>
  `,
})
export class ReminderFormComponent {
  @Input('reminder') data: Reminder;
  @Output() reminderCreated = new EventEmitter<Reminder>();

  createReminder(
    id: number,
    firstname: string,
    surname: string,
    dob: string,
    email: string,
    greeting: string,
    gender: string,
  ) {
    console.log(
      'reminderFormComponent: ',
      firstname,
      surname,
      dob,
      email,
      greeting,
      gender,
    );
    this.reminderCreated.emit(
      new Reminder(id | Math.random(), firstname, surname, dob, email, greeting, gender),
    );
    this.resetForm();
  }

  resetForm() {
    this.data.id = null;
    this.data.firstname = '';
    this.data.surname = '';
    this.data.dob = '';
    this.data.email = '';
    this.data.greeting = '';
    this.data.gender = '';
  }
}
