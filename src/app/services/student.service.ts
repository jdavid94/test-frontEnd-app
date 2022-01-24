import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableNotification } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Student } from '../models/student';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student> {

  protected override baseEndPoint = BASE_ENDPOINT + '/students';
  constructor(http: HttpClient) {
    super(http);
  }    

  public createWithPhoto(student: Student, file: File): Observable<Student> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', student.name);
    formData.append('lastName', student.lastName);
    formData.append('email', student.email);
    return this.http.post<Student>(this.baseEndPoint + '/create-photo', formData);
  }

  public editWithPhoto(student: Student, file: File): Observable<Student> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', student.name);
    formData.append('lastName', student.lastName);
    formData.append('email', student.email);
    return this.http.put<Student>(`${this.baseEndPoint}/edit-photo/${student.id}`, formData);
  }

  public searchByName(term: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseEndPoint}/filter/${term}`);
  }
}
