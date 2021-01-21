import { Component } from "@angular/core"
import { AuthentificationService } from '../core/services/Authentification.service'
import { BsModalService } from 'ngx-bootstrap/modal'
import { LoginComponent } from './login.component'
import { LegalComponent } from './legal.component'
import { CookieComponent } from './cookies.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-footer',
  template: `
    <div
    class="alert hopla cookie alert-dismissible text-center"
    *ngIf="!cookie()"
    role="alert"
  >
    <div class="cookiealert-container">
      <b>Ce site utilise des cookies</b>
      Pour en savoir plus, n'hésitez pas à cliquer
      <a href="javascript:void(0)" (click)="openModal('cookies')"
        >ici</a
      >.
      <button
        type="button"
        class="btn btn-primary btn-sm"
        (click)="acceptCookie()"
        aria-label="Close"
      >
        Je suis d'accord
      </button>
    </div>
  </div>
  <div
    class="footer bg-dark text-light d-flex flex-wrap justify-content-around"
  >
    <a
      href="javascript:void(0)"
      (click)="openModal('login')"
      *ngIf="!isLogged()"
      >Login</a
    >
    <a href="javascript:void(0)" (click)="goTo('/administration')" *ngIf="isLogged()"
      >Administration</a
    >
    <a href="javascript:void(0)" (click)="disconnect()" *ngIf="isLogged()"
      >Se déconnecter</a
    >
    <a href="javascript:void(0)" (click)="goTo('/links')">Sites partenaires</a>
    <a href="javascript:void(0)" (click)="goTo('/addons/list')">Addons de simulateur</a>
    <a href="javascript:void(0)" (click)="openModal('terms')">Mentions légales</a>
    <a href="javascript:void(0)" (click)="goTo('/contact')">Contact</a>
  </div>
`,
  styles: [`
  .cookie {
    color: whitesmoke !important;
    margin-bottom: 0 !important;
  }
  `],
})
export class FooterComponent {
  constructor(
    private $auth: AuthentificationService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  isLogged() {
    return this.$auth.isLogged()
  }
  disconnect() {
    return this.$auth.logout()
  }
  openModal(name: 'login' | 'terms' | 'cookies') {
    switch (name) {
      case 'login':
        this.modalService.show(LoginComponent)
        break
      case 'terms':
        this.modalService.show(LegalComponent)
        break
      case 'cookies':
        this.modalService.show(CookieComponent)
        break
      default:
        break
    }
  }
  cookie(): boolean {
    return Boolean(localStorage.getItem("cookie"));
  }
  acceptCookie() {
    localStorage.setItem("cookie", "true");
  }
  goTo(url: string) {
    this.router.navigate([url])
  }
}