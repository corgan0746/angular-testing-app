import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
    canMatch:[LoginGuard]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [AuthGuard],
    canMatch:[AuthGuard]
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo:'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo:'404',
  },
];
// pathMatch: 'full' secures the correct redirect to the page
// the path will always execute othrewise, which is not what we want

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
