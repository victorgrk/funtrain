import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limit'
})
export class LimitPipe implements PipeTransform {

  transform(value: any[], args: number): any[] {
    const start = (Math.max(args - 1, 0)) * 9;
    return value.slice(start, start + 9);
  }
}
