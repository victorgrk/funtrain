import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(tab: any[], args?: string): any {
    const name = args.split(',')[0]
    const software = Number(args.split(',')[1])
    const region = args.split(',')[2]
    if (!tab) {
      return;
    }
    let buffer: any[] = tab;
    if (region && region !== 'all') {
      buffer = buffer.filter(e => e.region && e.region.includes(region))
    }
    if (name) {
      buffer = buffer.filter(e => e.nom && e.nom.toLowerCase().startsWith(name.toLowerCase()))
    }
    if (software) {
      buffer = buffer.filter(e => e.softID && e.softID === software || e.softId && e.softId === software)
    }
    return buffer
  }
}