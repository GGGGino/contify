import React, {useEffect, useRef, useState} from "react";
import InnerHeader from "./InnerHeader";
import {Col, Container, Modal, Row} from "react-bootstrap";
import QRCode from "react-qr-code";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import ConfigForm from "./ConfigForm";
import ShowAdSense from "./ShowAdSense";

export default function UserPage() {
  // textInput must be declared here so the ref can refer to it
  const qrCodeDom = useRef(null);
  const [myInfoScope, setInfo]: [any, any] = useState<UserConfiguration>({
    name: '',
    alreadyPutted: 0
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!qrCodeDom || !qrCodeDom.current || !(qrCodeDom.current! as any).dialog) { return; }

    console.log(qrCodeDom.current);

    (qrCodeDom.current! as any).dialog.getElementsByTagName('svg')[0].setAttribute('viewBox', '0 0 256 256');
    (qrCodeDom.current! as any).dialog.getElementsByTagName('svg')[0].setAttribute('style', 'width: 100%; height: auto');
  }, [myInfoScope]);

  const qrCodeDOM = showModal
    ? <QRCode value={btoa(JSON.stringify(myInfoScope))}  />
    : null;

  const handleGenerate = (event: UserConfiguration) => {
    setInfo({...event});
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return <div>
    <InnerHeader />

    <Container>
      <Row>
        <Col>
          <div className="formGrey">
            <ConfigForm sendLabel={'Generate'} submitCallback={handleGenerate} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShowAdSense show={process.env.NODE_ENV !== 'development'} />
        </Col>
      </Row>
    </Container>

    <Modal show={showModal} onHide={handleClose} ref={qrCodeDom} size={'sm'}>
      <Modal.Header closeButton>
        <Modal.Title>QRCode Generated</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {qrCodeDOM}
      </Modal.Body>
    </Modal>
  </div>;
}
