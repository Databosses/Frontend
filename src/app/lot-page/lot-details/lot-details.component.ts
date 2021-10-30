import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from 'src/app/databoss-api.service';
import { GenericModalComponent } from 'src/app/generic-modal/generic-modal.component';

@Component({
  selector: 'app-lot-details',
  templateUrl: './lot-details.component.html',
  styleUrls: ['./lot-details.component.css']
})
export class LotDetailsComponent implements OnInit {
  lots:any = [];
  keysOfLots = ["ID", "Name", "Material Type", "Height (cm)", "Diameter (cm)", "Configuration ID", "Location City", "Assignee ID", "Assignee Name", "Actions"];
  
  constructor(private dataService: DatabossApiService, private router: Router, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest("getLots").subscribe((data) => {
      console.log(data);
      this.lots = data
    })
  }
  
  visualizeLot(lotId: number) {
    this.router.navigate(['/visualizelotdetails', lotId]);
  }

  createLot() {
    this.router.navigate(['/createlotdetails']);
  }

  updateLot(lotId: number) {
    this.router.navigate(['/updatelotdetails', lotId]);
  }

  deleteLot(lotId: number) {
    const modalRef = this._modalService.open(GenericModalComponent);
    modalRef.componentInstance.id = lotId;
    modalRef.componentInstance.type = "Lot";
  }
}
