import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent extends CommonListComponent<Student, StudentService> implements OnInit {
  
  public baseEndPoint = BASE_ENDPOINT + '/students';

  constructor(service: StudentService) { 
    super(service);
    this.title = 'Students List'; 
  }
  
}


