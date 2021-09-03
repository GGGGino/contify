import React, {useState} from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";

export default function AdminPage() {
  const [qrcodes, setQrcodes] = useState<Array<string>>([]);
  const [showModal, setShowModal] = useState(false);
  const [slaveToEdit, setSlaveToEdit] = useState<number|null>(null);

  const openModalEditSlave = (indexToChange: number) => {
    setShowModal(true);
    setSlaveToEdit(indexToChange);
  };

  const openModalAddSlave = () => {
    setShowModal(true);
  };

  const removeSlave = (indexToRemove: number) => {
    qrcodes.splice(indexToRemove, 1);
    setQrcodes([...qrcodes]);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const calculate = () => {
    setShowModal(false);
  };

  const eraseSlaves = () => {
    setQrcodes([]);
  };

  const onQrcodeScanned = (qrCodeScanned: string) => {
    handleClose();
    console.log(slaveToEdit);

    if (slaveToEdit !== null) {
      qrcodes[slaveToEdit] = qrCodeScanned;
    } else {
      qrcodes.push(qrCodeScanned);
    }
    setQrcodes([...qrcodes]);
  };

  const codesDoms = qrcodes.map((qrCode, index) => {
    const jsonDecoded: any = JSON.parse(atob(qrCode));
    const alreadyPutted = jsonDecoded.alreadyPutted === null ? '-' : jsonDecoded.alreadyPutted;
    const maxToPut = jsonDecoded.maxToPut === null ? '-' : jsonDecoded.maxToPut;

    return (<Col key={index} className="py-3" xs={12} md={4}>
      <Card>
        <Card.Header>
          <Card.Title>{jsonDecoded.name}</Card.Title>
        </Card.Header>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Already putted: <strong>{alreadyPutted}</strong> €</ListGroupItem>
          <ListGroupItem>Max: <strong>{maxToPut}</strong> €</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="secondary" onClick={() => openModalEditSlave(index)}>Change</Button>
          <Button variant="danger" onClick={() => removeSlave(index)}>Remove</Button>
        </Card.Body>
      </Card>
    </Col>);
  });

  return <div>
    <InnerHeader/>
    <Container className="py-3">
      <Row>
        <Col sm={12}>
          <Button variant="primary" onClick={openModalAddSlave}>Add slave</Button>
          <Button variant="danger" onClick={eraseSlaves}>Erase</Button>
          <Row className="py-3">
            {codesDoms}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Button variant="success" onClick={calculate}>Calculate</Button>
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
