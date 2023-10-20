import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    title = 'heroesApp';


    //This won't work, as the authentication is asynchronous
    //The Information will be revealed to the user before the athenticate finishes

    // constructor(private authService:AuthService){}

    // ngOnInit(): void {
    //     this.authService.checkAuth()
    //     .subscribe(() => {
    //         console.log('ssss')
    //     })
    // }


}
