import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {listLocales} from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit {
  generalFrm: any;
  timelineFrm: any;
  submitted = false;
  btndisble = false;

  radioGender: any;
  radioPreg: any;
  radioCheck: any;

  // radioAddress: any = 0;
  radioSmoke: any;
  radiosymptom: any;
  radiofrom: any;

  radiofever: any;
  radiocough: any;
  radiosorethroat: any;
  radiorespirator: any;

  radiomusclepain: any;
  radiomucous: any;
  radiophlegm: any;
  radioheadache: any;
  radiodifficulbreathing: any;
  radiopurify: any;
  radiosmell: any;
  radiotaste: any;
  radioredeye: any;
  radiorash: any;


  radiorepair: any;
  radionear: any;
  radiotakecare: any;
  radiotouch: any;
  radiovisitor: any;
  radiocrowded: any;
  radiobreath: any;
  radioinject: any;
  radiolabtest: any;
  radiotest: any = 0;
  dateTimeLine: any = [];
  dateTimeLineShort: any = [];
  Addressetc: any;
  sDate: any;
  dateselect = moment().format('yyyy-MM-DD');
  dateStart = moment().locale('th').add(543, 'year').format('DD/MM/yyyy');
  datadate: any = moment();
  // datadate: any ;
  datatreat: any;
  datevac1: any;
  datevac2: any;
  datacome: any;
  d: any;
  // dateFirst = moment().format('yyyy-MM-DD');
  fistHosp = 'โรงพยาบาลราชบุรี';
  fistChw = 'ราชบุรี';
  nowHosp = 'โรงพยาบาลราชบุรี';
  nowChw = 'ราชบุรี';
  hospcode = 10677;

  havevac: any;
  havecertificate: any;

  congential: any;
  weight: any;
  high: any;

  namevac1: any;
  namevac2: any;
  placevac1: any;
  placevac2: any;


  hos_first: any;
  province_first: any;
  hos_now: any;
  province_now: any;
  assign_fever: any;
  assign_oxygen: any;
  find_symtom: any;
  come_city: any;
  come_region: any;
  come_day: any;
  come_plane: any;
  come_round: any;
  come_seat: any;
  assign_touch: any;
  assign_etc: any;
  assign_station: any;
  assign_position: any;
  radioAddress: any;
  symtom_etc: any;
  locale = 'th-be';
  locales = listLocales();
  currentDate = new Date();
  assign_des: any;

  des_day1: any;
  des_day2: any;
  des_day3: any;
  des_day4: any;
  des_day5: any;
  des_day6: any;
  des_day7: any;
  des_day8: any;
  des_day9: any;
  des_day10: any;
  des_day11: any;
  des_day12: any;
  des_day13: any;
  des_day14: any;
  date: any;

  constructor(private localeService: BsLocaleService, private api: ApiService, private formBuilder: FormBuilder,
              @Inject('baseURL') private baseURL: any) {
  }


  ngOnInit(): void {
    this.localeService.use(this.locale);
    this.genDateTimeLine(moment().format('YYYY-MM-DD'));
    // console.log(this.dateTimeLineShort);

    this.generalFrm = this.formBuilder.group({
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])],
      pname: [null, Validators.compose([Validators.required])],
      fname: [null, Validators.compose([Validators.required])],
      lname: [null, Validators.compose([Validators.required])],
      age: [null, Validators.compose([Validators.required])],
      national: [null, Validators.compose([Validators.required])],
      radioGender: [null, Validators.compose([Validators.required])],
      radioPreg: [null],
      numPreg: [null],
      pregAge: [null],
      job: [null, Validators.compose([Validators.required])],
      station: [null, Validators.compose([Validators.required])],
      telephone: [null, Validators.compose([Validators.required])],
      telephonedoc: [null],
      treat: [null],
      birthday: [null],
      addr: [null, Validators.compose([Validators.required])],
      moo: [null, Validators.compose([Validators.required])],
      mooban: [null],
      soi: [null],
      road: [null],
      tumbon: [null, Validators.compose([Validators.required])],
      amphur: [null, Validators.compose([Validators.required])],
      province: [null, Validators.compose([Validators.required])],
      radioSmoke: [null, Validators.compose([Validators.required])],
      checkcopd: [null],
      checkckd: [null],
      checkcad: [null],
      checkcva: [null],
      checkundm: [null],
      checkpids: [null],
      congential_etc: [null],
      weight: [null],
      high: [null],
      bmi: [null],
    });

    this.timelineFrm  = this.formBuilder.group({
      desDay1: [null, Validators.compose([Validators.required])],
      desDay2: [null, Validators.compose([Validators.required])],
      desDay3: [null, Validators.compose([Validators.required])]
    });

  }

  radiochPreg(e): any {
    this.radioPreg = e;
  }

  setValidators() {
    const pregControl = this.generalFrm.get('radioPreg');

    this.generalFrm.get('radioGender').valueChanges
      .subscribe((genderSelect: any | null) => {
        console.log(genderSelect);
        if (genderSelect === 1) {
          pregControl.setValidators([null, Validators.compose([Validators.required])]);
        }
        pregControl.updateValueAndValidity();
      });

  }

  get f() {
    return this.generalFrm.controls;
  }
  get f2() {
    return this.timelineFrm.controls;
  }

  resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

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

  getDate(e: any): any {
    this.datadate = moment(e).format('YYYY-MM-DD');
    this.genDateTimeLine(this.datadate);
    // console.log(this.datadate);
    // console.log(this.dateTimeLineShort);
  }

  getDatetreat(e: any): any {
    // console.log(e);
    this.datatreat = moment(e).format('YYYY-MM-DD');
    // console.log(this.datatreat);
  }

  getDatecome(e: any): any {
    // console.log(e);
    this.datacome = moment(e).format('YYYY-MM-DD');
    // console.log(this.datacome);
  }

  convertDate(d: any, i: any): any {
    const ss: any = d.toString().split('/');
    const dataDate: any = (ss[2]) + '-' + ss[1] + '-' + ss[0];
    const datai: any = -i;
    // return moment(dataDate).locale('th').add(datai, 'day').add('year', 543).format('DD MMMM YYYY');
  }

  genDateTimeLine(e: any): any {
    this.dateTimeLine = [];
    this.dateTimeLineShort = [];
    for (let i = 1; i <= 14; i++) {
      this.dateTimeLine.push(this.convertDate(e, i));
      this.dateTimeLineShort.push(moment(e).add(-i, 'day').format('YYYY-MM-DD'));
      // console.log(this.dateTimeLineShort);
    }
  }


  selectDateStart(e: any): any {
    // console.log(e);
    this.datadate = e;
    // this.datatreat = moment(e).add(543, 'year').format('DD/MM/YYYY');
    this.sDate = moment(e).format('YYYY-MM-DD');
    // console.info(this.datadate);
    this.dateTimeLine = [];
    this.dateTimeLineShort = [];
    this.genDateTimeLine(this.datadate);
  }

  async insertData(): Promise<any> {
    this.submitted = true;
    // stop here if form is invalid
    if (this.generalFrm.invalid || this.timelineFrm.invalid) {
      return;
    }
    this.btndisble = true;


    // console.log('this.generalFrm.value.birthday', this.generalFrm.value.birthday);
    console.log(this.generalFrm.value);

    const data: any = {};
    const info: any = [];
    data.novel_hospcode = this.hospcode;
    data.novel_pname = this.generalFrm.value.pname;
    data.novel_fname = this.generalFrm.value.fname;
    data.novel_lname = this.generalFrm.value.lname;
    data.novel_cid = this.generalFrm.value.cid;
    data.novel_age = this.generalFrm.value.age;
    data.novel_national = this.generalFrm.value.national;
    data.novel_gender = this.generalFrm.value.radioGender;
    data.novel_preg = this.generalFrm.value.radioPreg;
    data.novel_numpreg = this.generalFrm.value.numPreg;
    data.novel_agepreg = this.generalFrm.value.pregAge;
    data.novel_worker = this.generalFrm.value.job;
    data.novel_station = this.generalFrm.value.station;
    data.novel_phone = this.generalFrm.value.telephone;
    data.novel_phonedoc = this.generalFrm.value.telephonedoc;
    data.novel_treat = this.generalFrm.value.treat;

    data.novel_address = this.generalFrm.value.radioAddress;
    data.novel_address_etc = this.generalFrm.value.Addressetc;
    data.novel_number_address = this.generalFrm.value.addr;
    data.novel_moo = this.generalFrm.value.moo;
    data.novel_mooban = this.generalFrm.value.mooban;
    data.novel_soi = this.generalFrm.value.soi;
    data.novel_road = this.generalFrm.value.road;
    data.novel_district = this.generalFrm.value.tumbon;
    data.novel_amphur = this.generalFrm.value.amphur;
    data.novel_province = this.generalFrm.value.province;

    data.novel_smoke = this.generalFrm.value.radioSmoke;

    data.novel_copd = (this.generalFrm.value.checkcopd) ? 1 : 0;
    data.novel_ckd = (this.generalFrm.value.checkckd) ? 1 : 0;
    data.novel_cad = (this.generalFrm.value.checkcad) ? 1 : 0;
    data.novel_cva = (this.generalFrm.value.checkcva) ? 1 : 0;
    data.novel_undm = (this.generalFrm.value.checkundm) ? 1 : 0;
    data.novel_pids = (this.generalFrm.value.checkpids) ? 1 : 0;
    data.novel_congential = this.congential;
    data.novel_congential_etc = this.generalFrm.value.congential_etc;

    data.novel_weight = this.generalFrm.value.weight;
    data.novel_high = this.generalFrm.value.high;
    data.novel_bmi = (this.generalFrm.value.weight / ((this.generalFrm.value.high / 100) * (this.generalFrm.value.high / 100)));

    data.novel_birthday = (this.generalFrm.value.birthday != null) ? moment(this.generalFrm.value.birthday).format('YYYY-MM-DD') : null;
    data.novel_start_sick = moment(this.datadate).format('YYYY-MM-DD');
    data.novel_start_treat = moment(this.datatreat).format('YYYY-MM-DD');
    data.novel_hospital_first = this.fistHosp;
    data.novel_province_first = this.fistChw;
    data.novel_hospital_now = this.nowHosp;
    data.novel_province_now = this.nowChw;

    data.novel_fever = this.radiofever;
    data.novel_assign_fever = this.assign_fever;
    data.novel_assign_oxygen = this.assign_oxygen;
    data.novel_fever = this.radiofever;
    data.novel_respirator = this.radiorespirator;
    data.novel_cough = this.radiocough;
    data.novel_sorethroat = this.radiosorethroat;
    data.novel_musclepain = this.radiomusclepain;
    data.novel_mucous = this.radiomucous;
    data.novel_phlegm = this.radiophlegm;
    data.novel_difficulbreathing = this.radiodifficulbreathing;
    data.novel_headache = this.radioheadache;
    data.novel_purify = this.radiopurify;
    data.novel_smell = this.radiosmell;
    data.novel_taste = this.radiotaste;
    data.novel_redeye = this.radioredeye;
    data.novel_rash = this.radiorash;
    data.novel_position = this.assign_position;
    data.novel_symtom = this.radiosymptom;
    data.novel_symtom_etc = this.symtom_etc;


    data.novel_comefrom_31 = this.radiofrom;
    data.novel_come_city = this.come_city;
    data.novel_come_country = this.come_region;
    data.novel_date_come = (this.datacome != null) ? moment(this.datacome).format('YYYY-MM-DD') : null;
    data.novel_transportation = this.come_plane;
    data.novel_round_tran = this.come_round;
    data.novel_number_seat = this.come_seat;

    data.novel_takecare_32 = this.radiorepair;
    data.novel_touch_his33 = this.radionear;
    data.novel_his_touch_34 = this.radiotouch;
    data.novel_assigntouch_34 = this.assign_touch;
    data.novel_assign_station_36 = this.assign_station;

    data.novel_tourist_35 = this.radiovisitor;
    data.novel_manyperson_36 = this.radiocrowded;
    data.novel_ari_37 = this.radiobreath;
    data.novel_inject_38 = this.radioinject;
    data.novel_doc_39 = this.radiolabtest;
    data.novel_etc_310 = this.assign_etc;
    data.novel_input_datetime = moment().format('YYYY-MM-DD HH:mm:ss');
    data.novel_havevac = this.havevac;
    data.novel_certificate = this.havecertificate;
    data.novel_getvac1 = (this.datevac1 != null) ? moment(this.datevac1).format('YYYY-MM-DD') : null;
    data.novel_namevac1 = this.namevac1;
    data.novel_placevac1 = this.placevac1;
    data.novel_getvac2 = (this.datevac2 != null) ? moment(this.datevac2).format('YYYY-MM-DD') : null;
    data.novel_namevac2 = this.namevac2;
    data.novel_placevac2 = this.placevac2;

    info.push(data);

    const rs: any = await this.api.insRec(info);
    if (rs.ok) {
      console.log(rs.message[0]);
      const rsins: any = await this.insertRec(rs.message[0]);
      console.log('rsins ', rsins);
      this.successNotification();
    } else {
      this.errorNotification();
    }
  }

  // บันทึก Timeline

  async insertRec(id): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_id = id;
    data.day1 = this.dateTimeLineShort[0];
    data.day2 = this.dateTimeLineShort[1];
    data.day3 = this.dateTimeLineShort[2];
    data.day4 = this.dateTimeLineShort[3];
    data.day5 = this.dateTimeLineShort[4];
    data.day6 = this.dateTimeLineShort[5];
    data.day7 = this.dateTimeLineShort[6];
    data.day8 = this.dateTimeLineShort[7];
    data.day9 = this.dateTimeLineShort[8];
    data.day10 = this.dateTimeLineShort[9];
    data.day11 = this.dateTimeLineShort[10];
    data.day12 = this.dateTimeLineShort[11];
    data.day13 = this.dateTimeLineShort[12];
    data.day14 = this.dateTimeLineShort[13];


    data.timeline_date1 = this.timelineFrm.value.desDay1;
    data.timeline_date2 = this.timelineFrm.value.desDay2;
    data.timeline_date3 = this.timelineFrm.value.desDay3;
    data.timeline_date4 = this.des_day4;
    data.timeline_date5 = this.des_day5;
    data.timeline_date6 = this.des_day6;
    data.timeline_date7 = this.des_day7;
    data.timeline_date8 = this.des_day8;
    data.timeline_date9 = this.des_day9;
    data.timeline_date10 = this.des_day10;
    data.timeline_date11 = this.des_day11;
    data.timeline_date12 = this.des_day12;
    data.timeline_date13 = this.des_day13;
    data.timeline_date14 = this.des_day14;

    info.push(data);

    const rs: any = await this.api.insData(info);
    console.log(rs);

  }


}
