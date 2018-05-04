import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from './reminder.component';

@Component({
  selector: 'reminder',
  template: `
<style>
  .row-controls {
    text-align: right;
  }
</style>
<div class="card card-block container">
  <div class="row">
      <span class="col-sm-2">{{data.dob | date :  "dd MMM"}} </span>
    	<span class="col-sm-6">{{data.firstname}} {{data.surname}}</span>
    	<span class="col-sm-4 row-controls">
      	<a (click)="editItem()" class="btn btn-warning">Edit</a>
        <a (click)="deleteItem()" class="btn btn-danger">Delete</a>
      </span>
    
  </div>
</div>
  `,
})
export class ReminderComponent {
  @Input('reminder') data: Reminder;
  @Output() reminderDeleted = new EventEmitter<Reminder>();
  @Output() reminderEdited = new EventEmitter<Reminder>();

  deleteItem() {
    this.reminderDeleted.emit(this.data);
  }

  editItem() {
    this.reminderEdited.emit(this.data);
  }
}
