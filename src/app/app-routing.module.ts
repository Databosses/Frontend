import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateConfigurationComponent } from './configuration-page/create-configuration/create-configuration.component';
import { UpdateConfigurationComponent } from './configuration-page/update-configuration/update-configuration.component';
import { DefectDetailsGridComponent } from './defect-details-grid/defect-details-grid.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateLotComponent } from './lot-page/create-lot/create-lot.component';
import { LotDetailsComponent } from './lot-page/lot-details/lot-details.component';
import { UpdateLotComponent } from './lot-page/update-lot/update-lot.component';
import { VisualizeLotComponent } from './lot-page/visualize-lot/visualize-lot.component';
import { DefectGridComponent } from './part-defect-grid/defect-grid.component';
import { DataGridComponent } from './part-grid/data-grid.component';

const routes: Routes = [
  { path: '', redirectTo: 'confdetails', pathMatch: 'full' },
  { path: 'confdetails', component: HomePageComponent },
  { path: 'createconfdetails', component: CreateConfigurationComponent },
  { path: 'updateconfdetails/:id', component: UpdateConfigurationComponent },
  { path: 'lotdetails', component: LotDetailsComponent },
  { path: 'createlotdetails', component: CreateLotComponent },
  { path: 'updatelotdetails/:id', component: UpdateLotComponent },
  { path: 'visualizelotdetails/:id', component: VisualizeLotComponent },
  { path: 'partdetails', component: DataGridComponent },
  { path: 'partdefectdetails', component:  DefectGridComponent },
  { path: 'defectdetails', component: DefectDetailsGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
