import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from, fromEvent, iif, Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { APIService } from 'src/app/core/services/API.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  @ViewChild('searchInput') search: ElementRef<HTMLInputElement>;

  results$: Observable<any[]>
  resultSize: number
  active = -1

  constructor(
    private $api: APIService,
    private $router: Router
  ) { }

  ngAfterViewInit() {
    this.results$ = fromEvent(this.search.nativeElement, 'keydown').pipe(
      debounceTime(250),
      map((e: any) => e.target.value.toLowerCase()),
      startWith(''),
      switchMap((e: string) => iif(() => e !== '', this.$api.get<any[]>(`search/${e}`), from([]))),
      tap((e: any[]) => this.resultSize = e.length)
    )
  }

  changeActive($event: KeyboardEvent) {
    $event.preventDefault()
    $event.stopPropagation();
    const multiplier = {
      ArrowUp: -1,
      ArrowDown: 1
    }
    this.active = Math.max(0, Math.min(this.active + multiplier[$event.key], this.resultSize - 1))
  }

  submit(event: Event, ref: string) {
    event.stopPropagation();
    event.preventDefault();
    this.$router.navigateByUrl(ref);
  }
}
