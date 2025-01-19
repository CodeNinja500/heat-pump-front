import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { DataService } from './services/data.service';
import { MatIconRegistry } from '@angular/material/icon';
import { TemperatureModel } from './models/temperature.model';
import { PeriferialStatusModel } from './models/periferialStatus.model';
import { ChartDataModel } from './models/chartData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public readonly temperature$: Observable<TemperatureModel[]> = this.dataService.getTemperature().pipe(shareReplay(1));
  public readonly compressor$: Observable<ChartDataModel[]> = this.dataService
    .getCompressorStatus()
    .pipe(map((data) => this.mapStatusToValue(data)));
  public readonly fan$: Observable<ChartDataModel[]> = this.dataService
    .getFanStatus()
    .pipe(map((data) => this.mapStatusToValue(data)));

  public readonly defrost$: Observable<ChartDataModel[]> = this.dataService
    .getDefrostStatus()
    .pipe(map((data) => this.mapStatusToValue(data)));

  constructor(private dataService: DataService, private matIconReg: MatIconRegistry) {}

  private sortByDateTime(data: any[]): any[] {
    return data.sort((a: any, b: any) => (a.timestamp > b.timestamp ? 1 : -1));
  }

  private mapStatusToValue(data: PeriferialStatusModel[]): ChartDataModel[] {
    return data.map((entry) => ({ value: +entry.status, timestamp: entry.timestamp }));
  }

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
