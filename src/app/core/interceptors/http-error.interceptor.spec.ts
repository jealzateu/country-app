import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { httpErrorInterceptor } from './http-error.interceptor';

describe('httpErrorInterceptor', () => {
  let request: HttpRequest<unknown>;
  let next: jasmine.Spy;

  beforeEach(() => {
    request = new HttpRequest('GET', '/test');
    spyOn(console, 'error');
  });

  function runInterceptorWithError(errorResponse: HttpErrorResponse, expectedMessage: string) {
    next = jasmine.createSpy('next').and.callFake(() => {
      return throwError(() => errorResponse);
    });

    const result$ = httpErrorInterceptor(request, next);

    result$.subscribe({
      next: () => fail('Debe fallar la petición'),
      error: (error: Error) => {
        expect(error.message).toBe(expectedMessage);
        expect(console.error).toHaveBeenCalledWith('Error HTTP interceptado:', errorResponse);
      }
    });
  }

  it('should handle error with status 0 (network error)', () => {
    const errorResponse = new HttpErrorResponse({ status: 0, error: null, url: '/test' });
    runInterceptorWithError(errorResponse, 'No se pudo conectar con el servidor');
  });

  it('should handle 4xx errors with error message', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      error: { message: 'Recurso no encontrado' },
      url: '/test'
    });
    runInterceptorWithError(errorResponse, 'Recurso no encontrado');
  });

  it('should handle 4xx errors without error message', () => {
    const errorResponse = new HttpErrorResponse({
      status: 400,
      error: null,
      url: '/test'
    });
    runInterceptorWithError(errorResponse, 'Error en la solicitud');
  });

  it('should handle 5xx errors', () => {
    const errorResponse = new HttpErrorResponse({
      status: 500,
      error: null,
      url: '/test'
    });
    runInterceptorWithError(errorResponse, 'Error en el servidor, intente más tarde');
  });

  it('should handle other errors', () => {
    const errorResponse = new HttpErrorResponse({
      status: 999,
      error: null,
      url: '/test'
    });
    runInterceptorWithError(errorResponse, 'Error en el servidor, intente más tarde');
  });
});
