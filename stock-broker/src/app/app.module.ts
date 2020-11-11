import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {FormsModule} from '@angular/forms';
import { StockSearchModule } from './stock-search/stock-search.module';
import { FooterComponent } from './footer/footer.component';
import { DetailsComponent } from './details/details.component'
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgInitDirectiveDirective } from './ng-init-directive.directive';
import { ShareCompComponent } from './share-comp/share-comp.component';
import { SellModalComponent } from './sell-modal/sell-modal.component';
import { WatchlistPriceComponent } from './watchlist-price/watchlist-price.component';
//import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WatchlistComponent,
    PortfolioComponent,
    FooterComponent,
    NgInitDirectiveDirective,
    ShareCompComponent,
    SellModalComponent,
    WatchlistPriceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    StockSearchModule,
    MatTabsModule,
    FormsModule,
    //HighchartsChartModule,
    //HighchartsChartModule,
RouterModule.forRoot([
    { path: '', component: StockSearchComponent },
    { path: 'watchlist', component: WatchlistComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'details/:ticker', component: DetailsComponent }
], {
    initialNavigation: 'enabled'
}),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
