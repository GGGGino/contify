import React, {useState} from "react";
import InnerHeader from "./InnerHeader";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import QRCode from "react-qr-code";

export default function UserPage() {
  const [myInfoScope, setInfo]: [any, any] = useState({
    name: 'Gino',
    alreadyPutted: 0,
    maxToPut: null
  });
  const [showModal, setShowModal] = useState(false);

  const qrCodeDOM = showModal
    ? <QRCode value={btoa(JSON.stringify(myInfoScope))} />
    : null;

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    setInfo({...myInfoScope, [name]: target.value});
  };

  const handleNumberChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    setInfo({...myInfoScope, [name]: Math.trunc(parseFloat(target.value) * 100)});
  };

  const handleGenerate = (event: any) => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return <div>
    <InnerHeader />
    <Container className="py-3">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={handleInputChange} />
              <Form.Text className="text-muted">
                Set your name
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="alreadyPutted">
              <Form.Label>Already putted</Form.Label>
              <Form.Control type="number" placeholder="0" onChange={handleNumberChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="maxToPut">
              <Form.Label>Max import</Form.Label>
              <Form.Control type="number" placeholder="0" onChange={handleNumberChange}/>
            </Form.Group>

            <Button variant="primary" onClick={handleGenerate}>
              Generate
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>

    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{qrCodeDOM}</Modal.Body>
    </Modal>
  </div>;
}
