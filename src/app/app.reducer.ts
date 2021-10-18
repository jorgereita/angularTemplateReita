import { Action } from '@ngrx/store';
import * as fromAction from './app.actions';
export interface AppState {
    message: string;
}

export const initialStete = {
    message: 'Initial State App'
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function myReducer(state: AppState = initialStete, action: Action) {
    // console.log(action);
    // return state;
    switch (action.type) {
        case fromAction.LOGIN_OK:
            return {
                ...state,
                message: fromAction.LOGIN_OK,
            };
        case fromAction.SINGUP_OK:
            return {
                ...state,
                message: fromAction.SINGUP_OK,
            };
        case fromAction.HOME_GET_LINKS:
            return {
                ...state,
                message: fromAction.HOME_GET_LINKS,
            };
        case fromAction.HOME_GET_PROFILE:
            return {
                ...state,
                message: fromAction.HOME_GET_PROFILE,
            };
        case fromAction.HOME_GET_ADDLINK:
            return {
                ...state,
                message: fromAction.HOME_GET_ADDLINK,
            };
        default:
            return state;
    }
};

