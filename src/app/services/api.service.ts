import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any;
  httpOptions: any;
  constructor(private http: HttpClient, @Inject('baseURL') private baseURL: any) { }

  insRec(insRecord: any): any {
    const token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const url = `${this.baseURL}/novelcorona`;

    console.log(url);
    return this.http.post(url, {data: insRecord},
      this.httpOptions
    ).toPromise();
  }
  insData(insRecord: any): any {
    const token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const url = `${this.baseURL}/noveltimeline`;
    console.log(url);
    return this.http.post(url, {data: insRecord},
      this.httpOptions
    ).toPromise();
  }
  insRegis(insRecord: any): any {
    const token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const url = `${this.baseURL}/novelregis`;

    console.log(url);
    return this.http.post(url, {data: insRecord},
      this.httpOptions
    ).toPromise();
  }

  getData(cid:any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelcorona/${cid}/cid`;

    return this.http.get(url, this.httpOptions).toPromise();
  }
}
