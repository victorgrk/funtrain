import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { LinkFormComponent } from './link-form/link-form.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  links$: Observable<any>

  constructor(
    private api: APIService,
    private modalService: BsModalService,
    private $auth: AuthentificationService
  ) { }
  get auth() {
    return this.$auth.hasPermissionToEdit('administration')
  }
  ngOnInit(): void {
    this.links$ = this.api.get('links')
  }
  onUpdate(link: any) {
    const initialState = {
      link
    }
    this.modalService.show(LinkFormComponent, { initialState })
  }
  onDelete(id: number) {
    if (!confirm('Voulez vous supprimer ce lien ?')) {
      return;
    }
    this.links$ = this.api.delete('links', String(id)).pipe(switchMap(() => this.api.get('links')))
  }
  onCreate() {
    this.modalService.show(LinkFormComponent)
  }
  trackBy(e: any) {
    return e.id
  }

}
