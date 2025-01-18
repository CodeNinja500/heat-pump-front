import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  imports: [HighchartsChartModule],
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnChanges {
  @Input() title: string = '';

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
      text: 'Chart title',
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

  ngOnChanges(): void {
    this.chartOptions.title!.text = this.title;
  }
}
