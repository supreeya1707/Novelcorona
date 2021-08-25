import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  agree: any;
  servicepoint: any;
  hospcode: any;
  dataServicepoint: any = [];
  dataDHPH: any = [];
  servicepointFrm: any;
  btndisble: any = false;
  @ViewChild('content01', {read: TemplateRef}) content01: TemplateRef<any>;
  @ViewChild('content02', {read: TemplateRef}) content02: TemplateRef<any>;


  constructor(private router: Router, private modalService: NgbModal, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDataServicepoint();
    this.getDataDHPH();
  }

  openVaccine(): any {
    window.open(
      'http://www.virtualhos.net/vaccine/home', '_blank');
  }

  openSwab(): any {
    window.open(
      'https://www.hyggemedicalservice.com/rbh/covid19/webcheck.php', '_blank');
  }

  openCoV(): any {
    // this.modalService.open(this.content01, {size: 'xl', backdrop: 'static'});
    this.router.navigateByUrl('forms/novelcorona2');
  }

  btnStep1(): any {
    this.modalService.dismissAll();
    this.modalService.open(this.content02, {size: 'xl', backdrop: 'static'});
  }

  async getDataServicepoint(): Promise<any> {
    const res = await this.api.getServicepoint();
    if (res.ok === true){
      this.dataServicepoint = res.message;
    }else{
      console.log('error');
    }
  }

  async getDataDHPH(): Promise<any> {
    const resDHPH = await this.api.getDHPH();
    if (resDHPH.ok === true){
      this.dataDHPH = resDHPH.message;
      // console.log(resDHPH.message);
    }else{
      console.log('error');
    }
  }

  changeServicepoint(): any {
    if (this.servicepoint === '5'){
      this.btndisble = false;
    }else{
      this.btndisble = true;
    }
  }

  changeDHPH(): any {
    if (this.hospcode){
      this.btndisble = true;
    }else{
      this.btndisble = false;
    }
  }

  btnStep2(): any {
    this.modalService.dismissAll();
    if (this.servicepoint === '5'){
      sessionStorage.setItem('servicepoint', this.servicepoint);
      sessionStorage.setItem('dhph', this.hospcode);
    }else{
      sessionStorage.setItem('servicepoint', this.servicepoint);
    }

    this.router.navigateByUrl('/forms/novelcorona2');

  }
}
