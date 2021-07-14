import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {listLocales} from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {ApiService} from "../services/api.service";
// @ts-ignore
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',


})
export class FormsComponent implements OnInit {
  radioGender: any ;
  radioPreg: any ;
  radioCheck: any ;
  // radioAddress: any = 0;
  radioSmoke: any;
  radiosymptom: any = [];
  radiofrom: any;

  radiofever:any;
  radiocough:any;
  radiosorethroat:any;
  radiorespirator:any;

  radiomusclepain:any;
  radiomucous:any;
  radiophlegm:any;
  radioheadache:any;
  radiodifficulbreathing:any;
  radiopurify:any;
  radiosmell:any;
  radiotaste:any;
  radioredeye:any;
  radiorash:any;



  radiorepair: any ;
  radionear: any ;
  radiotakecare: any ;
  radiotouch: any ;
  radiovisitor: any;
  radiocrowded: any;
  radiobreath: any ;
  radioinject: any ;
  radiolabtest: any ;
  radiotest: any = 0;
  dateTimeLine: any = [];
  dateTimeLineShort: any = [];
  Addressetc:any;
  sDate: any;
  dateselect = moment().format('yyyy-MM-DD');
  dateStart = moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datadate =moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datatreat=moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datevac1=moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datevac2=moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datacome:any;
  // dateFirst = moment().format('yyyy-MM-DD');
  hosp_fist='โรงพยาบาลราชบุรี';
  provin_first='ราชบุรี';
  hosp_now ='โรงพยาบาลราชบุรี';
  provin_now='ราชบุรี';

  pname:any[];
  fname:any;
  lname:any;
  cid: any ;
  age:any;
  national:any;
  numPreg: any ;
  pregAge: any;

  station: any;
  job: any;
  Telephone: any;
  Telephonedoc:any;
  treat: any;
  birthday:any;
  No: any;
  moo: any;
  mooban: any;
  soi: any;
  road: any;
  tumbon: any;
  amphur: any;
  disaese:any;
  province: any;
  congential:any;
  congential_etc:any;
  weight:any;
  high:any;
  bmi:any;
  checkcopd:any;
  checkckd:any;
  checkcad:any;
  checkcva:any;
  checkundm:any;
  checkpids:any;



  hos_first: any;
  province_first: any;
  hos_now: any;
  province_now: any;
  assign_fever:any;
  assign_oxygen:any;
  find_symtom: any;
  come_city:any;
  come_region:any;
  come_day:any;
  come_plane:any;
  come_round:any;
  come_seat:any;
  assign_touch:any;
  assign_employ:any;
  assign_station:any;
  assign_position:any;
  radioAddress:any;
  symtom_etc: any;
  locale = 'th-be';
  locales = listLocales();
  currentDate = new Date();
  assign_des:any;

  des_day1:any;
  des_day2:any;
  des_day3:any;
  des_day4:any;
  des_day5:any;
  des_day6:any;
  des_day7:any;
  des_day8:any;
  des_day9:any;
  des_day10:any;
  des_day11:any;
  des_day12:any;
  des_day13:any;
  des_day14:any;







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

  constructor(private localeService: BsLocaleService,
              private api: ApiService,
              @Inject('baseURL') private baseURL: any) {
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
  date: any;

  ngOnInit(): void {
    console.log(this.dateStart);
    this.localeService.use(this.locale);
    this.genDateTimeLine(this.datadate);
    console.log(this.dateTimeLine);

  }
  getDate(e: any): any {
    console.log(e);
    this.datadate = moment(e).format('yyyy-MM-DD');
    console.log(this.datadate);
  }getDatevac1(e: any): any {
    console.log(e);
    this.datevac1 = moment(e).format('yyyy-MM-DD');
    console.log(this.datadate);
  }getDatevac2(e: any): any {
    console.log(e);
    this.datevac2 = moment(e).format('yyyy-MM-DD');
    console.log(this.datadate);
  }
  getDatetreat(e: any): any {
    console.log(e);
    this.datatreat = moment(e).format('yyyy-MM-DD');
    console.log(this.datatreat);
  }
  getDatecome(e: any): any {
    console.log(e);
    this.datacome = moment(e).format('yyyy-MM-DD');
    console.log(this.datacome);
  }

  convertDate(d: any, i: any): any {
    const ss: any = d.toString().split('/');
    const dataDate: any = (ss[2] - 543) + '-' + ss[1] + '-' + ss[0];
    const datai: any = -i;
    return moment(dataDate).locale('th').add(datai, 'day').format('DD MMMM YYYY');
  }

  genDateTimeLine(e: any): any {

    for (let i = 1; i <= 14; i++) {
      this.dateTimeLine.push(this.convertDate(e, i));
      this.dateTimeLineShort.push(moment(this.sDate).add(-i, 'day').format('YYYY-MM-DD'));
    }
    console.log(this.dateStart)
  }

  selectDateStart(e: any): any {
    console.log(e);
    // this.datatreat = moment(e).add(543, 'year').format('DD/MM/YYYY');
    this.sDate = moment(e).format('YYYY-MM-DD');
    console.info(this.datadate);
    this.dateTimeLine = [];
    this.dateTimeLineShort = [];
    this.genDateTimeLine(this.datadate);



  }

  async insertData(): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_prename=this.pname;
    data.novel_fname=this.fname;
    data.novel_lname=this.lname;
    data.novel_cid=this.cid;
    data.novel_age=this.age
    data.novel_national=this.national;
    data.novel_gender = this.radioGender;
    data.novel_preg = this.radioPreg;
    data.novel_numpreg = this.numPreg;
    data.novel_agepreg = this.pregAge;
    data.novel_worker = this.job;
    data.novel_station= this.station;
    data.novel_phone = this.Telephone;
    data.novel_phonedoc = this.Telephonedoc;
    data.novel_treat = this.treat;




    data.novel_address = this.radioAddress;
    data.novel_address_etc = this.Addressetc;
    data.novel_number_address = this.No;
    data.novel_moo = this.moo;
    data.novel_mooban = this.mooban;
    data.novel_soi= this.soi;
    data.novel_road= this.road;
    data.novel_district= this.tumbon;
    data.novel_amphur= this.amphur;
    data.novel_disease= this.disaese;
    data.novel_province= this.province;
    // data.novel_congential=this.disaese;
    //congential fail
    data.novel_smoke= this.radioSmoke;
    data.novel_copd=this.checkcopd;
    data.novel_ckd=this.checkckd;
    data.novel_cad=this.checkcad;
    data.novel_cva=this.checkcva;
    data.novel_undm=this.checkundm;
    data.novel_pids=this.checkpids;
    data.novel_congential_etc=this.congential_etc;
    data.novel_weight=this.weight;
    data.novel_high=this.high;
    data.novel_bmi=this.bmi;










    data.novel_start_sick=this.datadate;
    data.novel_start_treat= this.datatreat;
    data.novel_hospital_first= this.hosp_fist;
    data.novel_province_first= this.provin_first;
    data.novel_hospital_now= this.hosp_now;
    data.novel_province_now= this.provin_now;
    data.novel_assign_fever=this.assign_fever;
    data.novel_assign_oxygen=this.assign_oxygen;
    data.novel_fever=this.radiofever;
    data.novel_respirator=this.radiorespirator;
    data.novel_cough=this.radiocough;
    data.novel_sorethroat=this.radiosorethroat;
    data.novel_musclepain=this.radiomusclepain;
    data.novel_mucous=this.radiomucous;
    data.novel_phlegm=this.radiophlegm;
    data.novel_difficulbreathing=this.radiodifficulbreathing;
    data.novel_headache=this.radioheadache;
    data.novel_purify=this.radiopurify;
    data.novel_smell=this.radiosmell;
    data.novel_taste=this.radiotaste;
    data.novel_redeye=this.radioredeye;
    data.novel_rash=this.radiorash;
    data.novel_position=this.assign_position;
    data.novel_symtom_etc=this.symtom_etc;




    data.novel_comefrom= this.radiofrom;
    data.novel_come_city= this.come_city;
    data.novel_come_country= this.come_region;
    data.novel_date_come= this.datacome;
    data.novel_transportation= this.come_plane;
    data.novel_round_tran= this.come_round;
    data.novel_number_seat= this.come_seat;

    data.novel_takecare_hos= this.radiorepair;
    data.novel_touch_hos=this.radionear;
    data.novel_his_touch= this.radiotouch;
    data.novel_assign_touch=this.assign_touch;
    data.novel_assign_station=this.assign_station;

    data.novel_tourist= this.radiovisitor;
    data.novel_manyperson= this.radiocrowded;
    data.novel_ari= this.radiobreath;
    data.novel_inject= this.radioinject;
    data.novel_doc= this.radiolabtest;
    data.novel_des= this.assign_employ;
    data.novel_input_datetime = moment().format('yyyy-MM-DD HH:mm:ss');


    info.push(data);

    const rs: any = await this.api.insRec(info);
    if (rs.ok) {
      this.successNotification();
      console.log(rs.message[0]);
      const rsins: any = await this.insertRec(rs.message[0]);
    } else {
      this.errorNotification();
    }
  }
  async insertRec(id): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_id = id;
    data.day1=this.dateTimeLineShort[0];
    data.day2=this.dateTimeLineShort[1];
    data.day3=this.dateTimeLineShort[2];
    data.day4=this.dateTimeLineShort[3];
    data.day5=this.dateTimeLineShort[4];
    data.day6=this.dateTimeLineShort[5];
    data.day7=this.dateTimeLineShort[6];
    data.day8=this.dateTimeLineShort[7];
    data.day9=this.dateTimeLineShort[8];
    data.day10=this.dateTimeLineShort[9];
    data.day11=this.dateTimeLineShort[10];
    data.day12=this.dateTimeLineShort[11];
    data.day13=this.dateTimeLineShort[12];
    data.day14=this.dateTimeLineShort[13];




    data.timeline_date1=this.des_day1;
    data.timeline_date2=this.des_day2;
    data.timeline_date3=this.des_day3;
    data.timeline_date4=this.des_day4;
    data.timeline_date5=this.des_day5;
    data.timeline_date6=this.des_day6;
    data.timeline_date7=this.des_day7;
    data.timeline_date8=this.des_day8;
    data.timeline_date9=this.des_day9;
    data.timeline_date10=this.des_day10;
    data.timeline_date11=this.des_day11;
    data.timeline_date12=this.des_day12;
    data.timeline_date13=this.des_day13;
    data.timeline_date14=this.des_day14;

    info.push(data);

    const rs: any = await this.api.insData(info);

  }

}
