import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMakeUnicode from 'pdfmake-unicode';
import * as moment from 'moment';
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
  selector: 'app-report',
  templateUrl: './report.component.html',

})
export class ReportComponent implements OnInit {
  navbarOpen = false;
  cid: any;
  dataNovel: any;
  dataNovelByID: any;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  data: any = [];
  registerFrm: any = [];
  submitted = false;



  constructor(private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerFrm = this.formBuilder.group({
      //pull value cid
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])]
    });
  }

  //function call registerFrm
  get f() {
    return this.registerFrm.controls;
  }

  async getonclick(): Promise<any> {
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
    if (rs.ok === true) {
      this.dataNovel = rs.message;
      console.log(this.dataNovel);
    } else {
      console.log('error');
    }

  }



  async printReport(novel_id: any) {
      // console.log(novel_id);
      const res: any = await this.api.getDataById(novel_id);
      console.log(res);
      if (res.ok === true) {
        this.dataNovelByID = res.message;
        this.generatePdf('open');
      } else {
        console.log('error');
      }
  }

  testReport(){
    this.generatePdf('open');
  }

  async insertData(): Promise<any> {
    const data: any = {};
    const info: any = [];
    // data.novel_id = ;

    info.push(data);
    const rs: any = await this.api.insData(info);
  }

  generatePdf(action) {
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinition() {
    const ptfullname = this.dataNovelByID[0].novel_prename + this.dataNovelByID[0].novel_fname + '  ' + this.dataNovelByID[0].novel_lname;
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // [left, top, right, bottom]
      pageMargins: [30, 35, 30, 35],
      content: [
        {text:  this.dataNovelByID[0].novel_cid, absolutePosition: {x: 260, y: 93}, bold : true},
        {text:  this.dataNovelByID[0].novel_treat, absolutePosition: {x: 450, y: 93}, bold : true},
        {text:  ptfullname, absolutePosition: {x: 140, y: 110}, bold : true},
        {text:  this.dataNovelByID[0].novel_gender === 1 ? 'หญิง' : 'ชาย', absolutePosition: {x: 345, y: 110}, bold : true},
        {text:  this.dataNovelByID[0].novel_age, absolutePosition: {x: 403, y: 110}, bold : true},
        {text:  this.dataNovelByID[0].novel_national, absolutePosition: {x: 535, y: 110}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_preg ? 150  : 85, y: 120}, style: 'fSize24'},
        {text:  this.dataNovelByID[0].novel_numpreg, absolutePosition: {x: 232, y: 126}, bold : true},
        {text:  this.dataNovelByID[0].novel_agepreg, absolutePosition: {x: 292, y: 126}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_smoke === 0  ? 390 : this.dataNovelByID[0].novel_smoke === 1 ? 443 : 482, y: 120}, style: 'fSize24'},
        {text:  this.dataNovelByID[0].novel_worker, absolutePosition: {x: 370, y: 142}, bold : true},
        {text:  this.dataNovelByID[0].novel_station, absolutePosition: {x: 210, y: 159}, bold : true},
        {text:  this.dataNovelByID[0].novel_phone, absolutePosition: {x: 480, y: 159}, bold : true},
        {text:  this.dataNovelByID[0].novel_phonedoc, absolutePosition: {x: 217, y: 175}, bold : true},
        {text:  moment(this.dataNovelByID[0].novel_birthday).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 400, y: 175}, bold : true},
        {text:  this.dataNovelByID[0].novel_number_address, absolutePosition: {x: 118, y: 192}, bold : true},
        {text:  this.dataNovelByID[0].novel_moo, absolutePosition: {x: 175, y: 192}, bold : true},
        {text:  this.dataNovelByID[0].novel_mooban, absolutePosition: {x: 270, y: 192}, bold : true},
        {text:  this.dataNovelByID[0].novel_soi, absolutePosition: {x: 400, y: 192}, bold : true},
        {text:  this.dataNovelByID[0].novel_road, absolutePosition: {x: 520, y: 192}, bold : true},
        {text:  this.dataNovelByID[0].novel_district, absolutePosition: {x: 112, y: 208}, bold : true},
        {text:  this.dataNovelByID[0].novel_amphur, absolutePosition: {x: 275, y: 208}, bold : true},
        {text:  this.dataNovelByID[0].novel_province, absolutePosition: {x: 445, y: 208}, bold : true},
        (this.dataNovelByID[0].novel_copd === 1) ?  {text:  '√', absolutePosition: {x: 83, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_ckd === 1) ?  {text:  '√', absolutePosition: {x: 127, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_cad === 1) ?  {text:  '√', absolutePosition: {x: 165, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_cva === 1) ?  {text:  '√', absolutePosition: {x: 202, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_undm === 1) ?  {text:  '√', absolutePosition: {x: 237, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_pids === 1) ?  {text:  '√', absolutePosition: {x: 330, y: 218}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_congential = 1) ?  {text:  '√', absolutePosition: {x: 417, y: 218}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID[0].novel_congential_etc, absolutePosition: {x: 460, y: 225}, bold : true},
        {text:  this.dataNovelByID[0].novel_weight, absolutePosition: {x: 85, y: 241}, bold : true},
        {text:  this.dataNovelByID[0].novel_high, absolutePosition: {x: 180, y: 241}, bold : true},
        {text:  this.dataNovelByID[0].novel_bmi, absolutePosition: {x: 262, y: 241}, bold : true},

        // ข้อมูลทางคลินิก
        {text:  moment(this.dataNovelByID[0].novel_start_sick).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 150, y: 274}, bold : true},
        {text:  moment(this.dataNovelByID[0].novel_start_sick).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 450, y: 274}, bold : true},
        {text:  this.dataNovelByID[0].novel_hospital_first, absolutePosition: {x: 200, y: 290}, bold : true},
        {text:  this.dataNovelByID[0].novel_province_first, absolutePosition: {x: 430, y: 290}, bold : true},
        {text:  this.dataNovelByID[0].novel_hospital_now, absolutePosition: {x: 210, y: 306}, bold : true},
        {text:  this.dataNovelByID[0].novel_province_now, absolutePosition: {x: 430, y: 306}, bold : true},
        (this.dataNovelByID[0].novel_fever === 1) ?  {text:  '√', absolutePosition: {x: 180, y: 317}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID[0].novel_assign_fever, absolutePosition: {x: 290, y: 323}, bold : true},
        {text:  this.dataNovelByID[0].novel_assign_oxygen, absolutePosition: {x: 400, y: 323}, bold : true},
        (this.dataNovelByID[0].novel_respirator === 1) ?  {text:  '√', absolutePosition: {x: 467, y: 317}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_cough = 1) ?  {text:  '√', absolutePosition: {x: 32, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_sorethroat === 1) ?  {text:  '√', absolutePosition: {x: 86, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_musclepain === 1) ?  {text:  '√', absolutePosition: {x: 178, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_mucous === 1) ?  {text:  '√', absolutePosition: {x: 261, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_phlegm === 1) ?  {text:  '√', absolutePosition: {x: 315, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_difficulbreathing === 1) ?  {text:  '√', absolutePosition: {x: 379, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_headache === 1) ?  {text:  '√', absolutePosition: {x: 455, y: 333}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_purify === 1) ?  {text:  '√', absolutePosition: {x: 32, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_smell === 1) ?  {text:  '√', absolutePosition: {x: 86, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_taste === 1) ?  {text:  '√', absolutePosition: {x: 179, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_redeye === 1) ?  {text:  '√', absolutePosition: {x: 263, y: 349}, style: 'fSize24'} : null,
        (this.dataNovelByID[0].novel_rash === 1) ?  {text:  '√', absolutePosition: {x: 312, y: 349}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID[0].novel_position, absolutePosition: {x: 380, y: 356}, bold : true},
        (this.dataNovelByID[0].novel_symtom === 1) ?  {text:  '√', absolutePosition: {x: 428, y: 349}, style: 'fSize24'} : null,
        {text:  this.dataNovelByID[0].novel_symtom_etc, absolutePosition: {x: 483, y: 356}, bold : true},


        //ประวัติเสี่ยง
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_comefrom_31 === 0 ?  488 : 536 , y: 583}, style: 'fSize24'},
        {text:  this.dataNovelByID[0].novel_come_city, absolutePosition: {x: 115, y: 605}, bold : true},
        {text:  this.dataNovelByID[0].novel_come_country, absolutePosition: {x: 280, y: 605}, bold : true},
        {text:  moment(this.dataNovelByID[0].novel_date_come).locale('th').add(543, 'year').format('D MMMM YYYY'), absolutePosition: {x: 480, y: 605}, bold : true},
        {text:  this.dataNovelByID[0].novel_transportation, absolutePosition: {x: 120, y: 620}, bold : true},
        {text:  this.dataNovelByID[0].novel_round_tran, absolutePosition: {x: 315, y: 620}, bold : true},
        {text:  this.dataNovelByID[0].novel_number_seat, absolutePosition: {x: 480, y: 620}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_takecare_32 === 0 ?  488 : 536 , y: 630}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_touch_his33 === 0 ?  488 : 536 , y: 647}, style: 'fSize24'},
        {text:  this.dataNovelByID[0].novel_assigntouch_34, absolutePosition: {x: 330, y: 668}, bold : true},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_his_touch_34 === 0 ?  488 : 536 , y: 663}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_tourist_35 === 0 ?  488 : 536 , y: 679}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_manyperson_36 === 0 ?  488 : 536 , y: 695}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_ari_37 === 0 ?  488 : 536 , y: 712}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_inject_38 === 0 ?  488 : 536 , y: 729}, style: 'fSize24'},
        {text:  '√', absolutePosition: {x:  this.dataNovelByID[0].novel_doc_39 === 0 ?  488 : 536 , y: 745}, style: 'fSize24'},
        {text:  this.dataNovelByID[0].novel_etc_310, absolutePosition: {x: 80, y: 767}, bold : true},
        {text:  ptfullname, absolutePosition: {x: 150, y: 791}, bold : true},

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
            {width: 'auto', text: '(ระบุลักษณะงานที่ทำอย่างละเอียด เช่น บุคลกรทางการแพทย์ เจ้าหน้าที่ที่สัมผัสนักท่องเที่ยว)', style: 'small', margin: [ 0, 1]},
            {width: 'auto', text: ' .................................................................................................'}
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
            {width: 'auto', text: 'อาการและอาการแสดงในวันพบผู้ป่วย :'},
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
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติสัมผัสกับผู้ป่วยยืนยันโรคติดเชื้อไวรัสโคโรน่า 2019 ระบุ ...................................................', style : 'fontMid'},
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
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติเดินทางไปในสถานที่ที่มีคนหนาแน่น เช้น ผับ สนามมวย', style : 'fontMid'},
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
            {width: '87%', text: 'เป็นบุคลาการทางการแพทย์และสาธรณะสุขหรือเจ้าหน้าที่ห้องปฏิบัติการ', style : 'fontMid'},
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
            {width: 'auto', text: 'ครั้งที่ 1.............................................'},
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

}


