import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred.';

        if (error.status === 400 || error.status === 500 || error.status === 401 || error.status === 403) {
          if (error.error && error.error.error) {
            errorMessage = error.error.error;  // Récupère le message d'erreur du backend
          } else {
            errorMessage = error.message || errorMessage;  // Message d'erreur générique
          }
        }

       /* this.snackBar.open(errorMessage, 'Close', {
         duration: 5000,  // Durée de 5 secondes
          panelClass: ['mat-snackbar-error']  // Classe CSS personnalisée pour l'erreur
        });*/

        // L'erreur est renvoyée pour que l'appelant puisse gérer si nécessaire
        return throwError(() => error);
      })
    );
  }
}
