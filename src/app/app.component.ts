import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureModel } from './models/temperature.model';
import { DataService } from './services/data.service';
import { CompressorModel } from './models/compressor.model';
import { FanModel } from './models/fan.model';
import { DefrostModel } from './models/defrost.model';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly temperature$: Observable<TemperatureModel[]> =
    this.dataService.getTemperature();

  public readonly compressor$: Observable<CompressorModel[]> =
    this.dataService.getCompressorStatus();

  public readonly fan$: Observable<FanModel[]> =
    this.dataService.getFanStatus();

  public readonly defrost$: Observable<DefrostModel[]> =
    this.dataService.getDefrostStatus();

  constructor(
    private dataService: DataService,
    private matIconReg: MatIconRegistry
  ) {}

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
