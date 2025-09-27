import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-range-select',
  imports: [CommonModule, MatButtonModule, BrowserModule],
  templateUrl: './range-select.component.html',
  styleUrl: './range-select.component.scss'
})
export class RangeSelectComponent implements OnInit {
  rangeOptions: { value: number; text: string }[] = [
    {
      value: 1 * 3600 * 1000,
      text: '1h'
    },
    {
      value: 3 * 3600 * 1000,
      text: '3h'
    },
    {
      value: 12 * 3600 * 1000,
      text: '12h'
    },
    {
      value: 24 * 3600 * 1000,
      text: '24h'
    }
  ];

  storageKey = 'TIME_RANGE';

  public readonly selectedTimeRange$ = this.timeService.selectedTimeRange$;

  constructor(private timeService: TimeService, private _storage: Storage) {}

  setTimeRange(value: number) {
    this.timeService.setTimeRange(value);
    this._storage.setItem(this.storageKey, value.toString());
  }

  setInitialTimeRange() {
    const savedTimeRange = this._storage.getItem(this.storageKey);
    if (savedTimeRange) {
      this.setTimeRange(+savedTimeRange);
    } else {
      this.setTimeRange(this.rangeOptions[1].value);
    }
  }

  ngOnInit(): void {
    this.setInitialTimeRange();
  }
}
