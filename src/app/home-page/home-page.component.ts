import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  countries = LOTDetails;
  keysOfContries = ["ID", "Name", "Location", "Part Count"];
  constructor() { }

  ngOnInit(): void {
  }

}


interface Lot {
  id: number;
  name: string;
  location: string;
  partcount: number;
}

const LOTDetails: Lot[] = [
  {
    id: 1,
    name: "rand1",
    location: 'Russia',
    partcount: 146989754
  },
  {
    id: 2,
    name: "rand2",
    location: 'Canada',
    partcount: 36624199
  },
  {
    id: 3,
    name: "rand3",
    location: 'United States',
    partcount: 324459463
  },
  {
    id: 4,
    name: "rand4",
    location: 'United States',
    partcount: 324459463
  },
  {
    id: 5,
    name: "rand5",
    location: 'China',
    partcount: 1409517397
  }
];
