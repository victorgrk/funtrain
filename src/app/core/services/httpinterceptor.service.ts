import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ToastrService } from './toastr.service'

@Injectable()
export class HTTPToastrInterceptor implements HttpInterceptor {
  constructor(private $toastr: ToastrService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.$toastr.error(error)
        return throwError(error.error)
      })
    )
  }
}
