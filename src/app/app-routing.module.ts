import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink'
import { IndexComponent } from './pages/index/index.component'
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'lines',
    loadChildren: () => import('./pages/lines/lines.module').then(e => e.LinesModule)
  },
  {
    path: 'addons',
    loadChildren: () => import('./pages/handlers/handlers.module').then(e => e.HandlersModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./pages/administration/administration.module').then(e => e.AdministrationModule),
  },
  {
    path: 'faq',
    loadChildren: () => import("./pages/faq/faq.module").then(e => e.FaqModule)
  },
  {
    path: 'links',
    loadChildren: () => import("./pages/links/links.module").then(e => e.LinksModule)
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
