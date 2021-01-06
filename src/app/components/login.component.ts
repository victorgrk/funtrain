import { Component } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthentificationService } from '../core/services/Authentification.service';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Connexion</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="imgcontainer">
        <img
          src="assets/images/img_avatar.webp"
          width="128"
          height="128"
          alt="Avatar"
          class="avatar"
        />
      </div>
      <div class="form-group">
        <label for="identifant">Identifant</label>
        <input
          id="identifant"
          class="form-control"
          type="text"
          [(ngModel)]="username"
          />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          class="form-control"
          type="password"
          [(ngModel)]="password"
        />
      </div>
      <p>En cas d'oubli de mot de passe, merci de contacter l'administrateur</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" [disabled]="invalid" (click)="login()">Se Connecter</button>
    </div>
  `
})
export class LoginComponent {
  username = ''
  password = ''

  constructor(public bsModalRef: BsModalRef, private $auth: AuthentificationService) { }

  login() {
    this.$auth.login({ username: this.username, password: this.password }).then(() => this.bsModalRef.hide())
  }

  get invalid() {
    return this.username.length < 3 && this.password.length < 3
  }
}