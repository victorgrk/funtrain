import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
  <div class="wrapper" *ngIf="data">
    <img [src]="data.images[0]" [alt]="data.title" >
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
      background-color: ghostwhite;
    }
    img {
      width:250px;
      height: 250px;
      border-radius: 15px 15px 0 0;
    }
    h3 {
      margin: auto auto;
      text-align: center;
      font-size: 1.55rem;
      padding: 0;
      width: 250px;
      height: 80px;
    }
    a {
      color: #282828;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input()
  url: 'addons' | 'lines'
  @Input()
  data: any

  constructor(private $router: Router) { }

  navigate() {
    return this.$router.navigateByUrl(`/${this.url}/view/${this.data.id}`)
  }
}