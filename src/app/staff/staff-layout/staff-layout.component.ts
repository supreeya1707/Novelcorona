import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-staff-layout',
  templateUrl: './staff-layout.component.html'
})
export class StaffLayoutComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
  }

  openWardCovid(): any {
    window.open(
      'http://www.rbhportal.com/covidmonit/', '_blank');
  }

 openSwabQue(): any {
    window.open(
      'http://rbhportal.com/swabque/', '_blank');
  }

  openSwabTest(): any {
    window.open(
      'https://www.hyggemedicalservice.com/rbh/covid19/webcheck.php', '_blank');
  }

}
