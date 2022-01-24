import { Directive, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  public title: string;
  public list: E[];
  public totalRegistered = 0;
  public currentPage = 0;
  public totalPerPage = 4;
  public pageSizeOptions: number[] = [5, 10, 25];

  constructor(protected service: S) { }

  ngOnInit(): void {
    this.dataPaginator();
  }

  public paginator(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.totalRegistered = event.pageSize;
    this.dataPaginator();
  }

  private dataPaginator() {   
    this.service.listPagination(this.currentPage.toString(), this.totalPerPage.toString()).subscribe(resp => {
      this.list = resp.content as E[];
      this.totalRegistered = resp.totalElements as number;
    })
  }

  public delete(e: E):void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(e.id).subscribe(() => {          
          this.dataPaginator();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });        
      }
    }); 
  }
}


