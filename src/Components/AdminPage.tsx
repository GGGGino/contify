import React, {useState} from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Modal, Row} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import calculate from "../utils/calculate";

export default function AdminPage() {
  const [originaUsers, setOriginalUsers] = useState<Array<UserConfiguration>>([]);
  const [users, setUsers] = useState<Array<UserConfiguration>>([]);
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
    originaUsers.splice(indexToRemove, 1);
    setUsers([...originaUsers]);
    setOriginalUsers([...originaUsers]);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const doCalculaton = () => {
    const newUsersConf: UserConfiguration[] = calculate(users);

    setUsers(newUsersConf);
  };

  const eraseSlaves = () => {
    setUsers([]);
    setOriginalUsers([]);
  };

  const onQrcodeScanned = (qrCodeScanned: string) => {
    handleClose();

    const jsonDecoded: UserConfiguration = JSON.parse(atob(qrCodeScanned));

    if (slaveToEdit !== null) {
      originaUsers[slaveToEdit] = jsonDecoded;
    } else {
      originaUsers.push(jsonDecoded);
    }
    setUsers([...originaUsers]);
    setOriginalUsers([...originaUsers]);
    setSlaveToEdit(null);
  };

  const codesDoms = users.map((user, index) => {
    const alreadyPutted = user.alreadyPutted === null ? '-' : user.alreadyPutted / 100;
    const maxToPut = user.maxToPut === null ? '-' : (user.maxToPut / 100).toFixed(2);
    const toPutDom = user.toPut
      ? user.toPut > 0
        ? <span className="text-danger">{(user.toPut / 100).toFixed(2)} €</span>
        : <span className="text-success">{(user.toPut / 100).toFixed(2)} €</span>
      : null;

    return (<Col key={index} className="py-3" xs={12} md={4}>
      <Card>
        <Card.Header className={"card-header d-flex justify-content-between align-items-center"}>
          <Card.Title>{user.name}</Card.Title>
          <Card.Title >{toPutDom}</Card.Title>
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
          <Button variant="success" onClick={doCalculaton}>Calculate</Button>
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
