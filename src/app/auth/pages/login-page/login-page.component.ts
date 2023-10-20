import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

    constructor(
        private authService:AuthService,
        private router: Router
        ){}

    onLogin(): void {
        this.authService.login('fasf','fsafas')
        .subscribe( user => {
            this.router.navigateByUrl('/')
        })
    }
}
