import { createAction, props } from "@ngrx/store";
import { UserModel } from "../../models/login.model";

export const login = createAction('User Logged In', props<UserModel>());
export const logout = createAction('User Logged Out');