import { Component, OnInit } from '@angular/core';
import { DatabossApiService } from '../databoss-api.service';

//TODO
//Check whether lot is present or not else dont let update or create
//Throw success notfiers
//Throw cannot notifiers
//Check row editing
//refresh option if editing not required

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  lotIds: any;
  source: any;
  isAdd: any = false;
  keysOfParts: any = ["ID", "TEST_START_TIME","TEST_END_TIME", "BUCKET","LOT"];
  validator: any = {invalidInput: false, 
                    lotDoesntExist: false, 
                    successfullUpdate: false, 
                    successfullCreation: false, 
                    successfulDeletion: false,
                    invalidInputType: false
                  };
  emptySource = {
      "ID": "",
      "TEST_START_TIME": null,
      "TEST_END_TIME": null,
      "BUCKET": "",
      "LOT": ""
  }

  constructor(private dataService: DatabossApiService) { }

  ngOnInit() {
    this.updateValidator([false, false, false, false, false, false]);
    this.getParts();
    this.getLotIds();
  }

  public getLotIds(){
    this.dataService.getItems("getLotIds")
    .subscribe(
      (response) => {
        this.lotIds = response;
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      })
  }

  public getParts() {
    this.dataService.getItems("getParts")
      .subscribe(
        (response) => {
          this.source = response.map((part: any[]) => {
            let obj:any = {};
            for(let i = 0; i< this.keysOfParts.length; i++){
              if(this.keysOfParts[i] === "TEST_START_TIME" || this.keysOfParts[i] === "TEST_END_TIME"){
                obj[this.keysOfParts[i]] = new Date(part[i]);
              }else{
                obj[this.keysOfParts[i]] = part[i];
              }
            }
            return obj;
          })
          if(this.isAdd){
            this.source.push({...this.emptySource});
            this.isAdd = false;
          }
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  public pushData(urlStr: string, values: string | any[]) {
    this.dataService.insertData(urlStr, values)
      .subscribe(
        (response) => {        
          this.ngOnInit();
          if(values.length === 5){
            this.updateValidator([false, false, false, true, false, false]);
          }else{
            this.updateValidator([false, false, true, false, false, false]);
          }
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  public deletePart(urlStr: string, partId: any){
    this.dataService.deleteItem(urlStr, partId)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received' + response)
        this.ngOnInit();
        this.updateValidator([false, false, false, false, true, false]);
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      }
    )
  }

  getParameters(item: { [x: string]: any; }, isId: boolean){
    let parameters: any = [];
    for(let i=1; i< this.keysOfParts.length; i++){
      switch(this.keysOfParts[i]){
        case "TEST_START_TIME":  
        case "TEST_END_TIME":
          parameters.push(Date.parse(item[this.keysOfParts[i]]));
          break;
        case "BUCKET":
        case "LOT":
          parameters.push(Number(item[this.keysOfParts[i]]));  
          break;
        default:
          parameters.push(JSON.stringify(item[this.keysOfParts[i]]));
          break;
      }
    }
    //with ID for creation, without id for updation
    if(isId){
      parameters.push(Number(item[this.keysOfParts[0]]));
    }
    return parameters;
  }

  updateValidator(args: any[]){
    this.validator.invalidInput = args[0];
    this.validator.lotDoesntExist = args[1];
    this.validator.successfullCreation = args[2];
    this.validator.successfullUpdate =  args[3];
    this.validator.successfullDeletion =  args[4];
    this.validator.invalidInputType = args[5];
  }

  addRow(){
    this.isAdd = true;
    this.ngOnInit();
  }

  validateDetails(item: { [x: string]: string; LOT: any; }){
    let isLotPresent = this.lotIds.find((element: any[]) => {
      return element[0] == item.LOT;
    });

    for(let i in item){
      if(i == "BUCKET" || i == "LOT"){
        if(isNaN(Number(item[i])))
        {
          this.updateValidator([false, false, false, false, false, true]);
          return false;
        }
      }
    }
    
    for(let i in item){
      if(item[i] === "" && i !== "ID"){
        this.updateValidator([true, false, false, false, false, false]);
        return false;
      }
    }

    if(!isLotPresent){
      this.updateValidator([false, true, false, false, false, false]);
      return false;
    }
    return true;
  }

  saveDetails(item: any): void {
    if(this.validateDetails(item)){
      var values = this.getParameters(item, false);
      this.pushData("addPart", values);
    }
	}

  updateDetails(item: any): void {
		console.log(item);
    if(this.validateDetails(item)){
      var values = this.getParameters(item, true);
      this.pushData("updatePart", values);
    }
	}

	remove(item: { ID: any; }): void {
    let record = this.source.find((element: { ID: any; }) => {
      return element.ID === item.ID;
    });
    if(record){
      this.deletePart("deletePart?partId=", item.ID);
    }
    this.ngOnInit();
	}

}
