import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import { Reminder } from './reminder.component';
import { ReminderFacade } from '../reminder/current-reminder.facade';
import {takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs/Rx";
import {isValidDate} from "../../shared-components/datepicker/datepicker.component";

@Component({
  selector: 'reminder-form',
  template: `
    <div class="card-text">
    <form class="form" [formGroup]="addReminderForm" (ngSubmit)="onSubmit(addReminderForm)">
      <section class="form-block">
        <div class="form-group">
          <label for="empFullName" class="required">Firstname</label>
          <label for="firstname"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('firstname').invalid && (addReminderForm.get('firstname').dirty || addReminderForm.get('firstname').touched)">
            <input type="text"
                   class="form-control"
                   formControlName="firstname"
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
          <label for="surnname"
                 aria-haspopup="true"
                 role="tooltip"
                 class=""
                 [class.invalid]="addReminderForm.get('surname').invalid && (addReminderForm.get('surname').dirty || addReminderForm.get('surname').touched)">
          <input type="text"
             class="form-control"
                 formControlName="surname"
             placeholder="Surname" 
             #surname>
            <span class="tooltip-content">
                    Name is required.
            </span>
          </label>
        </div>
        <datepicker
            [label]="'date'"
            [labelId]="'date'"
            id="date"
            formControlName="date"
        >
        </datepicker>
        Date: {{addReminderForm.get('date').value}}
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
export class ReminderFormComponent implements OnInit {
  @Input() toggleModal: Function;
  @Output() reminderCreated = new EventEmitter<Reminder>();
  public user: Reminder;
  addReminderForm: FormGroup;
  setDate = null;

  private ngUnsubscribe$: Subject<void> = new Subject();

  constructor(
    public fb: FormBuilder,
    private reminderFacade: ReminderFacade
  ) {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.unsubscribe();
  }

  ngOnInit() {
    this.reminderFacade.getCurrentReminder().subscribe((user: Reminder) => {
      this.user = user;
    });

    this.addReminderForm = this.fb.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      greeting: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.setupForm();

    this.addReminderForm.valueChanges.take(2).subscribe(value => {
      // this.setDate = value.date;
      console.log(`value: ${JSON.stringify(value)}`);
      this.addReminderForm.setValue(value, {emitEvent: false});
    });

      // this.addReminderForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      // this.addReminderForm.addControl('date', new FormControl('', [Validators.required]));
      // this.addReminderForm.get('date').setValidators([Validators.required, isValidDate]);
      // this.addReminderForm.controls.date.updateValueAndValidity();
    //}
    // });
  }

  setupForm() {
    this.reminderFacade.$current
      .subscribe((reminder: Reminder) => {
        console.log("update form");
        if (reminder) {
          this.addReminderForm.patchValue(reminder);
        }
      });
  }

  onSubmit({ value, valid }) {

    // console.log('', this.addReminderForm.get('surName').invalid && (this.addReminderForm.get('surName').dirty || this.addReminderForm.get('surName').touched));
    // console.log(this.addReminderForm);
    const id = this.user ? this.user.id : Math.random();
    const firstName = this.addReminderForm.get('firstname').value;
    const surName = this.addReminderForm.get('surname').value;
    const dob = this.addReminderForm.get('dob').value;
    const email = this.addReminderForm.get('email').value;
    const greeting = this.addReminderForm.get('greeting').value;
    const gender = this.addReminderForm.get('gender').value;

    this.createReminder(id, firstName, surName, dob, email, greeting, gender);
    // this.reminderFacade.$current.unsubscribe();
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
      id,
      firstname,
      surname,
      dob,
      email,
      greeting,
      gender,
    );
    this.reminderCreated.emit(
      new Reminder(id, firstname, surname, dob, email, greeting, gender),
    );

    this.toggleModal();
    this.addReminderForm.reset();
  }
}
