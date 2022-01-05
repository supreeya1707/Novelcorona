import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


interface Pname {
  value: string;
  viewValue: string;
}

interface PTtype {
  value: string;
  viewValue: string;
}

interface SContact {
  value: string;
  viewValue: string;
}

interface SContact1 {
  value: string;
  viewValue: string;
}

interface SContact2 {
  value: string;
  viewValue: string;
}

interface SContactPlace {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-forms',
  templateUrl: './novelcorona2.component.html',
})
export class Novelcorona2Component implements OnInit {
  generalFrm: any;
  timelineFrm: any;
  riskFrm: any;
  clinicFrm: any;
  submitted = false;
  btndisble = false;

  dataContact: any = [];
  dataVaccine: any = [];

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

  treat: any;
  other_treat: any;

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
  sDate: any;
  dateselect = moment().format('yyyy-MM-DD');
  dateStart = moment().locale('th').add(543, 'year').format('DD/MM/yyyy');

  datadate: any = moment();
  datatreat: any;
  datevac1: any;
  datevac2: any;
  datevac3: any;
  datecome: any;
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

  namevac1: any;
  namevac2: any;
  namevac3: any;
  placevac1: any;
  placevac2: any;
  placevac3: any;


  assign_fever: any;
  assign_oxygen: any;
  come_city: any;
  come_region: any;
  come_plane: any;
  come_round: any;
  come_seat: any;
  assign_touch: any;
  assign_contract: any;
  assign_station: any;
  assign_position: any;
  symtom_etc: any;
  locale = 'th-be';
  currentDate = new Date();


  desDay1: any;
  desDay2: any;
  desDay3: any;
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
  desOther: any;
  date: any;


  scontact: any;
  scontact2: any;
  scontact3: any;
  scontactplace: any;
  radioStaffContact: any;
  radiouri: any;

  servicepoint: any;
  dhph: any;
  dhphcode: any;
  agree: any;
  hospcode1: any;
  dataServicepoint: any = [];
  dataDHPH: any = [];
  servicepointFrm: any;
  btndisble1: any = false;
  @ViewChild('content01', {read: TemplateRef}) content01: TemplateRef<any>;
  @ViewChild('content02', {read: TemplateRef}) content02: TemplateRef<any>;

  dataSContact: SContact[] = [
    {value: '1', viewValue: 'บุคคลากรใส่ surgical mask ร่วมกับ face shield หรือ อยู่ห่างจากผู้ป่วยเกิน 1 เมตร'},
    {value: '2', viewValue: 'บุคคลากรใส่ surgical mask'},
    {
      value: '3',
      viewValue: 'บุคลากรใส่แค่ face shield หรือ บุคลากรไม่ใส่เครื่องป้องกันใดๆ หรือ กรณีทำ aerosol-generating procedure และไม่ได้ใส่ N95 respirator และ face shield'
    },
    {
      value: '4',
      viewValue: 'สัมผัสโดยตรง (direct contact) กับสารคัดหลั่งของผู้ติดเชื้อ เช่น น้ำมูก เสมหะ น้ำลายโดยไม่ได้ใส่ถุงมือ และไม่ได้ล้างมือ ก่อนเอามือสัมผัสบริเวณเยื่อบุตา ปาก จมูกตัวเอง หรือรับประทานอาการโดยใช้ จาน ชาม ช้อน หรือ แก้วน้ำร่วมกัน'
    },
    {
      value: '5',
      viewValue: 'สัมผัสทางอ้อม (indirect contact) เช่น สัมผัสกับสิ่งของของผู้ติดเชื้อ โดยไม่ได้ใส่ถุงมือ และไม่ได้ล้างมือ ก่อนเอามือสัมผัสบริเวณเยื่อบุตา ปาก จมูกตัวเอง'
    }
  ];

  dataSContactPlace: SContactPlace[] = [
    {value: '1', viewValue: 'บุคลากรใส่ surgical mask หรือ cloth mask ตลอดเวลา'},
    {value: '2', viewValue: 'บุคลากรไม่ใส่ surgical mask หรือ cloth mask หรือไม่ได้ใส่ตลอดเวลา'}
  ];


  dataSContact1: SContact1[] = [
    {value: '1', viewValue: 'ผู้ติดเชื้อใส่ surgical mask หรือ cloth mask'},
    {value: '2', viewValue: 'ผู้ติดเชื้อไม่ใส่ surgical mask หรือ cloth mask และสัมผัส <= 15 นาที'},
    {value: '3', viewValue: 'ผู้ติดเชื้อไม่ใส่ surgical mask หรือ cloth mask และสัมผัส > 15 นาที'}
  ];

  dataSContact2: SContact2[] = [
    {value: '1', viewValue: 'ผู้ติดเชื้อใส่ surgical mask หรือ cloth mask และสัมผัส <= 15 นาที'},
    {value: '2', viewValue: 'ผู้ติดเชื้อใส่ surgical mask หรือ cloth mask และสัมผัส > 15 นาที'},
    {value: '3', viewValue: 'ผู้ติดเชื้อไม่ใส่ surgical mask หรือ cloth mask และสัมผัส <= 15 นาที'},
    {value: '4', viewValue: 'ผู้ติดเชื้อไม่ใส่ surgical mask หรือ cloth mask และสัมผัส > 15 นาที'}
  ];

  dataPname: Pname[] = [
    {value: 'นาย', viewValue: 'นาย'},
    {value: 'นาง', viewValue: 'นาง'},
    {value: 'นางสาว', viewValue: 'นางสาว'},
    {value: 'ด.ช.', viewValue: 'ด.ช.'},
    {value: 'ด.ญ.', viewValue: 'ด.ญ.'},
  ];

  dataPTtpye: PTtype[] = [
    {value: 'UC ในเขต', viewValue: 'UC ในเขต'},
    {value: 'UC นอกเขต', viewValue: 'UC นอกเขต'},
    {value: 'UC ต่างจังหวัด', viewValue: 'UC ต่างจังหวัด'},
    {value: 'ผู้พิการ', viewValue: 'ผู้พิการ'},
    {value: 'ข้าราชการจ่ายตรง', viewValue: 'ข้าราชการจ่ายตรง'},
    {value: 'ข้าราชการท้องถิ่น', viewValue: 'ข้าราชการท้องถิ่น'},
    {value: 'เบิกต้นสังกัด', viewValue: 'เบิกต้นสังกัด'},
    {value: 'ประกันสังคม', viewValue: 'ประกันสังคม'},
    {value: 'รัฐวิสาหกิจ', viewValue: 'รัฐวิสาหกิจ'},
    {value: 'โครงการพิเศษ', viewValue: 'โครงการพิเศษ'},
    {value: 'ชำระเงินเอง', viewValue: 'ชำระเงินเอง'},
    {value: 'อื่น ๆ', viewValue: 'อื่น ๆ'},
  ];


  constructor(private localeService: BsLocaleService, private api: ApiService, private formBuilder: FormBuilder,
              @Inject('baseURL') private baseURL: any, private router: Router, private modalService: NgbModal) {}


  ngOnInit(): void {

    this.localeService.use(this.locale);
    this.genDateTimeLine(moment().format('YYYY-MM-DD'));

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
      telephone: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
      treat: [null],
      birthday: [null, Validators.compose([Validators.required])],
      addr: [null],
      moo: [null],
      mooban: [null],
      soi: [null],
      road: [null],
      tumbon: [null, Validators.compose([Validators.required])],
      amphur: [null, Validators.compose([Validators.required])],
      province: [null, Validators.compose([Validators.required])],
      radioSmoke: [null],
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

    this.riskFrm = this.formBuilder.group({
      radiofrom: [null, Validators.compose([Validators.required])],
      radiorepair: [null, Validators.compose([Validators.required])],
      radionear: [null, Validators.compose([Validators.required])],
      radiotouch: [null, Validators.compose([Validators.required])],
      radiovisitor: [null, Validators.compose([Validators.required])],
      radiocrowded: [null, Validators.compose([Validators.required])],
      radiobreath: [null, Validators.compose([Validators.required])],
      radioinject: [null, Validators.compose([Validators.required])],
      radiolabtest: [null, Validators.compose([Validators.required])],
      assignRisk: [null],
      radioStaffContact: [null],
      scontact2: [null],
      scontact3: [null],
      scontactplace: [null],

    });

    this.timelineFrm = this.formBuilder.group({
      // desDay1: [null, Validators.compose([Validators.required])],
      // desDay2: [null, Validators.compose([Validators.required])],
      // desDay3: [null, Validators.compose([Validators.required])],
      desOther: [null, Validators.compose([Validators.required])],
    });

    this.clinicFrm = this.formBuilder.group({
      assign_fever: [null, Validators.compose([Validators.required])]
    });


    this.getDataServicepoint();
    this.getDataDHPH();
    this.getContact();
    this.getVaccine();
    this.setValidators();
    setTimeout(() => {
      this.openModal();
    }, 300);

  }

  async getDataServicepoint(): Promise<any> {
    const res = await this.api.getServicepoint();
    if (res.ok === true) {
      this.dataServicepoint = res.message;
    } else {
      console.log('error');
    }
  }

  async getDataDHPH(): Promise<any> {
    const resDHPH = await this.api.getDHPH();
    if (resDHPH.ok === true) {
      this.dataDHPH = resDHPH.message;
      // console.log(resDHPH.message);
    } else {
      console.log('error');
    }
  }

  changeServicepoint(): any {
    if (this.servicepoint === '5') {
      this.btndisble1 = false;
    } else {
      this.btndisble1 = true;
    }
  }

  changeDHPH(): any {
    if (this.dhph) {
      this.btndisble1 = true;
    } else {
      this.btndisble1 = false;
    }
  }

  openModal(): any {
    this.modalService.open(this.content01, {size: 'xl', backdrop: 'static'});this.modalService.open(this.content01, {size: 'xl', backdrop: 'static'});
  }

  btnStep1(): any {
    this.modalService.dismissAll();
    this.modalService.open(this.content02, {size: 'xl', backdrop: 'static'});
  }

  btnStep2(): any {
    this.modalService.dismissAll();
  }

  get f(): any {
    return this.generalFrm.controls;
  }

  get f2(): any {
    return this.timelineFrm.controls;
  }

  get f3(): any {
    return this.riskFrm.controls;
  }

  get f4(): any {
    return this.clinicFrm.controls;
  }

  setValidators(): any {
    const radioStaffControl = this.riskFrm.get('radioStaffContact');
    const scontact2Control = this.riskFrm.get('scontact2');
    const scontact3Control = this.riskFrm.get('scontact3');
    const scontactplaceControl = this.riskFrm.get('scontactplace');

    this.riskFrm.get('radiolabtest').valueChanges
      .subscribe(userMethod => {
        // console.log('userMethod ', userMethod);
        if (userMethod === 1) {
          radioStaffControl.setValidators([Validators.required]);
        } else {
          radioStaffControl.setValidators(null);
        }
        radioStaffControl.updateValueAndValidity();
      });

    this.riskFrm.get('radioStaffContact').valueChanges
      .subscribe(radioStaff => {
        // console.log('radioStaff ', radioStaff);
        if (radioStaff === 1) {
          scontact2Control.setValidators([Validators.required]);
          scontactplaceControl.setValidators(null);
        } else if (radioStaff === 2) {
          scontact2Control.setValidators(null);
          scontactplaceControl.setValidators([Validators.required]);
        } else {
          scontact2Control.setValidators(null);
          scontactplaceControl.setValidators(null);
        }
        scontact2Control.updateValueAndValidity();
        scontactplaceControl.updateValueAndValidity();
      });

    this.riskFrm.get('scontact2').valueChanges
      .subscribe(scontact2 => {
        if (scontact2 === '1' || scontact2 === '2') {
          scontact3Control.setValidators([Validators.required]);
        } else {
          scontact3Control.setValidators(null);
        }
        scontact3Control.updateValueAndValidity();
      });

  }

  async getContact(): Promise<any> {
    const resContact = await this.api.getContact();
    // console.log(resContact);
    if (resContact.ok === true) {
      this.dataContact = resContact.message;
    } else {
      console.log('error');
    }
  }

  async getVaccine(): Promise<any> {
    const resVac = await this.api.getVaccine();
    if (resVac.ok === true) {
      this.dataVaccine = resVac.message;
    } else {
      console.log('error');
    }
  }

  successNotification(): any {
    Swal.fire({
      title: 'บันทึกข้อมูลสำเร็จ',
      icon: 'success',
      html: '<h3>ขอบคุณสำหรับการให้ข้อมูล</h3>' +
        '<div class="font-prompt-light fSize18">จะมีเจ้าหน้าที่งานป้องกันควบคุมโรค' +
        'และระบาดวิทยาโรงพยาบาลราชบุรี<br>' +
        'ติดต่อท่านกลับภายใน 24 ชั่วโมง<br><br>' +
        'หากไม่ได้รับการติดต่อกลับไป<br>' +
        'กรุณาติดต่อ 032-719600 ต่อ 1284</div>',
      confirmButtonText: 'รับทราบ'
    }).then(() => {
      this.router.navigateByUrl('apps/home');
    });
  }

  errorNotification(): any {
    Swal.fire('ไม่สำเร็จ', 'บันทึกข้อมูลไม่สำเร็จ!<br>กรุณาลองอีกครั้ง', 'error')
      .then(() => {
        this.btndisble = false;
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
    console.log(e);
    this.datecome = moment(e).format('YYYY-MM-DD');
    console.log('this.datecome ', this.datecome);
  }

  convertDate(d: any, i: any): any {
    const ss: any = d.toString().split('/');
    const dataDate: any = (ss[2]) + '-' + ss[1] + '-' + ss[0];
    const datai: any = -i;
    return moment(dataDate).locale('th').add(datai, 'day').add('year', 543).format('DD MMMM YYYY');
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

  async insertData(): Promise<any> {
    this.submitted = true;
    // stop here if form is invalid
    console.log('this.generalFrm.invalid ', this.generalFrm.invalid);
    console.log('this.riskFrm.invalid ', this.riskFrm.invalid);
    console.log('this.timelineFrm.invalid ', this.timelineFrm.invalid);
    console.log('this.clinicFrm.invalid ', this.clinicFrm.invalid);
    if (this.generalFrm.invalid || this.timelineFrm.invalid || this.riskFrm.invalid || this.clinicFrm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        html: 'กรุณากรอกข้อมูลในช่องที่เป็นสีแดง' + '<br>' + 'หรือช่องที่มีเครื่องหมาย * ให้ครบ',
      });
      // console.log('invalid');
      // console.log('this.btndisble : ', this.btndisble);
      return;
    } else {
      this.btndisble = true;
    }

    // console.log('this.generalFrm.value.birthday', this.generalFrm.value.birthday);
    // console.log(this.generalFrm.value);
    // console.log(this.timelineFrm.value);

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

    if (this.generalFrm.value.treat === 'อื่น ๆ') {
      data.novel_treat = this.other_treat;
    } else {
      data.novel_treat = this.generalFrm.value.treat;
    }


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
    // data.novel_start_sick = moment(this.datadate).format('YYYY-MM-DD');
    // data.novel_start_treat = moment(this.datatreat).format('YYYY-MM-DD');
    // data.novel_hospital_first = this.fistHosp;
    // data.novel_province_first = this.fistChw;
    // data.novel_hospital_now = this.nowHosp;
    // data.novel_province_now = this.nowChw;

    data.novel_fever = this.radiofever;
    data.novel_assign_fever = this.assign_fever;
    data.novel_assign_oxygen = this.assign_oxygen;
    data.novel_fever = this.radiofever;
    data.novel_respirator = this.radiorespirator;
    data.novel_uri = this.radiouri;
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
    data.novel_contact = this.assign_contract;
    data.novel_assign_station_36 = this.assign_station;

    data.novel_tourist_35 = this.riskFrm.value.radiovisitor;
    data.novel_manyperson_36 = this.riskFrm.value.radiocrowded;
    data.novel_ari_37 = this.riskFrm.value.radiobreath;
    data.novel_inject_38 = this.riskFrm.value.radioinject;
    data.novel_doc_39 = this.riskFrm.value.radiolabtest;

    data.novel_staff_contact = this.radioStaffContact;
    if (this.radioStaffContact === 1) {
      data.novel_staff_contact2 = this.scontact2;
      data.novel_staff_contact3 = this.scontact3;
    } else {
      data.novel_staff_contact2 = this.scontactplace;
    }


    data.novel_etc_310 = this.riskFrm.value.assignRisk;

    data.novel_havevac = this.havevac;
    data.novel_certificate = this.havecertificate;
    data.novel_getvac1 = (this.datevac1 != null) ? moment(this.datevac1).format('YYYY-MM-DD') : null;
    data.novel_namevac1 = this.namevac1;
    data.novel_placevac1 = this.placevac1;
    data.novel_getvac2 = (this.datevac2 != null) ? moment(this.datevac2).format('YYYY-MM-DD') : null;
    data.novel_namevac2 = this.namevac2;
    data.novel_placevac2 = this.placevac2;

    data.novel_getvac3 = (this.datevac3 != null) ? moment(this.datevac3).format('YYYY-MM-DD') : null;
    data.novel_namevac3 = this.namevac3;
    data.novel_placevac3 = this.placevac3;

    data.novel_servicepoint = this.servicepoint;
    data.novel_dhph = this.dhph;
    data.novel_input_datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    info.push(data);

    const rs: any = await this.api.insRec(info);
    if (rs.ok === true) {
      const rsins: any = await this.insertRec(rs.message[0]);
      // console.log('rsins ', rsins);
      if (rsins.ok === true) {
        this.successNotification();
      } else {
        const result = rsins.error.indexOf('Incorrect');
        const txtError = rsins.error.substr(result);

        // this.errorNotification();
        console.log(rsins.error);
        Swal.fire('ไม่สำเร็จ', 'บันทึกข้อมูลไม่สำเร็จ!<br><br>' + txtError, 'error')
          .then(() => {
            this.btndisble = false;
          });
        this.btndisble = false;
      }
    } else {
      // this.errorNotification();
      // console.log(rs.error);
      const result = rs.error.indexOf('Incorrect');
      const txtError = rs.error.substr(result);

      // this.errorNotification();
      // console.log(rs.error);
      Swal.fire('ไม่สำเร็จ', 'บันทึกข้อมูลไม่สำเร็จ!<br><br>' + txtError, 'error')
        .then(() => {
          this.btndisble = false;
        });
      this.btndisble = false;
    }
  }

  // บันทึก Timeline
  async insertRec(id): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_id = id;
    // data.day1 = this.dateTimeLineShort[0];
    // data.day2 = this.dateTimeLineShort[1];
    // data.day3 = this.dateTimeLineShort[2];
    // data.day4 = this.dateTimeLineShort[3];
    // data.day5 = this.dateTimeLineShort[4];
    // data.day6 = this.dateTimeLineShort[5];
    // data.day7 = this.dateTimeLineShort[6];
    // data.day8 = this.dateTimeLineShort[7];
    // data.day9 = this.dateTimeLineShort[8];
    // data.day10 = this.dateTimeLineShort[9];
    // data.day11 = this.dateTimeLineShort[10];
    // data.day12 = this.dateTimeLineShort[11];
    // data.day13 = this.dateTimeLineShort[12];
    // data.day14 = this.dateTimeLineShort[13];

    // data.timeline_date1 = this.timelineFrm.value.desDay1;
    // data.timeline_date2 = this.timelineFrm.value.desDay2;
    // data.timeline_date3 = this.timelineFrm.value.desDay3;
    // data.timeline_date1 = this.desDay1;
    // data.timeline_date2 = this.desDay2;
    // data.timeline_date3 = this.desDay3;
    // data.timeline_date4 = this.desDay4;
    // data.timeline_date5 = this.desDay5;
    // data.timeline_date6 = this.desDay6;
    // data.timeline_date7 = this.desDay7;
    // data.timeline_date8 = this.desDay8;
    // data.timeline_date9 = this.desDay9;
    // data.timeline_date10 = this.desDay10;
    // data.timeline_date11 = this.desDay11;
    // data.timeline_date12 = this.desDay12;
    // data.timeline_date13 = this.desDay13;
    // data.timeline_date14 = this.desDay14;
    data.timeline_other = this.timelineFrm.value.desOther;

    info.push(data);

    const rs: any = await this.api.insData(info);
    // console.log(rs);
    return rs;
  }


}
