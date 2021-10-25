import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-lot-chart',
  templateUrl: './lot-chart.component.html',
  styleUrls: ['./lot-chart.component.css']
})
export class LotChartComponent implements OnInit {

  // Mock Data Needs To Be Replaced By Actual Data
  private data = [
    {
      "id": "1",
      "values": [
        {"Type": "normal", "number": "8000"},
        {"Type": "low", "number": "1000"},
        {"Type": "medium", "number": "750"},
        {"Type": "high", "number": "250"}
      ]
    },
    {
      "id": "2",
      "values": [
        {"Type": "normal", "number": "9000"},
        {"Type": "low", "number": "750"},
        {"Type": "medium", "number": "250"},
        {"Type": "high", "number": "0"}
      ]
    },
    {
      "id": "3",
      "values": [
        {"Type": "normal", "number": "9500"},
        {"Type": "low", "number": "250"},
        {"Type": "medium", "number": "200"},
        {"Type": "high", "number": "50"}
      ]
    },
    {
      "id": "4",
      "values": [
        {"Type": "normal", "number": "10000"},
        {"Type": "low", "number": "2500"},
        {"Type": "medium", "number": "2000"},
        {"Type": "high", "number": "500"}
      ]
    },
    {
      "id": "5",
      "values": [
        {"Type": "normal", "number": "1000003"},
        {"Type": "low", "number": "150793"},
        {"Type": "medium", "number": "62343"},
        {"Type": "high", "number": "27643"}
      ]
    }
  ];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;


  id: any = "";
  constructor( private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.data[this.data.findIndex(x => x.id === this.id)].values);
    this.createSvg("figure#pie1");
    this.createColors();
    this.drawChart();
  }

  private createSvg(id: string): void {
    this.svg = d3.select(id)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data[this.data.findIndex(x => x.id === this.id)].values.map(d => d.number.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.number));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data[this.data.findIndex(x => x.id === this.id)].values))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data[this.data.findIndex(x => x.id === this.id)].values))
    .enter()
    .append('text')
    .text((d: { data: { Type: any; }; }) => d.data.Type)
    .attr("transform", (d: d3.DefaultArcObject) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
}
