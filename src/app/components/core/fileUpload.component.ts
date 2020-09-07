import { Component, forwardRef, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core'
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-file',
  template: `
      <input
        type="file"
        style="display: none;"
        (change)="onFileChange($event.target.files[0])"
        accept="image/*"
        #fileInput
      />
      <span class="pre" *ngIf="isImg">
        <img #image width="90" height="90"/>
      </span>
      <span class="pre" *ngIf="!isImg">
        <i class="fas fa-file-alt fa-3x"></i>
      </span>
      <span class="text" *ngIf="fileStatus !== 'progress'">
        {{ fileName ? fileName : 'Aucun fichier Sélectionné'}}
      </span>
      <div class="progress" *ngIf="fileStatus === 'progress'">
        <div
          class="progress-bar progress-bar-striped"
          role="progressbar"
          style="width: {{progress}}%;"
          [attr.aria-valuenow]="progress"
          aria-valuemin="0"
          aria-valuemax="100">
          {{progress}}%
        </div>
      </div>
      <button class="btn btn-primary" (click)="fileInput.click()" *ngIf="fileStatus === '' && !fileName">
        <i class="fas fa-file-upload fa-3x"></i>
      </button>
      <button class="btn btn-primary" (click)="fileInput.click()" *ngIf="fileStatus === 'finish' || fileName.length > 0">
        <i class="fas fa-trash-alt fa-3x"></i>
      </button>
  `,
  styles: [`
    :host {
      padding: 5px;
      display: inline-flex;
      flex-direction: row;
      justify-contents: space-between;
      height: 70px;
    }
    .pre {
      width: 60px;
      height 100%;
    }
    button {
      height: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],

})
export class FileUploadComponent implements ControlValueAccessor {
  disabled = false
  fileName = ''
  fileStatus = ''
  isImg = false
  progress = 0
  private mimeTypes = ['png', 'jpg', 'gif', 'webp', 'tiff', 'raw', 'svg', 'bmp']

  @Output()
  private add = new EventEmitter<void>()

  @Output()
  private remove = new EventEmitter<void>()

  @ViewChild('img', { static: false })
  private imageRef: ElementRef<HTMLImageElement>

  propagateChange = (_: any) => { }
  constructor(private $client: HttpClient) { }

  upload(file: File) {
    const fd = new FormData()
    fd.append('file', file)
    this.add.emit()
    this.$client.post('/api/files', fd, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return { status: 'progress', current: Math.round((100 * event.loaded) / event.total) }
          case HttpEventType.Response:
            return { status: 'finish', body: event.body }
          default:
            return {
              status: 'error', body: `Unhandle event: ${event.type}`
            }
        }
      })
    ).subscribe(success => {
      this.fileStatus = success.status
      switch (success.status) {
        case 'progress':
          this.progress = success.current
          break
        case 'finish':
          this.fileName = String(success.body)
          this.isImg = this.mimeTypes.includes(this.fileName)
          this.propagateChange(success.body)
          break
        default:
          this.fileStatus = 'error'
          break
      }
    }, () => {
      this.fileStatus = 'error'
    })

  }
  writeValue(value: string): void {
    const val = value.split('.')
    const ext = val[val.length - 1]
    this.isImg = this.mimeTypes.includes(ext)
    this.fileName = value.replace(
      /^(https?\:\/\/[0-9a-z\-\.]{1,34}\.[a-z]{2,4}\/)/,
      ''
    )
    if (value === '' || !this.isImg) {
      return
    }
    fetch(value)
      .then(data => data.blob())
      .then(blob => new File([blob], 'image', { type: `image/${ext}` }))
      .then((file) => this.readFile(file))
  }

  toggleEvent() {

  }

  onRemove() {
    if (this.fileName) {
      this.$client.delete(`/api/files/${this.fileName}`).subscribe(() => this.remove.emit())
    }
    else {
      this.remove.emit()
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled !== undefined) {
      this.disabled = isDisabled
    }
  }

  private readFile(file: File) {
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: ProgressEvent) => {
      this.imageRef.nativeElement.src = String((e.target as FileReader).result)
    }
  }

}
