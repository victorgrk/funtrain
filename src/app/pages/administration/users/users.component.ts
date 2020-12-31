import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  fg: FormGroup;
  id: number = null;

  private type = "users";
  users$: Observable<any[]>;

  constructor(
    private $api: APIService,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.users$ = this.$api.get<any[]>(this.type);

    this.fg = new FormGroup({
      uname: new FormControl("", Validators.required),
      psw: new FormControl("", [Validators.required, Validators.email]),
      permissions: new FormGroup({
        line: new FormControl(false),
        handler: new FormControl(false),
        faq: new FormControl(false),
        administration: new FormControl(false)
      })
    });
  }

  setUpdateAction(user) {
    this.id = user.id;
    const permissions = JSON.parse(user.permission);
    this.fg.setValue({
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
    this.fg.reset();
  }
  onSubmit() {
    const values = this.fg.value;
    if (!this.id) {
      this.$api.post<any>(this.type, values).subscribe(
        e => {
          const buffer = {
            id: e.insertId,
            username: values.uname
          };
          this.users$ = this.users$.pipe(map(e => {
            e.push(buffer)
            return e
          }))
          this.$toastr.success("Utilisateur ajouté !", 'Utilisateurs');
          this.fg.reset();
        }
      );
    } else {
      const buffer = {
        id: this.id,
        nom: values.nom,
        mail: values.mail,
        web: values.web
      }
      this.$api.put<any>(this.type, buffer).subscribe(() => {
        this.users$ = this.users$.pipe(map((e: any[]) => {
          const index = e.findIndex(d => d.id === this.id)
          e[index] = buffer
          return e
        }))
        this.$toastr.success("Utilisateur modifié !", 'Utilisateurs')
        delete this.id
        this.fg.reset()
      }
      )
    }
  }

  onDelete(id) {
    if (!confirm("Voulez-vous supprimer cet élément ?")) {
      return;
    }
    this.$api.delete<any>(this.type, id).subscribe(() => {
      this.users$ = this.users$.pipe(map((e: any[]) => e.filter(i => i.id !== id)))
      this.$toastr.success("Utilisateur supprimé !", 'Utilisateurs');
    }
    );
  }

}
