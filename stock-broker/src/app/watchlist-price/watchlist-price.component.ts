import { Component, OnInit, Input } from '@angular/core';
import {HttpServiceService} from '../http-service.service';
declare var $:any;
@Component({
  selector: 'app-watchlist-price',
  templateUrl: './watchlist-price.component.html',
  styleUrls: ['./watchlist-price.component.css']
})
export class WatchlistPriceComponent implements OnInit {
  @Input() ticker: string;
  currentData: object;
  styles:object;

  constructor(private httpService:HttpServiceService) { }

  ngOnInit(): void {
    this.httpService.getCurrentPriceData(this.ticker)
    .subscribe(data=>{
      this.currentData = data;
      if(this.currentData['data']['last'] < this.currentData['data']['prevClose']){
       this.styles = {
         'color' : 'red'
       }
      }
      else{
        this.styles = {
          'color' : 'green'
        }
      }
    })
  }

}
