import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { APIService } from 'src/app/services/API.service';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit, OnDestroy {


  @ViewChild('closeModal') $closeForm: ElementRef<HTMLElement>;

  lines: any[] = [];
  lineSubscription: Subscription;
  postSubscription: Subscription;

  currentPage = 1;
  softFilter = 'all';
  search = '';
  region;

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
    private $router: Router,
    private $route: ActivatedRoute,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.$route.params.forEach(e => { this.region = e.region; });
    this.softwareSubscription = this.$api.get<any[]>('softwares').subscribe(
      e => this.softwares = e, error => {
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
    this.lineSubscription = this.$api.get<any[]>('lines').subscribe(
      e => this.lines = e, error => {
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
      e => this.authors = e, error => {
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
    if (this.hasPermissionToEdit()) { this.initForm(); }
  }
  ngOnDestroy() {
    if (this.lineSubscription) {
      this.lineSubscription.unsubscribe();
    }
    if (this.softwareSubscription) {
      this.softwareSubscription.unsubscribe();
    }
    if (this.authorsSubscription) {
      this.authorsSubscription.unsubscribe();
    }
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit('lines');
  }
  initForm() {
    this.fg = new FormGroup({
      nom: new FormControl('', Validators.required),
      version: new FormControl(0, Validators.required),
      description: new FormControl(''),
      softID: new FormControl(0, Validators.required),
      author: new FormControl(0, Validators.required),
      regions: new FormControl('', Validators.required),
      images: new FormArray([]),
      files: new FormArray([])
    });
  }

  getFormArray(field: string) {
    return (this.fg.controls[field]) as FormArray
  }
  add(field: string) {
    this.getFormArray(field).controls.push(new FormControl(''))
  }
  remove(field: string, index: number) {
    this.getFormArray(field).controls.splice(index, 1)
  }

  onSubmit() {
    const values = this.fg.value;
    this.postSubscription = this.$api.post<any>('lines', values).subscribe((e) => {
      this.$toastr.success('La ligne a été créée avec succès');
      this.$closeForm.nativeElement.click();
      this.lines.push(e);

    }, error => {
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

  range(): number[] {
    const buffer = this.lines.filter(e => {
      return (this.softFilter === 'all' ||
        e.softID === this.softFilter) &&
        (this.search === '' ||
          e.nom.toUpperCase().indexOf(this.search.toUpperCase()) !== -1) &&
        this.region === 'all' ||
        e.region.indexOf(this.region) !== -1;
    });
    return Array.from(Array(Math.ceil(buffer.length / 9)), (x, i) => i + 1);
  }
  showline(lineId: number) {
    this.$router.navigateByUrl(`/line/${lineId}`);
  }

  isFormInvalid() {
    return this.fg.invalid;
  }
}
