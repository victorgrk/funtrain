import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services/API.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss']
})
export class FaqFormComponent implements OnInit {

  fg = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
    softID: new FormControl(0, [Validators.required])
  });

  faq?: any;

  softwares$: Observable<any[]>
  constructor(private api: APIService, public bsModalRef: BsModalRef, private $toastr: ToastrService) { }

  ngOnInit(): void {
    this.softwares$ = this.api.get('softwares');
    if (this.faq) {
      this.fg.get('question').setValue(this.faq.question)
      this.fg.get('answer').setValue(this.faq.answer)
      this.fg.get('softID').setValue(this.faq.softId)
    }
  }

  onSubmit() {
    const values = this.fg.value;
    if (this.faq?.id) {
      values.id = this.faq.id;
      return this.api.put('faq', values).subscribe(e => {
        this.$toastr.success('Votre question a bien été modifiée', 'FAQ')
        this.bsModalRef.hide()
      })
    } else {
      return this.api.post('faq', values).subscribe(e => {
        this.$toastr.success('Votre question a bien été ajoutée', 'FAQ')
        this.bsModalRef.hide()
      })
    }
  }
}
