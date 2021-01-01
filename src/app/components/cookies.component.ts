import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: `
      <div class="modal-header">
      <h4 class="modal-title pull-left">Utilisation des cookies</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
      <div class="modal-body text-justify">
        <p>
          Ce site utilise des cookies (fichier de taille limité, généralement
          constitué de lettres et de chiffres, envoyé par le serveur internet au
          fichier cookie du navigateur situé sur le disque dur de votre
          ordinateur) afin de permettre ou de faciliter la navigation et de
          sauvegarder les préférences de navigation sur le site internet, de
          réaliser des statistiques de visites et d’interaction avec le site.
          Par ailleurs, les fonctionnalités liées aux icônes dédiées aux réseaux
          sociaux figurant sur le site internet de funtrain.net utilisent des
          cookies tiers destinés à améliorer l’interactivité du site qui sont
          directement déposés par ces services. De même, la régie publicitaire
          de Google utilise des cookies afin de proposer des publicités
          adaptées.
        </p>
        <p>
          Les cookies d'amélioration de publicité peuvent étre désactivés ici:
          <a href="https://adssettings.google.fr/authenticated"
            >Google AdSense Settings</a
          >
        </p>
      </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Fermer</button>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookieComponent {
  constructor(public bsModalRef: BsModalRef) { }
}