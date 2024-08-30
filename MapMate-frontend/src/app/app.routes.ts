import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((a) => a.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./signup/signup.component').then((a) => a.SignupComponent),
    },
    {
        path: '',
        loadComponent: () => 
            import('./app.component').then((a) => a.AppComponent)
    }
];
