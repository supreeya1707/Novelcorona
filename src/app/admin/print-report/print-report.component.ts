import { Component, OnInit } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMakeUnicode from 'pdfmake-unicode';
import * as moment from 'moment';
import {ApiService} from '../../services/api.service';
import {right} from '@popperjs/core';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
// this part is crucial
pdfMake.vfs = pdfMakeUnicode.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf'
  },
  Fontello: {
    normal: 'fontello.ttf',
    bold: 'fontello.ttf',
    italics: 'fontello.ttf',
    bolditalics: 'fontello.ttf'
  },
  Roboto: {
    normal: 'Roboto Regular.ttf',
    bold: 'Roboto Medium.ttf',
    italics: 'Roboto Italic.ttf',
    bolditalics: 'Roboto MediumItalic.ttf'
  }
};

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html'
})

export class PrintReportComponent implements OnInit {
  dataNovel: any = [];
  dataNovelByID: any = [];
  dataNovelStaff: any = [];
  dataTimeLineByID: any;
  dateTimeLineShortquaran: any = [];

  submitted = false;
  currentDate: any = new Date();
  locale = 'th-be';
  logo: any;

  constructor(private api: ApiService, private localeService: BsLocaleService,) { }

  ngOnInit(): void {
    this.localeService.use(this.locale);

    const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));

    toDataURL('../assets/picture/garuda.jpg') .then(dataUrl => {
      this.logo = 'data:image;base64,' + dataUrl;
    });
  }

  async dateChange(e: any): Promise<any> {
    const dateinput = moment(e).format('YYYY-MM-DD');
    const rs: any = await this.api.getStaffByDate(dateinput);
    console.log(rs);
    if (rs.ok) {
      this.dataNovel = rs.message;
    } else {
      console.log('error');
    }
  }

  convertDate(d: any, i: any): any {
    const ss: any = d.toString().split('/');
    const dataDate: any = (ss[2]) + '-' + ss[1] + '-' + ss[0];
    const datai: any = -i;
    return moment(dataDate).locale('th').add(datai, 'day').add('year', 543).format('DD MMMM YYYY');
  }

  genDatequarantine(e: any): any {
    for (let i = 1; i <= 14; i++) {
      this.dateTimeLineShortquaran.push(moment(e).add(i, 'day').locale('th').add(543,'year').format('DD/MM/YY'));
    }
    // console.log(this.dateTimeLineShortquaran);
  }

  async printNovelcorona2(novelID: any) {
    // console.log(novelID);
    const res: any = await this.api.getDataById(novelID);
    const resTimeLine: any = await this.api.getTimeLineById(novelID);
    const resStaff: any = await this.api.getDataStaff(novelID);
    console.log(resTimeLine);
    if (res.ok === true && resTimeLine.ok === true && resStaff.ok === true) {
        this.dataNovelByID = res.message[0];
        this.dataTimeLineByID = resTimeLine.message[0];
        this.dataNovelStaff = resStaff.message[0];
        pdfMake.createPdf(this.docNovelcorona2()).open();
    } else {
      console.log('error');
    }
  }

  async printReport01(novelID: any) {
    // console.log(novelID);
    const res: any = await this.api.getDataById(novelID);
    const resStaff: any = await this.api.getDataStaff(novelID);
    if (res.ok === true && resStaff.ok === true) {
      this.dataNovelByID = res.message[0];
      this.dataNovelStaff = resStaff.message[0];
      pdfMake.createPdf(this.docReport01()).open();
    } else {
      console.log('error');
    }
  }

  async printReport02(novelID: any) {
    // console.log(novelID);
    const res: any = await this.api.getDataById(novelID);
    const resStaff: any = await this.api.getDataStaff(novelID);
    if (res.ok === true && resStaff.ok === true) {
      this.dataNovelByID = res.message[0];
      this.dataNovelStaff = resStaff.message[0];
      this.genDatequarantine(moment(this.dataNovelStaff.sdate_quaran).format('YYYY-MM-DD'));
      pdfMake.createPdf(this.docReport02()).open();
    } else {
      console.log('error');
    }
  }


  docNovelcorona2() {
    const ptfullname = this.dataNovelByID.novel_pname + this.dataNovelByID.novel_fname + '  ' + this.dataNovelByID.novel_lname;
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // [left, top, right, bottom]
      pageMargins: [30, 35, 30, 35],
      content: [
        {text:  this.dataNovelByID.novel_cid, absolutePosition: {x: 260, y: 93}, bold : true},
        {text:  this.dataNovelByID.novel_treat, absolutePosition: {x: 450, y: 93}, bold : true},
        {text:  ptfullname, absolutePosition: {x: 140, y: 110}, bold : true},
        {text:  this.dataNovelByID.novel_gender === 1 ? 'หญิง' : 'ชาย', absolutePosition: {x: 345, y: 110}, bold : true},
        {text:  this.dataNovelByID.novel_age, absolutePosition: {x: 403, y: 110}, bold : true},
        {text:  this.dataNovelByID.novel_national, absolutePosition: {x: 535, y: 110}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_preg ? 150  : 85, y: 120}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_numpreg, absolutePosition: {x: 232, y: 126}, bold : true},
        {text:  this.dataNovelByID.novel_agepreg, absolutePosition: {x: 292, y: 126}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_smoke === 0  ? 390 : this.dataNovelByID.novel_smoke === 1 ? 443 : 482, y: 120}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_worker, absolutePosition: {x: 370, y: 142}, bold : true},
        {text:  this.dataNovelByID.novel_station, absolutePosition: {x: 210, y: 159}, bold : true},
        {text:  this.dataNovelByID.novel_phone, absolutePosition: {x: 480, y: 159}, bold : true},
        {text:  this.dataNovelByID.novel_phonedoc, absolutePosition: {x: 217, y: 175}, bold : true},
        (this.dataNovelByID.novel_birthday) ? {text:  moment(this.dataNovelByID.novel_birthday).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 400, y: 175}, bold : true} : {text: ''},
        {text:  this.dataNovelByID.novel_number_address, absolutePosition: {x: 118, y: 192}, bold : true},
        {text:  this.dataNovelByID.novel_moo, absolutePosition: {x: 175, y: 192}, bold : true},
        {text:  this.dataNovelByID.novel_mooban, absolutePosition: {x: 270, y: 192}, bold : true},
        {text:  this.dataNovelByID.novel_soi, absolutePosition: {x: 400, y: 192}, bold : true},
        {text:  this.dataNovelByID.novel_road, absolutePosition: {x: 520, y: 192}, bold : true},
        {text:  this.dataNovelByID.novel_district, absolutePosition: {x: 112, y: 208}, bold : true},
        {text:  this.dataNovelByID.novel_amphur, absolutePosition: {x: 275, y: 208}, bold : true},
        {text:  this.dataNovelByID.novel_province, absolutePosition: {x: 445, y: 208}, bold : true},
        (this.dataNovelByID.novel_copd === 1) ?  {text:  '√', absolutePosition: {x: 83, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_ckd === 1) ?  {text:  '√', absolutePosition: {x: 127, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_cad === 1) ?  {text:  '√', absolutePosition: {x: 165, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_cva === 1) ?  {text:  '√', absolutePosition: {x: 202, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_undm === 1) ?  {text:  '√', absolutePosition: {x: 237, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_pids === 1) ?  {text:  '√', absolutePosition: {x: 330, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_congential === 1) ?  {text:  '√', absolutePosition: {x: 417, y: 218}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID.novel_congential_etc, absolutePosition: {x: 460, y: 225}, bold : true},
        {text:  this.dataNovelByID.novel_weight, absolutePosition: {x: 85, y: 241}, bold : true},
        {text:  this.dataNovelByID.novel_high, absolutePosition: {x: 180, y: 241}, bold : true},
        {text:  this.dataNovelByID.novel_bmi, absolutePosition: {x: 262, y: 241}, bold : true},

        // ข้อมูลทางคลินิก
        (this.dataNovelByID.novel_start_sick != null) ? {text:  moment(this.dataNovelByID.novel_start_sick).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 150, y: 274}, bold : true} : {text: ''},
        (this.dataNovelByID.novel_start_sick) ? {text:  moment(this.dataNovelByID.novel_start_sick).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 450, y: 274}, bold : true} : {text: ''},,
        {text:  this.dataNovelByID.novel_hospital_first, absolutePosition: {x: 200, y: 290}, bold : true},
        {text:  this.dataNovelByID.novel_province_first, absolutePosition: {x: 430, y: 290}, bold : true},
        {text:  this.dataNovelByID.novel_hospital_now, absolutePosition: {x: 210, y: 306}, bold : true},
        {text:  this.dataNovelByID.novel_province_now, absolutePosition: {x: 430, y: 306}, bold : true},
        (this.dataNovelByID.novel_fever === 1) ?  {text:  '√', absolutePosition: {x: 183, y: 316}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID.novel_assign_fever, absolutePosition: {x: 290, y: 323}, bold : true},
        {text:  this.dataNovelByID.novel_assign_oxygen, absolutePosition: {x: 400, y: 323}, bold : true},
        (this.dataNovelByID.novel_respirator === 1) ?  {text:  '√', absolutePosition: {x: 469, y: 316}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_cough = 1) ?  {text:  '√', absolutePosition: {x: 32, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_sorethroat === 1) ?  {text:  '√', absolutePosition: {x: 86, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_musclepain === 1) ?  {text:  '√', absolutePosition: {x: 178, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_mucous === 1) ?  {text:  '√', absolutePosition: {x: 261, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_phlegm === 1) ?  {text:  '√', absolutePosition: {x: 315, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_difficulbreathing === 1) ?  {text:  '√', absolutePosition: {x: 379, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_headache === 1) ?  {text:  '√', absolutePosition: {x: 455, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_purify === 1) ?  {text:  '√', absolutePosition: {x: 32, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_smell === 1) ?  {text:  '√', absolutePosition: {x: 86, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_taste === 1) ?  {text:  '√', absolutePosition: {x: 179, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_redeye === 1) ?  {text:  '√', absolutePosition: {x: 263, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID.novel_rash === 1) ?  {text:  '√', absolutePosition: {x: 312, y: 349}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID.novel_position, absolutePosition: {x: 380, y: 356}, bold : true},
        (this.dataNovelByID.novel_symtom === 1) ?  {text:  '√', absolutePosition: {x: 428, y: 349}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID.novel_symtom_etc, absolutePosition: {x: 483, y: 356}, bold : true},


        // ประวัติเสี่ยง
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_comefrom_31 === 0 ?  488 : 536 , y: 583}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_come_city, absolutePosition: {x: 115, y: 605}, bold : true},
        {text:  this.dataNovelByID.novel_come_country, absolutePosition: {x: 280, y: 605}, bold : true},
        (this.dataNovelByID.novel_date_come != null) ? {text:  moment(this.dataNovelByID.novel_date_come).locale('th').add(543, 'year').format('D MMMM YYYY'),
          absolutePosition: {x: 480, y: 605}, bold : true} : {text: ''},,
        {text:  this.dataNovelByID.novel_transportation, absolutePosition: {x: 120, y: 620}, bold : true},
        {text:  this.dataNovelByID.novel_round_tran, absolutePosition: {x: 315, y: 620}, bold : true},
        {text:  this.dataNovelByID.novel_number_seat, absolutePosition: {x: 480, y: 620}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_takecare_32 === 0 ?  488 : 536 , y: 630}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_touch_his33 === 0 ?  488 : 536 , y: 647}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_assigntouch_34, absolutePosition: {x: 330, y: 668}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_his_touch_34 === 0 ?  488 : 536 , y: 663}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_tourist_35 === 0 ?  488 : 536 , y: 679}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_manyperson_36 === 0 ?  488 : 536 , y: 695}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_assign_station_36, absolutePosition: {x: 350, y: 701}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_ari_37 === 0 ?  488 : 536 , y: 712}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_inject_38 === 0 ?  488 : 536 , y: 729}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_doc_39 === 0 ?  488 : 536 , y: 745}, style: 'fSize24'},
        {text:  this.dataNovelByID.novel_etc_310, absolutePosition: {x: 80, y: 767}, bold : true},

        {
          columns: [
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'PUI'},
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'Amit ตึก......................'},
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'HR contact'},
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'LR contact นัด'},
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'Swab 2......................'},
            {width: 'auto', text: 'จพต 14 วัน'},
            {width: 'auto', text: '(วันที่..........ถึง..................)'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'โทรแจ้งผู้ป่วย'},
            {width: 'auto', text: '[  ]'},
            {width: 'auto', text: 'โทรแจ้ง 1733 รับผู้ป่วย Admit แจ้ง ชื่อ-สกุล HN ส่งมาจาก...............................'},
            {width: 'auto', text: 'รายที่................'},
            {width: 'auto', text: 'วันที่..................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '25%', text: 'Code .............................................', fontsize: 16, alignment: 'left'},
            {width: '50%', text: 'แบบสอบสวนผู้ป่วยโรคติดเชื้อไวรัสโคโรนา 2019',  fontsize: 18, bold: true, alignment: 'center'},
            {width: '25%', text: 'HN ..................................', fontsize: 16, alignment: 'right'},
          ],
          columnGap: 5
        },
        {table : {widths: [525],
            body: [
              [{text: '', border: [false, false, false, true], alignment: 'center'}],
              [{text: '', border: [false, false, false, false], alignment: 'center'}]
            ]
          }
        },
        {
          columns: [
            {width: '20%', text: '1. ข้อมูลทั่วไป', style: 'title'},
            {width: 'auto', text: 'เลขบัตรประชาชน/Passport ...............................................'},
            {width: 'auto', text: 'สิทธิการรักษา ..................................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '55%', text: 'ชื่อ - นามสกุล .....................................................................................................'},
            {width: '10%', text: 'เพศ ...............'},
            {width: '20%', text: 'อายุ ........... ปี .......... เดือน'},
            {width: '15%', text: 'สัญชาติ ....................', alignment: 'right'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'กรณีเพศหญิง'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ไม่ได้ตั้งครรภ์'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ตั้งครรภ์'},
            {width: 'auto', text: 'ครรภ์ที่ ........'},
            {width: 'auto', text: 'อายุครรภ์ ........... สัปดาห์'},
            {width: 'auto', text: 'การสูบบุหรี่'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ไม่เคยสูบ'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ยังสูบ'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'เคยสูบแต่เลิกแล้ว'}
          ],
          columnGap: 3
        },
        {
          columns: [
            {width: 'auto', text: 'อาชีพ'},
            {width: 'auto', text: '(ระบุลักษณะงานที่ทำอย่างละเอียด เช่น บุคลากรทางการแพทย์ เจ้าหน้าที่ที่สัมผัสนักท่องเที่ยว)', style: 'small', margin: [ 0, 1]},
            {width: 'auto', text: ' ................................................................................................'}
          ],
          columnGap: 1
        },
        {
          columns: [
            {width: '60%', text: 'สถานที่ทำงาน/ สถานศึกษา ...........................................................................................'},
            {width: '40%', text: 'เบอร์โทรศัพท์ที่ติดต่อได้  ....................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '50%', text: 'เบอร์โทรศัพท์ที่ใช้ลงแอปพลิเคชัน "หมอชนะ" ...........................................'},
            {width: '50%', text: 'วัน/เดือน/ปีเกิด ..........................................................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'ที่อยู่ที่ติดต่อได้'},
            {width: 'auto', text: 'เลขที่ ............'},
            {width: 'auto', text: 'หมู่ที่ .............'},
            {width: 'auto', text: 'หมู่บ้าน ...........................................'},
            {width: 'auto', text: 'ซอย .............................................'},
            {width: 'auto', text: 'ถนน ......................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '33%', text: 'ตำบล ................................................................'},
            {width: '33%', text: 'อำเภอ ..............................................................'},
            {width: '34%', text: 'จังหวัด ................................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'โรคประจำตัว'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'COPD'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'CKD'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'CAD'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'CVA'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'Uncontrolled DM'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ภูมิคุ้มกันบกพร่อง'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'อื่น ๆ ..............................................'}

          ],
          columnGap: 4
        },
        {
          columns: [
            {width: 'auto', text: 'น้ำหนัก..........................กก.'},
            {width: 'auto', text: 'ส่วนสูง..........................ซม.'},
            {width: 'auto', text: 'BMI..........................'}
          ],
          columnGap: 5
        },
        {text: '2. ข้อมูลทางคลินิก', style: 'title'},
        {
          columns: [
            {width: 'auto', text: 'วันที่เริ่มป่วย'},
            {width: 'auto', text: '(วัน/เดือน/ปี)', fontsize: 12},
            {width: '25%', text: '.......................................................'},
            {width: 'auto', text: 'วันที่เข้ารับการรักษาครั้งแรก'},
            {width: 'auto', text: '(วัน/เดือน/ปี)', fontsize: 12},
            {width: '25%', text: '........................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '60%', text: 'ชื่อสถานพยาบาลที่เข้ารับการรักษาครั้งแรก ...................................................................'},
            {width: '40%', text: 'จังหวัด ...............................................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '60%', text: 'ชื่อสถานพยาบาลที่เข้ารับการรักษาในปัจจุบัน ...............................................................'},
            {width: '40%', text: 'จังหวัด ...............................................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'อาการและอาการแสดง ในวันพบผู้ป่วย :'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ไข้'},
            {width: 'auto', text: 'อุณหภูมิแรกรับ ............................ ํC'},
            {width: '23%', text:  [
                {text: 'O'},
                {text: '2', sub: {  fontSize: 8 }},
                {text: 'Sat ................................ %'}
              ]
            },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ใส่เครื่องช่วยหายใจ', alignment: 'right'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '7%', text: 'ไอ'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '15%', text: 'เจ็บคอ '},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '13%', text: 'ปวดกล้ามเนื้อ'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '7%', text: 'มีน้ำมูก'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '9%', text: 'มีเสมหะ'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '12%', text: 'หายใจลำบาก'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '12%', text: 'ปวดศีรษะ'},
          ],
          columnGap: 4
        },
        {columns: [
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ถ่ายเหลว'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '15%', text: 'สูญเสียการได้กลิ่น'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '13%', text: 'สูญเสียการรับรส'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '6%', text: 'ตาแดง'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ผื่น บริเวณ........................'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'อื่น ๆ ระบุ ...................................'},
          ],
          columnGap: 4
        },
        {
          columns: [
            {width: 'auto', text: 'เอ็กซเรย์ปอด (ครั้งแรก) : วันที่ ..............................................'},
            {width: 'auto', text: 'ผล Hb .................... g/dL'},
            {width: 'auto', text: 'Hct .................... %'},
            {width: 'auto', text: 'Platelet count ....................'},
            {width: 'auto', text:  [
                {text: 'x'},
                {text: '10'},
                {text: '3', sup: {  fontSize: 8 }}
              ]
            },
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'WBC..............................'},
            {width: 'auto', text: '(N ..................... %'},
            {width: 'auto', text: 'L ...................... %'},
            {width: 'auto', text: 'Atyp lymph ...................... %'},
            {width: 'auto', text: 'Mono ...................... %'},
            {width: 'auto', text: 'อื่น ๆ ......................)'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'ผลการตรวจ Influenza test วิธีการตรวจ ............................................................................'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Negative'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Positive'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Flu A'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Flu B'}
          ],
          columnGap: 5
        },
        {text: 'ผลการตรวจ SARS - CoV-2'},
        {
          table: {
            headerRows: 1,
            widths: [ 30, 70, 100, 100, 190 ],
            body: [
              [ {text: 'ครั้งที่', alignment: 'center' },
                {text: 'วันที่เก็บ', alignment: 'center' },
                {text: 'ชนิดตัวอย่าง', alignment: 'center' },
                {text: 'สถานที่ส่งตรวจ', alignment: 'center' },
                {text: 'ผลตรวจ', alignment: 'center' } ],
              [ {text: ' ', alignment: 'center', style : 'fontMid' }, '', '', '',
                {
                  columns: [
                    {width: '3%', text: ' ', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '40%', text: 'Detected', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'Not detected', style : 'fontMid'}
                  ],
                  columnGap: 5
                }
              ],
              [ ' ', '', '', '',
                {
                  columns: [
                    {width: '3%', text: ' ', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '40%', text: 'Detected', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'Not detected', style : 'fontMid'}
                  ],
                  columnGap: 5
                }
              ],
            ]
          }
        },
        {
          margin: [0, 2],
          columns: [
            {width: 'auto', text: 'ประเภทผู้ป่วย'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ผู้ป่วยนอก'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ผู้ป่วยใน Admit วันที่..................................'},
            {width: 'auto', text: 'การวินิฉัยเบื้องต้น.............................................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '40%', text: 'การให้ยารักษาโรคติดเชื้อไวรัสโคโรนา 2019', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ไม่ให้',  style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ให้ วันที่รับยาโดสแรก ..........................................................................................',  style : 'fontMid'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Darunavir/Ritonavir (DRV/r)',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Lopinavir/Ritonavir (LRV/r)',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Favipiravir',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Chloroquine',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Hydroxychloroquine',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ยาอื่น ๆ .............................',  style : 'small', margin: [0, 2]},
          ],
          columnGap: 3
        },
        {
          columns: [
            {width: '15%', text: 'สถานะผู้ป่วย', style : 'small'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'หาย',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ยังรักษาอยู่',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'เสียชีวิต',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ส่งตัวไป รพ. ...............................................................',  style : 'small', margin: [0, 2]},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'อื่น ๆ ระบุ ...............................................',  style : 'small', margin: [0, 2]},
          ],
          columnGap: 3
        },
        {text: '3. ประวัติเสี่ยง', style: 'title'},
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยอาศัยอยู่หรือเดินทางมาจากพื้นที่ที่มีการระบาด', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '1%', text: ' ', style : 'fontMid'},
            {width: 'auto', text: 'เมือง ...................................................................', style : 'fontMid'},
            {width: 'auto', text: 'ประเทศ .............................................................', style : 'fontMid'},
            {width: 'auto', text: 'เดินทางเข้าประเทศไทยวันที่ ............................................', style : 'fontMid'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '1%', text: ' ', style : 'fontMid'},
            {width: '37%', text: 'โดยสายการบิน .................................................................', style : 'fontMid'},
            {width: '35%', text: 'เที่ยวบินที่ ....................................................................', style : 'fontMid'},
            {width: '27%', text: 'เลขที่นั่ง ..................................................', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยได้เข้ารับการรักษาหรือเยี่ยมผู้ป่วยในโรงพยาบาลของพื้นที่ที่มีการระบาด', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่' , style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่' , style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยได้ดูแลหรือสัมผัสใกล้ชิดกับผู้ป่วยอาการคล้ายไข้หวัดใหญ่หรือปอดอักเสบ' , style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติสัมผัสกับผู้ป่วยยืนยันโรคติดเชื้อไวรัสโคโรน่า 2019 ระบุ .............................................................', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยประกอบอาชีพที่สัมผัสใกล้ชิดกับนักท่องเที่ยวต่างชาติหรือแรงงานต่างชาติ', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติเดินทางไปในสถานที่ที่มีคนหนาแน่น เช่น ผับ สนามมวย ระบุ ........................................................', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นผู้ป่วยอาการทางเดินหายใจหรือปอดอักเสบเป็นกลุ่มก้อน', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นผู้ป่วยปอดอักเสบรุนแรงหรือเสียชีวิตที่หาสาเหตุไม่ได้', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นบุคลากรทางการแพทย์และสาธารณสุขหรือเจ้าหน้าที่ห้องปฏิบัติการ', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่', style : 'fontMid'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: 'auto', text: 'อื่น ๆ ระบุ .......................................................................................................................................................................................................................................', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '1%', text: ' ', style : 'fontMid'},
            {width: 'auto', text: 'ผู้รายงาน ..................................................................................', style : 'fontMid'},
            {width: 'auto', text: 'หน่วยงาน โรงพยาบาลราชบุรี', style : 'fontMid'},
            {width: 'auto', text: 'วันที่สอบสวน ................................', style : 'fontMid'},
            {width: 'auto', text: 'เวลา ......................... น.', style : 'fontMid'}
          ],
          columnGap: 5
        },
        {text: 'ชื่อ - นามสกุล.................................................................................................................... HN .........................................................', alignment: 'center',  pageBreak: 'before'},
        {text: '4. รายละเอียดเหตุการณ์ประวัติเสี่ยงการติดเชื้อ**ก่อนเริ่มป่วย/เริ่มสัมผัสกลุ่มเสี่ยง/พื้นที่เสี่ยง', style: 'title',  margin: [0, 2]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text: '............................................................................................................................................................................................................................................',  margin: [0, 3]},
        {text:  ptfullname, absolutePosition: {x: 150, y: 33}, bold : true},
        {text:  moment(this.dataTimeLineByID.day1).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 73}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date1, absolutePosition: {x: 130, y: 73}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day2).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 95}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date2, absolutePosition: {x: 130, y: 95}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day3).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 117}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date3, absolutePosition: {x: 130, y: 117}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day4).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 140}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date4, absolutePosition: {x: 130, y: 140}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day5).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 162}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date5, absolutePosition: {x: 130, y: 162}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day6).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 185}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date6, absolutePosition: {x: 130, y: 185}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day7).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 207}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date7, absolutePosition: {x: 130, y: 207}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day8).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 230}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date8, absolutePosition: {x: 130, y: 230}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day9).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 252}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date9, absolutePosition: {x: 130, y: 252}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day10).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 274}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date10, absolutePosition: {x: 130, y: 274}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day11).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 297}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date11, absolutePosition: {x: 130, y: 297}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day12).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 319}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date12, absolutePosition: {x: 130, y: 319}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day13).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 341}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date13, absolutePosition: {x: 130, y: 341}, noWrap: true},
        {text:  moment(this.dataTimeLineByID.day14).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 40, y: 364}, bold : true},
        {text:  this.dataTimeLineByID.timeline_date14, absolutePosition: {x: 130, y: 364}, noWrap: true},

        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_havevac === 0 ?  32 : 128 , y: 540}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_certificate === 0 ?  501 : 409 , y: 540}, style: 'fSize24'},
        (this.dataNovelByID.novel_getvac1 != null) ? {text:  moment(this.dataNovelByID.novel_getvac1).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 105, y: 562}, bold : true} : {text: ''},
        {text:  this.dataNovelByID.novel_namevac1, absolutePosition: {x: 280, y: 562}, bold : true},
        {text:  this.dataNovelByID.novel_placevac1, absolutePosition: {x: 420, y: 562}, bold : true},
        (this.dataNovelByID.novel_getvac2 != null) ? {text:  moment(this.dataNovelByID.novel_getvac2).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 105, y: 579}, bold : true} : {text: ''},
        {text:  this.dataNovelByID.novel_namevac2, absolutePosition: {x: 280, y: 579}, bold : true},
        {text:  this.dataNovelByID.novel_placevac2, absolutePosition: {x: 420, y: 579}, bold : true},

        // staff
        {text:  this.dataNovelStaff.riskconnect, absolutePosition: {x: 75, y: 481}, bold : true},
        {text: '√', absolutePosition: {x: 304, y: this.dataNovelStaff.wearmask === 0  ? 497 : this.dataNovelStaff.wearmask === 1 ? 476 : 452}, style: 'fSize24'},
        {text: '√', absolutePosition: {x: 412, y: this.dataNovelStaff.place === 0  ? 497 : this.dataNovelStaff.place === 1 ? 476 : 452}, style: 'fSize24'},

        {text: 1, absolutePosition: {x: 46, y: 642}, bold : true},
        (this.dataNovelStaff.sars1_date != null) ? {text: moment(this.dataNovelStaff.sars1_date).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 85, y: 642}, bold : true} : {text: ''},
        {text: this.dataNovelStaff.sars1_type, absolutePosition: {x: 180, y: 642}, bold : true},
        {text: this.dataNovelStaff.sars1_placesend, absolutePosition: {x: 290, y: 642}, bold : true},
        {text:  '√', absolutePosition: {x: this.dataNovelStaff.sars1_result === 0 ? 383 : 472, y: 634}, style: 'fSize24'},

        {text: 2, absolutePosition: {x: 46, y: 663}, bold : true},
        (this.dataNovelStaff.sars2_date != null) ? {text: moment(this.dataNovelStaff.sars2_date).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 85, y: 663}, bold : true} : {text: ''},
        {text: this.dataNovelStaff.sars2_type, absolutePosition: {x: 180, y: 663}, bold : true},
        {text: this.dataNovelStaff.sars2_placesend, absolutePosition: {x: 290, y: 663}, bold : true},
        {text:  '√', absolutePosition: {x: this.dataNovelStaff.sars2_result === 0 ? 383 : 472, y: 654}, style: 'fSize24'},

        (this.dataNovelStaff.doctor !== null && this.dataNovelStaff.doctor !== '') ? {text:  '√', absolutePosition: {x: this.dataNovelStaff.doctor === 'พญ.สุดารัตน์ วิจิตรเศรษฐกุล' ? 189 : 88, y: 677}, style: 'fSize24'} : {text: ''},
        {text: this.dataNovelStaff.doctor_time, absolutePosition: {x: 330, y: 683}, bold : true},
        {text: this.dataNovelStaff.doctor_comment, absolutePosition: {x: 105, y: 702}, bold : true},

        (this.dataNovelStaff.sars_pt_type === 2) ? {text:  '√', absolutePosition: {x: 31, y: 712}, style: 'fSize24'} :
          (this.dataNovelStaff.sars_pt_type === 4) ? {text:  '√', absolutePosition: {x: 170, y: 712}, style: 'fSize24'} :
          (this.dataNovelStaff.sars_pt_type === 3) ? {text:  '√', absolutePosition: {x: 232, y: 729}, style: 'fSize24'} :
          (this.dataNovelStaff.sars_pt_type === 1) ? {text:  '√', absolutePosition: {x: 298, y: 729}, style: 'fSize24'} :
          (this.dataNovelStaff.sars_pt_type === 0) ? {text:  '√', absolutePosition: {x: 375, y: 729}, style: 'fSize24'} : null ,

        (this.dataNovelStaff.date_swab1 != null || this.dataNovelStaff.date_swab2 != null) ? {text:  '√', absolutePosition: {x: 255, y: 712}, style: 'fSize24'} : null,
        (this.dataNovelStaff.date_swab1 != null) ? {text: moment(this.dataNovelStaff.date_swab1).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 350, y: 719}, bold : true} : null,
        (this.dataNovelStaff.date_swab2 != null) ? {text: moment(this.dataNovelStaff.date_swab2).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 480, y: 719}, bold : true} : null,

        (this.dataNovelStaff.sdate_quaran != null) ? {text: moment(this.dataNovelStaff.sdate_quaran).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 92, y: 735}, bold : true} : null,
        (this.dataNovelStaff.edate_quaran != null) ? {text: moment(this.dataNovelStaff.edate_quaran).locale('th').add(543, 'year').format('D MMM YY'), absolutePosition: {x: 168, y: 735}, bold : true} : null,

        {text: this.dataNovelStaff.address_quaran, absolutePosition: {x: 113, y: 752}, bold : true},
        {text: this.dataNovelStaff.reporter, absolutePosition: {x: 80, y: 767}, bold : true},
        (this.dataNovelStaff.report_datetime) ? {text: moment(this.dataNovelStaff.report_datetime).locale('th').add('year', '543').format('D MMM YY'), absolutePosition: {x: 415, y: 767}, bold : true} : null,
        (this.dataNovelStaff.report_datetime) ? {text: moment(this.dataNovelStaff.report_datetime).format('HH:mm'), absolutePosition: {x: 510, y: 767}, bold : true} : null,
        {
          margin: [0, 3],
          table: {
            widths: [ 259, 259 ],
            body: [
              [ {text: 'สรุปความเชื่อมโยง/พื้นที่ระบาด สัมผัสบุคคลเสี่ยงกลุ่มใด', alignment: 'center' },
                {columns: [
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '35%', text: 'ใส่ Mask ตลอดเวลา'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'ห้องปรับอากาศ'}
                  ], columnGap: 5, border: [true, true, true, false], margin : [0, 2]}],
              [ {text: '.............................................................................................................', border: [true, false, true, false], alignment: 'center' },
                {columns: [
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '35%', text: 'ใส่บางครั้ง'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'ห้องพัดลม'}
                  ], columnGap: 5, border: [true, false, true, false]}],
              [ {text: '.............................................................................................................', border: [true, false, true, true], alignment: 'center' },
                {columns: [
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '35%', text: 'ไม่ใส่'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'นอกอาคาร'}
                  ], columnGap: 5, border: [true, false, true, true]}],
            ]
          }
        },
        {text: '5. ประวัติการได้รับวัคซีนป้องกันโรคติดเชื้อไวรัสโคโรนา 2019', style: 'title', margin: [0, 2]},
        {
          columns: [
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '15%', text: 'ไม่เคยได้รับ'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'เคยได้รับ'},
            {width: '45%', text: 'สมุดบันทึกหรือหลักฐานการได้รับวัคซีนหรือไม่'},
            {width: 'auto', text: '( )'},
            {width: '15%', text: 'มี'},
            {width: 'auto', text: '( )'},
            {width: '15%', text: 'ไม่มี'}
          ],
          columnGap: 5
        },
        {text: 'ครั้งที่ 1 วันที่ได้รับ...................................................ชื่อวัคซีน......................................................สถานที่ได้รับ............................................................'},
        {text: 'ครั้งที่ 2 วันที่ได้รับ...................................................ชื่อวัคซีน......................................................สถานที่ได้รับ............................................................'},
        {text: 'ผลการตรวจ SARS - CoV-2 Antibody', margin: [0, 2]},
        {
          table: {
            headerRows: 1,
            widths: [ 30, 70, 100, 100, 190 ],
            body: [
              [ {text: 'ครั้งที่', alignment: 'center' },
                {text: 'วันที่เก็บ', alignment: 'center' },
                {text: 'ชนิดตัวอย่าง', alignment: 'center' },
                {text: 'สถานที่ส่งตรวจ', alignment: 'center' },
                {text: 'ผลตรวจ', alignment: 'center' } ],
              [ {text: ' ', alignment: 'center', style : 'fontMid' }, '', '', '',
                {
                  columns: [
                    {width: '3%', text: ' ', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '40%', text: 'Detected', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'Not detected', style : 'fontMid'}
                  ],
                  columnGap: 5
                }
              ],
              [ ' ', '', '', '',
                {
                  columns: [
                    {width: '3%', text: ' ', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: '40%', text: 'Detected', style : 'fontMid'},
                    {width: 'auto', table: {
                        widths: [2],
                        body: [
                          [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                          [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                        ]
                      }},
                    {width: 'auto', text: 'Not detected', style : 'fontMid'}
                  ],
                  columnGap: 5
                }
              ],
            ]
          }
        },
        {
          margin: [0, 3],
          columns: [
            {width: 'auto', text: 'รายงานแพทย์'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ปิยะณัฐ  บุญประดิษฐ์'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'สุดารัตน์ วิจิตรเศรษฐกุล'},
            {width: 'auto', text: 'เวลา........................น.'}
          ],
          columnGap: 5
        },
        {text: 'แพทย์ลงความเห็น..............................................................................................................................................................................................................'},
        {
          columns: [
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'PUI Admit ตึก...........................'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'HR contact'},
            {width: 'auto', text: 'นัด'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'Swab'},
            {width: 'auto', text: 'ครั้งที่ 1.............................................'},
            {width: 'auto', text: 'ครั้งที่ 2.............................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'จพต.14 (วันที่.............................ถึง.............................)'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'LR contact'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'แนะนำ DMHT'},
            {width: 'auto', table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ไม่เข้าเกณฑ์ PUI'},
          ],
          columnGap: 5
        },
        {text: 'ที่อยู่สำหรับการกักตัว.........................................................................................................................................................................................................'},
        {
          columns: [
            {width: 'auto', text: 'ผู้รายงาน .......................................................................................', style : 'fontMid'},
            {width: 'auto', text: 'หน่วยงาน โรงพยาบาลราชบุรี', style : 'fontMid'},
            {width: 'auto', text: 'วันที่สอบสวน ................................', style : 'fontMid'},
            {width: 'auto', text: 'เวลา ......................... น.', style : 'fontMid'}
          ],
          columnGap: 5
        }
      ],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
        lineHeight: 0.9
      },
      styles: {
        title: {
          fontSize: 14,
          bold: true
        },
        small: {fontSize: 12},
        fontMid: {fontSize: 13},
        fSize24: {fontSize: 24, bold: true}
      }
    };
    return docDefinition;
  }

  docReport01() {
    const ptfullname = this.dataNovelByID.novel_pname + this.dataNovelByID.novel_fname + '  ' + this.dataNovelByID.novel_lname;
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // [left, top, right, bottom]
      pageMargins: [55, 40, 55, 40],
      content: [
        {text: this.dataNovelStaff.doctor, absolutePosition: {x: 180, y: 218}, bold: 'true'},
        {text: 'โรงพยาบาลราชบุรี', absolutePosition: {x: 180, y: 234}, bold: 'true'},
        {text: 'ติดเชื้อไวรัสโคโรนา ๒๐๑๙ หรือ โควิด๑๙', absolutePosition: {x: 100, y: 267}, bold: 'true'},
        {text: ptfullname, absolutePosition: {x: 180, y: 284}, bold: 'true'},
        {text: this.dataNovelByID.novel_age, absolutePosition: {x: 342, y: 284}, bold: 'true'},
        {text: this.dataNovelByID.novel_national, absolutePosition: {x: 410, y: 284}, bold: 'true'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID.novel_gender === 2 ? 480  : 496, y: 277}, style: 'fSize24'},
        {text: this.dataNovelByID.novel_cid, absolutePosition: {x: 300, y: 300}, bold: 'true'},
        {text: this.dataNovelByID.novel_phone, absolutePosition: {x: 150, y: 316}, bold: 'true'},

        {text: this.dataNovelByID.novel_number_address, absolutePosition: {x: 410, y: 316}, bold: 'true'},
        {text: this.dataNovelByID.novel_moo, absolutePosition: {x: 495, y: 316}, bold: 'true'},
        {text: this.dataNovelByID.novel_mooban, absolutePosition: {x: 160, y: 333}, bold: 'true'},
        {text: this.dataNovelByID.novel_road, absolutePosition: {x: 280, y: 333}, bold: 'true'},
        {text: this.dataNovelByID.novel_district, absolutePosition: {x: 445, y: 333}, bold: 'true'},
        {text: this.dataNovelByID.novel_amphur, absolutePosition: {x: 130, y: 349}, bold: 'true'},
        {text: this.dataNovelByID.novel_province, absolutePosition: {x: 290, y: 349}, bold: 'true'},


        {text:  'โรงพยาบาลราชบุรี', absolutePosition: {x:  405, y: 152}},
        {text:  '√', absolutePosition: {x:  223, y: 244}, style: 'fSize24'},

        {image: this.logo, fit: [65, 65], alignment: 'center'},
        {text: 'คำสั่งของเจ้าพนักงานควบคุมโรคติดต่อ', alignment: 'center'},
        {text: 'ตามประกาศกระทรวงสาธารณสุขเรื่องหลักเกณฑ์วิธีการและเงื่อนไขในการดำเนินการหรือออกคำสั่ง', alignment: 'center'},
        {text: 'ของเจ้าหนักงานควบคุมโรคติดต่อ พ.ศ. ๒๕๖๐', alignment: 'center'},
        {
          columns: [
            {width: '60%', text: 'คำสั่งเลขที่ ............/๒๕๖๔'},
            {width: '40%', text: 'เขียนที่ .....................................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '60%', text: ' '},
            {width: '40%', text: 'วันที่ ......... เดือน ............................. พ.ศ. .............'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '5%', text: ' '},
            {width: '95%', text: 'อาศัยอำนาจตามความในมาตรา ๓๔ แห่งพระราชบัญญัติโรคติดต่อพ.ศ. ๒๕๕๘ ประกอบกับข้อ ๒ แห่งประกาศกระทรวง', alignment: 'right'}
          ],
          columnGap: 5
        },
        {text: 'สาธารณสุขเรื่องหลักเกณฑ์วิธีการและเงื่อนไขในการดำเนินการหรือออกคำสั่งของเจ้าพนักงานควบคุมโรคติดต่อพ.ศ. ๒๕๖๐ ข้าพเจ้า'},
        {text: '(นาย/นาง/นางสาว)........................................................................................................ตำแหน่งเจ้าหนักงงานควบคุมโรคติดต่อสังกัด/'},
        {text: 'หน่วยงาน .........................................................................................................................................ได้พบว่า'},
        {
          columns: [
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'เกิดโรคติดต่ออันตราย'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'เกิดโรคระบาด'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'สงสัยว่าเกิดโรคติดต่ออันตราย'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'สงสัยว่าเกิดโรคระบาด'}
          ],
          columnGap: 3
        },
        {text: 'ได้แก่โรค ............................................................................................... ณ ..............................................................................................'},
        {
          columns: [
            {width: 'auto', text: 'จึงมีคำสั่งให้ (ชื่อ - นามสกุล) ................................................................... อายุ ........... ปี สัญชาติ..................'},
            {width: 'auto', text: 'เพศ'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ชาย'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'หญิง'}
          ],
          columnGap: 3
        },
        {text: 'เลขที่บัตรประจำตัวประชาชน/เลขที่หนังสือเดินทาง..................................................................................................................................'},
        {text: 'หมายเลขโทรศัพท์......................................................... ที่อยู่ที่สามารถติดต่อได้ตั้งอยู่เลขที่ ................................ หมู่ .............................'},
        {text: 'หมู่บ้าน/อาคาร.............................................ถนน.....................................................ตำบล/แขวง.............................................................. '},
        {text: 'อำเภอ/เขต............................................................จังหวัด..............................................................'},
        {text: 'ดำเนินการดังต่อไปนี้' , style: 'title'},
        {
          columns: [
            {width: 'auto', text: '(๑)'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการตรวจ'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการรักษา'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการชันสูตรทางการแพทย์'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการสร้างเสริมภูมิคุ้มกันโรคภายใน'},
          ],
          columnGap: 3
        },
        {text: 'วันที่........................................เดือน......................................... พ.ศ.............................. เวลา.............................น. ณ.................................' },
        {
          columns: [
            {width: 'auto', text: '(๒)', style: 'small' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'เดินทางมาที่..........................หมู่............ตำบล.......................อำเภอ..........................จังหวัด..........................เพื่อ', style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'แยกกักตัว' , style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'กักกัน', style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'คุมไว้สังเกต', style: 'small'},
          ],
          columnGap: 2
        },
        {text: 'ตั้งแต่วันที่...............................................เดือน..................................................พ.ศ..................................เวลา........................................น.'},
        {text: 'ถึงวันที่....................................................เดือน..................................................พ.ศ..................................เวลา........................................น.'},
        {
          columns: [
            {width: 'auto', text: '(๓)' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'นำ(ชื่อ-นามสกุล).................................................................อายุ.....................ปี สัญชาติ............................เพศ'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ชาย' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'หญิง'},
          ],
          columnGap: 3
        },
        {text: 'เลขที่บัตรประจำตัวประชาชน/เลขที่หนังสือเดินทาง....................................................................................................................................'},
        {text: 'ที่อยู่ที่สามารถติดต่อได้ตั้งอยู่เลขที่........................................................................หมู่บ้าน/อาคาร...............................................................'},
        {text: 'ถนน.................................ตำบล/แขวง.....................................อำเภอ/เขต.................................................จังหวัด......................................'},
        {text: 'หมายเลขโทรศัพท์......................................................................................'},
        {
          columns: [
            {width: 'auto', text: 'เพื่อมา', style: 'small' },
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'แยกกัก' , style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'กักกัน', style: 'small' },
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'คุมไว้สังเกต', style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการตรวจ', style: 'small'},

            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการรักษา', style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการชันสูตรทางการแพทย์', style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการสร้างเสริมภูมิคุ้มกันโรค', style: 'small'},


          ],
          columnGap: 3
        },
        {text: 'ตั้งแต่วันที่...............................................เดือน..................................................พ.ศ..................................เวลา........................................น.'},
        {text: 'ถึงวันที่....................................................เดือน..................................................พ.ศ..................................เวลา........................................น.'},
        {text: 'ณ..................................................................................................................................................................................................................'},
        {
          columns: [
            {width: 'auto', text: '(๔)' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'นำสัตว์ประเภท......................................................................................................................................จำนวน ...........................ตัว'},

          ],
          columnGap: 3
        },
        {
          columns: [
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการตรวจ' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการรักษา' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการชันสูตรทางการแพทย์'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'มารับการป้องกันโรค'},


          ],
          columnGap: 3
        },
        {text: 'ภายในวันที่.........................................................เดือน..................................................พ.ศ............................เวลา..................................น.'},
        {text: 'ณ..................................................................................................................................................................................................................'},
        {
          columns: [
            {width: 'auto', text: '(๕)ให้นำศพ(นาย/นาง/นางสาว)................................................................................................................................' },
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ซากสัตว์ประเภท' },

          ],
          columnGap: 3
        },
        {text: '...............................................................................................................................................ซึ่งตายหรือมีเหตุอันควรสงสัยว่าตายด้วยโรค'},
        {text: '........................................................................................ณ..........................................................................................................................'},
        {text: ' '},
        {text: '/ไปรับการตรวจ...', alignment: right },




      ],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
        lineHeight: 0.9
      },
      styles: {
        title: {
          fontSize: 14,
          bold: true
        },
        small: {fontSize: 12},
        fontMid: {fontSize: 13},
        fSize24: {fontSize: 24, bold: true}
      }
    };
    return docDefinition;
  }

  docReport02() {
    const ptfullname = this.dataNovelByID.novel_pname + this.dataNovelByID.novel_fname + '  ' + this.dataNovelByID.novel_lname;
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      // [left, top, right, bottom]
      pageMargins: [30, 40, 40, 30],
      content: [
        {text:  '√', absolutePosition: {x:  this.dataNovelStaff.sars_pt_type === 2 ? 507 : this.dataNovelStaff.sars_pt_type === 3 ? 634 : 542 , y: 32}, style: 'fSize24'},
        {text: ptfullname, absolutePosition: {x: 120, y: 74}, bold: 'true'},
        {text: this.dataNovelByID.novel_gender === 1 ? 'หญิง' : 'ชาย', absolutePosition: {x: 265, y: 74}, bold : true},
        {text: this.dataNovelByID.novel_age, absolutePosition: {x: 333, y: 74}, bold : true},
        {text: this.dataNovelByID.novel_national, absolutePosition: {x: 409, y: 74}, bold : true},
        {text: this.dataNovelByID.novel_worker, absolutePosition: {x: 537, y: 74}, bold : true},
        {text: this.dataNovelByID.novel_phone, absolutePosition: {x: 702, y: 74}, bold : true},

        {text: this.dataNovelByID.novel_number_address, absolutePosition: {x: 190, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_moo, absolutePosition: {x: 257, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_soi, absolutePosition: {x: 340, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_road, absolutePosition: {x: 430, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_district, absolutePosition: {x: 500, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_amphur, absolutePosition: {x: 595, y: 93}, bold: 'true'},
        {text: this.dataNovelByID.novel_province, absolutePosition: {x: 702, y: 93}, bold: 'true'},

        {text: 'สัมผัส/เสี่ยง COVID-19', absolutePosition: {x: 200, y: 111}, bold: 'true'},

        (this.dataNovelStaff.sdate_quaran != null) ? {text: moment(this.dataNovelStaff.sdate_quaran).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 470, y: 129}, bold: 'true'} : null,
        (this.dataNovelStaff.edate_quaran != null) ? {text: moment(this.dataNovelStaff.edate_quaran).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 695, y: 129}, bold: 'true'} : null,
        {text: moment(this.dataNovelStaff.sdate_quaran).locale('th').add(543, 'year').format('DD/MM/YY'), absolutePosition: {x: 140, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[0], absolutePosition: {x: 186, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[1], absolutePosition: {x: 230, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[2], absolutePosition: {x: 276, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[3], absolutePosition: {x: 321, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[4], absolutePosition: {x: 365, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[5], absolutePosition: {x: 410, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[6], absolutePosition: {x: 455, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[7], absolutePosition: {x: 501, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[8], absolutePosition: {x: 544, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[9], absolutePosition: {x: 590, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[10], absolutePosition: {x: 634, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[11], absolutePosition: {x: 680, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[12], absolutePosition: {x: 726, y: 204}, style: 'fSize12'},
        {text: this.dateTimeLineShortquaran[13], absolutePosition: {x: 769, y: 204}, style: 'fSize12'},

        {text: '0', absolutePosition: {x: 155, y: 227}, style: 'fSize12'},
        {text: '1', absolutePosition: {x: 200, y: 227}, style: 'fSize12'},
        {text: '2', absolutePosition: {x: 248, y: 227}, style: 'fSize12'},
        {text: '3', absolutePosition: {x: 290, y: 227}, style: 'fSize12'},
        {text: '4', absolutePosition: {x: 330, y: 227}, style: 'fSize12'},
        {text: '5', absolutePosition: {x: 380, y: 227}, style: 'fSize12'},
        {text: '6', absolutePosition: {x: 428, y: 227}, style: 'fSize12'},
        {text: '7', absolutePosition: {x: 470, y: 227}, style: 'fSize12'},
        {text: '8', absolutePosition: {x: 516, y: 227}, style: 'fSize12'},
        {text: '9', absolutePosition: {x: 560, y: 227}, style: 'fSize12'},
        {text: '10', absolutePosition: {x: 603, y: 227}, style: 'fSize12'},
        {text: '11', absolutePosition: {x: 649, y: 227}, style: 'fSize12'},
        {text: '12', absolutePosition: {x: 694, y: 227}, style: 'fSize12'},
        {text: '13', absolutePosition: {x: 738, y: 227}, style: 'fSize12'},
        {text: '14', absolutePosition: {x: 780, y: 227}, style: 'fSize12'},





        {
          columns: [
            {width: '20%', text: ''},
            {width: 'auto', text: 'แบบติดตามอาการผู้ที่มีความเสี่ยง/ผู้ที่เดินทางไปประเทศที่มีการระบาดของ COVID-19 /'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'PUI'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'High Risk Contract'},
            {width: 'auto',
              table: {
                widths: [2],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'Low Risk'},
          ],
          columnGap: 3
        },
        {text: 'โรงพยาบาลราชบุรี จังหวัดราชบุรี', alignment: 'center'},
        {text: 'ชื่อ - สกุล...................................................................เพศ.......................' +
            'อายุ..................ปี สัญชาติ..................เชื้อชาติ.................อาชีพ...................................................เบอร์โทรศัพท์.........................................', margin: [17, 0]},
        {text: 'ที่อยู่ที่สามารถติดต่อได้ บ้านเลขที่............................หมู่................ซอย..................................ถนน...............................' +
            'ตำบล.................................อำเภอ...............................จังหวัด..............................................', margin: [17, 0]},
        {text: 'ประวัติ/ความเสี่ยงที่สัมผัสโรค.....................................................................................................................................................', margin: [17, 0]},
        {text: 'วันที่ Admit................................................วันที่ Discharge.................................................. วันที่สังเกตอาการ.......................................................วันที่สังเกตอาการครบ 14 วัน.................................................', margin: [17, 0]},
        {text: ' '},
        {
          table: {
            widths: [ 95, 36, 621],
            body: [[{text: ' ', border: [true, true, true, false]},
              {text: 'วันที่สัมผัส', margin: [0, 5], style: 'fSize12', alignment: 'center', border: [true, true, true, false]},
              {text: 'วันที่สังเกตุอาการ', alignment: 'center', border: [true, true, true, false], margin: [0, 3]}]]
          }
        },
        {
          table: {
            widths: [ 95, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36],
            body: [
              [{text: 'อาการและอาการแสดง', alignment: 'center', border: [true, false, true, false]}, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
              [{text: ' ', alignment: 'center', border: [true, false, true, true]}, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            ]
          }
        },
        {text: ' '},
        {text: 'ชื่อผู้สัมภาษณ์............................................................................ หน่วยงาน..............................................................นัดรอบ 2..................................................โทร............................................... ต่อ .........................'},
        {text: ' '},
        {columns: [
            { width: '50%', qr: 'https://www.rajburi.org/images/documents/news/covid19/Advice.jpg', fit: '90', alignment: 'right'},

            {width: 'auto', text: 'คำแนะนำ\nสำหรับการกักตัว', alignment: 'center', style: 'fSize18', margin: [0, 5] },
          ],
          columnGap: 10
        }


      ],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
        lineHeight: 1
      },
      styles: {
        title: {
          fontSize: 14,
          bold: true
        },
        fSize12: {fontSize: 12},
        fSize11: {fontSize: 11},
        fSize13: {fontSize: 13},
        fSize18: {fontSize: 18},
        fSize24: {fontSize: 24, bold: 'true'}
      }
    };
    return docDefinition;
  }



}
