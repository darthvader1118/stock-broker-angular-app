import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import more from 'highcharts/highcharts-more';
import IndicatorsCore from 'highcharts/indicators/indicators';
import HC_stock from 'highcharts/modules/stock';
import vbp from 'highcharts/indicators/volume-by-price';





HC_stock(Highcharts);
IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-hist-chart',
  templateUrl: './hist-chart.component.html',
  styleUrls: ['./hist-chart.component.css']
})
export class HistChartComponent implements OnInit {
  ticker: string;
  response: object;
  date: Date;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  

  constructor(private http: HttpClient, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.date = new Date();
    var formatDate = this.date.toISOString().split('T')[0];
    this.actRoute.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
    });
    this.http.get('/history/' + this.ticker + '/' + formatDate, {responseType: 'json'})
    .subscribe((result)=>{
      console.log('result', Object.values(result))
      this.response = result;
      var ohlc = [];
      var volume = [];
      var resultArr = Object.values(result);
      console.log('resultArr: ' + resultArr)
      for(var i = 0; i < resultArr.length; i++){
        ohlc.push([
          resultArr[i][0],
          resultArr[i][1], // open
            resultArr[i][2], // high
            resultArr[i][3], // low
            resultArr[i][4] // 
        ]);
        volume.push([
          resultArr[i][0],
          resultArr[i][5]
        ])
      }
      this.chartOptions = {
        chart: {
            scrollablePlotArea: {
              minWidth: 10
            }
        },
        navigator: {
          enabled:true
        },
        plotOptions:{
          series: {
            showInNavigator: true
          }
        },
        rangeSelector: {
          enabled: true,
          selected: 1
        },
        title: {
          text: this.ticker.toLocaleUpperCase() + ' Historical'
        },
        subtitle: {
          text: 'with SMA and volume by price technical indicators' 
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
              enabled: true
          }
      }, {
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
      }],
      tooltip: {
        split: true
    },
    series: [{
      type: 'candlestick',
      name: this.ticker,
      id: 'ticker',
      zIndex: 2,
      data: ohlc
  }, {
      type: 'column',
      name: 'Volume',
      id: 'volume',
      data: volume,
      yAxis: 1
  }, {
      type: 'vbp',
      linkedTo: 'ticker',
      params: {
          volumeSeriesID: 'volume'
      },
      dataLabels: {
          enabled: false
      },
      zoneLines: {
          enabled: false
      }
  }, {
      type: 'sma',
      linkedTo: 'ticker',
      zIndex: 1,
      marker: {
          enabled: false
      }
  }]
      }
    })
  }

}
