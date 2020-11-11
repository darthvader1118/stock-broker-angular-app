import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }


  getCurrentPriceData(ticker2: string){
   return this.http.get('/details/' + ticker2, {responseType: 'json'})
  
}
  getStockAutoComplete(search: any){
    return this.http.get('/search/' + search, {responseType: 'json'})
  }
}
