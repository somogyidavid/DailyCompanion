import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoggedInGuard } from './shared/guard/logged-in.guard';
import { TodoComponent } from './todo/todo.component';
import { FinanceComponent } from './finance/finance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'finance',
    component: FinanceComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
