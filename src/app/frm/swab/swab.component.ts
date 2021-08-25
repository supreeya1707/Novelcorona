import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

interface BMonth {
  value: string;
  viewValue: string;
}

interface PName {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-swab',
  templateUrl: './swab.component.html'
})
export class SwabComponent implements OnInit {
  registerFrm: any;
  submitted = false;
  btndisble = false;
  locale = 'th-be';

  dateChoose: any;

  dataBDate: any = [];
  dataBYear: any = [];
  dataChw: any = [];
  dataAmp: any = [];
  dataTmb: any = [];
  dataVaccine: any = [];

  chw: any;
  amp: any;
  tmb: any;

  dataBMonth: BMonth[] = [
    {value: '01', viewValue: 'มกราคม'},
    {value: '02', viewValue: 'กุมภาพันธ์'},
    {value: '03', viewValue: 'มีนาคม'},
    {value: '04', viewValue: 'เมษายน'},
    {value: '05', viewValue: 'พฤษภาคม'},
    {value: '06', viewValue: 'มิถุนายน'},
    {value: '07', viewValue: 'กรกฏาคม'},
    {value: '08', viewValue: 'สิงหาคม'},
    {value: '09', viewValue: 'กันยายน'},
    {value: '10', viewValue: 'ตุลาคม'},
    {value: '11', viewValue: 'พฤศจิกายน'},
    {value: '12', viewValue: 'ธันวาคม'}
  ];

  dataPName: PName[] = [
    {value: 'นาย', viewValue: 'นาย'},
    {value: 'นาง', viewValue: 'นาง'},
    {value: 'นางสาว', viewValue: 'นางสาว'}
  ];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private localeService: BsLocaleService) { }

  ngOnInit(): void {
    this.localeService.use(this.locale);

    for (let i = 1; i <= 31; i++) {
      this.dataBDate.push(i);
    }

    for (let i = 2460; i <= 2558; i++) {
      this.dataBYear.push(i);
    }

    this.getChwData();


    this.registerFrm = this.formBuilder.group({
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])],
      pname: [null, Validators.compose([Validators.required])],
      fname: [null, Validators.compose([Validators.required])],
      lname: [null, Validators.compose([Validators.required])],
      tel: [null, Validators.compose([Validators.required])],
      bdate: [null, Validators.compose([Validators.required])],
      bmonth: [null, Validators.compose([Validators.required])],
      byear: [null, Validators.compose([Validators.required])],
      appDate: [null, Validators.compose([Validators.required])],
      // chw: [null, Validators.compose([Validators.required])],
      // amp: [null],
      // tmb: [null],
    });

    // this.setValidators();
  }

  get f(): any {
    return this.registerFrm.controls;
  }

  // setValidators(): any {
  //   const ampControl = this.registerFrm.get('amp');
  //   const tmbControl = this.registerFrm.get('tmb');
  //
  //   this.registerFrm.get('chw').valueChanges
  //     .subscribe((chwSelect: any | null) => {
  //       if (chwSelect !== '' && chwSelect != null) {
  //         ampControl.setValidators([Validators.required]);
  //         this.getAmpData(chwSelect);
  //         this.registerFrm.get('amp').valueChanges
  //           .subscribe((ampSelect: any | null) => {
  //             if (ampSelect !== '' && ampSelect != null) {
  //               tmbControl.setValidators([Validators.required]);
  //               this.getTmbData(chwSelect, ampSelect);
  //             }
  //           });
  //       }
  //       ampControl.updateValueAndValidity();
  //       tmbControl.updateValueAndValidity();
  //     });
  //
  // }

  async getChwData(): Promise<any> {
    const resChwData: any = await this.api.chwData();
    if (resChwData.ok) {
      this.dataChw = resChwData.message;
    } else {
      console.log('error');
    }
  }

  async getAmpData(chwpart: any): Promise<any> {
    const resAmpData: any = await this.api.ampData(chwpart);
    // console.log(resChwData);
    if (resAmpData.ok) {
      this.dataAmp = resAmpData.message;
      // console.log(this.dataChw);
    } else {
      console.log('error');
    }
  }

  async getTmbData(chwpart: any, amppart: any): Promise<any> {
    const resTmbData: any = await this.api.tmbData(chwpart, amppart);
    // console.log(resChwData);
    if (resTmbData.ok) {
      this.dataTmb = resTmbData.message;
      // console.log(this.dataChw);
    } else {
      console.log('error');
    }
  }


  btnSubmit(): any {

  }

  getDate(e: any): any {
    this.dateChoose = moment(e).format('YYYY-MM-DD');
    console.log(this.dateChoose);
  }
}
