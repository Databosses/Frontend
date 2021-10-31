import { Component, OnInit } from '@angular/core';
import { DatabossApiService } from '../databoss-api.service';


@Component({
  selector: 'app-defect-details-grid',
  templateUrl: './defect-details-grid.component.html',
  styleUrls: ['./defect-details-grid.component.css']
})
export class DefectDetailsGridComponent implements OnInit {
  invalidInput: any = false;
  ifDefectExist: any = false;
  formValues = {defect_id: '', defect_type: '', defect_detail_1: "", defect_detail_2: ""};
  defect_details: any;
  defect_details1: any;
  defectDetailsFlag: any = {"SCRATCH": false, "HOLE": false, "DIM_ERR": false};
  scratch_details: any = [];
  hole_details: any = [];
  dim_err_details: any = [];
  source: any;
  invalid: boolean = false;

  keysOfDefects: any = [
    {key: "DEFECT_ID", type: "Number"}, 
    {key: "TYPE", type: "STRING"},
    {key: "PART_ID", type: "Number"},
    {key: "SEVERITY", type: "STRING"}
  ]

  keysOfDefectsDetails: any = [
    {key: "DEFECT_ID", type: "Number"}, 
    {key: "DEPTH", type: "Number"}, 
    {key: "ASPECT_RATIO", type: "STRING"},
    {key: "DIAMETER", type: "Number"},
    {key: "CIRCULAR_RATIO", type: "STRING"},
    {key: "ACTUAL_DIAMETER", type: "Number"},
    {key: "ACTUAL_HEIGHT", type: "STRING"}
  ]

  keysOfDefectsDetails1: any = [
    {key: "DEFECT_ID", type: "Number"}, 
    {key: "DEPTH", type: "Number"}, 
    {key: "ASPECT_RATIO", type: "STRING"},
    {key: "DIAMETER", type: "Number"},
    {key: "CIRCULAR_RATIO", type: "STRING"},
    {key: "ACTUAL_DIAMETER", type: "Number"},
    {key: "ACTUAL_HEIGHT", type: "STRING"},
    {key: "ID", type: "STRING"},
    {key: "TYPE", type: "STRING"}
  ]
    
  constructor(private dataService: DatabossApiService) { 
    this.getParts();
    this.getDefectDetails();
    this.getDefectDetails1();
  }

  ngOnInit() {
  }

  getDefectDetails(){
    this.scratch_details = [];
    this.hole_details = [];
    this.dim_err_details = [];

    this.dataService.getItems("getAllDefectDetails")
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          this.defect_details = response.map((part: any[]) => {
            let obj: any = {};
            for(let i = 0; i< this.keysOfDefectsDetails.length; i++){
                obj[this.keysOfDefectsDetails[i].key] = part[i];
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

  getDefectDetails1(){

    this.dataService.getItems("getAllDefectDetails1")
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          this.defect_details1 = response.map((part: any) => {
            let obj: any = {};
            for(let i = 0; i< this.keysOfDefectsDetails1.length; i++){
                obj[this.keysOfDefectsDetails1[i].key] = part[i];
            }
            return obj;
          })

          console.log(this.defect_details1);   
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  getParts() {
    this.dataService.getItems("getDefects")
      .subscribe(
        (response) => { 
          this.source = response.map((part: any) => {
            let obj:any = {};
            for(let i = 0; i< this.keysOfDefects.length; i++){
              if(this.keysOfDefects[i].type === "Date"){
                obj[this.keysOfDefects[i].key] = new Date(part[i]);
              }else{
                obj[this.keysOfDefects[i].key] = part[i];
              }
            }
            return obj;
          })
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  pushData(urlStr: string, valueStr: any) {
    this.dataService.insertData(urlStr, valueStr)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received' + response)
          this.getDefectDetails1();
          this.resetFormValues();
          this.getDefectDetails();
          this.ngOnInit();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
        })
  }

  resetFormValues(){
    this.formValues.defect_id = "";
    this.formValues.defect_type = "";
    this.formValues.defect_detail_1 = "";
    this.formValues.defect_detail_2 = "";
  }

  deleteDefect(urlStr: string, defectId: number){
    this.dataService.deleteItem(urlStr, defectId)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received' + response)
        this.resetFormValues();
        this.getDefectDetails();
        this.getDefectDetails1();
        this.ngOnInit();
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      }
    )
  }

  getParameterString(item: { [x: string]: any; }, isId: any){
    let str = "?", s;
    let countStart = isId ? 0 : 1;
    for(let i=countStart; i< this.keysOfDefects.length; i++){
      switch(this.keysOfDefects[i].type){
        case "Number":
          s = Number(item[this.keysOfDefects[i].key]);
          break;
        case "Date":
          s = Date.parse(item[this.keysOfDefects[i].key]);
          break
        Default:
          s = JSON.stringify(item[this.keysOfDefects[i].key]);
          break;
      }
      str = str + this.keysOfDefects[i].key + "=" + s + "&";
    }
    return str;
  }

  validateDetails(){
    for(let i in this.formValues){
      if((this.formValues as any)[i] === ""){
        this.invalidInput = true;
        return false;
      }
    }
    this.invalidInput = false;
    return true;
  }

  saveDetails(): void {
		this.invalid = false;
    let values: any;
    let defectType: any = this.formValues.defect_type;
    if(this.validateDetails()){
      values = this.getParameters();
      if(defectType == "SCRATCH"){
        this.pushData("addScratchDefect", values);
      }else if(defectType == "HOLE"){
        this.pushData("addHoleDefect", values);
      }else if(defectType == "DIM_ERR"){
        this.pushData("addDimErrDefect", values);
      }
    }
	}

  updateDetails(): void {
    this.invalid = false;
    let values: any;
    let defectType: any = this.formValues.defect_type;
    if(this.validateDetails()){
      values = this.getParameters();
      if(defectType == "SCRATCH"){
        this.pushData("updateScratchDefect", values);
      }else if(defectType == "HOLE"){
        this.pushData("updateHoleDefect", values);
      }else if(defectType == "DIM_ERR"){
        this.pushData("updateDimErrDefect", values);
      }
    }
	}

	remove(): void {
    if(this.formValues.defect_id != "")
      this.deleteDefect("deleteDefect?defectId=", Number(this.formValues.defect_id));
	}

  sourceEdited(e: any){
    console.log(e);
  }

  updateType(item: any, value: any){
    this.source.forEach((element: any) => {
      if(element.PART_ID === item.PART_ID && element.DEFECT_ID === item.DEFECT_ID){
        element.TYPE = value;
      }
    });
    this.ngOnInit();
  }

  defectIdChange(e: any){
    this.handleInputChange(e, null);
    this.ngOnInit();
  }

  handleInputChange(id: string, type: string | null){
    this.source.every((element: any) => {
      if(element.DEFECT_ID == id){
        let values: any;
        this.ifDefectExist = true;
        this.formValues.defect_type = type ? type : element.TYPE;
        values = this.getTypeDependentValues(this.formValues.defect_type, element.DEFECT_ID);
        this.formValues.defect_detail_1 = values.value1;
        this.formValues.defect_detail_2 = values.value2;
        return false;
      }else{
        this.ifDefectExist = false;
        this.formValues.defect_type = type ? type : "";
        this.formValues.defect_detail_1 = "";
        this.formValues.defect_detail_2 = "";
        return true;
      }
    })
  }

  getTypeDependentValues(Type: string, Id: any){
    let item: any;
    if(Type == "SCRATCH"){ 
      item = this.scratch_details.find((element: any)=> {
        return element.DEFECT_ID == Id;
      });
      return {value1: item ? item.DEPTH : "", value2: item ? item.ASPECT_RATIO : ""}
    }else if(Type == "HOLE"){
      item =  this.hole_details.find((element: any)=> {
        return element.DEFECT_ID == Id;
      })
      return {value1: item ? item.DIAMETER : "", value2: item ? item.CIRCULAR_RATIO : ""}
    }else if(Type == "DIM_ERR"){
      item = this.dim_err_details.find((element: any)=> {
        return element.DEFECT_ID == Id;
      })
      return {value1: item ? item.ACTUAL_DIAMETER : "", value2: item ? item.ACTUAL_HEIGHT : ""}
    }
    return {value1: "", value2: ""}
  }

  defectTypeChange(e: any){
    if(this.formValues.defect_id !== "")
      this.handleInputChange(this.formValues.defect_id, e.value);
  }

  getParameters(){
    let paramaters: any = [];
      paramaters.push(Number(this.formValues.defect_id));
      paramaters.push(JSON.stringify(this.formValues.defect_type));
      paramaters.push(Number(this.formValues.defect_detail_1));
      if(this.formValues.defect_type == "SCRATCH"){
        paramaters.push(JSON.stringify(this.formValues.defect_detail_2));
      }else{
        paramaters.push(Number(this.formValues.defect_detail_2));
      }
      
      return paramaters;
  }

}
