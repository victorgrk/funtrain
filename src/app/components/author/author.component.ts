import { Component, OnInit, OnDestroy } from "@angular/core";
import { APIService } from "src/app/services/API.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"]
})
export class AuthorComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  datas: any[] = [];
  id: number = null;

  getSubscription: Subscription;
  postSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;

  private type = "authors";

  constructor(
    private $api: APIService,
    private $formBuilder: FormBuilder,
    private $toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSubscription = this.$api.get<any[]>(this.type).subscribe(
      e => (this.datas = e),
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
    const reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

    this.formGroup = this.$formBuilder.group({
      nom: ["", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      web: ["", Validators.pattern(reg)]
    });
  }

  setUpdateAction(author) {
    this.id = author.id;
    this.formGroup.setValue({
      nom: author.nom,
      mail: author.mail,
      web: author.web || ""
    });
  }
  setAddAction() {
    delete this.id;
    this.formGroup.reset();
  }
  onSubmit() {
    const values = this.formGroup.value;
    if (!this.id) {
      this.postSubscription = this.$api.post<any>(this.type, values).subscribe(
        e => {
          const buffer = {
            id: e.insertId,
            nom: values.nom,
            mail: values.mail,
            web: values.web
          };
          this.datas.push(buffer);
          this.datas = this.datas.sort((a, b) => {
            if (a.nom < b.nom) {
              return -1;
            }
            if (a.nom > b.nom) {
              return 1;
            }
            return 0;
          });
          this.$toastr.success("Auteur ajouté !");
          this.formGroup.reset();
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
    } else {
      const buffer = {
        id: this.id,
        nom: values.nom,
        mail: values.mail,
        web: values.web
      };
      this.putSubscription = this.$api.put<any>(this.type, buffer).subscribe(
        e => {
          this.datas[
            this.datas.findIndex(data => data.id === this.id)
          ] = buffer;
          this.datas = this.datas.sort((a, b) => {
            if (a.nom < b.nom) {
              return -1;
            }
            if (a.nom > b.nom) {
              return 1;
            }
            return 0;
          });
          this.$toastr.success("Auteur modifié !");
          delete this.id;
          this.formGroup.reset();
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

  onDelete(id) {
    if (!confirm("Voulez-vous supprimer cet élément ?")) {
      return;
    }
    this.deleteSubscription = this.$api.delete<any>(this.type, id).subscribe(
      e => {
        this.datas.splice(id, 1);
        this.$toastr.success("Auteur supprimé !");
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
}
