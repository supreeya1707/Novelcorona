import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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

    this.registerFrm = this.formBuilder.group({
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])],
      pname: [null, Validators.compose([Validators.required])],
      fname: [null, Validators.compose([Validators.required])],
      lname: [null, Validators.compose([Validators.required])],
      tel: [null, Validators.compose([Validators.required])],
      appDate: [null, Validators.compose([Validators.required])],
    });

  }

  get f(): any {
    return this.registerFrm.controls;
  }

  async btnSubmit(): Promise<any> {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFrm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        html: 'กรุณากรอกข้อมูลในช่องที่เป็นสีแดงให้ครบ',
      });
      return;
    } else {
      this.btndisble = true;
    }
    const data: any = {};
    const info: any = [];

    data.cid = this.registerFrm.value.cid;
    data.pname = this.registerFrm.value.pname;
    data.fname = this.registerFrm.value.fname;
    data.lname = this.registerFrm.value.lname;
    data.ptfullname = this.registerFrm.value.pname + this.registerFrm.value.fname + '  ' + this.registerFrm.value.lname;
    data.phone = this.registerFrm.value.tel;
    data.appointment_date = moment(this.registerFrm.value.appDate).format('YYYY-MM-DD');
    data.inputdatetime = moment().format('YYYY-MM-DD HH:mm:ss');

    info.push(data);

    const res = await this.api.insSwabque(info);
    if (res.ok === true){

    }else {
      console.log('error');
    }
  }

  getDate(e: any): any {
    this.dateChoose = moment(e).format('YYYY-MM-DD');
    console.log(this.dateChoose);
  }
}
