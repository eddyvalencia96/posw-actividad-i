import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const requestWithHeaders = req.clone({
    setHeaders: {
      'X-App-Client': 'ecommerce-admin-dashboard'
    }
  });

  return next(requestWithHeaders).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP request failed', {
        url: requestWithHeaders.url,
        status: error.status,
        message: error.message
      });
      return throwError(() => error);
    })
  );
};
