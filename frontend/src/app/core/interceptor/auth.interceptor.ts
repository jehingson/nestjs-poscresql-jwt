import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // if (request.context.get(CHECK_TOKEN)) {
    //   return this.addToken(request, next);
    // }
    return this.addToken(request, next);
  }

  private addToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const storage = this.storageService.getUser();
    console.log('storage', storage);
    const accessToken = storage?.token ?? null;
    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
