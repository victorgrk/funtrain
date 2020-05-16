import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/API.service';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-handlers',
  templateUrl: './handlers.component.html',
  styleUrls: ['./handlers.component.css']
})
export class HandlersComponent implements OnInit, OnDestroy {

  @ViewChild('closeModal') $closeForm: ElementRef<HTMLElement>;

  handlers: any[] = [];
  handlerSubscription: Subscription;
  postSubscription: Subscription;

  currentPage = 1;
  softFilter = 'all';
  search = '';

  softwares: any[] = [];
  softwareSubscription: Subscription;

  authors: any[] = [];
  authorsSubscription: Subscription;

  fg: FormGroup;
  files;
  images;


  constructor(
    private $api: APIService,
    private readonly $authentification: AuthentificationService,
    private $formBuilder: FormBuilder,
    private $router: Router,
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
    this.handlerSubscription = this.$api.get<any[]>('handlers').subscribe(
      e => {
        this.handlers = e;
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
    this.authorsSubscription = this.$api.get<any[]>('authors').subscribe(
      e => {
        this.authors = e;
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
    this.handlerSubscription.unsubscribe();
    this.softwareSubscription.unsubscribe();
    this.authorsSubscription.unsubscribe();
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit('handlers');
  }
  initForm() {
    this.fg = this.$formBuilder.group({
      nom: ['', Validators.required],
      version: [0, Validators.required],
      description: [''],
      author: [0, Validators.required],
      softID: [0, Validators.required]
    });
  }
  onSubmit() {
    const values = this.fg.value;
    const formData = new FormData();
    formData.append('nom', values.nom);
    formData.append('version', String(values.version)),
    formData.append('description', values.description),
    formData.append('softID', String(values.description)),
    formData.append('author', String(values.author));
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.files.length; i++) {
      formData.append('fichiers[]', this.files[i], this.files[i].name);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.images.length; i++) {
      formData.append('fichiers[]', this.images[i], this.images[i].name);
    }
    this.postSubscription = this.$api.post<any>('handlers', formData).subscribe((e) => {
      this.handlers.push(e);
      this.$closeForm.nativeElement.click();
      this.$toastr.success('L\'addon a bien été créé');
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

  onFileSelect(event, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      if (type === 'images') {
        this.images = file;
      } else {
        this.files = file;
      }
    }
  }

  range(): number[] {
    let buffer = this.handlers;
    buffer = buffer.filter(e => {
      return this.softFilter === 'all' || e.softID === this.softFilter;
    });
    buffer = buffer.filter(e => {
      return this.search === '' || e.nom.toUpperCase().indexOf(this.search.toUpperCase()) !== -1;
    });
    return Array.from(Array(Math.ceil(buffer.length / 9)), (x, i) => i + 1);
  }


  showHandler(handlerId: number) {
    this.$router.navigateByUrl(`/addon/${handlerId}`);
  }
}
