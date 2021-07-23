import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMakeUnicode from 'pdfmake-unicode';
import {right} from '@popperjs/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {
  constructor(private api: ApiService, private formBuilder: FormBuilder ) { }
  get f() {
    return this.registerFrm.controls;
  }
  navbarOpen = false;
  cid: any;
  dataNovel: any;
  numberJ: any;
  HN: any;
  prename: any;
  fname: any;
  lname: any;
  age: any;
  sex: any;
  nation: any;
  national: any;
  career: any;
  numberadd: any;
  moo: any;
  tumbon: any;
  amphur: any;
  province: any;
  phone: any;
  datecome: any;
  dategivetest: any;
  placesendtest: any;
  datetouch: any;
  placerisk: any;
  quarentine: any;
  datequarentine: any;
  swab2: any;
  reporter: any;
  noteetc: any;
  data: any = [];
  registerFrm: any = [];
  submitted = false;
  logo: any;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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

  ngOnInit(): void {
    this.registerFrm = this.formBuilder.group({
      // pull value cid
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])]
    });

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

  async getonclick(): Promise<any>{
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFrm.invalid) {
      return;
    }


    this.cid = this.registerFrm.value.cid;
    // console.log(this.cid);

    // get data from API
    const rs: any = await this.api.getData(this.cid);
    // console.log(rs);
    // print on success
    if (rs.ok === true){
      this.dataNovel = rs.message;
      console.log(this.dataNovel);
    }else {
      console.log('error');
    }

  }

  testReport(){
    this.generatePdf('open');
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
      pageMargins: [55, 40, 55, 40],
      content: [
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
        {text: 'หมายเลขโทรศัพท์......................................................... ที่อยู่ที่สามารถติดต่อได้ตั้งอยู่เลขที่ ........................ หมู่บ้าน/อาคาร...................'},
        {text: 'ถนน.......................................................ตำบล/แขวง................................................... อำเภอ/เขต............................................................'},
        {text: 'จังหวัด..............................................................'},
        {text: 'ดำเนินการดังต่อไปนี้' , style:'title'},
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
            {width: 'auto', text: 'เพื่อมา',style: 'small' },
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'แยกกัก' ,style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'กักกัน',style: 'small' },
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'คุมไว้สังเกต',style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการตรวจ',style: 'small'},

            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการรักษา',style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการชันสูตรทางการแพทย์',style: 'small'},
            {width: 'auto',
              table: {
                widths: [1],
                body: [
                  [ {text: '', border: [true, true, true, false], alignment: 'center', margin : [0, 1]}],
                  [ {text: '', border: [true, false, true, true], alignment: 'center'}],
                ]
              }
            },
            {width: 'auto', text: 'รับการสร้างเสริมภูมิคุ้มกันโรค',style: 'small'},


          ],
          columnGap:3
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
          columnGap:3
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
          columnGap:3
        },
        {text: '...............................................................................................................................................ซึ่งตายหรือมีเหตุอันควรสงสัยว่าตายด้วยโรค'},
        {text: '........................................................................................ณ..........................................................................................................................'},
        {text: ' '},
        {text: '/ไปรับการตรวจ...',alignment: right },




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
    // data.endquarantine = this.numberJ;
    data.swaabtime2 = this.swab2;
    data.reporter = this.reporter;
    data.noteetc = this.noteetc;



    info.push(data);

    const rs: any = await this.api.insRegis(info);
    if (rs.ok) {
      this.successNotification();
      console.log(rs.message[0]);
      // @ts-ignore
      const rsins: any = await this.insertRegis(rs.message[0]);
    } else {
      this.errorNotification();
    }

  }

}


