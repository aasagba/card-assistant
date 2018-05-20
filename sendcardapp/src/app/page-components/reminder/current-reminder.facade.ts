import {Injectable, OnInit} from "@angular/core";
import {Reminder} from "./reminder.component";
import {BehaviorSubject, Subject} from "rxjs/Rx";
import Reminders from "../mock-reminders";

@Injectable()
export class ReminderFacade implements OnInit{

  public $current = new BehaviorSubject<Reminder>(new Reminder(null, '', '', null, '', '', ''));
  public $reminderList;

  constructor() {
    this.$reminderList = new BehaviorSubject<Array<Reminder>>(Reminders);
    console.log(Reminders.length);
  }

  ngOnInit() {

  }

  public updateCurrentReminder(newReminder: Reminder): void {
    this.$current.next(newReminder);
  }

  public updateReminderList(newReminder: Reminder): void {
    console.log('new reminder: ', newReminder);
    console.log('current reminders: ', Reminders.length);

    const currentReminders: Reminder[] = this.$reminderList.getValue();
    this.$reminderList.next([...currentReminders, newReminder]);
  }

  public editReminderList(reminders: Reminder[]):void {
    this.$reminderList.next(reminders);
}

  public getReminderList(): Array<Reminder> {

    // this.$reminderList
    //   .subscribe((remindersList: Array<Reminder>) => {
    //     reminders = remindersList;
    //   });

    return this.$reminderList.getValue();
  }

}
