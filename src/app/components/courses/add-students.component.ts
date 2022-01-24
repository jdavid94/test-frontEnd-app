import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  public course: Course;
  public tabIndex = 0;
  public studentsAdded: Student[] = [];
  public students: Student[] = [];
  public displayedColumns: string[] = ['name', 'lastName', 'selected'];
  public displayedColumnsStudents: string[] = ['id', 'name', 'lastName', 'email', 'delete'];
  public selected: SelectionModel<Student> = new SelectionModel<Student>(true, []);
  public dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public pageSizeOptions: number[] = [3,5,10,20,50];

  constructor(private route: ActivatedRoute, private courseService: CourseService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.view(id).subscribe(resp => {
        this.course = resp;
        this.students = this.course.students;
        this.initPaginator();
      });
    });
  }

  private initPaginator(): void {
    this.dataSource = new MatTableDataSource<Student>(this.students);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registers per Page'
  }

  public filterByTerm(term: string): void {
    term = term !== undefined? term.trim(): '';
    if (term !== '') {
      this.studentService.searchByName(term).subscribe(resp => {
        this.studentsAdded = resp.filter(s => {
          let filt = true;
          this.students.forEach(cs => {
            if (s.id === cs.id) {
              filt = false;
            }
          });
          return filt;
        });
      })      
    }
  }

  public IsAllSelected(): boolean {
    const studentsSelected = this.selected.selected.length;
    const studentsNum = this.studentsAdded.length;
    return (studentsSelected === studentsNum);
  }

  public selectedAll(): void {
    this.IsAllSelected() ?
    this.selected.clear() : 
    this.studentsAdded.forEach(s => this.selected.select(s));      
  }   

  public add(): void {
    console.log(this.selected.selected);
    this.courseService.addStudents(this.course, this.selected.selected).subscribe(resp => {
      this.tabIndex = 2;
      Swal.fire('Added: ', `Students added Successfully to ${this.course.name}` , 'success');
      this.students = this.students.concat(this.selected.selected);
      this.initPaginator();
      this.studentsAdded = [];
      this.selected.clear();
    },
    e => {
      if (e.status === 500) {
        const message = e.error.message as string;
        if (message.indexOf('ConstraintViolationException') > -1) {
          Swal.fire('Alert!', `Students is already added to other course`, 'error');
        }
      }
    });
}

  public deleteStudent(student: Student): void {      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.courseService.deleteStudent(this.course, student).subscribe(resp => {
            this.students = this.students.filter(s => s.id !== student.id);
            this.initPaginator();
            Swal.fire(
              'Remove!',
              'Student has been removed.',
              'success'
            )
          });
        }
    });      
  }  

}
