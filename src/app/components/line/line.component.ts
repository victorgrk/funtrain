import {
  OnInit,
  OnDestroy,
  Component,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { APIService } from "src/app/services/API.service";
import { AuthentificationService } from "src/app/services/Authentification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"],
})
export class LineComponent implements OnInit, OnDestroy {
  pubSubscription: Subscription;
  pub: any;

  line: any = {};
  lineSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;

  softwares: any[];
  softwareSubscription: Subscription;

  authors: any[];
  authorSubscription: Subscription;

  id: string;

  fg: FormGroup;
  images;
  files;

  @ViewChild("closeModal") $closeForm: ElementRef<HTMLElement>;

  @ViewChild("closeForm") closeForm: ElementRef<HTMLElement>;
  textForm: FormGroup;
  private textSubscription: Subscription;

  constructor(
    private $api: APIService,
    private $authentification: AuthentificationService,
    private $route: ActivatedRoute,
    private $fb: FormBuilder,
    private $router: Router,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.$route.params.forEach((e) => {
      this.id = e.id;
    });
    this.initTextForm();
    this.lineSubscription = this.$api.get<any>(`lines/${this.id}`).subscribe(
      (e) => {
        this.line = e;
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
    this.pubSubscription = this.$api.get<any>("texts/pubLine").subscribe(
      (e) => {
        this.pub = e;
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
    this.softwareSubscription = this.$api.get<any[]>("softwares").subscribe(
      (e) => {
        this.softwares = e;
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
    this.authorSubscription = this.$api.get<any[]>("authors").subscribe(
      (e) => {
        this.authors = e;
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
    if (this.hasPermissionToEdit()) {
      this.initForm();
    }
  }
  ngOnDestroy() {
    this.lineSubscription.unsubscribe();
    this.pubSubscription.unsubscribe();
    this.softwareSubscription.unsubscribe();
    this.authorSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
    if (this.putSubscription) {
      this.putSubscription.unsubscribe();
    }
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
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
    values.id = this.id
    this.putSubscription = this.$api.put<any>("lines", values).subscribe(
      (e) => {
        this.line = e;
        this.$toastr.success("La ligne a été modifiée avec succès");
        this.$closeForm.nativeElement.click();
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
  }

  onDelete() {
    if (!this.hasPermissionToEdit()) {
      return;
    }
    if (!confirm("Voulez-vous supprimer cet élément ?")) {
      return;
    }
    this.deleteSubscription = this.$api.delete("lines", this.line.id).subscribe(
      (e) => {
        this.$toastr.success("La ligne a été suprimée avec succès");
        this.$router.navigateByUrl("/lines/all");
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
  }
  setUpdatedValues() {
    this.fg.setValue({
      nom: this.line.nom,
      version: this.line.version,
      description: this.line.description,
      region: this.line.region,
      softID: this.line.softID,
      author: this.line.author,
    });
    this.line.images.forEach(element => {
      this.getFormArray('images').controls.push(new FormControl(element))
    });
    this.line.files.forEach(element => {
      this.getFormArray('files').controls.push(new FormControl(element))
    });
  }

  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit("lines");
  }

  getDownloadLocation(link: string) {
    return link.substring(link.lastIndexOf("/") + 1, link.length);
  }
  getImage(image: string): string {
    return `${environment.apiUrl}images/lines/${this.normalizeString(
      this.line.nom.split("%20").join(" ")
    )}/${image}`;
  }

  normalizeString(s: string): string {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  initTextForm() {
    if (!this.$authentification.hasPermissionToEdit("administration")) {
      return;
    }
    this.textForm = this.$fb.group({
      text: ["", Validators.required],
    });
  }
  setTextValue(val) {
    this.textForm.setValue({
      text: val,
    });
  }
  onTextSubmit() {
    const value = {
      text: this.textForm.value.text,
      location: "pubLine",
    };
    this.textSubscription = this.$api.put<any>("texts", value).subscribe(
      (e) => {
        this.$toastr.success("Le texte a bien été modifié");
        this.closeForm.nativeElement.click();
        this.pub = value.text;
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 401:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      }
    );
  }
  isAdmin(): boolean {
    return this.$authentification.hasPermissionToEdit("administration");
  }
}
