import { FormControl } from "@angular/forms";

export interface LoginModel {
    email: FormControl<string>,
    password: FormControl<string>,
}

export interface SignupModel {
    fullName: FormControl<string>,
    email: FormControl<string>,
    password: FormControl<string>,
    confirmPassword: FormControl<string>,
    agreement: FormControl<boolean>
}

export interface UserModel {
    isLoggedIn: boolean,
    email: string,
    userName: string
}