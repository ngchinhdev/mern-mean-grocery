import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})

export class CurrencyPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

}
