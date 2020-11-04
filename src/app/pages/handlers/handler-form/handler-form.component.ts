import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';

@Component({
  selector: 'app-handler-form',
  templateUrl: './handler-form.component.html',
  styleUrls: ['./handler-form.component.scss']
})
export class HandlerFormComponent implements OnInit {

  fg: FormGroup
  id?: number

  authors$: Observable<any[]>
  softwares$: Observable<any[]>

  constructor(
    private $api: APIService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.softwares$ = this.$api.get('softwares').pipe<any[]>(take<any[]>(1))
    this.authors$ = this.$api.get('authors').pipe<any[]>(take<any[]>(1))
    if (this.id) {
      this.$api.get(`handlers/${this.id}`).subscribe(this.updateValues)
    }
  }

  initForm() {
    this.fg = new FormGroup({
      nom: new FormControl('', Validators.required),
      version: new FormControl(0, Validators.required),
      description: new FormControl(''),
      softID: new FormControl(0, Validators.required),
      author: new FormControl(0, Validators.required),
      images: new FormArray([]),
      files: new FormArray([])
    })
    this.addFile()
    this.addImage()
  }

  updateValues = (values) => {
    if (!values) {
      return
    }
    values.images.forEach(() => this.addImage());
    values.file.forEach(() => this.addFile());
    this.fg.setValue({
      nom: values.nom,
      version: values.version,
      description: values.description,
      softID: values.softID,
      author: values.author,
      images: values.images.concat(''),
      files: values.file.concat('')
    })
  }
  addFile() {
    this.getFileForm().push(new FormControl(''))
  }
  removeFileForm(index: number) {
    this.getFileForm().removeAt(index)
  }
  getFileForm() {
    return (this.fg.controls.files) as FormArray
  }

  addImage() {
    this.getImageForm().push(new FormControl(''))
  }
  removeImageForm(index: number) {
    this.getImageForm().removeAt(index)
  }
  getImageForm() {
    return (this.fg.controls.images) as FormArray
  }

  onSubmit() {
    const values = this.fg.value;
    if (this.id) {
      values.id = String(this.id)
      return this.$api.put<any>("handlers", values).subscribe(
        (e) => {
          // success
          this.bsModalRef.hide()
        }
      );
    } else {
      return this.$api.post<any>("handlers", values).subscribe((e) => {
        //Sucess
        this.bsModalRef.hide()
      })
    }
  }


}
