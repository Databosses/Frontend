import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from 'src/app/databoss-api.service';

@Component({
  selector: 'app-update-configuration',
  templateUrl: './update-configuration.component.html',
  styleUrls: ['./update-configuration.component.css']
})
export class UpdateConfigurationComponent implements OnInit {

  id: any = "";
  configuration: any = [];
  creationDate: any;
  creationTime: any;
  date: NgbDateStruct = {year: 2021, month: 1, day: 1};
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  seconds = true;
  meridian = true;
  alerts:any = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DatabossApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.sendGetRequest("getConf?id=" + this.id).subscribe((data) => {
      console.log(data);
      this.configuration = data;
      var tempTimestamp = this.configuration[2].split(" ");
      console.log(tempTimestamp)
      this.creationDate = tempTimestamp[0];
      this.creationTime = tempTimestamp[1];
      var tempTime = tempTimestamp[1].split(":");
      console.log(this.time)
      this.time.hour = parseInt(tempTime[0]);
      this.time.minute = parseInt(tempTime[1]);
      this.time.second = parseInt(tempTime[2]);
      console.log(this.time)
    })
  }

  updateConfig() {
    this.configuration[2] = this.date.year + "-" + this.date.month + "-" + this.date.day + " " + this.time.hour + ":" + this.time.minute + ":" + this.time.second;
    this.dataService.sendPostRequest("setConf", this.configuration).subscribe((data) => {
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
