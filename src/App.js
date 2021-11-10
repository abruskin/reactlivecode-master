import {Container} from 'react-bootstrap'
import Login from './components/Login.js';
import Memos from './components/Memos.js';
import {requestLogin} from './services/user.js';
import {requestMemos, createMemo, deleteMemo} from './services/memos.js';
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateCreateMemos, initiateGetMemos, initiateDeleteMemos} from "./modules/memos";

function App({
                 dispatch,
                 loginPending,
                 loginFailed,
                 token,
                 getMemosPending,
             getMemosFailure,
                 memos,
             createMemosPending,
             createMemosFailed,
             deleteMemosPending,
             deleteMemosFailed,}) {





function handleLoginRequest(username, password) {
   dispatch(initiateLogin({username, password}))
}
return (

    <Container>
        {token ? <Memos memos={memos}
                        handleLogoutRequest={() => dispatch(logout())}
                        handleDeleteMemo={memo => {dispatch(initiateDeleteMemos(memo))}}
            handleCreateMemo =  {memo => {dispatch(initiateCreateMemos(memo))}}
            getMemosPending={getMemosPending}
                getMemosFailed = {getMemosFailure}
            createMemosPending={createMemosPending}
            createMemosFailed={createMemosFailed}
            deleteMemosPending={deleteMemosPending}
            deleteMemosFailed={deleteMemosFailed}/>
            :
            <Login handleLoginRequest={handleLoginRequest}
                   loginPending={loginPending}
            loginFailed={loginFailed}/>}
    </Container>
);
}

function mapStateToProps(state) {
    return {...state.user, ...state.memos}
}

export default connect(mapStateToProps) (App);
