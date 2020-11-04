import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    if(args.length === 0) {
      return value;
    }
    return value.filter(e => {
      return String(e.nom).toUpperCase().indexOf(String(args).toUpperCase()) !== -1;
    });
  }

}
