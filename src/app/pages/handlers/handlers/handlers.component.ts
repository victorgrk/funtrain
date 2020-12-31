import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { HandlerFormComponent } from '../handler-form/handler-form.component';

@Component({
  selector: 'app-handlers',
  templateUrl: './handlers.component.html',
  styleUrls: ['./handlers.component.scss']
})
export class HandlersComponent implements OnInit {
  handlers$: Observable<any[]>
  softwares$: Observable<any>
  search: string = ''
  soft: string = ''
  currentPage = 1

  constructor(
    private $api: APIService,
    private $auth: AuthentificationService,
    private modalService: BsModalService
  ) { }

  get auth() {
    return this.$auth.hasPermissionToEdit('handlers')
  }

  ngOnInit() {
    this.handlers$ = this.$api.get<any[]>('handlers').pipe(
      startWith(Array(8).fill(null))
    )
    this.softwares$ = this.$api.get('softwares')
  }
  resetFilter() {
    this.soft = ''
    this.search = ''
  }

  trackBy(_, value) {
    return value?.id
  }
  onCreate() {
    this.modalService.show(HandlerFormComponent)
  }
}
