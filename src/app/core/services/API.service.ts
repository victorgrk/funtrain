import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './Authentification.service';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

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
    return this.http.post<T>(`${environment.apiUrl}${url}/`, body, { headers: this.headers });
  }
  get<G>(url: string): Observable<G> {
    return this.http.get<G>(`${environment.apiUrl}${url}/`, { headers: this.headers });
  }
  put<P>(url: string, body: any): Observable<P> {
    return this.http.put<P>(`${environment.apiUrl}${url}/`, body, { headers: this.headers });
  }
  delete<D>(url: string, id: string): Observable<D> {
    return this.http.delete<D>(`${environment.apiUrl}${url}/${id}/`, { headers: this.headers });
  }
  patch<P>(url: string, body: any): Observable<P> {
    return this.http.patch<P>(`${environment.apiUrl}${url}/`, body, { headers: this.headers });
  }
  uploadFile(file: File): Observable<{ status: string, current?: number, body?: string }> {
    const fd = new FormData();
    fd.append('file', file)
    return this.http.post(`${environment.apiUrl}files`, fd, {
      reportProgress: true,
      observe: 'events',
      headers: this.headers
    }).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return { status: 'progress', current: Math.round((100 * event.loaded) / event.total) }
          case HttpEventType.Response:
            return { status: 'finish', body: String(event.body) }
          default:
            return {
              status: 'error', body: `Unhandle event: ${event.type}`
            }
        }
      })
    )
  }
}
