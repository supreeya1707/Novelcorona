import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import * as _ from 'lodash';



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
  dataNovel: any[];
  dataSearch: any = '';

  data: any = [];
  searchFrm: any = [];
  submitted = false;
  currentDate: any = new Date();
  locale = 'th-be';



  constructor(private api: ApiService, private formBuilder: FormBuilder, private localeService: BsLocaleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);
    /* this.searchFrm = this.formBuilder.group({
       cid: [null, Validators.compose([Validators.required, Validators.minLength(13)])]
     });*/
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
    this.router.navigateByUrl('admin/formRecheck', {state: {novelid: novelID}});
  }



}


