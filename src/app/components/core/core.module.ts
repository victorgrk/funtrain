import { NgModule } from "@angular/core";
import { FileUploadComponent } from './fileUpload.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent]
})
export class CoreModule { }
