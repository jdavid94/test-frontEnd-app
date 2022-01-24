import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TestsComponent } from './components/tests/tests.component';
import { LayoutModule } from './shared/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentsFormComponent } from './components/students/students-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CourseFormComponent } from './components/courses/course-form.component';
import { TestFormComponent } from './components/tests/test-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AddStudentsComponent } from './components/courses/add-students.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTestsComponent } from './components/courses/add-tests.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AnswerTestComponent } from './components/students/answer-test.component';
import { AnswerModalComponent } from './components/students/answer-modal.component';
import { ViewTestModalComponent } from './components/students/view-test-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    TestsComponent,
    StudentsFormComponent,
    CourseFormComponent,
    TestFormComponent,
    AddStudentsComponent,
    AddTestsComponent,
    AnswerTestComponent,
    AnswerModalComponent,
    ViewTestModalComponent   
  ],
  entryComponents: [
    AnswerModalComponent,
    ViewTestModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
