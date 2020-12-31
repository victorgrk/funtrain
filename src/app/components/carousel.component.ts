import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: 'app-carousel',
  template: `
  <carousel class="w-100">
    <slide *ngFor="let img of images">
      <img [src]="img" [alt]="img" style="display: block; width: 100%;">
    </slide>
  </carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
  @Input() images: string[];
}