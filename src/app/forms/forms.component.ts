import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',

})
export class FormsComponent implements OnInit {
  radioGender: any = 0;
  radioPreg: any = 0;
  radioCheck: any = 0;
  radioAddress: any = 0;
  radioSmoke: any = 0;


  currentDate = new Date();
  datadate: any;

  constructor() {
  }

  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))

    ])
  });

  ngOnInit(): void {
  }

}
