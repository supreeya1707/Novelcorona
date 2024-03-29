import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-report',
  templateUrl: './view.component.html',

})
export class ViewComponent implements OnInit {
  txtSearch: any = '';
  ptname: any = '';
  station: any = '';
  point: any = '';
  servicepoint: any;

  navbarOpen = false;
  cid: any;
  dateChoose: any;
  dataNovel: any = [];
  dataServicePoint: any = [];
  dataSearch: any = '';

  data: any = [];
  searchFrm: any = [];
  submitted = false;
  currentDate: any = new Date();
  locale = 'th-be';

  password: any = 'rbhCoV!9';
  password2: any = 'adminCoV!9';
  password3: any = 'preopCoV!9';
  password4: any = 'jailCoV!9';
  password5: any = 'childCoV!9';
  pass: any;

  divServicepoint: any = true;



  constructor(private api: ApiService, private formBuilder: FormBuilder, private localeService: BsLocaleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);
    this.pass = sessionStorage.getItem('nCoVpass');
    // console.log(this.pass !== this.password);
    if ( this.pass !== this.password && this.pass !== this.password2 && this.pass !== this.password3 && this.pass !== this.password4 && this.pass !== this.password5){
      this.router.navigateByUrl('staff/login/ncov');
    }
  }

  cidSearch(): any {
    if (this.txtSearch === '') {
      this.dataSearch = this.dataNovel;
    } else {
      this.dataSearch = this.dataNovel.filter((data: any) => {
        return data.novel_cid.match(this.txtSearch);
      });
    }
  }

  nameSearch(): any {
    if (this.ptname === '') {
      this.dataSearch = this.dataNovel;
    } else {
      this.dataSearch = this.dataNovel.filter((data: any) => {
        return data.ptfullname.match(this.ptname);
      });
    }
  }

  stationSearch(): any {
    if (this.station === '') {
      this.dataSearch = this.dataNovel;
    } else {
      this.dataSearch = this.dataNovel.filter((data: any) => {
        return data.novel_station.match(this.station);
      });
    }
  }

  pointSearch(): any {
    if (this.point === '') {
      this.dataSearch = this.dataNovel;
    } else {
      this.dataSearch = this.dataNovel.filter((data: any) => {
        return data.servicepoint.match(this.point);
      });
    }
  }

  toggleNavbar(): any {
    this.navbarOpen = !this.navbarOpen;
  }

  // function call searchFrm
  get f(): any {
    return this.searchFrm.controls;
  }

  async dateChange(e: any): Promise<any> {
    const dateinput = moment(e).format('YYYY-MM-DD');
    this.dateChoose = dateinput;
    if (this.pass === this.password3){
      this.divServicepoint = false;
      this.servicepoint = 9;
      const res = await this.api.getByDateServicepoint(dateinput, this.servicepoint);
      if (res.ok === true){
        this.dataNovel = res.message;
        this.dataSearch = this.dataNovel;
        console.log(this.dataNovel);
      }else{
        console.log('error');
      }
    }else if (this.pass === this.password5) {
      this.divServicepoint = false;
      this.servicepoint = 8;
      console.log(this.servicepoint);
      const res = await this.api.getByDateServicepoint(dateinput, this.servicepoint);
      console.log(res);
      if (res.ok === true) {
        this.dataNovel = res.message;
        this.dataSearch = this.dataNovel;
        console.log(this.dataNovel);
      } else {
        console.log('error');
      }
    }else if (this.pass === this.password4){
      this.divServicepoint = false;
      this.servicepoint = 7;
      console.log( this.servicepoint);
      const res = await this.api.getByDateServicepoint(dateinput, this.servicepoint);
      if (res.ok === true){
        this.dataNovel = res.message;
        this.dataSearch = this.dataNovel;
        // console.log(this.dataNovel);
      }else{
        console.log('error');
      }
    }else{
      this.divServicepoint = true;
      this.dataServicePoint = [];
      this.servicepoint = '';
      const rs: any = await this.api.getByDateRaw(dateinput);
      // console.log(rs);
      if (rs.ok) {
        this.dataNovel = rs.message;
        this.dataSearch = this.dataNovel;
        const res: any = await this.api.getDataByDatePoint(dateinput);
        // console.log(res.message);
        if (res.ok === true){
          this.dataServicePoint = res.message;
        }else {
          console.log('error');
        }
      } else {
        console.log('error');
      }
    }


  }

  async changeServicepoint(): Promise<any> {
    const dateinput = this.dateChoose;
    const servicepoint = this.servicepoint;
    console.log(servicepoint);
    if (this.servicepoint === 'all'){
      const rs: any = await this.api.getByDateRaw(dateinput);
      // console.log(rs);
      if (rs.ok) {
        this.dataNovel = rs.message;
        this.dataSearch = this.dataNovel;
      } else {
        console.log('error');
      }
    }else{
      const res = await this.api.getByDateServicepoint(dateinput, servicepoint);
      if (res.ok === true){
        this.dataNovel = res.message;
        this.dataSearch = this.dataNovel;
      }else{
        console.log('error');
      }
    }

  }

  viewForm(novelID: any): any {
    console.log(novelID);
    this.router.navigateByUrl('staff/nCoV/recheck', {state: {novelid: novelID}});
  }


  async delData(novelid: any, ptfullname: any): Promise<any> {
    console.log(novelid, ' : ', ptfullname);
    Swal.fire({
      icon: 'warning',
      title: 'ลบข้อมูล',
      html: 'ต้องการลบข้อมูลของ' + '<br>' + ptfullname,
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ใช่',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res01 = await this.api.delTimeLine(novelid);
        // console.log(res);
        if (res01.ok === true) {
          const res02 = await this.api.delNovel(novelid);
          if (res02.ok === true){
            Swal.fire('ลบข้อมูลสำเร็จ', '', 'success');
            this.dateChange(moment(this.dateChoose).format('YYYY-MM-DD'));
          }else{
            Swal.fire('ลบข้อมูลไม่สำเร็จ', '', 'error');
            this.dateChange(moment(this.dateChoose).format('YYYY-MM-DD'));
          }
        } else {
          Swal.fire('ลบข้อมูลไม่สำเร็จ', '', 'error');
          this.dateChange(moment(this.dateChoose).format('YYYY-MM-DD'));
        }
      }
    });
  }
}


