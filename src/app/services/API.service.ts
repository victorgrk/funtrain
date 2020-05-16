import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './Authentification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private http: HttpClient,
    private auth: AuthentificationService
  ) { }

  private headers: HttpHeaders = new HttpHeaders({
    Authorization: 'Bearer ' + this.auth.getToken(),
  });

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}/`, body, {headers: this.headers});
  }
  get<G>(url: string): Observable<G> {
    return this.http.get<G>(`${environment.apiUrl}${url}/`, {headers: this.headers});
  }
  put<P>(url: string, body: any): Observable<P> {
    return this.http.put<P>(`${environment.apiUrl}${url}/`, body, {headers: this.headers});
  }
  delete<D>(url: string, id: string): Observable<D> {
    return this.http.delete<D>(`${environment.apiUrl}${url}/${id}/`, {headers: this.headers});
  }
}
