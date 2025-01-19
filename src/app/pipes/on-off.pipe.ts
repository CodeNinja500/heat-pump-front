import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onOff',
  standalone: false
})
export class OnOffPipe implements PipeTransform {
  transform(value: boolean | number, ...args: unknown[]): string {
    if (value == true) {
      return 'ON';
    } else if (value == false) {
      return 'OFF';
    } else {
      return '';
    }
  }
}
