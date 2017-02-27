import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPays(): Observable<any> {
    return this.http.get('/pays').map(res => res.json());
  }

  addPay(pay): Observable<any> {
    return this.http.post('/pay', JSON.stringify(pay), this.options);
  }


  deletePay(pay): Observable<any> {
    return this.http.delete(`/pay/${pay._id}`, this.options);
  }

}
