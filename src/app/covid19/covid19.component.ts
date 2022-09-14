import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styles: [
  ]
})
export class Covid19Component implements OnInit {
  frmSerch: any;
  submitted: any | Event;

  patientdata: any;
  frmpatient: any;
  isVisible: any = false;
  btndisble: any = false;



  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.frmSerch = this.formBuilder.group({
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])],
    });

    this.frmpatient = this.formBuilder.group({
      cid2: [null],
      pname: [null],
      fname: [null],
      lname: [null],
      weight: [null, Validators.compose([Validators.required])],
      height: [null, Validators.compose([Validators.required])],
      bmi: [null],
      radiochoice1: [null, Validators.compose([Validators.required])],
      radiochoice2: [null, Validators.compose([Validators.required])],
      radiochoice3: [null, Validators.compose([Validators.required])],
      radiochoice4: [null, Validators.compose([Validators.required])],
      radiochoice5: [null, Validators.compose([Validators.required])],
      radiochoice6: [null, Validators.compose([Validators.required])],
      radiochoice7: [null, Validators.compose([Validators.required])],
      radiochoice8: [null, Validators.compose([Validators.required])],
      radiochoice9: [null, Validators.compose([Validators.required])],
      radiochoice10: [null, Validators.compose([Validators.required])],
    });
  }

  get f(): any {
    return this.frmpatient.controls;
  }

  get f1(): any {
    return this.frmSerch.controls;
  }

  async getCitizenData(): Promise<any> {
    const cid = this.frmSerch.value.cid;
    // console.log(this.frmSerch.value.cid);
    const apiUrl = 'http://rbhportal.com/immunization/getdatatarget.php?cid=' + cid;
    await this.http.get(apiUrl).subscribe((responseBody: any) => {
      console.log(responseBody.result);
      if (Object.keys(responseBody.result).length > 0){
        // console.log(Object.keys(responseBody.result).length);
        if (responseBody.result.server === 'error'){
          this.isVisible = false;
          Swal.fire({
            title: 'Error',
            icon: 'info',
            html: 'Server มีปัญหากรุณารอสักครู่',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          const person = responseBody.result.person;
          this.frmpatient.get('cid2').setValue(person.cid);
          this.frmpatient.get('pname').setValue(person.prefix);
          this.frmpatient.get('fname').setValue(person.first_name);
          this.frmpatient.get('lname').setValue(person.last_name);
          this.isVisible = true;
        }
      }else{
        this.isVisible = false;
        Swal.fire({
          title: 'ไม่พบข้อมูล',
          icon: 'error',
          html: 'ไม่พบข้อมูลของคุณในระบบ<br>' +
                'กรุณามาติดต่อที่โรงพยาบาลโดยตรงเพื่อรับบริการ',
          showConfirmButton: true,
          confirmButtonText: 'รับทราบ'
        });
      }
    });
  }

  savedata(): any {
    console.log(this.frmpatient.value);
    this.submitted = true;
    if (this.frmpatient.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        html: 'กรุณากรอกข้อมูลในช่องที่เป็นสีแดง' + '<br>' + 'หรือช่องที่มีเครื่องหมาย * ให้ครบ',
      });
      return;
    } else {
      this.btndisble = true;
      if (this.frmpatient.value.radiochoice1 === 0
          && this.frmpatient.value.radiochoice2 === 0
          && this.frmpatient.value.radiochoice3 === 0
          && this.frmpatient.value.radiochoice4 === 0
          && this.frmpatient.value.radiochoice5 === 0
          && this.frmpatient.value.radiochoice6 === 0
          && this.frmpatient.value.radiochoice7 === 0
          && this.frmpatient.value.radiochoice8 === 0
          && this.frmpatient.value.radiochoice9 === 0
          && this.frmpatient.value.radiochoice10 === 0){
        Swal.fire({
          title: 'ต้องการพบแพทย์หรือไม่',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่ใช่'
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('พบแพทย์');
          }else{
            console.log('ไม่พบแพทย์');
          }
        });
      }else{
        console.log('พบแพทย์');
      }
    }

  }
}
