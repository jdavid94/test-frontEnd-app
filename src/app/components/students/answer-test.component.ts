import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Test } from 'src/app/models/test';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../../models/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AnswerModalComponent } from './answer-modal.component';
import { AnswerService } from 'src/app/services/answer.service';
import { Answer } from 'src/app/models/answer';
import Swal from 'sweetalert2';
import { ViewTestModalComponent } from './view-test-modal.component';

@Component({
  selector: 'app-answer-test',
  templateUrl: './answer-test.component.html',
  styleUrls: ['./answer-test.component.css']
})
export class AnswerTestComponent implements OnInit {

  public student: Student;
  public course: Course;
  public tests: Test[] = [];
  public displayedColumnsTests: string[] = ['id', 'name', 'subjects', 'questions', 'answer', 'view'];
  public pageSizeOptions = [3,5,10,20,30,50];
  public dataSource: MatTableDataSource<Test>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private studentService: StudentService, private courseService: CourseService, public dialog: MatDialog, private answerService: AnswerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.studentService.view(id).subscribe(resp => {
        this.student = resp;
        this.courseService.getCourseByStudentId(this.student).subscribe(resp => {
          this.course = resp;
          this.tests = (resp && resp.tests)? resp.tests: [];
          this.dataSource = new MatTableDataSource<Test>(this.tests);
          this.dataSource.paginator = this.paginator;
        });        
      });
    });
  }

  public answeredTest(test: Test):void {
    const dialogRef = this.dialog.open(AnswerModalComponent, {
      width: '750px',
      data: {course: this.course, student: this.student, test: test}
    });
    dialogRef.afterClosed().subscribe((respMap: Map<number, Answer>) => {
      console.log('Datos Enviados!');
      console.log(respMap);
      if (respMap) {
        const answers: Answer[] = Array.from(respMap.values());
        this.answerService.create(answers).subscribe(resp => {
          test.answered = true;
          Swal.fire('Sent', `Questions Successfully Sent it`, 'success');
          console.log(resp);
        });
      }
    });
  }

  public viewTest(test: Test): void {
    this.answerService.getAnswerByStudentByTest(this.student, test).subscribe(resp => {
      const modalRef = this.dialog.open(ViewTestModalComponent, {
        width: '750px',
        data: {course: this.course, test: test, answers: resp}
      });
      modalRef.afterClosed().subscribe(() => {
        console.log('Modal Closed');
      })
    });
  }

}
