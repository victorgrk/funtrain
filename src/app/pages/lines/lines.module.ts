import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinesRoutingModule } from './lines-routing.module';
import { LinesComponent } from './lines/lines.component';
import { CoreModule } from 'src/app/core/core.module';
import { UIModule } from 'src/app/components/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LineComponent } from './line/line.component';
import { LineFormComponent } from './line-form/line-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdsenseModule } from 'ng2-adsense';


@NgModule({
  declarations: [LinesComponent, LineComponent, LineFormComponent],
  imports: [
    CommonModule,
    LinesRoutingModule,
    CoreModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-9559903561846592",
      adSlot: "4457937979",
      display: "inline-block",
      adFormat: "rectangle",
      width: 200,
      height: 200
    }),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
  ]
})
export class LinesModule { }
