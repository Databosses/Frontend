import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from 'src/app/databoss-api.service';

@Component({
  selector: 'app-create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.css']
})
export class CreateConfigurationComponent implements OnInit {
  name: string = "";
  date: NgbDateStruct = {year: 2021, month: 1, day: 1};
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  description: string = ""
  ownerId: number = -1;
  empIds: any;
  seconds = true;
  meridian = true;
  alerts:any = [];
  configuration: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DatabossApiService) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest("getEmpIds").subscribe((data) => {
      console.log(data);
      this.empIds = data;
    })
  }

  createConfig() {
    this.configuration.push(this.name);
    this.configuration.push(this.date.year + "-" + this.date.month + "-" + this.date.day + " " + this.time.hour + ":" + this.time.minute + ":" + this.time.second);
    this.configuration.push(this.description);
    this.configuration.push(this.ownerId);
    console.log(this.configuration);
    if(this.name != "" && this.description != "" && this.ownerId != -1){
      this.dataService.sendPostRequest("createConf", this.configuration).subscribe((data) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      });
      this.alerts.push({
        type: 'success',
        message: 'Configuration Created Successfully',
      });
    }
    else {
      this.alerts.push({
        type: 'danger',
        message: 'Please Insert Valid Values',
      });
    }
    this.configuration = []
  }

  close(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
