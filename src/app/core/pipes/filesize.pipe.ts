import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: number): string {
    return value ? this.getReadableFileSizeString(value) : '0 Ko'
  }
  getReadableFileSizeString(fileSizeInBytes: number): string {
    let i = -1
    const byteUnits = [' ko', ' Mo', ' Go']
    do {
      fileSizeInBytes = fileSizeInBytes / 1024
      i++
    } while (fileSizeInBytes > 1024)

    return String(Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i])
  }


}
