import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answer } from 'src/app/models/answer';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { Test } from 'src/app/models/test';
import { Question } from '../../models/question';

@Component({
  selector: 'app-answer-modal',
  templateUrl: './answer-modal.component.html',
  styleUrls: ['./answer-modal.component.css']
})
export class AnswerModalComponent implements OnInit {

  public course: Course;
  public student: Student;
  public test: Test;
  public resp: Map<number, Answer> = new Map<number, Answer>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<AnswerModalComponent>) { }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.test = this.data.test as Test;
  }

  public cancel(): void {
    this.modalRef.close();
  }

  public answer(question: Question, event: any): void {
    const text = event.target.value as string;
    const answer = new Answer();
    answer.student = this.student;
    answer.question = question;
    const test = new Test();
    test.id = this.test.id;
    test.name = this.test.name;
    answer.question.test = test;
    answer.text = text;
    this.resp.set(question.id, answer);
    console.log(this.answer);
  }

}
