import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TemperatureModel } from './models/temperature.model';
import { DataService } from './services/data.service';
import { CompressorModel } from './models/compressor.model';
import { FanModel } from './models/fan.model';
import { DefrostModel } from './models/defrost.model';
import { MatIconRegistry } from '@angular/material/icon';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly temperature$: Observable<TemperatureModel[]> =
    this.dataService
      .getTemperature()
      .pipe(map((temperatures) => this.sortByDateTime(temperatures)));

  public readonly compressor$: Observable<CompressorModel[]> = this.dataService
    .getCompressorStatus()
    .pipe(map((compressorStatuses) => this.sortByDateTime(compressorStatuses)));

  public readonly fan$: Observable<FanModel[]> = this.dataService
    .getFanStatus()
    .pipe(map((fanStatuses) => this.sortByDateTime(fanStatuses)));

  public readonly defrost$: Observable<DefrostModel[]> = this.dataService
    .getDefrostStatus()
    .pipe(map((defrostStatuses) => this.sortByDateTime(defrostStatuses)));

  chartDarkColor: string = '#101414';
  chartLightColor: string = '#e5e7eb';
  chartSeriesColors: string[] = ['#00dddd'];
  chartGridLineColor: string = '#363a39';

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    accessibility: { enabled: false },
    chart: {
      backgroundColor: this.chartDarkColor,
      type: 'areaspline',
      spacingRight: 0,
      spacingLeft: 0,
      spacingTop: 0,
      spacingBottom: 0,
    },
    title: {
      text: 'Temperatura',
      style: {
        color: this.chartLightColor,
        fontWeight: 'normal',
        fontSize: '1rem',
      },
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.1,
      },
    },
    colors: this.chartSeriesColors,
    series: [
      {
        data: [1, 2, 3],
        type: 'areaspline',
      },
    ],
    yAxis: {
      title: { text: undefined },
      labels: { style: { color: this.chartLightColor } },
      gridLineColor: this.chartGridLineColor,
    },
    xAxis: {
      lineColor: this.chartLightColor,
      labels: { style: { color: this.chartLightColor } },
      tickColor: this.chartLightColor,
    },
    credits: { enabled: false },
    legend: { enabled: false },
  };

  constructor(
    private dataService: DataService,
    private matIconReg: MatIconRegistry
  ) {}

  private sortByDateTime(data: any[]): any[] {
    return data.sort((a: any, b: any) => (a.timestamp > b.timestamp ? 1 : -1));
  }

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
