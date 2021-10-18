import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(req.url ==='./assets/i18n/es.json'){
      return next.handle(req.clone());
    }
    // SI ES UNA PETICION PARA LOGIN

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = localStorage.getItem('token');

    if (token != null ) {

      const clonedreq = req.clone({
        headers: req.headers.set('token', token)
      });

      return next.handle(clonedreq).pipe(tap(event => {

      }, error => {
        console.log(error.status);
        localStorage.removeItem('token');
        // this.router.navigate(['/login']);
      }));
    }
    else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

}
