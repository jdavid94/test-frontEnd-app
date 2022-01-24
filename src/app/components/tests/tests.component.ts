import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';
import { TestService } from 'src/app/services/test.service';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent extends CommonListComponent<Test,TestService> implements OnInit {

  constructor(service: TestService) {
    super(service);
    this.title = 'Tests List';
  }

 

}
