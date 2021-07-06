import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMakeUnicode from 'pdfmake-unicode';

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

  printReport(novel_id: any) {

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
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // [left, top, right, bottom]
      pageMargins: [35, 50, 35, 50],
      content: [
        {
          columns: [
            {width: '25%', text: 'Code .............................................', fontsize: 16, alignment: 'left'},
            {width: '50%', text: 'แบบสอบสวนผู้ป่วยโรคติดเชื้อไวรัสโคโรนา 2019',  fontsize: 18, bold: true, alignment: 'center'},
            {width: '25%', text: 'Novelcorona 2', fontsize: 16, alignment: 'right'},
          ],
          columnGap: 5
        },
        {table : {widths: [520],
            body: [
              [{text: '', border: [false, false, false, true], alignment: 'center'}],
              [{text: '', border: [false, false, false, false], alignment: 'center'}]
            ]
          }
        },
        {
          columns: [
            {width: '45%', text: '1. ข้อมูลทั่วไป', style: 'title'},
            {width: '55%', text: 'เลขบัตรประชาชน/Passport ......................................................................', alignment: 'right'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '55%', text: 'ชื่อ -  นามสกุล ..............................................................................................'},
            {width: '10%', text: 'เพศ ..............'},
            {width: '20%', text: 'อายุ .......... ปี .......... เดือน'},
            {width: '15%', text: 'สัญชาติ ....................', alignment: 'right'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'กรณีเพศหญิง'},
            {width: 'auto',
              table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: '15%', text: 'ไม่ได้ตั้งครรภ์'},
            {width: 'auto',
              table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'ตั้งครรภ์'},
            {width: 'auto', text: 'ครรภ์ที่ ...................'},
            {width: 'auto', text: 'อายุครรภ์ ................... สัปดาห์'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'อาชีพ'},
            {width: 'auto', text: '(ระบุลักษณะงานที่ทำอย่างละเอียด เช่น บุคลกรทางการแพทย์ เจ้าหน้าที่ที่สัมผัสนักท่องเที่ยว)', style: 'small', margin: [ 0, 1]},
            {width: 'auto', text: ' .............................................................................................'}
          ],
          columnGap: 1
        },
        {
          columns: [
            {width: '60%', text: 'สถานที่ทำงาน/ สถานศึกษา ...........................................................................................'},
            {width: '40%', text: 'เบอร์โทรศัพท์ที่ติดต่อได้  ..................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '60%', text: 'เบอร์โทรศัพท์ที่ใช้ลงแอปพลิเคชัน "หมอชนะ" ...............................................................'},
            {width: '40%', text: 'สิทธิการรักษา ....................................................................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: 'ที่อยู่ที่ติดต่อได้'},
            {width: 'auto', text: 'เลขที่ ......................'},
            {width: 'auto', text: 'หมู่ที่ .......................'},
            {width: 'auto', text: 'หมู่บ้าน ...........................................'},
            {width: 'auto', text: 'ซอย ..............'},
            {width: 'auto', text: 'ถนน .............................................'},
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
            {width: '65%', text: 'โรคประจำตัว ..............................................................................................................................'},
            {width: '35%', text: 'การสูบบุหรี่ .........................................................', alignment: 'right'}
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
            {width: '25%', text: '.......................................................'},
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
                widths: [3],
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
                widths: [3],
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
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '12%', text: 'ไอ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '11%', text: 'เจ็บคอ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '14%', text: 'ปวดกล้ามเนื้อ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '13%', text: 'มีน้ำมูก'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '11%', text: 'มีเสมหะ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'หายใจลำบาก'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '12%', text: 'ปวดศีรษะ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '11%', text: 'ถ่ายเหลว'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '14%', text: 'จมูกไม่ได้กลิ่น'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '13%', text: 'ลิ้นไม่รับรส'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '11%', text: 'ตาแดง'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'ผื่น ตำแหน่ง ........................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: 'auto', text: 'อื่น ๆ ระบุ ........................................'},
          ],
          columnGap: 5
        },
        {text: '3. ประวัติเสี่ยง', style: 'title'},
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยอาศัยอยู่หรือเดินทางมาจากพื้นที่ที่มีการระบาด'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '33%', text: 'เมือง .................................................................'},
            {width: '33%', text: 'ประเทศ ...........................................................'},
            {width: '34%', text: 'เดินทางเข้าประเทศไทยวันที่ ..............................'},
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: '34%', text: 'โดยสายการบิน ...................................................'},
            {width: '33%', text: 'เที่ยวบินที่ ........................................................'},
            {width: '33%', text: 'เลขที่นั่ง ...........................................................'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยได้เข้ารับการรักษาหรือเยี่ยมผู้ป่วยในโรงพยาบาลของพื้นที่ที่มีการระบาด'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยได้ดูแลหรือสัมผัสใกล้ชิดกับผู้ป่วยอาการคล้ายไข้หวัดใหญ่หรือปอดอักเสบ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติสัมผัสกับผู้ป่วยยืนยันโรคติดเชื้อไวรัสโคโรน่า 2019 ระบุ ......................................'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยประกอบอาชีพที่สัมผัสใกล้ชิดกับนักท่องเที่ยวต่างชาติหรือแรงงานต่างชาติ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'ช่วง 14 วันก่อนป่วยมีประวัติเดินทางไปในสถานที่ที่มีคนหนาแน่น เช้น ผับ สนามมวย'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นผู้ป่วยอาการทางเดินหายใจหรือปอดอักเสบเป็นกลุ่มก้อน'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นผู้ป่วยปอดอักเสบรุนแรงหรือเสียชีวิตที่หาสาเหตุไม่ได้'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: '87%', text: 'เป็นบุคลาการทางการแพทย์และสาธรณะสุขหรือเจ้าหน้าที่ห้องปฏิบัติการ'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ไม่ใช่'},
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '5%', text: 'ใช่'}
          ],
          columnGap: 5
        },
        {
          columns: [
            {width: 'auto', text: '•'},
            {width: 'auto', text: 'อื่น ๆ ระบุ ...............................................................................................................................................................................................................'}
          ],
          columnGap: 5
        },
        {text: '4. ประวัติการได้รับวัคซีนป้องกันโรคติดเชื้อไวรัสโคโรนา 2019', style: 'title'},
        {
          columns: [
            {width: 'auto', table: {
                widths: [3],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }},
            {width: '15%', text: 'ไม่เคยได้รับ'},
            {width: 'auto', table: {
                widths: [3],
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
        {text: '5. รายละเอียดเหตุการณ์ประวัติเสี่ยงการติดเชื้อ**ก่อนเริ่มป่วย/เริ่มสัมผัสกลุ่มเสี่ยง/พื้นที่เสี่ยง', style: 'title', pageBreak: 'before'},
      ],
      defaultStyle: {
        font: 'THSarabunNew',
        fontSize: 14,
        lineHeight: 1.1
      },
      styles: {
        title: {
          fontSize: 14,
          bold: true
        },
        small: {fontSize: 12}
      }
    };
    return docDefinition;
  }

}


