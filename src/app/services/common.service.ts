import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

export abstract class CommonService<E extends Generic> {

  protected vheaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  protected baseEndPoint: string;

  constructor(protected http: HttpClient) { }

  public list(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndPoint);
  }

  public listPagination(page: string, size: string): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);
    return this.http.get<any>(`${this.baseEndPoint}/page`, {params: params});
  }

  public view(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndPoint}/${id}`);
  }

  public create(e: E): Observable<E> {
    return this.http.post<E>(this.baseEndPoint, e, { headers: this.vheaders});
  }

  public edit(e: E): Observable<E> {
    return this.http.put<E>(`${this.baseEndPoint}/${e.id}`, e, { headers: this.vheaders });
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }
}
