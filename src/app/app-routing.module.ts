import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink'
import { IndexComponent } from './pages/index/index.component'
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'Funtrain.net',
      description: `Site funtrain.net, retrouvez toutes les lignes pour vos simulateurs de trains`,
      ogUrl: 'https://funtrain.net/',
    },
  },
  {
    path: 'lines',
    loadChildren: () => import('./pages/lines/lines.module').then(e => e.LinesModule),
    data: {
      title: 'Lignes - Funtrain',
      description: `Site funtrain.net, retrouvez toutes les lignes pour vos simulateurs de trains`,
      ogUrl: 'https://funtrain.net/lines/',
    },
  },
  {
    path: 'addons',
    loadChildren: () => import('./pages/handlers/handlers.module').then(e => e.HandlersModule),
    data: {
      title: 'Addons - Funtrain',
      description: `Site funtrain.net, retrouvez tous les addons pour vos simulateurs de trains`,
      ogUrl: 'https://funtrain.net/addons/',
    },
  },
  {
    path: 'administration',
    loadChildren: () => import('./pages/administration/administration.module').then(e => e.AdministrationModule),
    data: {
      title: 'Funtrain.net',
      description: ``,
      ogUrl: 'https://funtrain.net/',
    },
  },
  {
    path: 'faq',
    loadChildren: () => import("./pages/faq/faq.module").then(e => e.FaqModule),
    data: {
      title: 'FAQ - Funtrain.net',
      description: `Foire Aux Question de Funtrain.net`,
      ogUrl: 'https://funtrain.net/faq',
    },
  },
  {
    path: 'links',
    loadChildren: () => import("./pages/links/links.module").then(e => e.LinksModule),
    data: {
      title: 'Sites partenaires - Funtrain.net',
      description: `Sites partenaires du site funtrain.net`,
      ogUrl: 'https://funtrain.net/links',
    },
  },
  {
    path: 'contact',
    loadChildren: () => import("./pages/contact/contact.module").then(e => e.ContactModule),
    data: {
      title: 'Contact - Funtrain.net',
      description: `Page de contact du site Funtrain.net`,
      ogUrl: 'https://funtrain.net/contact',
    },
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      preloadingStrategy: QuicklinkStrategy
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
