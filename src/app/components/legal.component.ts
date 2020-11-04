import { Component } from "@angular/core";
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  template: `
      <div class="modal-header">
      <h4 class="modal-title pull-left">Mentions légales Funtrain.net</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <app-text location="mentions"></app-text>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Fermer</button>
    </div>`
})
export class LegalComponent {
  constructor(public bsModalRef: BsModalRef) { }
}