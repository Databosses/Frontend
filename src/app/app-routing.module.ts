import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LotChartComponent } from './lot-chart/lot-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'lotdetails', pathMatch: 'full' },
  { path: 'lotdetails', component: HomePageComponent },
  { path: 'lotchart/:id', component: LotChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
