import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private userDatas: any;
  private token;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {}

  login(value: any) {
    return new Promise((resolve, reject) => {
        this.httpClient.post(environment.apiUrl + 'users/', value).subscribe(
          (response: any) => {
            localStorage.setItem('token', response.token);
            this.userDatas = response.userData[0];
            localStorage.setItem('user-data', JSON.stringify(this.userDatas));
            resolve();
        }, error => {
          this.logout();
          reject();
        });
    });
  }
 public logout(): void {
    delete this.userDatas;
    window.localStorage.removeItem('user-data');
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  public isLogged() {
    return this.getToken() !== null && this.getToken() !== '';
  }

  public hasPermissionToEdit(field: string) {
    if(!localStorage.getItem('user-data') || !this.getToken() || this.getToken() === '' ) {
      return false;
    }
    if(!this.userDatas) {
      this.userDatas = JSON.parse(localStorage.getItem('user-data'));
    }
    return (this.isLogged() && JSON.parse(this.userDatas.permission)[field]) ||
            JSON.parse(this.userDatas.permission).administration;
  }
}
