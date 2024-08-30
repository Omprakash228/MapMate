import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { UserModel } from "../../models/login.model";

export const selectLoginState = (state: AppState) => state.userInfo;

export const selectLoginInfo = createSelector(
    selectLoginState,
    (state: UserModel) => state
) 