import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css']
})
export class DailyChartComponent implements OnInit {
  ticker: string;
  date: Date;
  response: object;
  Highcharts: typeof Highcharts = Highcharts;
  chartConstuctor: string = 'stockChart';
  chartOptions: Highcharts.Options;

  constructor(private http: HttpClient, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.date = new Date();
    var formatDate = this.date.toISOString().split('T')[0];
    this.actRoute.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
    });
    this.http.get('/details/' + this.ticker + '/' + formatDate, {responseType: 'json'})
    .subscribe((result)=>{
      console.warn('result', result)
      this.response = result;
      console.log(Object.values(result));
      this.chartOptions = {
        title: {
          text: this.ticker.toLocaleUpperCase()
        },
        navigator: {
          enabled:true
        },
        xAxis: {
          type: 'datetime'
        },
        series: [
          {
            name: 'Stock Price',
            yAxis: 0,
            data: Object.values(result),
            type: 'line'
          }
        ]
      }
    })
  }

}
