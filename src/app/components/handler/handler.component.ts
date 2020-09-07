import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/API.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/Authentification.service';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-handler",
  templateUrl: "./handler.component.html",
  styleUrls: ["./handler.component.css"],
})
export class HandlerComponent implements OnInit, OnDestroy {
  pubSubscription: Subscription;
  pub: any;

  handler: any;
  handlerSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;

  softwares: any[];
  softwareSubscription: Subscription;

  id: string;

  fg: FormGroup;
  files;
  images;

  @ViewChild("closeModal") $closeForm: ElementRef<HTMLElement>;
  @ViewChild("closeForm") closeForm: ElementRef<HTMLElement>;
  textForm: FormGroup;
  private textSubscription: Subscription;

  constructor(
    private $api: APIService,
    private $authentification: AuthentificationService,
    private $route: ActivatedRoute,
    private $router: Router,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.$route.params.forEach((e) => {
      this.id = e.id;
    });
    this.handlerSubscription = this.$api
      .get<any>(`handlers/${this.id}`)
      .subscribe(
        (e) => {
          this.handler = e;
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
    this.pubSubscription = this.$api.get<any>("texts/pubAddon").subscribe(
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
    if (this.hasPermissionToEdit()) {
      this.initForm();
      this.initTextForm();
    }
  }
  getDownloadLocation(link: string) {
    return link.substring(link.lastIndexOf("/") + 1, link.length);
  }
  ngOnDestroy() {
    this.handlerSubscription.unsubscribe();
    this.pubSubscription.unsubscribe();
    this.softwareSubscription.unsubscribe();
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
    values.id = this.id;
    this.putSubscription = this.$api.put<any>("handlers", values).subscribe(
      (e) => {
        this.$toastr.success("L'addon a bien été modifié");
        this.handler = e;
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

  onFileSelect(event, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      if (type === "images") {
        this.images = file;
      } else {
        this.files = file;
      }
    }
  }

  onDelete() {
    if (!this.hasPermissionToEdit()) {
      return;
    }
    if (!confirm("Voulez-vous supprimer cet élément ?")) {
      return;
    }
    this.deleteSubscription = this.$api
      .delete("handlers", this.handler.id)
      .subscribe(
        (e) => {
          this.$toastr.success("L'addon a bien été supprimé");
          this.$router.navigateByUrl("/handlers");
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
    this.fg.setValue(this.handler);
    this.handler.images.forEach(element => {
      this.getFormArray('images').controls.push(new FormControl(element))
    });
    this.handler.files.forEach(element => {
      this.getFormArray('files').controls.push(new FormControl(element))
    });
  }

  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit("handlers");
  }

  initTextForm() {
    if (!this.$authentification.hasPermissionToEdit("administration")) {
      return;
    }
    this.textForm = new FormGroup({
      text: new FormControl("", Validators.required),
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
      location: "pubAddon",
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
