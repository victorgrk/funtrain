import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.scss']
})
export class SoftwaresComponent implements OnInit {
  fg: FormGroup;
  id: number = null;

  softwares$: Observable<any[]>;

  constructor(
    private $api: APIService,
    private $toastr: ToastrService
  ) { }

  ngOnInit() {
    this.softwares$ = this.$api.get<any[]>('softwares');

    this.fg = new FormGroup({
      name: new FormControl("", Validators.required),
    });
  }

  setUpdateAction(author) {
    this.id = author.id;
    this.fg.setValue({
      name: author.name,
    });
  }
  setAddAction() {
    delete this.id;
    this.fg.reset();
  }
  onSubmit() {
    const values = this.fg.value;
    if (!this.id) {
      this.$api.post<any>('softwares', values).subscribe(
        e => {
          const buffer = {
            id: e.insertId,
            name: values.name,
          };
          this.softwares$ = this.softwares$.pipe(map(e => {
            e.push(buffer)
            return e
          }))
          this.$toastr.success("Logiciel ajouté !", 'Logiciels');
          this.fg.reset();
        }
      );
    } else {
      const buffer = {
        id: this.id,
        name: values.name,
      }
      this.$api.put<any>('softwares', buffer).subscribe(() => {
        this.softwares$ = this.softwares$.pipe(map((e: any[]) => {
          const index = e.findIndex(d => d.id === this.id)
          e[index] = buffer
          return e
        }))
        this.$toastr.success("Logiciel modifié !", 'Logiciels')
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
    this.$api.delete<any>('sowftwares', id).subscribe(() => {
      this.softwares$ = this.softwares$.pipe(map((e: any[]) => e.filter(i => i.id !== id)))
      this.$toastr.success("Logiciel supprimé !", 'Logiciels');
    }
    );
  }

}
