import { Component, OnInit } from '@angular/core';
import { BirthdayReminderService } from '../birthday-reminder.service';
import { ReminderInt } from "../reminderInt";
import ECardApi from '../../api/ecard.api';
import {forEach} from "@angular/router/src/utils/collection";

interface ECardApiResponse {
}

@Component({
  selector: 'birthdays',
  templateUrl: './birthdays.component.html',
})
export class BirthdaysComponent implements OnInit {
  reminders: ReminderInt[] = [];

  constructor(private birthdayReminderService: BirthdayReminderService) {
  }

  ngOnInit(): void {
    this.birthdayReminderService
      .getReminders()
      .then(reminders => {
        console.log('birthday component reminders:', reminders.length);
        this.reminders = this.birthdayReminderService
        .filterBirthdayContacts(reminders);
        console.log('birthday component reminder: ', this.reminders);

        this.reminders.forEach(reminder => this.sendECard(reminder));
      });
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
