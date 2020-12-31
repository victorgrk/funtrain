import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CoreModule } from '../core/core.module';
import { FileUploadComponent } from './fileUpload.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TextComponent } from './text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip';;
import { LoginComponent } from './login.component';
import { CookieComponent } from './cookies.component';
import { FooterComponent } from './footer.component';
import { NavbarComponent } from './navbar.component';
import { MapComponent } from './map/map.component';
import { LegalComponent } from './legal.component';
import { CardComponent } from './card.component';
import { PaginationComponent } from './pagination/pagination.component';


const COMPONENTS = [
  CarouselComponent,
  FooterComponent,
  FileUploadComponent,
  TextComponent,
  LoginComponent,
  LegalComponent,
  CardComponent,
  CookieComponent,
  NavbarComponent,
  MapComponent,
  PaginationComponent
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class UIModule { }