import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { AuthentificationService } from 'src/app/core/services/Authentification.service'
import { APIService } from 'src/app/core/services/API.service'
import { Subscription } from 'rxjs'

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
      <div [innerHTML]="text | html"></div>
    </div>
    <div *ngIf="isInEditorMode">
      <textarea [(ngModel)]="copyText"></textarea>
      <div class="d-flex justify-content-end">
        <button
          class="mx-2 mt-3"
          color="warn"
          mat-raised-button
          (click)="dismiss()"
          aria-label="Fermer"
        >
          Annuler
        </button>
        <button
          class="mt-3"
          mat-raised-button
          type="submit"
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
        width: 24px;
        height: 24px;
        top: 0;
        color: #000;
        border-radius: 25%;
        opacity: 1;
      }
      .relative {
        position: relative;
      }
    `,
  ],
})
export class TextComponent implements OnInit {
  @Input() private location: string
  isInEditorMode = false
  text = ``
  copyText = ``

  isAuth() {
    return this.$auth.hasPermissionToEdit('administration')
  }

  constructor(
    private $api: APIService,
    private $auth: AuthentificationService
  ) { }

  ngOnInit() {
    this.$api.get<any>(`texts/${this.location}`).subscribe((e) => {
      this.text = e?.text
      this.copyText = this.text
    })
  }
  onSubmit() {
    this.$api
      .put('texts', { location: this.location, text: this.copyText })
      .subscribe((e: any) => {
        this.text = e.text
        this.copyText = e.text.split('<br/>').join('\n')
        this.isInEditorMode = false
      })
  }
  dismiss() {
    this.isInEditorMode = !this.isInEditorMode
    this.text = this.copyText
  }
}
