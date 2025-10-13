import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { max, Observable, Subject } from 'rxjs';
import { ChartDataModel } from 'src/app/models/chartData.model';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {
  @Input() title: string = '';
  @Input() seriesData: ChartDataModel[] = [];
  @Input() seriesName: string = '';
  @Input() yMinValue: number | undefined = undefined;
  @Input() yMaxValue: number | undefined = undefined;
  @Input() yAxisLabels: number[] | undefined = undefined;
  @Input() rangeInMiliseconds: number = 24 * 3600 * 1000;

  @ViewChild('chart') chart!: Highcharts.Chart;

  chartDarkColor: string = '#101414';
  chartLightColor: string = '#e5e7eb';
  chartSeriesColors: string[] = ['#00dddd'];
  chartGridLineColor: string = '#363a39';

  Highcharts: typeof Highcharts = Highcharts;

  timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

  update: boolean = false;

  chartOptions: Highcharts.Options = {
    accessibility: { enabled: false },
    chart: {
      backgroundColor: this.chartDarkColor,
      type: 'areaspline',
      spacingRight: 0,
      spacingLeft: 0,
      spacingTop: 0,
      spacingBottom: 0
    },
    title: {
      text: 'Chart title',
      style: {
        color: this.chartLightColor,
        fontWeight: 'normal',
        fontSize: '1rem'
      }
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.1
      }
    },
    colors: this.chartSeriesColors,
    series: [
      {
        data: [1, 2, 3],
        type: 'areaspline',
        dataLabels: {
          enabled: true
        }
      }
    ],
    yAxis: {
      title: { text: undefined },
      labels: { style: { color: this.chartLightColor } },
      gridLineColor: this.chartGridLineColor
    },
    xAxis: {
      type: 'datetime',
      min: Date.now() - this.timeZoneOffset - this.rangeInMiliseconds, // 24 hours ago
      max: Date.now() - this.timeZoneOffset, // now
      lineColor: this.chartLightColor,
      labels: {
        style: { color: this.chartLightColor },
        format: '{value:%H:%M}'
      },
      tickColor: this.chartLightColor
    },
    tooltip: {
      xDateFormat: '%H:%M:%S', // Tooltip in 24-hour format
      pointFormat: '{series.name}: <b>{point.y}°C</b>'
    },
    credits: { enabled: false },
    legend: { enabled: false }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.title) this.chartOptions.title!.text = this.title;
    if (this.seriesData.length)
      this.chartOptions.series![0]! = {
        name: this.title,
        data: this.seriesData.map((entry) => [new Date(entry.timeStamp).getTime() - this.timeZoneOffset, entry.value]),
        type: 'areaspline'
      };
    if (this.yAxisLabels)
      this.chartOptions.yAxis = {
        title: { text: undefined },
        labels: { style: { color: this.chartLightColor } },
        gridLineColor: this.chartGridLineColor,
        tickPositions: this.yAxisLabels
      };
    if ('rangeInMiliseconds' in changes) {
      this.chartOptions.xAxis! = {
        ...this.chartOptions.xAxis,
        min: Date.now() - this.timeZoneOffset - this.rangeInMiliseconds
      };
      this.update = true;
    }
  }
}
