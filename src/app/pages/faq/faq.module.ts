import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq/faq.component';
import { UIModule } from 'src/app/components/ui.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqFormComponent } from './faq-form/faq-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [FaqComponent, FaqFormComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    UIModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class FaqModule { }
