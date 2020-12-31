import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
  <div class="wrapper shimmer" *ngIf="!data"></div>
  <div class="wrapper" *ngIf="data">
    <div class="img" [style.background-image]="'url(' + data.images[0]?.url + ')'"></div>
    <h3>
      <a href="javascript:;" (click)="navigate()" [title]="data.nom">
        {{ data.nom | short: 38}}
      </a>
    </h3></div>
  `,
  styles: [`
    .wrapper {
      border-radius: 15px;
      margin: 0.4rem;
      width: 250px;
      height: 330px;
      background-color: #444;
    }
    .img {
      width:250px;
      height: 250px;
      border-radius: 15px 15px 0 0;
      background-position: center;
      background-repeat: no-repeat;
      background-clip: contain;
    }
    h3 {
      margin: auto auto;
      text-align: center;
      font-size: 1.4rem;
      padding: 0;
      width: 250px;
      height: 80px;
    }
    a {
      color: whitesmoke;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input()
  url: 'addons' | 'lines'
  @Input()
  data?: any

  constructor(private $router: Router) { }

  navigate() {
    return this.$router.navigateByUrl(`/${this.url}/view/${this.data.id}`)
  }
}