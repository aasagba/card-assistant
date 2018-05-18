import { BrowserModule } from '@angular/platform-browser';
import {
  Component,
  NgModule,
  VERSION,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// import { Reminder } from './page-components/reminder/reminder.component';
import { ContactComponent } from './page-components/contact/contact.component';
import { DashboardComponent } from './page-components/dashboard.component';
import { BirthdayReminderService } from './page-components/birthday-reminder.service';
import { ReminderFormComponent } from './page-components/reminder/reminder-form.component';
import { ReminderComponent } from './page-components/reminder/reminder';
import { ReminderListComponent } from './page-components/reminder/reminderList';
import { BirthdaysComponent } from "./page-components/birthdays/birthdays.component";
import { AppRoutingModule } from './app.routing.module';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    // Reminder,
    ContactComponent,
    DashboardComponent,
    ReminderFormComponent,
    ReminderComponent,
    ReminderListComponent,
    BirthdaysComponent,
  ],
  imports: [BrowserModule, NgbModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, ClarityModule, BrowserAnimationsModule],
  exports: [ReactiveFormsModule],
  providers: [BirthdayReminderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
