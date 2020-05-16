import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from 'src/app/services/API.service';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit, OnDestroy {

  @ViewChild('closeModal') modal: ElementRef<HTMLElement>;

  getSubscription: Subscription;
  postSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;
  links: any[] = [];
  currentId;

  fg: FormGroup;
  constructor(
    private $api: APIService,
    private $authenfication: AuthentificationService,
    private $fb: FormBuilder,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getSubscription = this.$api.get<any[]>('links').subscribe(
      e => this.links = e, error => {
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
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.putSubscription) {
      this.putSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  hasPermissionToEdit(): boolean {
    return this.$authenfication.hasPermissionToEdit('administration');
  }

  initForm() {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.fg = this.$fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(reg)]]
    });
  }
  setUpdateAction(l: any) {
    this.currentId = l.id;
    this.fg.setValue({
      title: l.title,
      description: l.description,
      link: l.links
    });
  }
  setAddAction() {
    delete this.currentId;
    this.fg.reset();
  }
  onSubmit() {
    if (!this.currentId) {
      const value = this.fg.value;
      this.postSubscription = this.$api.post<any>('links', value).subscribe(e => {
        this.links.push({
          id: e.insertId,
          title: this.fg.value.title,
          description: this.fg.value.description,
          links: this.fg.value.link,
        });
        this.links = this.links.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
      });
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
      const value = this.fg.value;
      value.id = this.currentId;
      this.putSubscription = this.$api.put<any>('links', value).subscribe(e => {
        const id = this.links.findIndex(old => old.id === this.currentId);
        this.links[id] = value;
        this.links = this.links.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
      });
        delete this.currentId;
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
  }
  onDelete(l: any) {
    if (!this.hasPermissionToEdit()) { return; }
    if (!confirm('Voulez-vous supprimer cet élément ?')) { return; }
    this.deleteSubscription = this.$api.delete('links', l.id).subscribe(() => {
      const id = this.links.findIndex(e => l.id === e.id);
      this.links.splice(id, 1);
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
