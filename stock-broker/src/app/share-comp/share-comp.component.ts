import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-share-comp',
  templateUrl: './share-comp.component.html',
  styleUrls: ['./share-comp.component.css']
})
export class ShareCompComponent implements OnInit {
  @Input() ticker: string;
  @Input() shares: number; 
  currentData: object;
  styles: object;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    console.log(this.ticker)
    this.http.get('/details/' + this.ticker, {responseType: 'json'})
    .subscribe(result=> {
      console.log(result)
      
      this.currentData = result;
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
