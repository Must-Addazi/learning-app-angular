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
        let errorMessage = 'An error occurred.';
        
        if (error.status === 400) {
          if (typeof error.error === 'string') {
            // Si l'erreur est une chaîne de caractères brute
            errorMessage = error.error;
          } else if (error.error instanceof Object) {
            // Si l'erreur est un objet, combinez les messages
            errorMessage = Object.values(error.error).join('\n');
          }
        } 
        else {
          errorMessage = error.message || 'An unknown error occurred.';
        }

        // Affichez le message dans le MatSnackBar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['mat-snackbar-error']
        });

        // Continuez à transmettre l'erreur
        return throwError(() => error);
      })
    );
  }
}
