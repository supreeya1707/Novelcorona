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

  insStaff(insRecord: any): any {
    const token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    const url = `${this.baseURL}/novelstaff`;
    console.log(url);
    return this.http.post(url, {data: insRecord},
      this.httpOptions
    ).toPromise();
  }

  getData(cid: any): any {
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

  getDataById(id: any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelcorona/${id}/id`;

    return this.http.get(url, this.httpOptions).toPromise();
  }

  getDataStaff(novelid: any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelstaff/${novelid}/novel_id`;

    return this.http.get(url, this.httpOptions).toPromise();
  }

  getCluster(): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/covidcluster`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  getVaccine(): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/vaccine`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  getContact(): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/covidcontact`;
    return this.http.get(url, this.httpOptions).toPromise();
  }


  getDataByDate(dateinput: any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelcorona/${dateinput}/dateinput`;

    return this.http.get(url, this.httpOptions).toPromise();
  }


  getDataByDateStaff(dateinput: any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelcorona/${dateinput}/staff_dateinput`;

    return this.http.get(url, this.httpOptions).toPromise();
  }

  getStaffByDate(dateinput: any): any {
    // const token = sessionStorage.getByCid('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/novelcorona/${dateinput}/staff`;

    return this.http.get(url, this.httpOptions).toPromise();
  }

  getTimeLineById(novelid: any): any {
    // const token = sessionStorage.getTimeLineById('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    const url = `${this.baseURL}/noveltimeline/${novelid}/novelid`;

    return this.http.get(url, this.httpOptions).toPromise();
  }

  updateNovelData(novelid, dataUpdate): any{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    // console.log(dataUpdate);
    const url = `${this.baseURL}/novelcorona/${novelid}/novel_id`;
    return this.http.put(url, {data: dataUpdate}, this.httpOptions).toPromise();
  }

  updateTLData(novelid, dataUpdate): any{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: 'Bearer '
      })
    };
    // console.log(dataUpdate);
    const url = `${this.baseURL}/noveltimeline/${novelid}/novel_id`;
    return this.http.put(url, {data: dataUpdate}, this.httpOptions).toPromise();
  }
}
