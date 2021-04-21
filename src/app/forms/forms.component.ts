import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',

})
export class FormsComponent implements OnInit {
  radioGender: any = 0;
  radioPreg:any=0;
  radioCheck :any=0;
  radioAddress:any=0;
  radioSmoke : any=0;
  constructor() { }

  ngOnInit(): void {
  }

}
