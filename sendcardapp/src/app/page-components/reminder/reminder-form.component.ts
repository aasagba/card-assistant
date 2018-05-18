import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { Reminder } from './reminder.component';

@Component({
  selector: 'reminder-form',
  template: `
    {{this.addReminderForm.valid}}
    <div class="card-text">
    <form class="form" [formGroup]="addReminderForm" (ngSubmit)="onSubmit()" [hidden]="submitted">
      <section class="form-block">
        <h4 class="card-title">Create Reminder</h4>
        <div class="form-group">
          <label for="empFullName" class="required">Firstname</label>
          <label for="firstName"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('firstName').invalid && (addReminderForm.get('firstName').dirty || addReminderForm.get('firstName').touched)">
            <input type="text"
                   class="form-control"
                   formControlName="firstName"
                   placeholder="Firstname"
                   #firstname>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <!-- tooltip tooltip-validation tooltip-md tooltip-bottom-right -->
        <div class="form-group">
          <label for="surnName" class="required">Surname</label>
          <label for="surnName"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('surName').invalid && (addReminderForm.get('surName').dirty || addReminderForm.get('surName').touched)">
          <input type="text"
             class="form-control"
                 formControlName="surName"
             placeholder="Surname" 
             #surname>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <div class="form-group">
          <label for="dob" class="required">Date of Birth</label>
          <label for="dob"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('dob').invalid
                && (addReminderForm.get('dob').dirty || addReminderForm.get('dob').touched)">
          <input type="text"
             class="form-control"
             formControlName="dob"
             placeholder="Date of birth"
             #dob>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <div class="form-group">
          <label for="email" class="required">Email</label>
          <label for="email"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('email').invalid
                && (addReminderForm.get('email').dirty || addReminderForm.get('email').touched)">
          <input type="text"
             class="form-control"
             placeholder="Email"
             formControlName="email"
             #email>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <div class="form-group">
          <label for="greeting" class="required">Greeting</label>
          <label for="greeting"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('greeting').invalid
                && (addReminderForm.get('greeting').dirty || addReminderForm.get('greeting').touched)">
          <input type="text"
             class="form-control"
             placeholder="Greeting"
             formControlName="greeting"
             #greeting>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <div class="form-group">
          <label for="gender" class="required">Gender</label>
          <label for="gender"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('gender').invalid
                && (addReminderForm.get('gender').dirty || addReminderForm.get('gender').touched)">
          <input type="text"
             class="form-control"
             placeholder="Gender"
             formControlName="gender"
             #gender>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="addReminderForm.invalid">
          Save
        </button>
      </section>
    </form>
    </div>
  `,
})
export class ReminderFormComponent {
  @Input('reminder') data: Reminder;
  @Output() reminderCreated = new EventEmitter<Reminder>();

  addReminderForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    greeting: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });
  submitted = false;

  onSubmit() {

    console.log(this.addReminderForm.get('surName').invalid && (this.addReminderForm.get('surName').dirty || this.addReminderForm.get('surName').touched));
    console.log(this.addReminderForm);
    const firstName = this.addReminderForm.get('firstName').value;
    const surName = this.addReminderForm.get('surName').value;
    const dob = this.addReminderForm.get('dob').value;
    const email = this.addReminderForm.get('email').value;
    const greeting = this.addReminderForm.get('greeting').value;
    const gender = this.addReminderForm.get('gender').value;

    this.createReminder(this.data.id, firstName, surName, dob, email, greeting, gender);
  }

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
