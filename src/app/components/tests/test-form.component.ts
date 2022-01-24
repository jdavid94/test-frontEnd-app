import { Component, OnInit } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject';
import { Question } from '../../models/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent extends CommonFormComponent<Test, TestService> implements OnInit {

  public subjectsFather: Subject[] = [];
  public subjectsSon: Subject[] = [];
  

  constructor(service: TestService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.title = 'Add New Test'
    this.model = new Test();
    this.redirect = '/tests'
    this.nameModel = Test.name;
  }

  override ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.view(id).subscribe(resp => {
          this.model = resp;
          this.title = 'Edit ' + this.nameModel;
            this.loadSons();
            /* this.service.findAllSubjects().subscribe(resp => {
            this.subjectsSon = resp.filter(s => s.father && s.father.id === this.model.subjectFather.id);
            
          });*/
        });
      }
    });
    this.service.findAllSubjects().subscribe(resp => {
      this.subjectsFather = resp.filter(s => !s.father);
      
    });
  }

  public override create(): void {
    if (this.model.questions.length === 0) {
      Swal.fire('Questions Error', `Test must have questions`, 'error');
      return;
    }
    this.deleteVoidQuestions();
    super.create();
  }

  public override edit(): void {
    if (this.model.questions.length === 0) {
      Swal.fire('Questions Error', `Test must have questions`, 'error');
      return;
    }
    this.deleteVoidQuestions();
    super.edit();
  }

  public loadSons(): void {
      this.subjectsSon = this.model.subjectFather? this.model.subjectFather.sons: [];
  }

  public compareSubject(s1: Subject, s2: Subject): boolean {
    if (s1 === undefined && s2 === undefined) {
      return true;
    }   
    return (s1 === null || s2 === null || s1 === undefined || s2 === undefined) ? false : s1.id === s2.id;
  }

  public addQuestion(): void {
    this.model.questions.push(new Question());
  }

  public addTex(question: Question, event: any): void {
    question.text = event.target.value as string;
    console.log(this.model);
  }

  public deleteQuestion(question):void {
    this.model.questions = this.model.questions.filter(q => question.text !== q.text);
  }

  public deleteVoidQuestions(): void {
    this.model.questions = this.model.questions.filter(q => q.text != null && q.text.length > 0);
  }

 

}
