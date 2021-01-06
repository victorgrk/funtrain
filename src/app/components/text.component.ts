import { Component, OnInit, Input } from '@angular/core'
import { AuthentificationService } from 'src/app/core/services/Authentification.service'
import { APIService } from 'src/app/core/services/API.service'
import { Observable } from 'rxjs'
import { startWith, tap } from 'rxjs/operators'
import { ToastrService } from '../core/services/toastr.service'

declare var window: any;
declare var adsbygoogle: any;

@Component({
  selector: 'app-text',
  template: `
    <div *ngIf="!isInEditorMode" class="relative">
      <button
        class="settings-button"
        (click)="isInEditorMode = !isInEditorMode"
        *ngIf="isAuth()"
      >
        <i class="fas fa-wrench"></i>
      </button>
      <div [innerHTML]="text$ | async | html"></div>
    </div>
    <div *ngIf="isInEditorMode">
      <textarea [(ngModel)]="copyText" class="form-control"></textarea>
      <div class="d-flex justify-content-end">
        <button
          class="mx-2 mt-3 btn btn-secondary"
          (click)="dismiss()"
          aria-label="Fermer"
        >
          Annuler
        </button>
        <button
          class="mt-3 btn btn-primary"
          type="submit"
          [disabled]="copyText === ''"
          (click)="onSubmit()"
        >
          Mettre à jour
        </button>
      </div>
    </div>
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
  isInEditorMode = false
  copyText = ``

  text$: Observable<string>

  isAuth() {
    return this.$auth.hasPermissionToEdit('administration')
  }

  constructor(
    private $api: APIService,
    private $auth: AuthentificationService,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.text$ = this.$api.get<string>(`texts/${this.location}`).pipe(
      startWith(''),
      tap((e: string) => this.copyText = e),
      tap((e: string) => {
        if (e.includes(
          `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`)) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      })
    )
  }
  onSubmit() {
    this.text$ = this.$api.put<string>(`texts`, { location: this.location, text: this.copyText }).pipe(
      startWith(''),
      tap((e: string) => this.copyText = e.split('<br/>').join('\n')),
      tap((e: string) => {
        this.isInEditorMode = false
        if (e.includes(
          `<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>`)) {
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
        this.$toastr.success('Le texte a bien été modifié', 'Texte modifié')
      })
    )
  }
  dismiss() {
    this.isInEditorMode = !this.isInEditorMode
  }
}
