import { Injectable, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

    private baseUrl = environment.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) {}
    

    get currentUser(): User | undefined {
        if(!this.user) return undefined;
        return structuredClone( this.user );
    }

    ngOnInit(): void {
        if(!localStorage.getItem('token')) return;

        let userStored = localStorage.getItem('token');

        console.log(userStored)

    }

    checkAuth(): Observable<boolean>{

        if(!localStorage.getItem('token')) return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => this.user = user),
            map( user => !!user ),
            catchError( err => of(false))
        )

    }

    login(email: string, password: string):Observable<User> {

        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => {
                this.user = user;
                localStorage.setItem('token', JSON.stringify('fsafsav643v'))
            })
        )
    }

    logout(): void {
        this.user = undefined;
        localStorage.clear();
    }


}
