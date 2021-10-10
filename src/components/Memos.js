import {Button, Row, Col, Card, Placeholder, Modal, Form, Badge} from 'react-bootstrap'
import {useState} from "react";

function Memos({memos, handleLogoutRequest, handleCreateMemo, handleDeleteMemo}) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState('');
    const [memoTags, setTags] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        event.preventDefault()
        console.log({content, memoTags})
        const tags = memoTags.split(',')
        handleCreateMemo({content, tags})
        handleClose();
    }

    function handleMemoChange(event) {
        setContent(event.target.value)
    }

    function handleTagsChange(event) {
        setTags(event.target.value)
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Memo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Memo text</Form.Label>
                            <Form.Control type="text" placeholder="Enter memo text" onChange={handleMemoChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="tag1, tag2,..." onChange={handleTagsChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Row className='mt-3'>
                <Col><h1>Welcome, Friends :) </h1></Col>
                <Col xs='auto'> <Button onClick={handleShow}> New </Button></Col>
                <Col xs='auto' variant='outline-primary'> <Button onClick={handleLogoutRequest}> Logout </Button></Col>
            </Row>

            <Row>
                {
                    memos.map(memo => {
                        return (
                                <Card style={{width: '18rem'}}>
                                    <Card.Body>
                                        <Card.Subtitle as={Card.Title} animation="glow">
                                            {memo.create_timestamp.slice(0,10)}
                                        </Card.Subtitle>
                                        {memo.content}

                                    </Card.Body>
                                    <Card.Footer as={Card.Text} animation="glow">
                                        {memo.tags ? memo.tags.map(tag => {
                                            return (<Badge pill bg="secondary"> {tag}</Badge>)
                                        }) : console.log('No tags')}
                                        <Button  variant="outline-danger">
                                                onClick={() => handleDeleteMemo(memo)}>Delete</Button>
                                    </Card.Footer>
                                </Card>
                            )
                    })
                }
            </Row>
            {/*<Row>*/}
            {/*< Card style = {{width: '18rem'}}>*/}
            {/*    <Card.Body>*/}
            {/*        <Placeholder as = {Card.Title} animation = "glow"> <Placeholder xs = {6}/> </Placeholder>*/}
            {/*        <Placeholder as = {Card.Text} animation = "glow"> <Placeholder xs = {7}/>*/}
            {/*    <Placeholder xs={4}/> <Placeholder xs = {4}/>{' '} <Placeholder xs={6}/> <Placeholder xs = {8}/>*/}
            {/*            </Placeholder>  </Card.Body>*/}
            {/*    <Card.Footer className="text-muted">FOOTER</Card.Footer>*/}
            {/*        </Card>*/}
            {/*</Row>*/}
        </>
    );
}

export default Memos;
