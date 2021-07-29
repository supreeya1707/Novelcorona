import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {Router} from '@angular/router';
import * as _ from 'lodash';



@Component({
  selector: 'app-report',
  templateUrl: './view-novelcorona2.component.html',

})
export class ViewNovelcorona2Component implements OnInit {
  navbarOpen = false;
  cid: any;
  dataNovel: any[];

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


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  // function call searchFrm
  get f() {
    return this.searchFrm.controls;
  }

  async dateChange(e: any): Promise<any> {
    const dateinput = moment(e).format('YYYY-MM-DD');
    const rs: any = await this.api.getDataByDateStaff(dateinput);
    // console.log(rs);
    if (rs.ok) {
      this.dataNovel = rs.message;
    } else {
      console.log('error');
    }
  }

  viewForm(novelID: any) {
    console.log(novelID);
    this.router.navigateByUrl('admin/formRecheck', {state: {novelid: novelID}});
  }

  nameOrder(): any {
    const data = _.sortBy(this.dataNovel, (o: any) => {
      return o.novel_cid;
    });
    this.dataNovel = data;
  }


}


