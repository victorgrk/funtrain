import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services/API.service';

@Component({
  selector: 'app-handlers',
  templateUrl: './handlers.component.html',
  styleUrls: ['./handlers.component.scss']
})
export class HandlersComponent implements OnInit {
  handlers$: Observable<any>
  softwares$: Observable<any>
  search: string = ''
  soft: string = ''
  currentPage = 1

  constructor(
    private $api: APIService,
  ) { }

  ngOnInit() {
    this.handlers$ = this.$api.get('handlers')
    this.softwares$ = this.$api.get('softwares')
  }
  resetFilter() {
    this.soft = ''
    this.search = ''
  }

  trackBy(_, value) {
    return value.id
  }
}
