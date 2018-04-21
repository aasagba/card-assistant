import { Component, OnInit } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-birthday-reminder',
  templateUrl: './birthday-reminder.component.html',
  styleUrls: ['./birthday-reminder.component.css']
})
export class BirthdayReminderComponent implements OnInit {
  public contacts: Array<ContactComponent> = []
  constructor(
  ) { }

  ngOnInit() {
    this.contacts.push(new ContactComponent(1, "Kelly", "Asagba",
      new Date('10/03/1986'), 'Female',"kellya@gmail.com",
      "Happy Birthday!"));

    this.contacts.forEach(contact => {
      console.log(`contacts: ${contact.name}`);
    });

  }


}
