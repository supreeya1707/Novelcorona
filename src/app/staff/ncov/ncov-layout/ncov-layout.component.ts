import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ncov-layout',
  templateUrl: './ncov-layout.component.html',
  styles: [
  ]
})
export class NcovLayoutComponent implements OnInit {

  constructor() { }

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

}
