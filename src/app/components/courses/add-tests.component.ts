import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, flatMap } from 'rxjs';
import { Course } from 'src/app/models/course';
import { Test } from 'src/app/models/test';
import { CourseService } from 'src/app/services/course.service';
import { TestService } from 'src/app/services/test.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-tests',
  templateUrl: './add-tests.component.html',
  styleUrls: ['./add-tests.component.css']
})
export class AddTestsComponent implements OnInit {

  public course: Course;
  public autoCompleteControl = new FormControl();
  public tabIndex = 0;
  public foundTests: Test[] = [];
  public testAdded: Test[] = [];
  public tests: Test[] = [];
  public displayedColumns: string[] = ['name','subject', 'delete'];
  public displayedColumnsTests: string[] = ['id', 'name', 'subjects', 'delete'];
  public dataSource: MatTableDataSource<Test>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public pageSizeOptions: number[] = [3, 5, 10, 20, 50];

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService, private testService: TestService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(resp => {
      const id: number = +resp.get('id');
      this.courseService.view(id).subscribe(resp => {
        this.course = resp;
        this.tests = this.course.tests;
        this.initPaginator();
      });
      this.autoCompleteControl.valueChanges.pipe(
        map(value => typeof value === 'string'? value: value.name),
        flatMap(value => value? this.testService.filterByName(value): [])
      ).subscribe(resp => {
        this.foundTests = resp;
      });
    });
  }

  private initPaginator(): void {
    this.dataSource = new MatTableDataSource<Test>(this.tests);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registers per Page'
  }

  public showName(test?: Test):string {
    return test? test.name : '';
  }

  public testSelected(event: MatAutocompleteSelectedEvent):void {
    const test = event.option.value as Test;
    if (!this.exist(test.id)) {
      this.testAdded = this.testAdded.concat(test);
      console.log(this.testAdded);     
    } else {
      Swal.fire('Alert!', `Test is already added`, 'error');
    }
    this.autoCompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

  private exist(id: number): boolean {
    let exist = false;
    this.testAdded.concat(this.tests)
    .forEach(t => {
      if(id === t.id) {
        exist = true;
      } 
    });
    return exist;
  }

  public removeFromAdded(test: Test):void {
    this.testAdded = this.testAdded.filter(t => test.id !== t.id);
  }

  public addTests(): void {
    console.log(this.testAdded);
    this.courseService.addTests(this.course, this.testAdded).subscribe(resp => {
      this.tests = this.tests.concat(this.testAdded);
      this.initPaginator();
      this.testAdded = [];
      this.tabIndex = 2;
      Swal.fire('Added!', `Tests added Successfully`, 'success');
    });
  }

  public deleteTest(test: Test): void {
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
        this.courseService.deleteTest(this.course, test).subscribe(resp => {
          this.tests = this.tests.filter(t => t.id !== test.id);
         this.initPaginator();
          Swal.fire(
            'Remove!',
            'Test has been removed.',
            'success'
          )
        });
      }
    });      
  }

  

}
