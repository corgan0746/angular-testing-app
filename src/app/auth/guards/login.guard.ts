import { Injectable, inject } from '@angular/core';
import {  ActivatedRouteSnapshot,  CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class LoginGuard  {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuth()
    .pipe(
        tap( isAuthenticated => console.log({isAuthenticated})),
        tap( isAuthenticated => {
            if(isAuthenticated){
                this.router.navigateByUrl('/heroes');
            }
        }),
        map((isAuthenticated) =>  !isAuthenticated),
        catchError( (err) => of(false)),
       
    )
    
  }

  canMatch(route: Route, segments: UrlSegment[]):(Observable<boolean> | boolean) {
    console.log('Can Match:')
    console.log({route, segments})
    console.log(this.checkAuthStatus());
    return this.checkAuthStatus()
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
    console.log('Can Activate:')
    console.log({route, state})
    console.log(this.checkAuthStatus());
    return this.checkAuthStatus()
  }


};