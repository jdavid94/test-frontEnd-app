import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Test } from '../models/test';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class TestService extends CommonService<Test> {

  protected override baseEndPoint = BASE_ENDPOINT + '/tests';

  constructor(http: HttpClient) { 
    super(http);
  }

  public findAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseEndPoint}/subjects`);
  }

  public filterByName(term: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseEndPoint}/filter/${term}`);
  }
}
