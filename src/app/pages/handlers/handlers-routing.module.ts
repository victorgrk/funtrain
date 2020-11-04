import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HandlerComponent } from './handler/handler.component';
import { HandlersComponent } from './handlers/handlers.component';


const routes: Routes = [
  { path: 'list', component: HandlersComponent },
  { path: 'view/:id', component: HandlerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandlersRoutingModule { }
