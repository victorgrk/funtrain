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
  ]
})
export class HandlersModule { }
