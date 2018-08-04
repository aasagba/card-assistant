import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reminder } from './reminder.component';

@Component({
  selector: 'reminder',
  template: `
<style>
  .row-controls {
    text-align: right;
  }
  .date {
    width: 94px;
    vertical-align: top;
    background: #eb442b;
    border: 2px solid #eb442b;
    text-align: center;
    font-size: 1.5em;
  }
  .date-head {
    display: block;
    color: #ffffff;
  }
  .date-text {
    background: #fff;
    font-weight: 400;
    padding: 8px 0;
    display:block;
  }
</style>
<div class="card card-block container">
  <div class="row">
    <span class="date">
        <span class="date-head">Date</span>
        <span class="date-text">{{data.dob | date :  "dd MMM"}} </span>
    </span>
      
    <span class="col-sm-3 offset-sm-1" style="line-height: 2.5rem;">{{data.firstname}} {{data.surname}}</span>
    <span class="col-sm-3" style="line-height: 2.5rem;">Birthday</span>
    <span class="col-sm-4 row-controls" style="line-height: 2.5rem;">
      <button (click)="editItem()" class="btn btn-primary btn-icon"><clr-icon shape=""></clr-icon> Edit </button>
      <button (click)="deleteItem()" class="btn btn-danger btn-icon"><clr-icon shape="trash"></clr-icon> Delete </button>
    </span>
    
  </div>
</div>
  `,
})
export class ReminderComponent {
  @Input('reminder') data: Reminder;
  @Input() toggleModal: Function;
  @Output() reminderDeleted = new EventEmitter<Reminder>();
  @Output() reminderEdited = new EventEmitter<Reminder>();

  deleteItem() {
    this.reminderDeleted.emit(this.data);
  }

  editItem() {
    this.reminderEdited.emit(this.data);
    this.toggleModal();
  }
}
