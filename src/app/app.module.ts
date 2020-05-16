import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIService } from './services/API.service';
import { AuthentificationService } from './services/Authentification.service';
import { BeautifulDatePipe } from './pipes/beautifulDate.pipe';
import { SoftFilterPipe } from './pipes/softFilter.pipe';
import { HtmlPipe } from './pipes/html.pipe';
import { LimitPipe } from './pipes/limit.pipe';
import { ShortPipe } from './pipes/short.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { IndexComponent } from './components/index/index.component';
import { AuthorComponent } from './components/author/author.component';
import { HandlersComponent } from './components/handlers/handlers.component';
import { LinesComponent } from './components/lines/lines.component';
import { LinksComponent } from './components/links/links.component';
import { UsersComponent } from './components/users/users.component';
import { SearchPipe } from './pipes/search.pipe';
import { HandlerComponent } from './components/handler/handler.component';
import { LineComponent } from './components/line/line.component';
import { RegionFilterPipe } from './pipes/regionFilter.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { SoftwaresComponent } from './components/softwares/softwares.component';
import { AdsenseModule } from "ng2-adsense";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
    AdsenseModule.forRoot({
      adClient: "ca-pub-9559903561846592",
      adSlot: "4457937979",
      display: "inline-block",
      width: 300,
      height: 250
    })
  ],
  declarations: [
    AppComponent,
    BeautifulDatePipe,
    SoftFilterPipe,
    HtmlPipe,
    LimitPipe,
    ShortPipe,
    SortPipe,
    SearchPipe,
    RegionFilterPipe,
    IndexComponent,
    AuthorComponent,
    HandlersComponent,
    LinesComponent,
    LinksComponent,
    UsersComponent,
    HandlerComponent,
    LineComponent,
    ContactComponent,
    FaqComponent,
    AdministrationComponent,
    SoftwaresComponent
  ],
  providers: [
    APIService,
    AuthentificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
