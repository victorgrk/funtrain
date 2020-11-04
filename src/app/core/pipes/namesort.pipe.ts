import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'namesort'
})
export class NamesortPipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    if (!value) {
      return []
    }
    if (!args) {
      return value
    }
    const prefix = args[0] === '-' ? -1 : 1
    const arg = args.replace(/\-/, '')
    return value.sort((a, b) => prefix * Math.sign(a[arg] - b[arg]))
  }
}
