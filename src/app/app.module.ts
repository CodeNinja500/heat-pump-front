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

@NgModule({
  declarations: [AppComponent, OnOffPipe],
  imports: [
    BrowserModule,
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ChartComponent,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
