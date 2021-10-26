import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateConfigurationComponent } from './configuration-page/create-configuration/create-configuration.component';
import { UpdateConfigurationComponent } from './configuration-page/update-configuration/update-configuration.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LotChartComponent } from './lot-chart/lot-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'confdetails', pathMatch: 'full' },
  { path: 'confdetails', component: HomePageComponent },
  { path: 'updateconfdetails/:id', component: UpdateConfigurationComponent },
  { path: 'createconfdetails', component: CreateConfigurationComponent },
  { path: 'lotchart/:id', component: LotChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
