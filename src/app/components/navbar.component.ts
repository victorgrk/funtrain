import { Component } from "@angular/core"
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-md bg-dark navbar-dark text-light">
    <a href="javascript:;" class="navbar-brand" (click)="navigate('/')">
      <img
        src="assets/images/logotype-Texte.svg"
        class="d-inline-block align-top"
        alt=""
      />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="d-flex justify-content-start">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="javascript:void(0)" (click)="navigate('/')" class="nav-link"
            >Accueil</a
          >
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" class="nav-link" (click)="navigate('/lines/list/all')"
            >Voir les lignes</a
          >
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" class="nav-link" (click)="navigate('/addons/list')"
            >Voir les extensions</a
          >
        </li>
        <li class="nav-item">
          <a href="javascript:void(0)" class="nav-link" (click)="navigate('/faq')"
            >Foires aux questions</a
          >
        </li>
      </ul></div>
    </div>
  </nav>`,
  styles: [`
    .navbar-brand { 
      width: 35%;
    }
    @media screen and (max-width: 768px) {
      .navbar-brand {
        width: 260px !important;
      }
    }
    @media screen and (max-width: 365px) {
      .navbar-brand {
        width: 220px !important;
      }
    }
  `]
})
export class NavbarComponent {
  constructor(private $router: Router) { }
  navigate(location: string) {
    this.$router.navigateByUrl(location)
  }
}