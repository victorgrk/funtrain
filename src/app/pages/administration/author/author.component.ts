import { Component, OnInit } from "@angular/core";
import { APIService } from "src/app/core/services/API.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { ToastrService } from "src/app/core/services/toastr.service";
import { map } from 'rxjs/operators';

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"]
})
export class AuthorComponent implements OnInit {
  fg: FormGroup;
  id: number = null;

  private type = "authors";
  authors$: Observable<any[]>;

  constructor(
    private $api: APIService,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.authors$ = this.$api.get<any[]>(this.type);
    const reg = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

    this.fg = new FormGroup({
      nom: new FormControl("", Validators.required),
      mail: new FormControl("", [Validators.required, Validators.email]),
      web: new FormControl("", Validators.pattern(reg))
    });
  }

  setUpdateAction(author) {
    this.id = author.id;
    this.fg.setValue({
      nom: author.nom,
      mail: author.mail,
      web: author.web || ""
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
            nom: values.nom,
            mail: values.mail,
            web: values.web
          };
          this.authors$ = this.authors$.pipe(map(e => {
            e.push(buffer)
            return e
          }))
          this.$toastr.success("Auteur ajouté !", 'Auteurs');
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
        this.authors$ = this.authors$.pipe(map((e: any[]) => {
          const index = e.findIndex(d => d.id === this.id)
          e[index] = buffer
          return e
        }))
        this.$toastr.success("Auteur modifié !", 'Auteurs')
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
      this.authors$ = this.authors$.pipe(map((e: any[]) => e.filter(i => i.id !== id)))
      this.$toastr.success("Auteur supprimé !", 'Auteurs');
    }
    );
  }
}
