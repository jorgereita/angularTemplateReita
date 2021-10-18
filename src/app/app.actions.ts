import { Action } from '@ngrx/store';

export const TRY_LOGIN = '[TRY LOGIN]';
export const LOGIN_OK = '[LOGIN OK]';
export const LOGIN_FAIL = '[LOGIN FAIL]';

export const TRY_SINGUP = '[TRY SINGUP]';
export const SINGUP_OK = '[SINGUP OK]';
export const SINGUP_FAIL = '[SINGUP FAIL]';


export const HOME_TRY_PROFILE = '[HOME TRY PROFILE]';
export const HOME_GET_PROFILE = '[HOME GET PROFILE]';

export const HOME_TRY_LINKS = '[HOME TRY LINKS]';
export const HOME_GET_LINKS = '[HOME GET LINKS]';

export const HOME_GET_ADDLINK = '[HOME GET ADDLINK]';
export const HOME_TRY_DELETE = '[HOME TRY DELETE]';

export class LOGINOK implements Action {
    readonly type = LOGIN_OK;
    constructor(public payload: string,public data: any){}
}
export class SINGUPOK implements Action {
    readonly type = SINGUP_OK;
    constructor(public payload: string,public data: any){}
}

export class HOMEGETLINKS implements Action {
    readonly type = HOME_GET_LINKS;
    constructor(public payload: string,public data: any){}
}

export class HOMEGETPROFILE implements Action {
    readonly type = HOME_GET_PROFILE;
    constructor(public payload: string,public data: any){}
}

export class HOMEGETADDLINK implements Action {
    readonly type = HOME_GET_ADDLINK;
    constructor(public payload: string,public data: any){}
}


export type AppActions = LOGINOK | HOMEGETLINKS | HOMEGETPROFILE | HOMEGETADDLINK | SINGUPOK;
