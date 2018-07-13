import { ReminderInt } from './reminderInt';
import Reminders from './mock-reminders';
import { Injectable } from '@angular/core';
import ECardApi from '../api/ecard.api';

interface ECardApiResponse {
}

@Injectable()
export class BirthdayReminderService {

  getReminders(): Promise<ReminderInt[]> {
    return Promise.resolve(Reminders);
  }

  getReminder(id: number): Promise<ReminderInt> {
    return this.getReminders().then(reminders =>
      reminders.find(reminder => {
        return reminder.id === id;
      }),
    );
  }

  // check if contacts birthday
  filterBirthdayContacts(contacts :ReminderInt[]): ReminderInt[] {
    return contacts.filter(contact => {
      console.log('contact: ' + contact.dob.substr(0,5) + ' today: ' + this.getTodaysDate().substr(5,5));
      // this.sendECard(contact);
      return contact.dob.substr(0,5) === this.getTodaysDate().substr(5,5);
    });
  }

  getTodaysDate(): string {
    const rightNow = new Date();
    return rightNow.toISOString().slice(0,10).replace(/-/g,"/");
  }

  private async sendECard(contact: ReminderInt) {
    try {
      await this.handleSuccessResponse(contact);

    } catch (error) {
      this.handleErrorResponse(error);
    }
  }

  private async handleSuccessResponse(contact: ReminderInt) {
    const sendECard: ECardApiResponse = await this.postECard(contact);
  }

  private handleErrorResponse(error: Error): void {
    console.error(`An error occurred when attempting to add card: ${error}`);
  }

  private async postECard(contact: ReminderInt) {
    const cardTemplateId: number = 3309;
    const from: string = `Adrian Asagba`;
    const fromAddress: string = `aasagba@gmail.com`;
    const message: string = contact.greeting;
    const subject: string = "Happy Birthday";
    const to: string = `${contact.firstname} ${contact.surname}`;
    const toAddress: string = contact.email;

    return await ECardApi.endpoints.sendEcard({ cardTemplateId, from, fromAddress, message, subject, to, toAddress });
  }
}
