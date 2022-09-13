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
      weight: [null],
      height: [null],
      bmi: [null],
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
    console.log(this.frmSerch.value.cid);
    const apiUrl = 'http://rbhportal.com/immunization/getdatatarget.php?cid=' + cid;
    await this.http.get(apiUrl).subscribe((responseBody: any) => {
      console.log(responseBody.result);
      if (Object.keys(responseBody.result).length > 0){
        console.log(Object.keys(responseBody.result).length);
        if (responseBody.result.server === 'error'){
          Swal.fire({
            title: 'Error',
            icon: 'info',
            html: 'Server มัปัญหากรุณารอสักครู่',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          const person = responseBody.result.person;
          this.frmpatient.get('cid2').setValue(person.cid);
          this.frmpatient.get('pname').setValue(person.prefix);
          this.frmpatient.get('fname').setValue(person.first_name);
          this.frmpatient.get('lname').setValue(person.last_name);
        }
      }else{
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
}
