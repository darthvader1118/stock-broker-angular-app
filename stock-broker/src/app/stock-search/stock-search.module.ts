import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockSearchComponent } from './stock-search.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsComponent } from '../details/details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import { DailyChartComponent } from '../daily-chart/daily-chart.component';
import { TopNewsComponent } from '../top-news/top-news.component';
import { HistChartComponent } from '../hist-chart/hist-chart.component';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NewsModalComponent } from '../news-modal/news-modal.component';


@NgModule({
  declarations: [
    StockSearchComponent,
    DetailsComponent,
    DailyChartComponent,
    TopNewsComponent,
    HistChartComponent,
    BuyModalComponent,
    NewsModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HighchartsChartModule,
    MatAutocompleteModule,
    NgbModule
   
  ],
  exports: [
    StockSearchComponent,
    DetailsComponent,
    DailyChartComponent,
    TopNewsComponent,
    HistChartComponent,
    BuyModalComponent
  ]
})
export class StockSearchModule { }
