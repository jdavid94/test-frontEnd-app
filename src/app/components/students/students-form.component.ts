import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../common-form.component';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent extends CommonFormComponent<Student, StudentService> implements OnInit {
  
  private selectedPhoto: File;

  constructor(studentService: StudentService, router: Router, route: ActivatedRoute) {
    super(studentService, router, route);
    this.title = 'Add New Student'
    this.model = new Student(); 
    this.redirect = '/students'
    this.nameModel = Student.name;
   }

  public choosePhoto(event): void {
    this.selectedPhoto = event.target.files[0];
    console.log(this.selectedPhoto);
    if (this.selectedPhoto.type.indexOf('image')<0) {
      this.selectedPhoto = null;
      Swal.fire('Error:', `The file must be an image`, 'error');
    }
  }

  public override create(): void {
    if (!this.selectedPhoto) {
      super.create();
    } else {
      this.service.createWithPhoto(this.model, this.selectedPhoto).subscribe(resp => {
        console.log(resp);
        Swal.fire('New:', `${this.nameModel} ${resp.name} Successfully Created`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if (err.status === 400) {
          this.errors = err.error;
          console.log(this.errors);
        }
      });
    }
  }

  public override edit(): void {
    if (!this.selectedPhoto) {
      super.edit();
    } else {
      this.service.editWithPhoto(this.model, this.selectedPhoto).subscribe(resp => {
        console.log(resp);
        Swal.fire('Edit:', `${this.nameModel} ${resp.name} Successfully Updated`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if (err.status === 400) {
          this.errors = err.error;
          console.log(this.errors);
        }
      });
    }
  }
}
