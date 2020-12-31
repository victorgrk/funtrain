import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { HandlerFormComponent } from '../handler-form/handler-form.component';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.scss']
})
export class HandlerComponent implements OnInit {

  data$: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private $api: APIService,
    private router: Router,
    private auth: AuthentificationService,
    private modalService: BsModalService, private $toastr: ToastrService,
    private meta: Meta, private title: Title
  ) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(e => this.$api.get(`handlers/${e.id}`)),
      map((e: any) => {
        return { ...e, images: e.images.map((i: any) => i.url) }
      }),
      tap((e) => !e ? this.router.navigateByUrl('/handlers/list/') : e),
      tap((e: any) => {
        this.title.setTitle(e.nom)
        this.meta.addTags([
          { name: 'twitter:card', content: 'summary' },
          { name: 'og:url', content: `/lines/view/${e.id}` },
          { name: 'og:title', content: e.nom },
          { name: 'og:description', content: e.description },
          { name: 'og:image', content: e.images[0] }
        ])
      }),
      catchError(() => this.router.navigateByUrl('/handlers/list/all')),
    )
  }
  hasPermissionToEdit() {
    return this.auth.hasPermissionToEdit('handlers')
  }
  openModal(id: number) {
    const initialState = {
      id
    }
    this.modalService.show(HandlerFormComponent, { initialState })
  }
  onDelete(id: number) {
    this.$api.delete('handlers', String(id)).subscribe(() => {
      this.$toastr.success('Le plugin a bien été supprimé', 'Addon')
      this.router.navigateByUrl('/handlers/list/all')
    })
  }
}
