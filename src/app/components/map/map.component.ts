import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.svg',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {

  @Input()
  region?: string = ''
  constructor(private $router: Router) { }

  changeLocation(location: string) {
    this.$router.navigateByUrl(`/lines/list/${location}`)
  }

}
