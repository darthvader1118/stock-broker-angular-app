import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  localStorageTS: object;
  styles:object;
  constructor() { }

  ngOnInit(): void {
    // if(localStorage.length != 0){
    //   for(var i = 0; i < localStorage.length; i++){

    //   }
    // }
    this.localStorageTS = localStorage;
    // var json = JSON.parse(localStorage.getItem('aapl'))
    // console.log(json)
    // $('.card-title').html(json.meta.ticker);
    // $('.card-text').html(json.meta.name);
    // $('#prices').append(json.data.last);
    
  }

  getJSON(jsonString : string): object {
    return JSON.parse(jsonString);
  }
  
  remove(id): void {
    localStorage.removeItem(id.id);
    window.location.reload();

  }
//   filterItemsOfType(type){
//     return this.localStorageTS.filter(x => x.data.type == type);
// }
}
