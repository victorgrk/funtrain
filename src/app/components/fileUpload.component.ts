import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { APIService } from '../core/services/API.service';
@Component({
  selector: 'app-file',
  template: `
      <input
        type="file"
        style="display: none;"
        (change)="upload($event.target.files[0])"
        #fileInput
      />
      <span class="pre">
        <i class="fas {{icon || 'fa-file-alt' }} fa-2x"></i>
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
      <i class="fas fa-file-upload fa-2x" (click)="fileInput.click()" *ngIf="fileStatus === '' && !fileName"></i>
      <i class="fas fa-trash-alt fa-2x" (click)="onRemove()" *ngIf="fileStatus === 'finish' || fileName.length > 0"></i>
  `,
  styles: [`
    :host {
      padding: 5px;
      display: inline-flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
    }
    .pre {
      margin: auto 0;
    }
    .fa-tash-alt {
      color: red !important;
      transition: all .3s ease-in;
    }
    .fa-trash-alt:hover {
      color: lighten(red, 20%);
    }
    .fa-file-upload {
      transition: all .3s ease-in;
    }
    .fa-file-upload:hover {
      color: green !important;
    }
    .text {
      margin: auto;
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
  private originalFileName = null

  @Input()
  icon: string;

  @Output()
  private add = new EventEmitter<void>()

  @Output()
  private remove = new EventEmitter<void>()

  propagateChange = (_: any) => { }
  constructor(private $client: APIService) { }

  upload(file: File) {
    if (!file) {
      return;
    }
    this.add.emit()
    this.$client.uploadFile(file).subscribe(success => {
      this.fileStatus = success.status
      switch (success.status) {
        case 'progress':
          this.progress = success.current
          break
        case 'finish':
          const filename = String(success.body);
          this.propagateChange(filename)
          this.fileName = filename
          break
        default:
          break
      }
    }, () => {
      this.fileStatus = 'error'
    })
  }
  writeValue(value: string): void {

    if (!value) {
      value = ''
    }
    this.originalFileName = value.replace(environment.apiUrl, '')
    console.log(this.originalFileName)
    this.fileName = this.getFilename(value)

  }
  getFilename(link: string) {
    return link.substring(link.lastIndexOf("/") + 1, link.length);
  }

  onRemove() {
    this.$client.patch(`files`, { url: this.originalFileName || this.fileName }).subscribe(() => this.remove.emit())
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

}
