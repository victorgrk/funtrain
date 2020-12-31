import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksRoutingModule } from './links-routing.module';
import { LinksComponent } from './links.component';
import { LinkComponent } from './link/link.component';
import { LinkFormComponent } from './link-form/link-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LinksComponent, LinkComponent, LinkFormComponent],
  imports: [
    CommonModule,
    LinksRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class LinksModule { }
