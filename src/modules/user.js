//Actions
import {requestLogin} from "../services/user";
import {initiateGetMemos} from "./memos";

const LOGIN_REQUEST = 'memos/user/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'memos/user/LOGIN_SUCCESS'
const LOGIN_FAIL =  'memos/user/LOGIN_FAIL'

const LOGOUT = 'memos/user/LOGOUT'

//Reducer
const initialState = {
loginPending: false,
    loginFailed: false,
    token: ''
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST :
            return {
                ...state,
                loginPending: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                loginFailed: false,
                token: action.token
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loginPending: false,
                loginFailed: true
            };

        case LOGOUT:
            return {
                ...state,
                token: ''
            };
        default: return state
    }
}
//Action Creators
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginSuccess(token) {
    return {type: LOGIN_SUCCESS, token: token}
}

export function loginFailed() {
    return {type: LOGIN_FAIL}
}

export function logout() {
    return {type: LOGOUT}
}

//Side Effects
export function initiateLogin(credentials) {
    return function login(dispatch) {
        dispatch(loginRequest())
        requestLogin(credentials).then(response => {
            if (!response.ok) {
                dispatch(loginFailed())
                return
            }
            response.json().then(data => {
                if (!data.token) {
                    dispatch(loginFailed())
                    return
                }
                dispatch(loginSuccess(data.token))
                dispatch(initiateGetMemos())

            }, () => dispatch(loginFailed()))
        }, () => dispatch(loginFailed()))
    }
}