import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from '../databoss-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  countries = LOTDetails;
  keysOfContries = ["ID", "Name", "Date", "Description"];
  
  configurations:any = [];
  toBeDeletedID:any;
  keysOfConfigs = ["ID", "Name", "Date", "Description", "Owner ID", "Actions"];
  constructor(private dataService: DatabossApiService, private router: Router, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.dataService.sendGetRequest("getConfs").subscribe((data) => {
      console.log(data);
      this.configurations = data
    })
  }

  createConf() {
    this.router.navigate(['/createconfdetails']);
  }

  updateConf(configurationId: number) {
    this.router.navigate(['/updateconfdetails', configurationId]);
  }

  deleteConf(configurationId: number) {
    // this.dataService.sendGetRequest("deleteConf?id=" + configurationId).subscribe((data) => {
    //   console.log(data);
    // });
    this.toBeDeletedID = configurationId;
    const modalRef = this._modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.id = configurationId;
  }

  open(name: string, id: string){
    this.toBeDeletedID = name;
    this._modalService.open(NgbdModalConfirm);
  }

}

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Configuration deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete configuration {{ id }}?</strong></p>
    <p>All information associated to this configuration will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="delete()">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() id: any;
  constructor(public modal: NgbActiveModal, private dataService: DatabossApiService) {}
  delete() {
    this.dataService.sendGetRequest("deleteConf?id=" + this.id).subscribe((data) => {
      console.log(data);
    });
    this.modal.close('Ok click');
    window.location.reload();
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
    partcount: 10000
  },
  {
    id: 2,
    name: "rand2",
    location: 'Canada',
    partcount: 10000
  },
  {
    id: 3,
    name: "rand3",
    location: 'United States',
    partcount: 10000
  },
  {
    id: 4,
    name: "rand4",
    location: 'United States',
    partcount: 15000
  },
  {
    id: 5,
    name: "rand5",
    location: 'China',
    partcount: 20000
  }
];
