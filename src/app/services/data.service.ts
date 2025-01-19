import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TemperatureModel } from '../models/temperature.model';
import { PeriferialStatusModel } from '../models/periferialStatus.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = `http://${environment.apiUrl}/api/data/`;

  constructor(private httpClient: HttpClient) {}

  getTemperature(): Observable<TemperatureModel[]> {
    return this.httpClient.get<TemperatureModel[]>(this.apiUrl + 'temperature');
  }

  getCompressorStatus(): Observable<PeriferialStatusModel[]> {
    return this.httpClient.get<PeriferialStatusModel[]>(this.apiUrl + 'compressor');
  }

  getFanStatus(): Observable<PeriferialStatusModel[]> {
    return this.httpClient.get<PeriferialStatusModel[]>(this.apiUrl + 'fan');
  }

  getDefrostStatus(): Observable<PeriferialStatusModel[]> {
    return this.httpClient.get<PeriferialStatusModel[]>(this.apiUrl + 'defrost');
  }
}
