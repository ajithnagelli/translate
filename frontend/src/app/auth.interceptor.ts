import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = (localStorage.getItem("token") || '');
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      let headers = new HttpHeaders();
      headers = headers.set(
        "Authorization",
        token
      );
      request = request.clone({
        headers
      });
    }
    return next.handle(request);
  }
}
