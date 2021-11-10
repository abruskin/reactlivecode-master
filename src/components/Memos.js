import {Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap'
import {useEffect, useState} from "react";
import NewMemo from './NewMemo'
import Memo from "./Memo";
import LoadingMemo from "./loadingMemo";

function Memos({
                   handleLogoutRequest,
                   handleCreateMemo,
                   memos,
                   handleDeleteMemo,
                   getMemosPending,
                   getMemosFailure,
                   createMemoPending,
                   createMemoFailure,
                   deleteMemoPending,
                   deleteMemoFailure
               }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showError, setShowError] = useState(getMemosFailure);
    const [showCreateMemoError, setShowCreateMemoError] = useState(createMemoFailure);
    const [showDeleteMemoError, setShowDeleteMemoError] = useState(deleteMemoFailure);

    useEffect(() => {
        if (getMemosFailure) {
            setShowError(true)
        }
    }, [getMemosFailure])

    useEffect(() => {
        if (createMemoFailure) {
            setShowCreateMemoError(true)
        }
    }, [createMemoFailure])

    useEffect(() => {
        if (deleteMemoFailure) {
            setShowDeleteMemoError(true)
        }
    }, [deleteMemoFailure])

    return (
        <>
            <NewMemo show={show} handleClose={handleClose} handleCreateMemo={handleCreateMemo}/>
            <Row className='mt-3'>
                <Col><h1>Welcome</h1></Col>
                <Col xs='auto'><Button onClick={handleShow}>New</Button></Col>
                <Col xs=

                         'auto'><Button variant="outline-primary" onClick={handleLogoutRequest}>Logout</Button></Col>
            </Row>
            <Row>
                {
                    memos && !getMemosPending ?
                        memos.map((memo, idx) => <Memo
                            key={idx} memo={memo}
                            handleDeleteMemo={handleDeleteMemo}
                            deleteMemoPending={deleteMemoPending}/>) :
                        <loadingMemo/>
                }
            </Row>
            <ToastContainer className="p-3" position='bottom-end'>
                <Toast bg='danger' onClose={() => setShowError(false)} show={showError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error retrieving memos</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowCreateMemoError(false)} show={showCreateMemoError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error creating memo</Toast.Body>
                </Toast>
                <Toast bg='danger' onClose={() => setShowDeleteMemoError(false)} show={showDeleteMemoError} delay={3000} autohide>
                    <Toast.Body className={'text-white'}>Error deleting memo</Toast.Body>
                </Toast>
            </ToastContainer>
            {createMemoPending && <LoadingMemo/>}
        </>
    )
}

export default Memos;