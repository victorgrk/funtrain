import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { FaqFormComponent } from '../faq-form/faq-form.component';

export interface FAQ {
  id: number
  question: string
  answer: string
  softId: string
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  data$: Observable<(FAQ | null)[]>
  softwares$: Observable<any[]>;
  softFilter = 0

  constructor(
    private $api: APIService,
    private $auth: AuthentificationService,
    private modalService: BsModalService,
    private $toastr: ToastrService
  ) { }
  get auth() {
    return this.$auth.hasPermissionToEdit('faq');
  }
  ngOnInit(): void {
    this.data$ = this.$api.get<(FAQ | null)[]>('faq').pipe(
      startWith(Array(8).fill(null))
    )
    this.softwares$ = this.$api.get('softwares')
  }
  onUpdate(faq: any) {
    const initialState = {
      faq
    }
    this.modalService.show(FaqFormComponent, { initialState })
  }
  onDelete(id: number) {
    if (!confirm('Voulez vous supprimer cette question ?')) {
      return;
    }
    this.$api.delete('faq', String(id)).subscribe(e => {
      this.$toastr.success('Votre question a bien été supprimée', 'FAQ')
      this.data$ = this.$api.get<FAQ[]>('faq')
    })
  }
  onCreate() {
    this.modalService.show(FaqFormComponent)
  }
  trackBy(e: any) {
    return e?.id
  }

}
