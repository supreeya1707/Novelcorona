import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ncov-layout',
  templateUrl: './ncov-layout.component.html',
  styles: [
  ]
})
export class NcovLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openVaccine() {
    window.open(
      'http://www.virtualhos.net/vaccine/home', '_blank');
  }

  openSwab() {
    window.open(
      'https://www.hyggemedicalservice.com/rbh/covid19/webcheck.php', '_blank');
  }

  openView() {
    this.router.navigateByUrl('staff/nCoV/view');
  }

  openReport() {
    this.router.navigateByUrl('staff/nCoV/report');
  }

}
