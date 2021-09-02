import React, {useState} from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";

export default function AdminPage() {
  const [qrcodes, setQrcodes] = useState<Array<string>>([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const onQrcodeScanned = (qrCodeScanned: string) => {
    handleClose();
    qrcodes.push(qrCodeScanned);
    setQrcodes([...qrcodes]);
  };
  const codesDoms = qrcodes.map((qrCode, index) => {
    const jsonDecoded: any = JSON.parse(atob(qrCode));

    return (<Col key={index} className="py-3">
      <Card>
        <Card.Header>
          <Card.Title>{jsonDecoded.name}</Card.Title>
        </Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Already putted: <strong>{jsonDecoded.alreadyPutted}</strong> €</ListGroupItem>
          <ListGroupItem>Max: <strong>{jsonDecoded.maxToPut}</strong> €</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </Col>);
  });

  return <div>
    <InnerHeader/>
    <Container className="py-3">
      <Row>
        <Col sm={12}>
          <Button variant="primary" onClick={openModal}>Add slave</Button>
          <Row className="py-3">
            {codesDoms}
          </Row>
        </Col>
      </Row>
    </Container>

    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QrcodeScannerPlugin onQrcodeScanned={onQrcodeScanned} />
      </Modal.Body>
    </Modal>
  </div>;
}
