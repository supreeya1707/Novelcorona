import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup,  Validators} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {listLocales} from 'ngx-bootstrap/chronos';
import Swal from 'sweetalert2';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-forms',
  templateUrl: './form-recheck.component.html',
})
export class FormRecheckComponent implements OnInit {
  generalFrm: any;
  riskFrm: any;
  timelineFrm: any;
  submitted = false;
  btndisble = false;
  novelID: any;
  dataNovel: any[];
  dataTL: any[];

  birthday: any;

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
  datatreat: any;
  datevac1: any;
  datevac2: any;
  datecome: any;
  dateSARS1:any;
  dateSARS2:any;
  startquaran:any;
  endquaran:any;
  dateinvestigate:any;
  dateTimeLinequarantine: any = [];
  dateTimeLineShortquaran: any = [];
  d: any;
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

  startsick: any;
  starttreat: any;

  namevac1: any;
  namevac2: any;
  placevac1: any;
  placevac2: any;


  assign_fever: any;
  assign_oxygen: any;
  come_city: any;
  come_region: any;
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
  currentDate = new Date();
  Datequaran=new Date();

  desDay4: any;
  desDay5: any;
  desDay6: any;
  desDay7: any;
  desDay8: any;
  desDay9: any;
  desDay10: any;
  desDay11: any;
  desDay12: any;
  desDay13: any;
  desDay14: any;
  date: any;

  typeSAR1: any;
  placesendSAR1: any;
  radiodetect1: any;
  typeSAR2: any;
  placesendSAR2: any;
  radiodetect2: any;
  radiodoctor: any;
  timefromdoc: any;
  commentdoctor: any;
  radioSARtype: any;
  firstswab: any;
  secondswab: any;
  ptSarstype: any;
  addressquaran: any;
  reporter: any;
  timereport: any;
  datereport: any;
  wearmask: any;
  place: any;
  cluster: any;
  dataCluster:any = [];


  constructor(private localeService: BsLocaleService, private api: ApiService, private formBuilder: FormBuilder,
              @Inject('baseURL') private baseURL: any) {}


  ngOnInit(): void {
    this.localeService.use(this.locale);
    this.novelID = history.state.novelid;
    // console.log(this.novelID);
    this.getData(this.novelID);
    this.getCluster(1);

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
      addr: [null],
      moo: [null],
      mooban: [null],
      soi: [null],
      birthday: [null],
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

    this.riskFrm  = this.formBuilder.group({
      radiofrom: [null, Validators.compose([Validators.required])],
      radiorepair: [null, Validators.compose([Validators.required])],
      radionear: [null, Validators.compose([Validators.required])],
      radiotouch: [null, Validators.compose([Validators.required])],
      radiovisitor: [null, Validators.compose([Validators.required])],
      radiocrowded: [null, Validators.compose([Validators.required])],
      radiobreath: [null, Validators.compose([Validators.required])],
      radioinject: [null, Validators.compose([Validators.required])],
      radiolabtest: [null, Validators.compose([Validators.required])]
    });

    this.timelineFrm  = this.formBuilder.group({
      desDay1: [null, Validators.compose([Validators.required])],
      desDay2: [null, Validators.compose([Validators.required])],
      desDay3: [null, Validators.compose([Validators.required])]
    });

  }

  async getData(novelid: any): Promise<any>{
    const resDataNovel = await this.api.getDataById(novelid);
    if (resDataNovel.ok){
      // console.log(resDataNovel.message);
      this.dataNovel = resDataNovel.message[0];

      this.generalFrm.get('pname').setValue(this.dataNovel['novel_pname']);
      this.generalFrm.get('fname').setValue(this.dataNovel['novel_fname']);
      this.generalFrm.get('lname').setValue(this.dataNovel['novel_lname']);
      this.generalFrm.get('cid').setValue(this.dataNovel['novel_cid']);
      this.generalFrm.get('age').setValue(this.dataNovel['novel_age']);
      this.generalFrm.get('national').setValue(this.dataNovel['novel_national']);
      this.radioGender = this.dataNovel['novel_gender'];
      this.radioPreg = this.dataNovel['novel_preg'];
      // this.generalFrm.get('radioPreg').setValue(this.dataNovel['novel_preg']);
      this.generalFrm.get('numPreg').setValue(this.dataNovel['novel_numpreg']);
      this.generalFrm.get('pregAge').setValue(this.dataNovel['novel_agepreg']);
      this.generalFrm.get('job').setValue(this.dataNovel['novel_worker']);
      this.generalFrm.get('station').setValue(this.dataNovel['novel_station']);
      this.generalFrm.get('telephone').setValue(this.dataNovel['novel_phone']);
      this.generalFrm.get('telephonedoc').setValue(this.dataNovel['novel_phonedoc']);
      this.generalFrm.get('treat').setValue(this.dataNovel['novel_treat']);
      this.generalFrm.get('birthday').setValue(moment(this.dataNovel['novel_birthday']).format('YYYY-MM-DD'));
      this.birthday = moment(this.dataNovel['novel_birthday']).format('DD/MM/YYYY');
      this.generalFrm.get('addr').setValue(this.dataNovel['novel_number_address']);
      this.generalFrm.get('moo').setValue(this.dataNovel['novel_moo']);
      this.generalFrm.get('mooban').setValue(this.dataNovel['novel_mooban']);
      this.generalFrm.get('soi').setValue(this.dataNovel['novel_soi']);
      this.generalFrm.get('road').setValue(this.dataNovel['novel_road']);
      this.generalFrm.get('tumbon').setValue(this.dataNovel['novel_district']);
      this.generalFrm.get('amphur').setValue(this.dataNovel['novel_amphur']);
      this.generalFrm.get('province').setValue(this.dataNovel['novel_province']);
      this.generalFrm.get('radioSmoke').setValue(this.dataNovel['novel_smoke']);
      this.generalFrm.get('checkcopd').setValue(this.dataNovel['novel_copd']);
      this.generalFrm.get('checkckd').setValue(this.dataNovel['novel_ckd']);
      this.generalFrm.get('checkcad').setValue(this.dataNovel['novel_cad']);
      this.generalFrm.get('checkcva').setValue(this.dataNovel['novel_cva']);
      this.generalFrm.get('checkundm').setValue(this.dataNovel['novel_undm']);
      this.generalFrm.get('checkpids').setValue(this.dataNovel['novel_pids']);
      this.congential = this.dataNovel['novel_congential'];
      this.generalFrm.get('congential_etc').setValue(this.dataNovel['novel_congential_etc']);
      this.generalFrm.get('weight').setValue(this.dataNovel['novel_weight']);
      this.generalFrm.get('high').setValue(this.dataNovel['novel_high']);
      this.generalFrm.get('bmi').setValue(this.dataNovel['novel_bmi']);

      this.startsick = moment(this.dataNovel['novel_start_sick']).format('DD/MM/YYYY');
      this.starttreat = moment(this.dataNovel['novel_start_treat']).format('DD/MM/YYYY');
      this.fistHosp = this.dataNovel['novel_hospital_first'];
      this.fistChw = this.dataNovel['novel_province_first'];
      this.nowHosp = this.dataNovel['novel_hospital_now'];
      this.nowChw = this.dataNovel['novel_province_now'];

      this.radiofever = this.dataNovel['novel_fever'];
      this.assign_fever = this.dataNovel['novel_assign_fever'];
      this.assign_oxygen = this.dataNovel['novel_assign_oxygen'];
      this.radiorespirator = this.dataNovel['novel_respirator'];
      this.radiocough = this.dataNovel['novel_cough'];
      this.radiosorethroat = this.dataNovel['novel_sorethroat'];
      this.radiomusclepain = this.dataNovel['novel_musclepain'];
      this.radiomucous = this.dataNovel['novel_mucous'];
      this.radiophlegm = this.dataNovel['novel_phlegm'];
      this.radiodifficulbreathing = this.dataNovel['novel_difficulbreathing'];
      this.radioheadache = this.dataNovel['novel_headache'];
      this.radiopurify = this.dataNovel['novel_purify'];
      this.radiosmell = this.dataNovel['novel_smell'];
      this.radiotaste = this.dataNovel['novel_taste'];
      this.radioredeye = this.dataNovel['novel_redeye'];
      this.radiorash = this.dataNovel['novel_rash'];
      this.assign_position = this.dataNovel['novel_position'];
      this.radiosymptom = this.dataNovel['novel_symtom'];
      this.symtom_etc = this.dataNovel['novel_symtom_etc'];

      this.radiofrom = this.dataNovel['novel_comefrom_31'];
      this.come_city = this.dataNovel['novel_come_city'];
      this.come_region = this.dataNovel['novel_come_country'];
      this.datecome = moment(this.dataNovel['novel_date_come']).format('DD/MM/YYYY');
      this.come_plane = this.dataNovel['novel_transportation'];
      this.come_round = this.dataNovel['novel_round_tran'];
      this.come_seat = this.dataNovel['novel_number_seat'];

      this.radiorepair = this.dataNovel['novel_takecare_32'];
      this.radionear = this.dataNovel['novel_touch_his33'];
      this.radiotouch = this.dataNovel['novel_his_touch_34'];
      this.assign_touch = this.dataNovel['novel_assigntouch_34'];
      this.radiovisitor = this.dataNovel['novel_tourist_35'];
      this.radiocrowded = this.dataNovel['novel_manyperson_36'];
      this.assign_station = this.dataNovel['novel_assign_station_36'];
      this.radiobreath = this.dataNovel['novel_ari_37'];
      this.radioinject = this.dataNovel['novel_inject_38'];
      this.radiolabtest = this.dataNovel['novel_doc_39'];
      this.assign_etc = this.dataNovel['novel_etc_310'];

      this.havevac = this.dataNovel['novel_havevac'];
      this.havecertificate = this.dataNovel['novel_certificate'];
      this.datevac1 = moment(this.dataNovel['novel_getvac1']).format('DD/MM/YYYY');
      this.namevac1 = this.dataNovel['novel_namevac1'];
      this.placevac1 = this.dataNovel['novel_placevac1'];
      this.datevac2 = moment(this.dataNovel['novel_getvac2']).format('DD/MM/YYYY');
      this.namevac2 = this.dataNovel['novel_namevac2'];
      this.placevac2 = this.dataNovel['novel_placevac2'];
    }else{
      console.error('error');
    }

    const resDataTL = await this.api.getTimeLineById(novelid);
    if (resDataTL.ok){
      this.dataTL = resDataTL.message[0];

      this.dateTimeLineShort[0] = moment(this.dataTL['day1']).format('YYYY-MM-DD');
      this.dateTimeLineShort[1] = moment(this.dataTL['day2']).format('YYYY-MM-DD');
      this.dateTimeLineShort[2] = moment(this.dataTL['day3']).format('YYYY-MM-DD');
      this.dateTimeLineShort[3] = moment(this.dataTL['day4']).format('YYYY-MM-DD');
      this.dateTimeLineShort[4] = moment(this.dataTL['day5']).format('YYYY-MM-DD');
      this.dateTimeLineShort[5] = moment(this.dataTL['day6']).format('YYYY-MM-DD');
      this.dateTimeLineShort[6] = moment(this.dataTL['day7']).format('YYYY-MM-DD');
      this.dateTimeLineShort[7] = moment(this.dataTL['day8']).format('YYYY-MM-DD');
      this.dateTimeLineShort[8] = moment(this.dataTL['day9']).format('YYYY-MM-DD');
      this.dateTimeLineShort[9] = moment(this.dataTL['day10']).format('YYYY-MM-DD');
      this.dateTimeLineShort[10] = moment(this.dataTL['day11']).format('YYYY-MM-DD');
      this.dateTimeLineShort[11] = moment(this.dataTL['day12']).format('YYYY-MM-DD');
      this.dateTimeLineShort[12] = moment(this.dataTL['day12']).format('YYYY-MM-DD');
      this.dateTimeLineShort[13] = moment(this.dataTL['day14']).format('YYYY-MM-DD');

      this.timelineFrm.get('desDay1').setValue(this.dataTL['timeline_date1']);
      this.timelineFrm.get('desDay2').setValue(this.dataTL['timeline_date2']);
      this.timelineFrm.get('desDay3').setValue(this.dataTL['timeline_date3']);

      this.desDay4 = this.dataTL['timeline_date4'];
      this.desDay5 = this.dataTL['timeline_date5'];
      this.desDay6 = this.dataTL['timeline_date6'];
      this.desDay7 = this.dataTL['timeline_date7'];
      this.desDay8 = this.dataTL['timeline_date8'];
      this.desDay9 = this.dataTL['timeline_date9'];
      this.desDay10 = this.dataTL['timeline_date10'];
      this.desDay11 = this.dataTL['timeline_date11'];
      this.desDay12 = this.dataTL['timeline_date12'];
      this.desDay13 = this.dataTL['timeline_date13'];
      this.desDay14 = this.dataTL['timeline_date14'];
    }else{
      console.error('error');
    }
  }

  async getCluster(type: any): Promise<any>{
    const resCluster = await this.api.getClusterByType(type);
    console.log(resCluster);
  }


  get f() {
    return this.generalFrm.controls;
  }
  get f2() {
    return this.timelineFrm.controls;
  }
  get f3() {
    return this.riskFrm.controls;
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

  getBirthday(e: any): any {
    console.log('this.birthday', e);
    this.birthday = moment(e).format('YYYY-MM-DD');
    // console.log(this.datatreat);
  }

  getDatetreat(e: any): any {
    // console.log(e);
    this.datatreat = moment(e).format('YYYY-MM-DD');
    // console.log(this.datatreat);
  }

  getDatecome(e: any): any {
    console.log(e);
    this.datecome = moment(e).format('YYYY-MM-DD');
    // console.log(this.datecome);
  }

  getDatequarantine(e: any): any {
    // console.log(e);
    this.startquaran = moment(e).format('YYYY-MM-DD');
    this.genDatequarantine(this.startquaran);
    // console.log(this.datecome);
  }

  convertDate(d: any, i: any): any {
    const ss: any = d.toString().split('/');
    const dataDate: any = (ss[2]) + '-' + ss[1] + '-' + ss[0];
    const datai: any = -i;
    return moment(dataDate).locale('th').add(datai, 'day').add('year', 543).format('DD MMMM YYYY');
  }

  genDatequarantine(e: any): any {
    this.dateTimeLinequarantine = [];
    this.dateTimeLineShortquaran = [];
    for (let i = 1; i <= 14; i++) {
      this.dateTimeLinequarantine.push(this.convertDate(e, i));
      this.dateTimeLineShortquaran.push(moment(e).add(i, 'day').format('DD/MM/YYYY'));
      // console.log(this.dateTimeLineShort);
    }
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

  async updateData(): Promise<any>{
    this.submitted = true;
    if (this.generalFrm.invalid || this.timelineFrm.invalid || this.riskFrm.invalid) {
      // console.log('invalid');
      console.log('this.generalFrm.invalid ', this.generalFrm.invalid);
      console.log('this.riskFrm.invalid ', this.riskFrm.invalid);
      console.log('this.timelineFrm.invalid ', this.timelineFrm.invalid);
      return;
    }else{
      this.btndisble = true;
    }
    const novelResponse = await this.updateNovelData();
    const timelineResponse = await this.updateTLData();
    const staffResponse = await this.insertRecheck();

    if (novelResponse === true && timelineResponse === true && staffResponse === true) {
      this.successNotification();
    } else {
      this.errorNotification();
    }
  }

  async insertRecheck(): Promise<any> {
    const data: any = {};
    const infoData: any = [];

    data.novel_id = this.novelID;
    data.riskconnect = this.cluster;
    data.wearmask = this.wearmask;
    data.place = this.place;

    data.sars1_date = this.dateSARS1;
    data.sars1_type = this.typeSAR1;
    data.sars1_placesend = this.placesendSAR1;
    data.sars1_result = this.radiodetect1;

    data.sars2_date = this.dateSARS2;
    data.sars2_type = this.typeSAR2;
    data.sars2_placesend = this.placesendSAR2;
    data.sars2_result = this.radiodetect2;

    data.doctor = this.radiodoctor;
    data.doctor_time = this.timefromdoc;
    data.doctor_comment = this.commentdoctor;

    data.sars_pt_type = this.radioSARtype;
    data.date_swab1 = this.firstswab;
    data.date_swab2 = this.secondswab;
    data.sdate_quaran = this.startquaran;
    data.edate_quaran = this.endquaran;
    data.address_quaran = this.addressquaran;
    data.reporter = this.reporter;
    data.report_date = this.novelID;
    data.report_datetime = moment().format('YYYY-MM-DD HH:mm:ii');

    infoData.push(data);
    const resStaff = await this.api.insByStaff(infoData);
    return resStaff.ok;
  }

  async updateNovelData(): Promise<any> {
    const data: any = {};
    const infoData: any = [];

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


    data.novel_comefrom_31 = this.riskFrm.value.radiofrom;
    data.novel_come_city = this.come_city;
    data.novel_come_country = this.come_region;
    data.novel_date_come = (this.datecome != null) ? moment(this.datecome).format('YYYY-MM-DD') : null;
    data.novel_transportation = this.come_plane;
    data.novel_round_tran = this.come_round;
    data.novel_number_seat = this.come_seat;

    data.novel_takecare_32 = this.riskFrm.value.radiorepair;
    data.novel_touch_his33 = this.riskFrm.value.radionear;
    data.novel_his_touch_34 = this.riskFrm.value.radiotouch;
    data.novel_assigntouch_34 = this.assign_touch;
    data.novel_assign_station_36 = this.assign_station;

    data.novel_tourist_35 = this.riskFrm.value.radiovisitor;
    data.novel_manyperson_36 = this.riskFrm.value.radiocrowded;
    data.novel_ari_37 = this.riskFrm.value.radiobreath;
    data.novel_inject_38 = this.riskFrm.value.radioinject;
    data.novel_doc_39 = this.riskFrm.value.radiolabtest;
    data.novel_etc_310 = this.assign_etc;

    data.novel_havevac = this.havevac;
    data.novel_certificate = this.havecertificate;
    data.novel_getvac1 = (this.datevac1 != null) ? moment(this.datevac1).format('YYYY-MM-DD') : null;
    data.novel_namevac1 = this.namevac1;
    data.novel_placevac1 = this.placevac1;
    data.novel_getvac2 = (this.datevac2 != null) ? moment(this.datevac2).format('YYYY-MM-DD') : null;
    data.novel_namevac2 = this.namevac2;
    data.novel_placevac2 = this.placevac2;

    infoData.push(data);

    const resUpdateNovel: any = await this.api.updateNovelData(this.novelID, infoData);
    return resUpdateNovel.ok;
  }

  async updateTLData(): Promise<any> {
    const data: any = {};
    const info: any = [];

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
    data.timeline_date4 = this.desDay4;
    data.timeline_date5 = this.desDay5;
    data.timeline_date6 = this.desDay6;
    data.timeline_date7 = this.desDay7;
    data.timeline_date8 = this.desDay8;
    data.timeline_date9 = this.desDay9;
    data.timeline_date10 = this.desDay10;
    data.timeline_date11 = this.desDay11;
    data.timeline_date12 = this.desDay12;
    data.timeline_date13 = this.desDay13;
    data.timeline_date14 = this.desDay14;

    info.push(data);

    const resUpdateTL: any = await this.api.updateTLData(this.novelID, info);
    return  resUpdateTL.ok;
  }

}
