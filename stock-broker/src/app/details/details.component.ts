import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import * as Highcharts from 'highcharts';
declare var $:any;
interface res {
  data ?: object;
  meta ?: object;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  ticker: string;
  response: res;
  date: Date;
  sub: Subscription;
  styles: object;
  openClose: string;
  openCloseStyle: object;
  // Highcharts: typeof Highcharts = Highcharts;
  // chartConstuctor: string = 'stockChart';
  // chartOptions: Highcharts.Options;

  constructor(private http:HttpClient, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.date = new Date();

    this.actRoute.paramMap.subscribe(params => {
      this.ticker = params.get('ticker');
      if(localStorage.getItem(this.ticker)){
        $('#star').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>')
      }
    });
    
    
    this.sub = timer(0,15000)
    .pipe(
      switchMap(() => this.http.get('/details/' + this.ticker, {responseType: 'json'}))
    )
    .subscribe((result)=>{
      console.warn('result', result)
      this.response = result;
      this.date = new Date();
      var lastTime = new Date(this.response['data']['timestamp']);
      if(this.date.getUTCHours() >= 21 || (this.date.getUTCHours() < 14 && this.date.getUTCMinutes() < 30)){
        this.openClose = "closed on " + this.date.toJSON().split('T')[0] + ' ' + this.addZero(lastTime.getHours()) + ':' + this.addZero(lastTime.getMinutes()) + ':' + this.addZero(lastTime.getSeconds());
        this.openCloseStyle = {
          'background-color' : '#FA8072'
        }
      }
      else{
        this.openClose = "is Open";
        this.openCloseStyle = {
          'background-color' : '#98FB98'
        }
      }
      if(this.response['data']['last'] < this.response['data']['prevClose']){
        this.styles = {
          'color' : 'red'
        }
       }
       else{
         this.styles = {
           'color' : 'green'
         }
       }


      var starObj = this.response;
      $('#star').click(function(){
        if($(this).is('.bi-star')){
          $(this).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>')
          $(this).removeClass('bi-star');
          $(this).addClass('bi-star-filled');
          // console.log(this.date);
          localStorage.setItem(starObj.meta['ticker'].toLowerCase(), JSON.stringify(starObj))
        }
        else{
         $(this).html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>');
         $(this).removeClass('bi-star-filled');
         $(this).addClass('bi-star');
         localStorage.removeItem(starObj.meta['ticker'].toLowerCase())
        } 
        });
    })

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

}
