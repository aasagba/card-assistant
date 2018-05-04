import { Component, OnInit } from '@angular/core';

// import { ContactComponent } from '../contact/contact.component';

export class Reminder {
  public id: number;
  public firstname: string;
  public surname: string;
  public dob: string;
  public email: string;
  public greeting: string;
  public gender: string;

  constructor(
    id: number,
    firstname: string,
    surname: string,
    dob: string,
    email: string,
    greeting: string,
    gender: string,
  ) {
    (this.id = id),
    (this.firstname = firstname),
    (this.surname = surname),
    (this.dob = dob),
    (this.email = email),
    (this.greeting = greeting),
    (this.gender = gender);
  }
}

// export class ReminderComponent implements OnInit {
//   public contacts: Array<ContactComponent> = []
//   constructor(
//   ) { }
//
//   ngOnInit() {
//     this.contacts.push(new ContactComponent(1, "Kelly", "Asagba",
//       new Date('10/03/1986'), 'Female',"kellya@gmail.com",
//       "Happy Birthday!"));
//
//     this.contacts.forEach(contact => {
//       console.log(`contacts: ${contact.name}`);
//     });
//
//   }
//
//
// }
