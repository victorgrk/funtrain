import { NgModule } from '@angular/core';
import { HtmlPipe } from './pipes/html.pipe';
import { LimitPipe } from './pipes/limit.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { ShortPipe } from './pipes/short.pipe';
import { SoftFilterPipe } from './pipes/softFilter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { APIService } from './services/API.service';
import { AuthentificationService } from './services/Authentification.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from './services/toastr.service';
import { HTTPToastrInterceptor } from './services/httpinterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NamesortPipe } from './pipes/namesort.pipe';

const COMPONENTS = [
  HtmlPipe,
  LimitPipe,
  FilterPipe,
  SearchPipe,
  ShortPipe,
  SoftFilterPipe,
  SortPipe,
  NamesortPipe
]

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  providers: [
    APIService,
    AuthentificationService,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPToastrInterceptor,
      multi: true,
    },

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      easeTime: 400,
      preventDuplicates: true,
      maxOpened: 4,
      autoDismiss: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
    }),

  ]

})
export class CoreModule { }