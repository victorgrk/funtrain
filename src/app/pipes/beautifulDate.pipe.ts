import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'beautifulDate'
})
export class BeautifulDatePipe implements PipeTransform {
  transform(value: any, args?: string): any {
    return moment(value).fromNow();
  }

}
