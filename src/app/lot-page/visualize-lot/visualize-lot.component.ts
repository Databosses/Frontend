import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { DatabossApiService } from 'src/app/databoss-api.service';

@Component({
  selector: 'app-visualize-lot',
  templateUrl: './visualize-lot.component.html',
  styleUrls: ['./visualize-lot.component.css']
})
export class VisualizeLotComponent implements OnInit {

  id: any = "";
  localData:any ;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#e0bbe4', '#957dad', '#d291bc', '#fec8d8']
 }]; 

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DatabossApiService) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.sendGetRequest("getLotVisualization?id=" + this.id).subscribe((data) => {
      console.log(data);
      this.localData = data;
      for(var i = 0; i < this.localData.length; i++) {
        this.pieChartLabels.push(this.localData[i][0]);
        this.pieChartData.push(this.localData[i][1]);
      }
    })
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
