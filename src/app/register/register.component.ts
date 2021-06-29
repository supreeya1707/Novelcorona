import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {
  navbarOpen = false;
  cid:any;
  dataNovel:any;
  numberJ:any;
  HN:any;
  prename:any;
  fname:any;
  lname:any;
  age:any;
  sex:any;
  nation:any;
  national:any;
  career:any;
  numberadd:any;
  moo:any;
  tumbon:any;
  amphur:any;
  province:any;
  phone:any;
  datecome:any;
  dategivetest:any;
  placesendtest:any;
  datetouch:any;
  placerisk:any;
  quarentine:any;
  datequarentine:any;
  swab2:any;
  reporter:any;
  noteetc:any;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  data:any=[];
  registerFrm: any=[];
  submitted=false;
  successNotification() {
    Swal.fire('สำเร็จ', 'บันทึกข้อมูลสำเร็จ!', 'success')
      .then(() => {
        window.location.reload();
      });
  }

  errorNotification() {
    Swal.fire('ไม่สำเร็จ', 'บันทึกข้อมูลไม่สำเร็จ!', 'error')
      .then(() => {
        window.location.reload();
        // this.router.navigateByUrl('/date');
      });
  }
  constructor(private api: ApiService,private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.registerFrm = this.formBuilder.group({
      //pull value cid
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])]
    });
  }
  get f() {
    return this.registerFrm.controls;
  }
  async getonclick():Promise<any>{
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFrm.invalid) {
      return;
    }


    this.cid = this.registerFrm.value.cid;
    // console.log(this.cid);

    //get data from API
    const rs: any = await this.api.getData(this.cid);
    // console.log(rs);
    //print on success
    if( rs.ok===true){
      this.dataNovel=rs.message;
      console.log(this.dataNovel);
    }else {
      console.log('error');
    }

  }

  printReport(novel_id: any) {

  }
  async insertRegis(): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.no_regis = this.numberJ;
    data.cid_regis = this.cid;
    data.HN_regis = this.HN;
    data.prename_regis = this.prename;
    data.fname = this.fname;
    data.lname = this.lname;
    data.age_regis = this.age;
    data.sex_regis = this.sex;
    data.nation_regis = this.nation;
    data.nationality = this.national;
    data.career = this.career;
    data.no_address = this.numberadd;
    data.moo = this.moo;
    data.district = this.tumbon;
    data.amphur = this.amphur;
    data.province = this.province;
    data.phone = this.phone;
    data.datecomein = this.datecome;
    data.dategivetest = this.dategivetest;
    data.sendtest = this.placesendtest;
    data.riskplace = this.placerisk;
    data.datetouch = this.datetouch;
    data.quarantine = this.quarentine;
    data.startquarantine = this.datequarentine;
    //data.endquarantine = this.numberJ;
    data.swaabtime2 = this.swab2;
    data.reporter = this.reporter;
    data.noteetc = this.noteetc;



    info.push(data);

    const rs: any = await this.api.insRegis(info);
    // if (rs.ok) {
    //   this.successNotification();
    //   console.log(rs.message[0]);
    //   // @ts-ignore
    //   const rsins: any = await this.insertRegis(rs.message[0]);
    // } else {
    //   this.errorNotification();
    // }

  }

}


