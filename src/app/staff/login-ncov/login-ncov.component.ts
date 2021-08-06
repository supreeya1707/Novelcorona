import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-ncov.component.html',
})
export class LoginNcovComponent implements OnInit {
  password: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkLogin(): any {
    if (this.password === 'rbhCoV!9'){
      sessionStorage.setItem('nCoVpass', this.password);
      this.router.navigateByUrl('/staff/nCoV');
    }else{

    }
  }
}
