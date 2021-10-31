import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateConfigurationComponent } from './configuration-page/update-configuration/update-configuration.component';
import { CreateConfigurationComponent } from './configuration-page/create-configuration/create-configuration.component';
import { FormsModule } from '@angular/forms';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { LotDetailsComponent } from './lot-page/lot-details/lot-details.component';
import { CreateLotComponent } from './lot-page/create-lot/create-lot.component';
import { UpdateLotComponent } from './lot-page/update-lot/update-lot.component';
import { VisualizeLotComponent } from './lot-page/visualize-lot/visualize-lot.component';
import { ChartsModule } from 'ng2-charts';
import { DataGridComponent } from './part-grid/data-grid.component';
import { DefectDetailsGridComponent } from './defect-details-grid/defect-details-grid.component';
import { DefectGridComponent } from './part-defect-grid/defect-grid.component';
import { GuiGridModule } from '@generic-ui/ngx-grid/';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UpdateConfigurationComponent,
    CreateConfigurationComponent,
    GenericModalComponent,
    LotDetailsComponent,
    CreateLotComponent,
    UpdateLotComponent,
    VisualizeLotComponent,
    DataGridComponent,
    DefectGridComponent,
    DefectDetailsGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    GuiGridModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GenericModalComponent]
})
export class AppModule { }
