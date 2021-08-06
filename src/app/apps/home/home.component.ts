import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

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

  openCoV() {
    this.router.navigateByUrl('forms/novelcorona2');
  }
}
