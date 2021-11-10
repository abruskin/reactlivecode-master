//Actions
import {requestMemos, createMemo, deleteMemo} from "../services/memos";

const   GET_MEMOS_REQUEST = 'memos/memos/GET_MEMOS_REQUEST'
const   GET_MEMOS_SUCCESS = 'memos/memos/GET_MEMOS_SUCCESS'
const   GET_MEMOS_FAILED = 'memos/memos/GET_MEMOS_FAILED'

const   CREATE_MEMOS_REQUEST = 'memos/memos/CREATE_MEMOS_REQUEST'
const   CREATE_MEMOS_SUCCESS = 'memos/memos/CREATE_MEMOS_SUCCESS'
const   CREATE_MEMOS_FAILED = 'memos/memos/CREATE_MEMOS_FAILED'

const   DELETE_MEMOS_REQUEST = 'memos/memos/DELETE_MEMOS_REQUEST'
const   DELETE_MEMOS_SUCCESS = 'memos/memos/DELETE_MEMOS_SUCCESS'
const   DELETE_MEMOS_FAILED = 'memos/memos/DELETE_MEMOS_FAILED'

//Reducer
const initialState = {
    getMemosPending: false,
    getMemosFailed: false,
    memos: [],
    createMemoPending: false,
    createMemoFailed: false,
    deleteMemoPending: false,
    deleteMemoFailed: false,
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

        case CREATE_MEMOS_FAILED:
            return {...state, createMemoFailed: true, createMemosPending: false}

        case CREATE_MEMOS_REQUEST:
            return {...state, createMemosPending: true}

        case CREATE_MEMOS_SUCCESS:
            return{...state, createMemosPending: false,
                createMemosFailed: false,
                }

        case DELETE_MEMOS_FAILED:
            return {...state, deleteMemoFailed: true, deleteMemosPending: false}

        case DELETE_MEMOS_REQUEST:
            return {...state, deleteMemosPending: true}

        case DELETE_MEMOS_SUCCESS:
            return{...state, deleteMemosPending: false,
                deleteMemosFailed: false,
            }

        default:
            return state
    }
}
//Action Creators
 function getMemosRequest() {
    return {type: GET_MEMOS_REQUEST}
}

 function getMemosSuccess(memos) {
    return {type: GET_MEMOS_SUCCESS,
    memos:memos}
}

 function getMemosFAILED() {
    return {type: GET_MEMOS_FAILED}
}

 function createMemosRequest() {
    return {type: CREATE_MEMOS_REQUEST}
}

 function createMemosSuccess(){
    return {type: CREATE_MEMOS_SUCCESS,
        }
}

 function createMemosFAILED() {
    return {type: CREATE_MEMOS_FAILED}
}

function deleteMemosRequest() {
    return {type: DELETE_MEMOS_REQUEST}
}

function deleteMemosSuccess(){
    return {type: DELETE_MEMOS_SUCCESS,
    }
}

function deleteMemosFAILED() {
    return {type: DELETE_MEMOS_FAILED}
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
        }, () => dispatch(getMemosFAILED()))
    }, () => dispatch(getMemosFAILED()))
}
}

export function initiateCreateMemos(memo) {
    return function (dispatch, getState) {
        dispatch(getMemosRequest())
        createMemo(getState().user.token, memo).then(response => {
            if (!response.ok) {
                dispatch(createMemosFAILED())
                return
            }
            response.json().then(json => {
                if (!json.message) {
                    dispatch(createMemosFAILED())
                    return
                }

                if (json.message !== 'created') {
                    dispatch(createMemosFAILED())
                return
            }
                dispatch(createMemosSuccess())
                dispatch(initiateGetMemos())
            }, () => dispatch(createMemosFAILED()))
        }, () => dispatch(createMemosFAILED()))
    }
}

    export function initiateDeleteMemos(memo) {
        return function deleteMemoDispatcher(dispatch, getState) {
            dispatch(deleteMemosRequest())
            deleteMemo(getState().user.token, memo).then(response => {
                if (!response.ok) {
                    dispatch(deleteMemosFAILED())
                    return
                }
                response.json().then(json => {
                    if (!json.message) {
                        dispatch(deleteMemosFAILED())
                        return
                    }

                    if (json.message !== 'deleted') {
                        dispatch(deleteMemosFAILED())
                        return
                    }
                    dispatch(deleteMemosSuccess())
                    dispatch(initiateGetMemos())
                }, () => dispatch(deleteMemosFAILED()))
            }, () => dispatch(deleteMemosFAILED()))
        }
    }