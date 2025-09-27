import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScaleService {
  private readonly _scaleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public readonly scale$: Observable<number> = this._scaleSubject.asObservable();

  constructor() {}

  zoomIn() {
    this.scale$
      .pipe(
        take(1),
        tap((level) => this._scaleSubject.next(level * 2))
      )
      .subscribe();
  }

  zoomOut() {
    this.scale$
      .pipe(
        take(1),
        tap((level) => this._scaleSubject.next(level / 2))
      )
      .subscribe();
  }
}
