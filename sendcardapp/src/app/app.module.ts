import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BirthdayReminderComponent } from './page-components/birthday-reminder/birthday-reminder.component';
import { ContactComponent } from './page-components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    BirthdayReminderComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
