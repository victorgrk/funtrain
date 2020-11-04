import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';
import { AuthentificationService } from 'src/app/core/services/Authentification.service';
import { LineFormComponent } from '../line-form/line-form.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  data$: Observable<any>

  constructor(private route: ActivatedRoute, private $api: APIService, private router: Router, private auth: AuthentificationService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      switchMap(e => this.$api.get(`lines/${e.id}`)),
      tap((e) => !e ? this.router.navigateByUrl('/lines/list/all') : e),
      catchError(() => this.router.navigateByUrl('/lines/list/all')),
    )
    this.data$.subscribe(e => console.log(e));
  }
  getDownloadLocation(link: string) {
    return link.substring(link.lastIndexOf("/") + 1, link.length);
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
  onDelete(id) {
    this.$api.delete('lines', id)
  }

}
