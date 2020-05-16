import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { HandlersComponent } from './components/handlers/handlers.component';
import { HandlerComponent } from './components/handler/handler.component';
import { LinesComponent } from './components/lines/lines.component';
import { LineComponent } from './components/line/line.component';
import { LinksComponent } from './components/links/links.component';
import { FaqComponent } from './components/faq/faq.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'addons', component: HandlersComponent},
  {path: 'addon/:id', component: HandlerComponent},
  {path: 'lines/:region', component: LinesComponent},
  {path: 'line/:id', component: LineComponent},
  {path: 'links', component: LinksComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
