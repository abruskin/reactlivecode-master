//Actions
import {requestMemos} from "../services/memos";

const   GET_MEMOS_REQUEST = 'memos/memos/GET_MEMOS_REQUEST'
const   GET_MEMOS_SUCCESS = 'memos/memos/GET_MEMOS_SUCCESS'
const   GET_MEMOS_FAILED = 'memos/memos/GET_MEMOS_FAILED'

//Reducer
const initialState = {
    getMemosPending: false,
    getMemosFailed: false,
    memos: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_MEMOS_REQUEST:
                return {...state, getMemosPending: true}

        case GET_MEMOS_SUCCESS:
        return{...state, getMemosPending: false,
            getMemosFailed: false,
        memos: action.memos}

        case GET_MEMOS_FAILED:
            return {...state, getMemosFailed: true, getMemosPending: false}

        default:
            return state
    }
}
//Action Creators
export function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

export function getMemosSuccess(memos) {
    return {type: GET_MEMOS_SUCCESS,
    memos:memos}
}

export function getMemosFAILED() {
    return {type: GET_MEMOS_FAILED}
}



//side Effects
export function initiateGetMemos() {
return function (dispatch, getState) {
    dispatch(getMemosRequest())
    requestMemos(getState().user.token).then(response => {
        if (!response.ok) {
            dispatch(getMemosFAILED())
            return
        }
        response.json().then(json => {
            if (!json.memo_list) {
                dispatch(getMemosFAILED())
                return
            }
            dispatch(getMemosSuccess(json.memo_list))
        })
    })
}
}