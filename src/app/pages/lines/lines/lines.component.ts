import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/core/services/API.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LineFormComponent } from '../line-form/line-form.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {

  lines$: Observable<any[]>
  softwares$: Observable<any>
  region: string
  search: string = ''
  soft: string = ''
  currentPage = 1

  constructor(
    private $api: APIService,
    private $route: ActivatedRoute,
    private $router: Router,
    private auth: AuthentificationService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.$route.params.forEach(e => this.region = e.region)
    this.lines$ = this.$api.get<any[]>('lines').pipe(
      startWith(Array(8).fill(null))
    )
    this.softwares$ = this.$api.get('softwares')
  }
  resetFilter() {
    this.$router.navigateByUrl('/lines/list/all')
  }

  trackBy(_, value) {
    return value?.id
  }
  openModal() {
    this.modalService.show(LineFormComponent)
  }
  hasPermissionToEdit() {
    return this.auth.hasPermissionToEdit('lines')
  }
}
