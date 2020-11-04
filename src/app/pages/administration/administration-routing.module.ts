import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmininistrationComponent } from './admininistration/admininistration.component';


const routes: Routes = [{ path: '', component: AdmininistrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
