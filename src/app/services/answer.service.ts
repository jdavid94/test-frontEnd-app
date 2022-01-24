import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Answer } from '../models/answer';
import { Student } from '../models/student';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private vheaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseEndPoint: string = BASE_ENDPOINT + '/answers';;

  constructor(private http: HttpClient) { }

  public create(answer: Answer[]): Observable<Answer[]> {
    return this.http.post<Answer[]>(this.baseEndPoint, answer, {headers: this.vheaders});
  }

  public getAnswerByStudentByTest(student: Student, test: Test): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseEndPoint}/student/${student.id}/test/${test.id}`);
  }
}
