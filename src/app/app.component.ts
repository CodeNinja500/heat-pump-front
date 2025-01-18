import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { TemperatureModel } from './models/temperature.model';
import { DataService } from './services/data.service';
import { CompressorModel } from './models/compressor.model';
import { FanModel } from './models/fan.model';
import { DefrostModel } from './models/defrost.model';
import { MatIconRegistry } from '@angular/material/icon';
import { TemperatureResponse } from './models/temperature.response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly temperature$: Observable<TemperatureResponse[]> =
    this.dataService.getTemperature().pipe(shareReplay(1));

  public readonly compressor$: Observable<CompressorModel[]> = this.dataService
    .getCompressorStatus()
    .pipe(map((compressorStatuses) => this.sortByDateTime(compressorStatuses)));

  public readonly fan$: Observable<FanModel[]> = this.dataService
    .getFanStatus()
    .pipe(map((fanStatuses) => this.sortByDateTime(fanStatuses)));

  public readonly defrost$: Observable<DefrostModel[]> = this.dataService
    .getDefrostStatus()
    .pipe(map((defrostStatuses) => this.sortByDateTime(defrostStatuses)));

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
