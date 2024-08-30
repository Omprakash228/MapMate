import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { UserModel } from "../models/login.model";
import { reducer as LoginReducer } from '../store/reducers/login.reducer';

export interface AppState {
    userInfo: UserModel;
}

export const reducers: ActionReducerMap<AppState> = {
    userInfo: LoginReducer
}

export const metaReducers: MetaReducer<AppState>[] = [];