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

  navbarOpen = false;
  cid: any;
  dateChoose: any;
  dataNovel: any[];
  dataSearch: any = '';

  data: any = [];
  searchFrm: any = [];
  submitted = false;
  currentDate: any = new Date();
  locale = 'th-be';

  password: any = 'rbhCoV!9';



  constructor(private api: ApiService, private formBuilder: FormBuilder, private localeService: BsLocaleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);
    const pass = sessionStorage.getItem('nCoVpass');
    if (pass !== this.password){
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

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  // function call searchFrm
  get f() {
    return this.searchFrm.controls;
  }

  async dateChange(e: any): Promise<any> {
    const dateinput = moment(e).format('YYYY-MM-DD');
    this.dateChoose = dateinput;
    const rs: any = await this.api.getByDateRaw(dateinput);
    // console.log(rs);
    if (rs.ok) {
      this.dataNovel = rs.message;
      this.dataSearch = this.dataNovel;
    } else {
      console.log('error');
    }
  }

  viewForm(novelID: any) {
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


