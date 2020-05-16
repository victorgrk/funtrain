import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return value.substring(0, Math.max(args-3,0)) + '...';
  }

}
