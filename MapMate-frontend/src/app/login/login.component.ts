import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoginModel, UserModel } from '../../shared/models/login.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppState } from '../../shared/store';
import { Store } from '@ngrx/store';
import { login } from '../../shared/store/actions/login.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginModel>;
  hidePassword: boolean = true;

  constructor(private router: Router, private store: Store<AppState>) {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = new FormGroup<LoginModel>({
      email: new FormControl('', { 
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.email
          ]
        }),
      password: new FormControl('', { 
          nonNullable: true,
          validators: [ Validators.required ]
        })
    });
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      let userInfo: UserModel = {
        isLoggedIn: true,
        email: 'omprakash@gmail.com',
        userName: 'Omprakash'
      }
      this.store.dispatch(login(userInfo));
      this.router.navigateByUrl('/');
    }
  }
}
