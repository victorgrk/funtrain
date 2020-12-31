import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { APIService } from 'src/app/core/services/API.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent implements OnInit {
  fg: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    links: new FormControl('', [Validators.required]),
  })
  link?: any

  constructor(
    private $api: APIService,
    public bsModalRef: BsModalRef, private $toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.link) {
      this.fg.get('title').setValue(this.link.title)
      this.fg.get('description').setValue(this.link.description)
      this.fg.get('links').setValue(this.link.links)
    }
  }
  onSubmit() {
    const values = this.fg.value;
    if (this.link?.id) {
      values.id = String(this.link.id)
      return this.$api.put<any>("links", values).subscribe(
        (e) => {
          this.$toastr.success(`Vous avez bien modifié le lien vers le site ${values.title}`, 'Lien')
          this.bsModalRef.hide()
        }
      );
    } else {
      return this.$api.post<any>("links", values).subscribe((e) => {
        this.$toastr.success(`Vous avez bien ajouté un lien vers le site ${values.title}`, 'Lien')
        this.bsModalRef.hide()
      })
    }
  }

}
