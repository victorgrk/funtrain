import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { HandlerFormComponent } from '../handler-form/handler-form.component';

@Component({
  selector: 'app-handler',
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.scss']
})
export class HandlerComponent implements OnInit {

  data$: Observable<any>

  constructor(private route: ActivatedRoute, private $api: APIService, private router: Router, private auth: AuthentificationService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(e => this.$api.get(`handlers/${e.id}`)),
      tap((e) => !e ? this.router.navigateByUrl('/handlers/list/') : e),
      catchError(() => this.router.navigateByUrl('/handlers/list/all')),
    )
  }
  getDownloadLocation(link: string) {
    return link.substring(link.lastIndexOf("/") + 1, link.length);
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
  onDelete(id) {
    this.$api.delete('handlers', id)
  }
}
