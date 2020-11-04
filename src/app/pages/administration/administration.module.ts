import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdmininistrationComponent } from './admininistration/admininistration.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorComponent } from './author/author.component';
import { SoftwaresComponent } from './softwares/softwares.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [AdmininistrationComponent, AuthorComponent, SoftwaresComponent, UsersComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule { }
