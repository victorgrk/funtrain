import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services/API.service';

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

  data$: Observable<FAQ[]>
  softwares$: Observable<any[]>;
  softFilter = 0

  constructor(private $api: APIService) { }

  ngOnInit(): void {
    this.data$ = this.$api.get('faq')
    this.softwares$ = this.$api.get('softwares')
  }

}
