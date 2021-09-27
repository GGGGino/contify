import React, {useState} from "react";
import {Button, Col, Container, Dropdown, DropdownButton, Modal, Row} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import utils from '../utils';
import {ModalState} from "../utils/enums";
import CreditCard from "./CreditCard";
import ShowAdSense from "./ShowAdSense";
import ConfigForm from "./ConfigForm";

const testInitialUserConfiguration: UserConfiguration[] = [];

export default function AdminPage() {
  const [originaUsers, setOriginalUsers] = useState<Array<UserConfiguration>>(testInitialUserConfiguration);
  const [users, setUsers] = useState<Array<UserConfiguration>>(testInitialUserConfiguration);
  const [modalState, setModalState] = useState<ModalState>(ModalState.Closed);
  const [slaveToEdit, setSlaveToEdit] = useState<number|null>(null);
  const colorGenerator = utils.colorCardGenerator();

  const openModalEditSlave = (indexToChange: number, state: ModalState) => {
    setModalState(state);
    setSlaveToEdit(indexToChange);
  };

  const openModal = (state: ModalState) => {
    setModalState(state);
  };

  const removeSlave = (indexToRemove: number) => {
    originaUsers.splice(indexToRemove, 1);
    setUsers([...originaUsers]);
    setOriginalUsers([...originaUsers]);
  };

  const handleClose = () => {
    setModalState(ModalState.Closed);
    setSlaveToEdit(null);
  };

  const eraseSlaves = () => {
    setUsers([]);
    setOriginalUsers([]);
  };

  const addUserInfo = (userInfo: UserConfiguration) => {
    if (slaveToEdit !== null) {
      originaUsers[slaveToEdit] = userInfo;
    } else {
      originaUsers.push(userInfo);
    }

    const newUsersConf: UserConfiguration[] = utils.calculate(originaUsers);

    setUsers(newUsersConf);
    setOriginalUsers([...originaUsers]);
    setSlaveToEdit(null);
  };

  const onUserAdded = (userInfo: UserConfiguration) => {
    handleClose();

    addUserInfo(userInfo);
  };

  const onQrcodeScanned = (qrCodeScanned: string) => {
    handleClose();

    const jsonDecoded: UserConfiguration = JSON.parse(atob(qrCodeScanned));

    addUserInfo(jsonDecoded);
  };

  const modalBody = modalState !== ModalState.Closed
    ? modalState === ModalState.OpenScan
      ? <QrcodeScannerPlugin onQrcodeScanned={onQrcodeScanned} />
      : <ConfigForm sendLabel={'Add'} submitCallback={onUserAdded} initialValues={slaveToEdit !== null ? originaUsers[slaveToEdit] : undefined} />
    : null;

  const codesDoms = users.map((user: UserConfiguration, index) => {
    return (<Col key={index} className="py-3 credit-card" xs={12} md={4}>
      <CreditCard
        nth={index}
        config={user}
        gradients={colorGenerator(index)}
        onEdit={(state: ModalState) => openModalEditSlave(index, state)}
        onDelete={() => removeSlave(index)} />
    </Col>);
  });

  const buttonsDom = (
      <Row>
        <Col xs={6}>
          <DropdownButton title="Add" className="dropdown-100">
            <Dropdown.Item onClick={() => {openModal(ModalState.OpenScan);}}><i className="bi bi-upc-scan" /> Scan</Dropdown.Item>
            <Dropdown.Item onClick={() => {openModal(ModalState.OpenForm);}}><i className="bi bi-input-cursor"/> Manual</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={6}>
          <Button variant="danger" onClick={eraseSlaves} className="d-block w-100"><i className="bi bi-trash"/> Erase</Button>
        </Col>
      </Row>);

  return <div>
    <InnerHeader/>
    <ShowAdSense show={false} />
    <Container className="py-3 cards-container">
      {buttonsDom}
      <Row>
        <Col sm={12}>
          <Row>
            {codesDoms}
          </Row>
        </Col>
      </Row>
    </Container>

    <Modal show={modalState !== ModalState.Closed} onHide={handleClose}>
      <Modal.Body>
        {modalBody}
      </Modal.Body>
    </Modal>
  </div>;
}
