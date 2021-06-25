import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {
  navbarOpen = false;
  cid:any;
  dataNovel:any;
  NumberJ:any;
  HN:any;
  fname
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  data:any=[];
  registerFrm: any=[];
  submitted=false;
  constructor(private api: ApiService,private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.registerFrm = this.formBuilder.group({
      //pull value cid
      cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])]
    });
  }
  get f() {
    return this.registerFrm.controls;
  }
  async getonclick():Promise<any>{
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
    if( rs.ok===true){
      this.dataNovel=rs.message;
      console.log(this.dataNovel);
    }else {
      console.log('error');
    }

  }

  printReport(novel_id: any) {

  }
  async insertRec(id): Promise<any> {
    const data: any = {};
    const info: any = [];
    data.novel_id = id;


    info.push(data);

    const rs: any = await this.api.insData(info);

  }

}


