import {Container} from 'react-bootstrap'
import Login from './components/Login.js';
import Memos from './components/Memos.js';
import {requestLogin} from './services/user.js';
import {requestMemos, createMemo, deleteMemo} from './services/memos.js';
import {connect} from "react-redux";
import {initiateLogin, logout} from "./modules/user";
import {initiateGetMemos} from "./modules/memos";

function App({
                 dispatch,
                 loginPending,
                 loginFailed,
                 token,
                 getMemosPending,
             getMemosFailure,
                 memos}) {


    function handleError(error) {
        console.log(error)
    }

    function handleRequestMemos() {
        dispatch(initiateGetMemos())
    }


function handleLoginRequest(username, password) {
   dispatch(initiateLogin({username, password}))
}


function handleLogoutRequest() {
    dispatch(logout())
}

const handleCreateMemo =  (memo) => {
     createMemo(token, memo).then(response => response.json(),
        handleError).then((json) => {
        handleRequestMemos()
            }, handleError)
        .catch(handleError);

}

const handleDeleteMemo = async (memo) => {
        await deleteMemo(token, memo);
   // setMemos(memos.filter(item => item.id !== memo.id));
}


return (

    <Container>
        {token ? <Memos memos={memos} handleDeleteMemo={handleDeleteMemo}
                        handleLogoutRequest={handleLogoutRequest}
                        handleCreateMemo={handleCreateMemo}> </Memos> :
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
