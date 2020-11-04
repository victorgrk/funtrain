import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {
  transform(value: string, args: number): string {
    if (!value) {
      return ''
    }
    if (args > value.length) {
      return value
    }
    return value.slice(0, Math.max(args - 3, 0)) + '...'
  }
}
