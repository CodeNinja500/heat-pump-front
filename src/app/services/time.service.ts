import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private _selectedTimeRangeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly selectedTimeRange$: Observable<number> = this._selectedTimeRangeSubject.asObservable();

  constructor() {}

  setTimeRange(value: number) {
    this._selectedTimeRangeSubject.next(value);
  }
}
