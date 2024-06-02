import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  let authReq = req;
  authService.initializeAccessToken();

  const accessToken = authService.getAccessToken();

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true
    });
  }

  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        console.error('Unauthorized request:', err);
        authService.clearAccessToken();

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            const newAccessToken = res.newAccessToken;
            authService.saveAccessToken(newAccessToken);

            authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            return next(authReq);
          }),
          catchError(refreshErr => {
            console.error('Refresh token error:', refreshErr);
            return throwError(() => refreshErr);
          })
        );
      } else {
        console.error('HTTP error:', err);
        return throwError(() => err);
      }
    })
  );
};
