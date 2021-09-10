import React, {useState} from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import utils from '../utils';
import CreditCard from "./CreditCard";

const testInitialUserConfiguration: UserConfiguration[] = [];

export default function AdminPage() {
  const [originaUsers, setOriginalUsers] = useState<Array<UserConfiguration>>(testInitialUserConfiguration);
  const [users, setUsers] = useState<Array<UserConfiguration>>(testInitialUserConfiguration);
  const [showModal, setShowModal] = useState(false);
  const [slaveToEdit, setSlaveToEdit] = useState<number|null>(null);
  const colorGenerator = utils.colorCardGenerator();

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
    const newUsersConf: UserConfiguration[] = utils.calculate(users);

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

  const codesDoms = users.map((user: UserConfiguration, index) => {
    return (<Col key={index} className="py-3" xs={12} md={4}>
      <CreditCard
        key={index}
        config={user}
        gradients={colorGenerator(index)}
        onEdit={() => openModalEditSlave(index)}
        onDelete={() => removeSlave(index)} />
    </Col>);
  });

  codesDoms.push(<Col key={'extra'} className="py-3" xs={12} md={4}>
    <Card>
      <Card.Header className={"card-header d-flex justify-content-between align-items-center"}>
        <Card.Title>{'Aggiungi utente'}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button variant="secondary" size={'sm'} onClick={openModalAddSlave}><i className="bi bi-upc-scan" /> Add</Button>{' '}
        <Button variant="secondary" size={'sm'} onClick={openModalAddSlave}><i className="bi bi-input-cursor"/> Add</Button>
      </Card.Body>
    </Card>
  </Col>);

  return <div>
    <InnerHeader/>
    <Container className="py-3">
      <Row>
        <Col sm={12}>
          <Row>
            {codesDoms}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Button variant="success" size={'sm'} onClick={doCalculaton}>Calculate</Button>
          <Button variant="danger" size={'sm'} onClick={eraseSlaves}>Erase</Button>
        </Col>
      </Row>
    </Container>

    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Scan code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QrcodeScannerPlugin onQrcodeScanned={onQrcodeScanned} />
      </Modal.Body>
    </Modal>
  </div>;
}
