import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';

@Directive()
export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  public title: string;
  public model: E;
  public errors: any;
  protected redirect: string;
  protected nameModel: string;

  constructor(protected service: S, protected router: Router, protected route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.view(id).subscribe(resp => {
          this.model = resp;
          this.title = 'Edit ' + this.nameModel;
        });
      }
    });
  }

  public create(): void  {
    this.service.create(this.model).subscribe(resp => {
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

  public edit(): void {
    this.service.edit(this.model).subscribe(resp => {
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
