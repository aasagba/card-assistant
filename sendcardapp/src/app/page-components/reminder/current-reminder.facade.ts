import {Injectable, OnInit} from "@angular/core";
import {Reminder} from "./reminder.component";
import {BehaviorSubject, Subject} from "rxjs/Rx";
import Reminders from "../mock-reminders";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ReminderFacade implements OnInit{

  public $current = new BehaviorSubject<Reminder>(new Reminder(null, '', '', null, '', '', ''));
  public $reminderList;

  constructor() {
    this.$reminderList = new BehaviorSubject<Array<Reminder>>(Reminders);
    console.log('facade constructor reminders: ', Reminders.length);
  }

  ngOnInit() {

  }

  public updateCurrentReminder(newReminder: Reminder): void {
    this.$current.next(newReminder);
    console.log("updateCurrentReminder: ", newReminder);
  }

  public getCurrentReminder(): Observable<Reminder> {
    console.log("getCurrentReminder: ", this.$current);
    return this.$current;
  }

  public updateReminderList(newReminder: Reminder): void {
    console.log('new reminder: ', newReminder);
    console.log('current reminders: ', Reminders.length);

    const currentReminders: Reminder[] = this.$reminderList.getValue();
    this.$reminderList.next([...currentReminders, newReminder]);
  }

  public editReminderList(reminders: Reminder[]):void {
    console.log(reminders);
    this.$reminderList.next(reminders);
}

  public getReminderList(): Observable<Array<Reminder>> {

    // this.$reminderList
    //   .subscribe((remindersList: Array<Reminder>) => {
    //     reminders = remindersList;
    //   });

    // return this.$reminderList.getValue();
    return this.$reminderList;
  }

}
