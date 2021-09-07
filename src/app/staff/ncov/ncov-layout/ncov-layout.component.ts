import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ncov-layout',
  templateUrl: './ncov-layout.component.html',
  styles: [
  ]
})
export class NcovLayoutComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // this.modalService.dismissAll();
  }

  openVaccine(): any {
    window.open(
      'http://www.virtualhos.net/vaccine/home', '_blank');
  }

  openSwab(): any {
    window.open(
      'https://www.hyggemedicalservice.com/rbh/covid19/webcheck.php', '_blank');
  }

  openView(): any {
    this.router.navigateByUrl('staff/nCoV/view');
  }

  openReport(): any {
    this.router.navigateByUrl('staff/nCoV/report');
  }

  openSearch(): any {
    this.router.navigateByUrl('staff/nCoV/search');
  }

}
