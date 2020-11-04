import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AdsenseModule } from "ng2-adsense";
import { CoreModule } from './core/core.module';
import { UIModule } from './components/ui.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    UIModule,
    AppRoutingModule,
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
    IndexComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
