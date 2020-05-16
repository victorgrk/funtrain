import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from 'src/app/services/API.service';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

  @ViewChild('closeModal') modal: ElementRef<HTMLElement>;


  softwares: any[] = [];
  softwareSubscription: Subscription;

  faqs: any[] = [];
  faqSubscription: Subscription;
  postSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;
  currentId;
  softFilter = 'all';

  fg: FormGroup;

  constructor(
    private $api: APIService,
    private readonly $authentification: AuthentificationService,
    private $formBuilder: FormBuilder,
    private $toastr: ToastrService
  ) { }
  ngOnInit() {
    this.softwareSubscription = this.$api.get<any[]>('softwares').subscribe(
      e => {
        this.softwares = e;
      },  error => {
        switch (error.status) {
          case 404:
            this.$toastr.error('La ressource demandée est introuvable');
            break;
          case 500:
            this.$toastr.error('Une erreur est survenue sur le serveur, merci de rééssayer plus tard');
            break;
          case 401:
            this.$toastr.error('Vous n\'avez pas les permissions pour éditer ces informations');
            break;
          default:
            this.$toastr.error('Une erreur inconnue est survenue, si l\'erreur persiste, merci de contacter l\'administrateur de ce site');
            break;
        }
      }
    );
    this.faqSubscription = this.$api.get<any[]>('faq').subscribe(
      e => {
        this.faqs = e;
      },  error => {
        switch (error.status) {
          case 404:
            this.$toastr.error('La ressource demandée est introuvable');
            break;
          case 500:
            this.$toastr.error('Une erreur est survenue sur le serveur, merci de rééssayer plus tard');
            break;
          case 401:
            this.$toastr.error('Vous n\'avez pas les permissions pour éditer ces informations');
            break;
          default:
            this.$toastr.error('Une erreur inconnue est survenue, si l\'erreur persiste, merci de contacter l\'administrateur de ce site');
            break;
        }
      }
    );
    if (this.hasPermissionToEdit()) {
      this.initForm();
    }
  }
  ngOnDestroy() {
    this.softwareSubscription.unsubscribe();
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.putSubscription) {
      this.putSubscription.unsubscribe();
    }
  }
  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit('faq');
  }
  initForm() {
    this.fg = this.$formBuilder.group({
      question: ['', Validators.required],
      answer: [0, Validators.required],
      softID: [0, Validators.required]
    });
  }
  onSubmit() {
    const value = this.fg.value;
    if (!this.currentId) {
      this.postSubscription = this.$api.post<any>('faq', value).subscribe(e => {
        value.id = e.insertId;
        this.faqs.push(value);
        this.fg.reset();
        this.modal.nativeElement.click();
      },  error => {
        switch (error.status) {
          case 404:
            this.$toastr.error('La ressource demandée est introuvable');
            break;
          case 500:
            this.$toastr.error('Une erreur est survenue sur le serveur, merci de rééssayer plus tard');
            break;
          case 401:
            this.$toastr.error('Vous n\'avez pas les permissions pour éditer ces informations');
            break;
          default:
            this.$toastr.error('Une erreur inconnue est survenue, si l\'erreur persiste, merci de contacter l\'administrateur de ce site');
            break;
        }
      });
    }
    if (this.currentId) {
      value.id = this.currentId;
      this.putSubscription = this.$api.put<any>('faq', value).subscribe(e => {
        const index = this.faqs.findIndex(old => old.id === this.currentId);
        this.faqs[index] = value;
        delete this.currentId;
        this.modal.nativeElement.click();
        this.fg.reset();
      },  error => {
        switch (error.status) {
          case 404:
            this.$toastr.error('La ressource demandée est introuvable');
            break;
          case 500:
            this.$toastr.error('Une erreur est survenue sur le serveur, merci de rééssayer plus tard');
            break;
          case 401:
            this.$toastr.error('Vous n\'avez pas les permissions pour éditer ces informations');
            break;
          default:
            this.$toastr.error('Une erreur inconnue est survenue, si l\'erreur persiste, merci de contacter l\'administrateur de ce site');
            break;
        }
      });

    }
  }
  setUpdateAction(l: any) {
    this.currentId = l.id;
    this.fg.setValue({
      question: l.question,
      answer: l.answer,
      softId: l.softId
    });
  }
  setAddAction() {
    delete this.currentId;
    this.fg.reset();
  }

  onDelete(l: any) {
    if (!this.hasPermissionToEdit()) { return; }
    if (!confirm('Voulez-vous supprimer cet élément ?')) { return; }
    this.deleteSubscription = this.$api.delete('faq', l.id).subscribe(() => {
      const id = this.faqs.findIndex(old => old.id === l.id);
      this.faqs.splice(id, 1);
    },  error => {
      switch (error.status) {
        case 404:
          this.$toastr.error('La ressource demandée est introuvable');
          break;
        case 500:
          this.$toastr.error('Une erreur est survenue sur le serveur, merci de rééssayer plus tard');
          break;
        case 401:
          this.$toastr.error('Vous n\'avez pas les permissions pour éditer ces informations');
          break;
        default:
          this.$toastr.error('Une erreur inconnue est survenue, si l\'erreur persiste, merci de contacter l\'administrateur de ce site');
          break;
      }
    });
  }

}
