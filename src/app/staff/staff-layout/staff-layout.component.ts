import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-layout',
  templateUrl: './staff-layout.component.html'
})
export class StaffLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openWardCovid(): any {
    window.open(
      'http://www.rbhportal.com/covidmonit/', '_blank');
  }

}
