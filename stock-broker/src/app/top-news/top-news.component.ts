import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.css']
})
export class TopNewsComponent implements OnInit {
  ticker: string;
  response: object;
  date: Date;
  constructor(private http: HttpClient, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.date = new Date();
    this.actRoute.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
    });
    this.http.get('/news/' + this.ticker, {responseType: 'json'})
    .subscribe((result)=>{
      console.warn('result', result)
      this.response = result['articles'];
    })
  }
  

}
