import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabossApiService {
  private REST_API_SERVER = "http://localhost:5000/";
  constructor(private http: HttpClient) { }

  public sendGetRequest(value: string){
    return this.http.get(this.REST_API_SERVER + value);
  }

  public sendPostRequest(value: string, header: any){
    return this.http.post<any>(this.REST_API_SERVER + value, header, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })}
    ).pipe(catchError(this.handleError));
  }
  
  handleError(handleError: any): import("rxjs").OperatorFunction<object, any> {
    console.log("I am now here")
    throw new Error('Bad response.');
  }
}
