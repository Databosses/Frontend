import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from '../databoss-api.service';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  configurations:any = [];
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
    const modalRef = this._modalService.open(GenericModalComponent);
    modalRef.componentInstance.id = configurationId;
    modalRef.componentInstance.type = "Configuration";
  }
}