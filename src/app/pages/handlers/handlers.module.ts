import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandlersRoutingModule } from './handlers-routing.module';
import { HandlersComponent } from './handlers/handlers.component';
import { UIModule } from 'src/app/components/ui.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HandlerFormComponent } from './handler-form/handler-form.component';
import { HandlerComponent } from './handler/handler.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AdsenseModule } from 'ng2-adsense';


@NgModule({
  declarations: [HandlersComponent, HandlerFormComponent, HandlerComponent],
  imports: [
    CommonModule,
    HandlersRoutingModule,
    UIModule,
    CoreModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AdsenseModule.forRoot({
      adClient: "ca-pub-9559903561846592",
      adSlot: "4457937979",
      display: "inline-block",
      adFormat: "rectangle",
      width: 200,
      height: 200
    }),
  ]
})
export class HandlersModule { }
