import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { JSONWebTokens } from '../models/json-web-tokens';
import { catchError, concatMap } from 'rxjs/operators';

const AUTHORIZATION = 'Authorization';

@Injectable()
export class ProductInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLoggedIn()) {
      return next.handle(request);
    }

    let interceptRequest = request;
    const token = this.tokenService.getToken();

    interceptRequest = this.addToken(request, token);

    return next.handle(interceptRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const dto: JSONWebTokens = new JSONWebTokens(
            this.tokenService.getToken()
          );
          return this.authService.refresh(dto).pipe(
            concatMap((data: any) => {
              console.log('refreshing....');
              this.tokenService.setToken(data.token);
              interceptRequest = this.addToken(request, data.token);
              return next.handle(interceptRequest);
            })
          );
        } else {
          this.tokenService.logOut();
          return throwError(error);
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
