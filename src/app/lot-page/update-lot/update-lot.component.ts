import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabossApiService } from 'src/app/databoss-api.service';

@Component({
  selector: 'app-update-lot',
  templateUrl: './update-lot.component.html',
  styleUrls: ['./update-lot.component.css']
})
export class UpdateLotComponent implements OnInit {

  id: any = "";
  loc: string = "-1";
  alerts:any = [];

  empIds: any;
  locIds: any;
  configurationIds: any;
  lot: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DatabossApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.sendGetRequest("getLot?id=" + this.id).subscribe((data) => {
      console.log(data);
      this.lot = data;
    })
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

  updateLot() {
    this.dataService.sendPostRequest("setLot", this.lot).subscribe((data) => {
      console.log(data);
    },
    (error: any) => {
      console.log(error);
    });
    this.alerts.push({
      type: 'success',
      message: 'Configuration Updated Successfully',
    });
  }

  close(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
