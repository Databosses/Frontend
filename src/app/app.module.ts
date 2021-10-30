import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { LotChartComponent } from './lot-chart/lot-chart.component';
import { UpdateConfigurationComponent } from './configuration-page/update-configuration/update-configuration.component';
import { CreateConfigurationComponent } from './configuration-page/create-configuration/create-configuration.component';
import { FormsModule } from '@angular/forms';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LotDetailsComponent } from './lot-page/lot-details/lot-details.component';
import { CreateLotComponent } from './lot-page/create-lot/create-lot.component';
import { UpdateLotComponent } from './lot-page/update-lot/update-lot.component';
import { VisualizeLotComponent } from './lot-page/visualize-lot/visualize-lot.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LotChartComponent,
    UpdateConfigurationComponent,
    CreateConfigurationComponent,
    GenericModalComponent,
    LotDetailsComponent,
    CreateLotComponent,
    UpdateLotComponent,
    VisualizeLotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
