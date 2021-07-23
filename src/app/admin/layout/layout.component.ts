import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {

  showUrl = true;
  route: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path() !== '') {
        this.route = location.path();
        if (location.path() === '/apps/login'){
          this.showUrl = false;
        }else{
          this.showUrl = true;
        }
      } else {
        this.route = 'Home';
      }
    });
  }

  ngOnInit(): void {}

}
