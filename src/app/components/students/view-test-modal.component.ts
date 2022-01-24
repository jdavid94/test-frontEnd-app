import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answer } from 'src/app/models/answer';
import { Course } from 'src/app/models/course';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-view-test-modal',
  templateUrl: './view-test-modal.component.html',
  styleUrls: ['./view-test-modal.component.css']
})
export class ViewTestModalComponent implements OnInit {

  public course: Course;
  public test: Test;
  public answers: Answer[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<ViewTestModalComponent>) { }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.test =  this.data.test as Test;
    this.answers = this.data.answers as Answer[];
  }

  public close() : void {
    this.modalRef.close();
  }

}
