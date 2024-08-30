import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SignupModel, UserModel } from '../../shared/models/login.model';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/store';
import { login } from '../../shared/store/actions/login.actions';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupModel>;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  not_agreed: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = new FormGroup<SignupModel>({
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [ Validators.required ]
      }),
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
        }),
      confirmPassword: new FormControl('', { 
          nonNullable: true,
          validators: [ 
            Validators.required,
            this.confirmPasswordValidator]
        }),
      agreement: new FormControl(false, {
        nonNullable: true,
        validators: [
          Validators.requiredTrue
        ]
      })
    });
  }

  agreePolicy: ValidatorFn = () : ValidationErrors | null => {
    const agreement = this.signupForm?.controls['agreement']?.value;

    return agreement ? null : { not_agreed: true}
  }

  confirmPasswordValidator: ValidatorFn = () : ValidationErrors | null => {
      const password = this.signupForm?.controls['password']?.value
      const confirmPassword = this.signupForm?.controls['confirmPassword']?.value;

      let result = password === confirmPassword 
      ? null 
      : { not_matching: true}
      
      return password === confirmPassword 
        ? null 
        : { not_matching: true}
  }

  goToSignin() {
    this.router.navigateByUrl('/login');
  }

  submit() {
    if (this.signupForm.valid) {
      this.not_agreed = false;
      console.log(this.signupForm.getRawValue());
      let userInfo: UserModel = {
        isLoggedIn: true,
        email: 'omprakash@gmail.com',
        userName: 'Omprakash'
      }
      this.store.dispatch(login(userInfo));
      this.router.navigateByUrl('/');
    } 

    if (!this.signupForm.valid && !this.signupForm.controls.agreement.valid) {
      this.not_agreed = true;
    }
  }
}
