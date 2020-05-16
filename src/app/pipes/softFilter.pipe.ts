import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'softFilter'
})
export class SoftFilterPipe implements PipeTransform {

  transform(value: any, filter: string): any {
    if (filter === 'all') {
      return value;
    }
    return value.filter(item => String(item.softID).indexOf(filter) !== -1);
  }

}
