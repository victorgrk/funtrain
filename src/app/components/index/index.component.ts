import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/API.service';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {


  private regions = [
    {r: 219, g: 219, b: 247, code: 'haut-de-france', name: 'Haut de France'},
    { r: 244, g: 176, b: 186, code: 'ile-de-france', name: 'Île de France'},
    { r: 243, g: 217, b: 197, code: 'normandie', name: 'Normandie'},
    { r: 177, g: 231, b: 205, code: 'grand-est', name: 'Grand Est'},
    { r: 180, g: 226, b: 226, code: 'bretagne', name: 'Bretagne'},
    { r: 250, g: 240, b: 246, code: 'pays-de-la-loire', name: 'Pays de la Loire'},
    { r: 223, g: 195, b: 221, code: 'centre-val-de-loire', name: 'Centre Val de Loire'},
    { r: 255, g: 247, b: 203, code: 'bourgogne-franche-comte', name: 'Bourgogne Franche-Comté'},
    { r: 248, g: 204, b: 197, code: 'auvergne-rhone-alpes', name: 'Auvergne Rhônes-Alpes'},
    { r: 189, g: 208, b: 242, code: 'nouvelle-aquitaine', name: 'Nouvelle Aquitaine'},
    { r: 248, g: 222, b: 141, code: 'paca', name: 'Provence Alpes Côte d\'Azur'},
    { r: 231, g: 231, b: 180, code: 'occitanie', name: 'Occitanie'},
    { r: 248, g: 212, b: 151, code: 'corse', name: 'Corse'}, //
    {r: 236, g: 236, b: 236, code: 'autres', name: 'Lignes étrangères/imaginaires'},
    { r: 206, g: 178, b: 182, code: 'autres', name: 'Lignes étrangères/imaginaires'}
  ];

  private seuil = 2;

  text = '';
  pub = '';
  target: any = {
    code: 'all',
    name: 'Survolez la carte pour trier par régions'
  };

  @ViewChild('map')map: ElementRef;

  @ViewChild('closeForm') closeForm: ElementRef<HTMLElement>;
  textForm: FormGroup;
  private textSubscription: Subscription;
  private textid: string;

  private indexSubscription: Subscription;
  private pubSubscription: Subscription;

  constructor(
    private $api: APIService,
    private $authentification: AuthentificationService,
    private $router: Router,
    private $toastr: ToastrService,
    private $fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initTextForm();
    this.indexSubscription = this.$api.get<string>('texts/general').subscribe(
      e => {
        this.text = e;
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
    this.pubSubscription = this.$api.get<string>('texts/pub1').subscribe(
      e => {
        this.pub = e;
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
  }
  isLogged() {
    return this.$authentification.isLogged();
  }
  ngOnDestroy() {
    this.indexSubscription.unsubscribe();
    this.pubSubscription.unsubscribe();
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
   }
   mapClick() {
     if (this.target) {
        this.$router.navigateByUrl(`lines/${this.target.code}`);
     }
   }

  setTargetBlank() {
    this.target.name = 'Survolez la carte pour trier par régions';
  }
  setTarget(e) {
    const canvas = document.createElement('canvas');
    canvas.width = this.map.nativeElement.width;
    canvas.height = this.map.nativeElement.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.map.nativeElement, 0, 0, this.map.nativeElement.width, this.map.nativeElement.height);
    const pixelColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    this.regions.forEach(region => {
      const dr = Math.abs(region.r - pixelColor[0]);
      const dg = Math.abs(region.g - pixelColor[1]);
      const db = Math.abs(region.b - pixelColor[2]);
      if (dr < this.seuil && db < this.seuil && dg < this.seuil) {
        this.target = region;
      }
    });
  }
  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit('administration');
  }
  initTextForm() {
    if (!this.hasPermissionToEdit()) {
      return;
    }
    this.textForm = this.$fb.group({
      text: ['', Validators.required]
    });
  }
  setTextValue(val, location) {
    this.textForm.setValue({
      text: val
    });
    this.textid = location;
  }
  onTextSubmit() {
    const value = {
      text: this.textForm.value.text,
      location: this.textid
    };
    this.textSubscription = this.$api.put<any>('texts', value).subscribe(e => {
      this.$toastr.success('Le texte a bien été modifié');
      this.closeForm.nativeElement.click();
      if (value.location === 'general') {
        this.text = value.text;
      } else if (value.location === 'pub1') {
        this.pub = value.text;
      }
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
