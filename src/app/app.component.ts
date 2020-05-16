import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { APIService } from "./services/API.service";
import { AuthentificationService } from "./services/Authentification.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private mentionsSubscription: Subscription;
  @ViewChild("closeModal") closeModal: ElementRef<HTMLElement>;
  mentions: string;

  @ViewChild("closeForm") closeForm: ElementRef<HTMLElement>;
  textMentionForm: FormGroup;
  private textMentionsSubscription: Subscription;

  loginForm: FormGroup;
  show = false;
  isLogged(): boolean {
    return this.$authentification.isLogged();
  }
  login() {
    this.$authentification
      .login(this.loginForm.value)
      .then(() => {
        delete this.loginForm;
        this.$toastr.success("Vous êtes maintenant connecté !");
        this.closeModal.nativeElement.click();
      })
      .catch(error => {
        switch (error.status) {
          case 404:
            this.$toastr.error("La ressource demandée est introuvable");
            break;
          case 500:
            this.$toastr.error(
              "Une erreur est survenue sur le serveur, merci de rééssayer plus tard"
            );
            break;
          case 403:
            this.$toastr.error(
              "Vous n'avez pas les permissions pour éditer ces informations"
            );
            break;
          case 401:
            this.$toastr.error("Identifiants incorrects, merci de réésayer");
            break;
          default:
            this.$toastr.error(
              "Une erreur inconnue est survenue, si l'erreur persiste, merci de contacter l'administrateur de ce site"
            );
            break;
        }
      });
  }
  disconnect() {
    this.$authentification.logout();
    if (!this.loginForm) {
      this.loginForm = this.$formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
      });
    }
  }
  cookie(): boolean {
    return Boolean(localStorage.getItem("cookie"));
  }
  acceptCookie() {
    localStorage.setItem("cookie", "true");
  }

  constructor(
    private $api: APIService,
    private $authentification: AuthentificationService,
    private $formBuilder: FormBuilder,
    private $toastr: ToastrService
  ) {}
  ngOnInit() {
    this.mentionsSubscription = this.$api
      .get<string>("texts/mentions")
      .subscribe(
        e => (this.mentions = e),
        error => {
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
    if (!this.$authentification.isLogged()) {
      this.loginForm = this.$formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
      });
    }
    this.initTextMentionForm();
  }
  ngOnDestroy() {
    this.mentionsSubscription.unsubscribe();
    if (this.textMentionsSubscription) {
      this.textMentionsSubscription.unsubscribe();
    }
  }
  hasPermissionToEdit(): boolean {
    return this.$authentification.hasPermissionToEdit("administration");
  }
  initTextMentionForm() {
    if (!this.$authentification.hasPermissionToEdit("administration")) {
      return;
    }
    this.textMentionForm = this.$formBuilder.group({
      mentionsText: ["", Validators.required]
    });
  }
  setTextMentionValue(val) {
    this.textMentionForm.setValue({
      mentionsText: val
    });
  }
  onMentionTextSubmit() {
    const value = {
      text: this.textMentionForm.value.mentionsText,
      location: "mentions"
    };
    this.textMentionsSubscription = this.$api
      .put<any>("texts", value)
      .subscribe(
        e => {
          this.mentions = this.textMentionForm.value.mentionsText;
          this.$toastr.success("Le texte des mentions a bien été modifié");
          this.closeForm.nativeElement.click();
        },
        error => {
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
}
