import { Action, createReducer, on } from "@ngrx/store";
import { UserModel } from "../../models/login.model";
import * as LoginAction from '../actions/login.actions';

export const userInfo: UserModel = {
    isLoggedIn: false,
    email: '',
    userName: ''
} as UserModel

const loginReducer = createReducer(
    userInfo,
    on(LoginAction.login, (state, action) => ({...state, ...action})),
    on(LoginAction.logout, (state) => ({...state, isLoggedIn: false, email: '', userName: ''}))
)

export const reducer = (state: UserModel | undefined, action: Action) => loginReducer(state, action);