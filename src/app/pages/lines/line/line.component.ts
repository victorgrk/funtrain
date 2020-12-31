import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { ToastrService } from 'src/app/core/services/toastr.service';
import { LineFormComponent } from '../line-form/line-form.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  data$: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private $api: APIService,
    private router: Router,
    private auth: AuthentificationService,
    private modalService: BsModalService,
    private $toastr: ToastrService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(e => this.$api.get(`lines/${e.id}`)),
      map((e: any) => {
        return { ...e, images: e.images.map((i: any) => i.url) }
      }),
      tap((e) => !e ? this.router.navigateByUrl('/lines/list/all') : null),
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
      catchError(() => this.router.navigateByUrl('/lines/list/all')),
    )
  }
  hasPermissionToEdit() {
    return this.auth.hasPermissionToEdit('lines')
  }

  openModal(id: number) {
    const initialState = {
      id
    }
    this.modalService.show(LineFormComponent, { initialState })
  }
  onDelete(id: number) {
    if (!confirm(`Voulez-vous supprimer ${this.title.getTitle()} ?`)) {
      return;
    }
    this.$api.delete('lines', String(id)).subscribe(() => {
      this.$toastr.success('La ligne a bien été supprimée', 'Ligne')
      this.router.navigateByUrl('/lines/list/all')
    })
  }

}
