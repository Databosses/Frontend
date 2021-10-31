import { Component, OnInit } from '@angular/core';
import { DatabossApiService } from '../databoss-api.service';
//TODO
//Validations
//notifiers
//creation-updation-deletion
//refresh grid

@Component({
  selector: 'app-defect-grid',
  templateUrl: './defect-grid.component.html',
  styleUrls: ['./defect-grid.component.css']
})
export class DefectGridComponent implements OnInit {
  defect_details: any;
  defects: any;
  defectKeys = ["ID", "TYPE"];
  defectDetailsFlag: any = {"SCRATCH": false, "HOLE": false, "DIM_ERR": false};
  scratch_details: any = [];
  hole_details: any = [];
  dim_err_details: any = [];
  source: any;
  isAdd: any = false;
  invalid: boolean = false;
  keysOfDefects: any = ["DEFECT_ID","TYPE","PART_ID","SEVERITY", "DEFECT_COUNT"];
  keysOfParts: any = ["ID", "TEST_START_TIME","TEST_END_TIME", "BUCKET","LOT"];
  parts: any;

  keysOfDefectsDetails: any = ["DEFECT_ID", "DEPTH", "ASPECT_RATIO", "DIAMETER", "CIRCULAR_RATIO", "ACTUAL_DIAMETER", "ACTUAL_HEIGHT"]
  
    emptySource = {
        "ID": "",
        "DEFECT_ID": "",
        "TYPE": "",
        "PART_ID": "",
        "SEVERITY": "",
        "DEFECT_COUNT": ""
    }

    validator: any = {invalidInput: false, 
      partDoesntExist: false, 
      defectDoesntExist: false, 
      successfullUpdate: false, 
      successfullCreation: false, 
      successfulDeletion: false,
      partIdCannotBeChanged: false
    };
    
  constructor(private dataService: DatabossApiService) { 
    this.getPartsDefects();
    this.getDefects();
    this.getParts();
  }

  ngOnInit() {
    this.updateValidator([false, false, false, false, false, false]);
  }

  updateValidator(args: any[]){
    this.validator.invalidInput = args[0];
    this.validator.partDoesntExist = args[1];
    this.validator.defectDoesntExist = args[2];
    this.validator.successfullCreation = args[3];
    this.validator.successfullUpdate =  args[4];
    this.validator.successfullDeletion =  args[5];
    this.validator.partIdCannotBeChanged = args[6];
  }

  public getParts() {
    this.dataService.getItems("getParts")
      .subscribe(
        (response) => {
          this.parts = response.map((part: any[]) => {
            let obj: any = {};
            for(let i = 0; i< this.keysOfParts.length; i++){
              if(this.keysOfParts[i] === "TEST_START_TIME" || this.keysOfParts[i] === "TEST_END_TIME"){
                obj[this.keysOfParts[i]] = new Date(part[i]);
              }else{
                obj[this.keysOfParts[i]] = part[i];
              }
            }
            return obj;
          })
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  getDefects(){
    this.dataService.getItems("getDefects")
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received' + response)
        this.defects = response.map((item: any[]) => {
          let obj: any = {};
          for(let i = 0; i< this.defectKeys.length; i++){
              obj[this.defectKeys[i]] = item[i];
          }
          return obj;
        })
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      }
    )
  }

  getDefectDetails(id: string){
    this.scratch_details = [];
    this.hole_details = [];
    this.dim_err_details = [];

    this.dataService.getItems("getDefectDetails?defectId=" + id)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          
          this.defect_details = response.map((part: any[]) => {
            let obj: any = {};
            for(let i = 0; i< this.keysOfDefectsDetails.length; i++){
                obj[this.keysOfDefectsDetails[i]] = part[i];
            }
            return obj;
          })
            this.defect_details.forEach((element: { ASPECT_RATIO: any; DEPTH: any; DIAMETER: any; CIRCULAR_RATIO: any; ACTUAL_DIAMETER: any; ACTUAL_HEIGHT: any; }) => {
              if(element.ASPECT_RATIO && element.DEPTH){
                this.scratch_details.push(element);
              }else if(element.DIAMETER && element.CIRCULAR_RATIO){
                this.hole_details.push(element);
              }else if(element.ACTUAL_DIAMETER && element.ACTUAL_HEIGHT){
                this.dim_err_details.push(element);
              }
            });                 
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  public getPartsDefects() {
    this.dataService.getItems("getPartDefects")
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          let index = 0;
          this.source = response.map((part: any[]) => {
            let obj: any = {};
            obj["ID"] = ++index;
            for(let i = 0; i< this.keysOfDefects.length; i++){
                obj[this.keysOfDefects[i]] = part[i];
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

  public pushData(urlStr: string, values: any) {
    this.dataService.insertData(urlStr, values)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          this.getPartsDefects();
          this.ngOnInit();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  public deletePartDefect(urlStr: string, partId: any){
    this.dataService.deleteItem(urlStr, partId)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received' + response)
        this.ngOnInit();
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      }
    )
  }

  getParameters(item: { [x: string]: any; }){
    let parameters: any = [];
    for(let i=0; i< this.keysOfDefects.length; i++){
      switch(this.keysOfDefects[i]){
        case "DEFECT_ID":
        case "PART_ID":  
        case "DEFECT_COUNT":
          parameters.push(Number(item[this.keysOfDefects[i]]));
          break;
        case "SEVERITY":
          parameters.push(JSON.stringify(item[this.keysOfDefects[i]]));
          break;
      }
    }
    return parameters;
  }

  addRow(){
    this.invalid = false;
    this.isAdd = true;
    this.getPartsDefects();
    this.ngOnInit();
  }

  validateDetails(item: { [x: string]: string; PART_ID: any; DEFECT_ID: any; }){
    let isPartPresent = this.parts.find((element: { ID: any; }) => {
      return element.ID == item.PART_ID;
    });

    let isDefectPresent = this.defects.find((element: { ID: any; }) => {
      return element.ID == item.DEFECT_ID;
    })
    
    for(let i in item){
      if(item[i] === "" && i !== "ID"){
        this.updateValidator([true, false, false, false, false, false, false]);
        return false;
      }
    }

    if(!isPartPresent){
      this.updateValidator([false, true, false, false, false, false, false]);
      return false;
    }

    if(!isDefectPresent){
      this.updateValidator([false, false, true, false, false, false, false]);
      return false;
    }
    return true;
  }

  saveDetails(item: any): void {
    if(this.validateDetails(item)){
      var values = this.getParameters(item);
      this.pushData("addPartDefect", values);
    }
	}

  updateDetails(item: any): void {
    if(this.validateDetails(item)){
      var values = this.getParameters(item);
      this.pushData("updatePartDefect", values);
    }
	}

	remove(item: { ID: any; DEFECT_ID: any; PART_ID: any; }): void {
    this.invalid = false;
		console.log(item);
    let record = this.source.find((element: { ID: any; }) => {
      return element.ID === item.ID;
    });
    if(record){
      this.deletePartDefect(`deletePartDefect?defectId=${item.DEFECT_ID}&partId=`, item.PART_ID);
    }
    this.getPartsDefects();
    this.ngOnInit();
	}

  updateType(item: { PART_ID: any; DEFECT_ID: any; }, value: any){
    this.source.forEach((element: { PART_ID: any; DEFECT_ID: any; SEVERITY: any; }) => {
      if(element.PART_ID === item.PART_ID && element.DEFECT_ID === item.DEFECT_ID){
        element.SEVERITY = value;
      }
    });
    this.ngOnInit();
  }

  showDefectDetails(item: { DEFECT_ID: any; }){
    this.getDefectDetails(item.DEFECT_ID);
  }

  refreshComponent(){
    this.scratch_details = [];
    this.hole_details = [];
    this.dim_err_details = [];
    this.getPartsDefects();
    this.ngOnInit();
  }

  sourceEdited(e: { before: { PART_ID: any; ID: string; }; after: { PART_ID: any; DEFECT_ID: any; ID: any; }; }){
    console.log(e);
    if(e.before.PART_ID != e.after.PART_ID && e.before.ID !== ""){
      this.source.forEach((element: { ID: any; PART_ID: any; }) => {
        if(element.ID == e.before.ID){
          element.PART_ID=e.before.PART_ID;
        }
      });
      this.ngOnInit();
      this.updateValidator([false,false,false,false,false,false,true]);
    }else{
      let item = this.defects.find((element: { ID: any; })=> {return element.ID == e.after.DEFECT_ID});
      if(item){
        this.source.forEach((element: { ID: any; TYPE: any; }) => {
          if(element.ID == e.after.ID){
            element.TYPE=item.TYPE;
          }
        });  
      }
      this.ngOnInit();
    }
    
  }

}
