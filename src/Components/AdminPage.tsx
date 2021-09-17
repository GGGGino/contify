import React, {useState} from "react";
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import utils from '../utils';
import CreditCard from "./CreditCard";
import {Adsense as AdSense} from "@ctrl/react-adsense";

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

    const newUsersConf: UserConfiguration[] = utils.calculate(originaUsers);

    setUsers(newUsersConf);
    setOriginalUsers([...originaUsers]);
    setSlaveToEdit(null);
  };

  const codesDoms = users.map((user: UserConfiguration, index) => {
    return (<Col key={index} className="py-3 credit-card" xs={12} md={4}>
      <CreditCard
        nth={index}
        config={user}
        gradients={colorGenerator(index)}
        onEdit={() => openModalEditSlave(index)}
        onDelete={() => removeSlave(index)} />
    </Col>);
  });

  codesDoms.push(<Col key={'extra'} className="py-3" xs={12} md={4}>
    <Card>
      <Card.Header className={"card-header d-flex justify-content-between align-items-center"}>
        <Card.Title>{'Azioni'}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Button variant="secondary" size={'sm'} onClick={openModalAddSlave}><i className="bi bi-upc-scan" /> Add</Button>{' '}
        <Button variant="secondary" size={'sm'} onClick={openModalAddSlave}><i className="bi bi-input-cursor"/> Add</Button>{' '}
        <Button variant="danger" size={'sm'} onClick={eraseSlaves}><i className="bi bi-input-cursor"/> Erase</Button>
      </Card.Body>
    </Card>
  </Col>);

  return <div>
    <InnerHeader/>
    <AdSense
      client='ca-pub-5437738883571201'
      slot='2740252059'
      style={{ display: 'block', height: '90px' }}
      format='horizontal'
      responsive='true'/>
    <Container className="py-3 cards-container">
      <Row>
        <Col sm={12}>
          <Row>
            {codesDoms}
          </Row>
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
