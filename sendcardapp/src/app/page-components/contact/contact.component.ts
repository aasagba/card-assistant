import { Component, OnInit } from '@angular/core';

enum Gender {Male, Female};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public dob: Date,
    public gender: string,
    public email: string,
    public greeting: string
  ) { }

  ngOnInit() {

  }

}
