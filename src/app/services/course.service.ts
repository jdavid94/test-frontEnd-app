import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})

export class CourseService extends CommonService<Course> {

  protected override baseEndPoint = BASE_ENDPOINT + '/courses';

  constructor(http: HttpClient) { 
    super(http);
  }

  public addStudents(course: Course, students: Student[]) : Observable<Course> {
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/add-students`, students, {headers: this.vheaders});
  }

  public deleteStudent(course: Course, student: Student): Observable<Course> {
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/remove-student`, student, { headers: this.vheaders });
  }

  public addTests(course: Course, tests: Test[]): Observable<Course> {
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/add-tests`, tests, { headers: this.vheaders });
  }

  public deleteTest(course: Course, test: Test): Observable<Course> {
    return this.http.put<Course>(`${this.baseEndPoint}/${course.id}/remove-test`, test, { headers: this.vheaders });
  }

  public getCourseByStudentId(student: Student): Observable<Course> {
    return this.http.get<Course>(`${this.baseEndPoint}/student/${student.id}`);
  }

}
