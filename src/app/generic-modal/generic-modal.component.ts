import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabossApiService } from '../databoss-api.service';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {
  @Input() type: any;
  @Input() id: any;
  constructor(public modal: NgbActiveModal, private dataService: DatabossApiService) { }

  ngOnInit(): void {
  }

  delete() {
    this.dataService.sendGetRequest("delete" + "?id=" + this.id + "&table=" + this.type).subscribe((data: any) => {
      console.log(data);
    });
    this.modal.close('Ok click');
    window.location.reload();
  }

}
