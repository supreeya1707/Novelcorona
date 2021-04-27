import {Component, OnInit} from '@angular/core';
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
  radiosymptom: any = [];
  radiofrom: any = 0;
  radiorepair: any = 0;
  radionear: any = 0;
  radiotakecare: any = 0;
  radiotouch: any = 0;
  radiovisitor: any = 0;
  radiocrowded: any = 0;
  radiobreath: any = 0;
  radioinject: any = 0;
  radiolabtest: any = 0;
  radiotest: any = 0;


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

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.radiosymptom.push(e.target.value);
    } else {
      const index = this.radiosymptom.indexOf(e.target.value);
      this.radiosymptom.splice(index,1);
    }
    console.log(this.radiosymptom);
  }

}
