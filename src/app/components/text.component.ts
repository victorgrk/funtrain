import { Component, OnInit, Input, TemplateRef } from '@angular/core'
import { AuthentificationService } from 'src/app/core/services/Authentification.service'
import { APIService } from 'src/app/core/services/API.service'
import { Observable } from 'rxjs'
import { startWith, take, tap } from 'rxjs/operators'
import { ToastrService } from '../core/services/toastr.service'
import { FormControl, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

declare var window: any;
declare var adsbygoogle: any;

@Component({
  selector: 'app-text',
  template: `
    <div class="relative">
      <button
        class="settings-button"
        (click)="openModal(updateModal)"
        *ngIf="isAuth()"
      >
        <i class="fas fa-wrench"></i>
      </button>
      <div [innerHTML]="text$ | async | html"></div>
    </div>
    <ng-template #updateModal>
      <div class="modal-header">
    <h4 class="modal-title pull-left">Modifier un texte</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="dismiss()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <textarea [formControl]="copyText" class="form-control"></textarea>
</div>
<div class="modal-footer">
      <div class="d-flex justify-content-end">
        <button
          class="mx-2 mt-3 btn btn-secondary"
          (click)="dismiss()"
          type="reset"
          aria-label="Fermer"
        >
          Annuler
        </button>
        <button
          class="mt-3 btn btn-primary"
          type="submit"
          [disabled]="copyText.disabled"
          (click)="onSubmit()"
        >
          Mettre à jour
        </button>
    </div></div>
    </ng-template>
  `,
  styles: [
    `
      .settings-button {
        position: absolute;
        right: -16px;
        top: 0;
        color: #000;
        border-radius: 25%;
        opacity: 1;
      }
      .relative {
        position: relative;
        width: 100%;
      }
    `,
  ],
})
export class TextComponent implements OnInit {
  @Input() private location: string
  copyText = new FormControl('', Validators.required)
  text$: Observable<string>

  isAuth() {
    return this.$auth.hasPermissionToEdit('administration')
  }

  constructor(
    private $api: APIService,
    private $auth: AuthentificationService,
    private $toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.text$ = this.$api.get<string>(`texts/${this.location}`).pipe(
      startWith(''),
      tap((e: string) => this.copyText.setValue(e)),
      tap((e: string) => {
        if (e.includes(
          `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`)) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      })
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.show(template, { id: 1, class: "z-10000", backdrop: true });
  }
  onSubmit() {
    this.text$ = this.$api.put<string>(`texts`, { location: this.location, text: this.copyText.value }).pipe(
      tap((e: string) => this.copyText.setValue(e.split('<br/>').join('\n'))),
      tap((e: string) => {
        this.dismiss()
        if (e.includes(
          `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`)) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      })
    )
    this.text$.pipe(take(1)).subscribe(() => {
      this.$toastr.success('Le texte a bien été modifié', 'Texte modifié')
    });
  }
  dismiss() {
    this.modalService.hide(1)
  }
}
