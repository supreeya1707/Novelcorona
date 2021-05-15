import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {listLocales} from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {ApiService} from "../services/api.service";


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

  // dateFirst = moment().format('yyyy-MM-DD');
  hosp_fist='โรงพยาบาลราชบุรี';
  provin_first='ราชบุรี';
  hosp_now='โรงพยาบาลราชบุรี';
  provin_now='ราชบุรี';

  name:any;
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
  No: any;
  moo: any;
  mooban: any;
  soi: any;
  road: any;
  tumbon: any;
  amphur: any;
  disaese:any;
  province: any;
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
  datadate: any;

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

  ngOnInit(): void {
    console.log(this.dateStart);
    this.localeService.use(this.locale);
    this.genDateTimeLine(this.dateStart);
    console.log(this.dateTimeLine);
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.radiosymptom.push(e.target.value);
    } else {
      const index = this.radiosymptom.indexOf(e.target.value);
      this.radiosymptom.splice(index, 1);
    }
    console.log(this.radiosymptom);
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
    this.dateStart = moment(e).add(543, 'year').format('DD/MM/YYYY');
    this.sDate = moment(e).format('YYYY-MM-DD');
    console.info(this.dateStart);
    this.dateTimeLine = [];
    this.dateTimeLineShort = [];
    this.genDateTimeLine(this.dateStart);
    console.warn(this.dateTimeLineShort);

  }

  async insertData(): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_name=this.name;
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
    data.novel_anphur= this.amphur;
    data.novel_disease= this.disaese;
    data.novel_province= this.province;
    data.novel_smoke= this.radioSmoke;

    data.novel_start_sick=this.dateStart;
    data.novel_start_treat= this.dateStart;
    data.novel_hospital_first= this.hos_first;
    data.novel_province_first= this.province_first;
    data.novel_hospital_now= this.hos_now;
    data.novel_province_now= this.province_now;
    data.novel_symstom_any= this.radiosymptom;
     data.novel_assign_fever=this.assign_fever;
     data.novel_assign_oxygen=this.assign_oxygen;

    data.novel_comeform= this.radiofrom;
    data.novel_come_city= this.come_city;
    data.novel_come_country= this.come_region;
    data.novel_date_come= this.come_day;
    data.novel_transportation= this.come_plane;

    data.novel_round_tran= this.come_round;
    data.novel_number_seat= this.come_seat;
    data.novel_takecare_hos= this.radiorepair;
    data.novel_touch_hos=this.radionear;
    data.novel_his_touch= this.radiotouch;
    data.assign_touch=this.assign_touch

    data.novel_tourist= this.radiovisitor;
    data.novel_manyperson= this.radiocrowded;
    data.novel_ari= this.radiobreath;
    data.novel_inject= this.radioinject;
    data.novel_doc= this.radiolabtest;
    data.novel_des= this.assign_employ;
    data.novel_input_datetime = moment().format('yyyy-MM-DD HH:mm:ss');









    info.push(data);
    const rs: any = await this.api.insRec(info);
    // if (rs.ok) {
    //   this.successNotification();
    // } else {
    //   this.errorNotification();
    // }
  }
}
