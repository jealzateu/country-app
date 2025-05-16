import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error HTTP interceptado:', error);

      let errorMsg = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        errorMsg = 'No se pudo conectar con el servidor';
      } else if (error.status >= 400 && error.status < 500) {
        errorMsg = error.error?.message ?? 'Error en la solicitud';
      } else if (error.status >= 500) {
        errorMsg = 'Error en el servidor, intente más tarde';
      }

      return throwError(() => new Error(errorMsg));
    })
  );
};