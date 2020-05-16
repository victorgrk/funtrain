import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { APIService } from "src/app/services/API.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  datas: any[] = [];
  id: number = null;

  getSubscription: Subscription;
  postSubscription: Subscription;
  putSubscription: Subscription;
  deleteSubscription: Subscription;

  private type = "users";

  constructor(
    private $api: APIService,
    private $formBuilder: FormBuilder,
    private $toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSubscription = this.$api
      .get<any[]>(this.type)
      .subscribe(e => (this.datas = e));

    this.formGroup = this.$formBuilder.group({
      uname: ["", Validators.required],
      psw: [""],
      permissions: this.$formBuilder.group({
        line: 0,
        handler: 0,
        faq: 0,
        administration: 0
      })
    });
  }

  setUpdateAction(user) {
    this.id = user.id;
    const permissions = JSON.parse(user.permission);
    this.formGroup.setValue({
      uname: user.username || "",
      psw: "",
      permissions: {
        line: permissions.lines ? 1 : 0,
        handler: permissions.handlers ? 1 : 0,
        faq: permissions.faq ? 1 : 0,
        administration: permissions.administration ? 1 : 0
      }
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
          this.$toastr.success("Utilisateur ajouté");
          const buffer = {
            id: e.insertId,
            username: values.uname
          };
          this.datas.push(buffer);
          this.datas = this.datas.sort((a, b) => {
            if (a.username < b.username) {
              return -1;
            }
            if (a.usermane > b.username) {
              return 1;
            }
            return 0;
          });
          this.formGroup.reset();
        },
        e =>
          this.$toastr.error(
            "Vous n'avez pas les permissions pour ajouter un utilisateur"
          )
      );
    } else {
      const buffer = this.formGroup.value;
      buffer.id = this.id;
      buffer.username = buffer.uname;
      this.putSubscription = this.$api.put<any>(this.type, buffer).subscribe(
        e => {
          this.$toastr.success("Utilisateur modifié");
          this.datas[
            this.datas.findIndex(data => data.id === this.id)
          ] = buffer;
          this.datas = this.datas.sort((a, b) => {
            if (a.uname < b.uname) {
              return -1;
            }
            if (a.uname > b.uname) {
              return 1;
            }
            return 0;
          });
          delete this.id;
          this.formGroup.reset();
        },
        e =>
          this.$toastr.error(
            "Vous n'avez pas les permissions pour modifier un utilisateur"
          )
      );
    }
  }

  onDelete(id) {
    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) {
      return;
    }
    this.deleteSubscription = this.$api.delete<any>(this.type, id).subscribe(
      e => {
        this.datas.splice(id, 1);
        this.$toastr.success("Utilisateur supprimé !");
      },
      e =>
        this.$toastr.error(
          "Vous n'avez pas les permissions pour supprimer un utilisateur"
        )
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
