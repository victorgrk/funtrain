import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineComponent } from './line/line.component';
import { LinesComponent } from './lines/lines.component';


const routes: Routes = [
  { path: 'list/:region', component: LinesComponent },
  { path: 'view/:id', component: LineComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
