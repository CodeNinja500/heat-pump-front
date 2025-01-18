import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureModel } from '../models/temperature.model';
import { CompressorModel } from '../models/compressor.model';
import { FanModel } from '../models/fan.model';
import { DefrostModel } from '../models/defrost.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl: string = `http://${environment.apiUrl}/api/data/`;

  constructor(private httpClient: HttpClient) {}

  getTemperature(): Observable<TemperatureModel[]> {
    return this.httpClient.get<TemperatureModel[]>(this.apiUrl + 'temperature');
  }

  getCompressorStatus(): Observable<CompressorModel[]> {
    return this.httpClient.get<CompressorModel[]>(this.apiUrl + 'compressor');
  }

  getFanStatus(): Observable<FanModel[]> {
    return this.httpClient.get<FanModel[]>(this.apiUrl + 'fan');
  }

  getDefrostStatus(): Observable<DefrostModel[]> {
    return this.httpClient.get<DefrostModel[]>(this.apiUrl + 'defrost');
  }
}
