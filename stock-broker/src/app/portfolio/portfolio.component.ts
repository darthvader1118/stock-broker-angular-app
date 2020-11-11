import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  localStorageTS: object;
  
  constructor() { }

  ngOnInit(): void {
    this.localStorageTS = localStorage;
  }
  getJSON(jsonString : string): object {
    return JSON.parse(jsonString);
  }
  
}
