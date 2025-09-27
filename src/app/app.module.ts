import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { OnOffPipe } from './pipes/on-off.pipe';
import { ChartComponent } from './components/chart/chart.component';
import { RangeSelectComponent } from './components/range-select/range-select.component';

@NgModule({
  declarations: [AppComponent, OnOffPipe],
  imports: [
    BrowserModule,
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ChartComponent,
    RangeSelectComponent
  ],
  providers: [provideAnimationsAsync(), { provide: Storage, useValue: localStorage }],
  bootstrap: [AppComponent]
})
export class AppModule {}
