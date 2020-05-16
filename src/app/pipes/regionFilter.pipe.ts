import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regionFilter'
})
export class RegionFilterPipe implements PipeTransform {

  transform(value: any, filter: string): any {
    if (filter === 'all') {
      return value;
    }
    return value.filter(item => String(item.region).indexOf(filter) !== -1);
  }

}
