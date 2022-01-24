import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './components/courses/course-form.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentsFormComponent } from './components/students/students-form.component';
import { StudentsComponent } from './components/students/students.component';
import { TestFormComponent } from './components/tests/test-form.component';
import { TestsComponent } from './components/tests/tests.component';
import { AddStudentsComponent } from './components/courses/add-students.component';
import { AddTestsComponent } from './components/courses/add-tests.component';
import { AnswerTestComponent } from './components/students/answer-test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses'},
  {path: 'students', component: StudentsComponent},
  { path: 'students/form', component: StudentsFormComponent },
  { path: 'students/form/:id', component: StudentsFormComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/form', component: CourseFormComponent },
  { path: 'courses/form/:id', component: CourseFormComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'tests/form', component: TestFormComponent },
  { path: 'tests/form/:id', component: TestFormComponent },
  { path: 'courses/add-students/:id', component: AddStudentsComponent },
  { path: 'courses/add-tests/:id', component: AddTestsComponent},
  { path: 'students/answer-test/:id', component: AnswerTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
