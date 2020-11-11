import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith, switchMap, tap, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpServiceService} from '../http-service.service'
import { normalizeTickInterval } from 'highcharts';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {
  myControl = new FormControl();
  filteredSearch: Observable<object>
  autoComp: object;
  suggestions: object;
  searchForm: FormGroup = new FormGroup({
    ticker: this.myControl
  });
  constructor(private httpService:HttpServiceService, private router: Router, private fb: FormBuilder) { }

 
  ngOnInit(): void {
   
    this.filteredSearch = this.myControl.valueChanges
    .pipe(
      startWith('aapl'),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        return  this.httpService.getStockAutoComplete(value)
      }),
      map(res => this.autoComp = res));
      
  }
  
  onSubmit(){
    // var something = this.myControl;
    // console.warn(something);
    const ticker = this.searchForm.get('ticker').value;
    console.warn(ticker);
    this.router.navigate(['/details/' +ticker]);
  }

  // private filterSearch(value: string): Observable<object> {
  //   return this.httpService.getStockAutoComplete(value)
  //   .pipe(
  //     map((data) => data.filter(option => )
  //     )
  //   )
  // }
}
