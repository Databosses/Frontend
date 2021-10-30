import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabossApiService } from 'src/app/databoss-api.service';

@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  name: string = "";
  material: string = "PLASTIC";
  height: any;
  diameter: any;
  configuration: string = "-1";
  assignee: string = "-1";
  loc: string = "-1";
  alerts:any = [];

  empIds: any;
  locIds: any;
  configurationIds: any;
  lot: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DatabossApiService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest("getIds?table=EMPLOYEE&filter=FIRSTNAME").subscribe((data) => {
      console.log(data);
      this.empIds = data;
    })
    this.dataService.sendGetRequest("getIds?table=LOCATION&filter=CITY").subscribe((data) => {
      console.log(data);
      this.locIds = data;
    })
    this.dataService.sendGetRequest("getIds?table=CONFIGURATION&filter=NAME").subscribe((data) => {
      console.log(data);
      this.configurationIds = data;
    })
  }

  createLot() {
    this.lot.push(this.name.replace("'", "").replace('"', ''));
    this.lot.push(this.material);
    this.lot.push(this.height);
    this.lot.push(this.diameter);
    this.lot.push(Number(this.configuration.split(",")[0]));
    this.lot.push(Number(this.loc.split(",")[0]));
    this.lot.push(Number(this.assignee.split(",")[0]));
    console.log(this.lot);
    if(this.name != "" && this.material != "" && this.configuration != "-1" && this.assignee != "-1" && this.loc != "-1"){
      this.dataService.sendPostRequest("createLot", this.lot).subscribe((data) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      });
      this.alerts.push({
        type: 'success',
        message: 'lot Created Successfully',
      });
    }
    else {
      this.alerts.push({
        type: 'danger',
        message: 'Please Insert Valid Values',
      });
    }
    this.lot = []
  }

  close(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
