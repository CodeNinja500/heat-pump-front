import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  ngOnChanges(): void {
    if (this.title) this.chartOptions.title!.text = this.title;
    if (this.seriesData.length)
      this.chartOptions.series![0]! = {
        name: this.title,
        data: this.seriesData.map((entry) => [new Date(entry.timestamp).getTime(), entry.value]),
        type: 'areaspline'
      };
    if (this.yAxisLabels)
      this.chartOptions.yAxis = {
        title: { text: undefined },
        labels: { style: { color: this.chartLightColor } },
        gridLineColor: this.chartGridLineColor,
        tickPositions: this.yAxisLabels
      };
  }
}
