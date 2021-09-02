import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


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

  group = 1;

  dateChoose: any;
  dataVaccine: any = [];

  limit: any;
  countQue: any;
  minDate: Date;

  dataPName: PName[] = [
    {value: 'นาย', viewValue: 'นาย'},
    {value: 'นาง', viewValue: 'นาง'},
    {value: 'นางสาว', viewValue: 'นางสาว'},
    {value: 'ด.ช.', viewValue: 'ด.ช.'},
    {value: 'ด.ญ.', viewValue: 'ด.ญ.'},
  ];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private localeService: BsLocaleService, private router: Router, ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);

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
    data.groupid = this.group;
    data.appointment_date = moment(this.registerFrm.value.appDate).format('YYYY-MM-DD');
    data.inputdatetime = moment().format('YYYY-MM-DD HH:mm:ss');

    info.push(data);

    const res = await this.api.insSwabque(info);
    if (res.ok === true){
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ'
      }).then((result) => {
        this.registerFrm.reset();
        this.router.navigateByUrl('apps/home');
      });
    }else {
      console.log(res.error);
    }
  }

  async changeDate(e: any): Promise<any> {
    this.dateChoose = moment(e).format('YYYY-MM-DD');
    const res = await this.api.getSwabque(this.dateChoose, this.group);
    if (res.ok === true){
      this.countQue = res.message.length;
      const resLimit = await this.api.getLimit(this.dateChoose, this.group);
      // console.log(resLimit.message);
      if (resLimit.ok === true){
        if (resLimit.message.length !== 0){
          this.limit = resLimit.message[0]['limit'];
        }else{
          const resGroup = await this.api.getGroup(this.group);
          if (resGroup.ok === true){
            this.limit = resGroup.message[0]['limit_default'];
          }else{
            console.log('error');
            console.log(resGroup.error);
          }
        }
        // console.log(this.limit);
        if (this.countQue < this.limit){
          this.btndisble = false;
          console.log('น้อยกว่าเท่ากับ');
        }
        else{
          this.registerFrm.get('appDate').setValue();
          this.btndisble = true;
          Swal.fire({
            icon: 'warning',
            title: 'คิวเต็มแล้ว',
            html: 'วันที่ท่านเลือกมีการจองคิวเต็มแล้ว<br>' +
              'กรุณาเลือกวันนัดใหม่อีกครั้งค่ะ',
          });
        }
      }else {
        console.log('error');
        console.log(resLimit.error);
      }
    }else{
      console.log('error');
    }
  }
}
