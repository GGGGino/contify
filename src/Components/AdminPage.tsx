import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {Html5QrcodeScannerPlugin} from "./Html5QrcodeScannerPlugin";

export default function AdminPage() {
  return <div>
    <InnerHeader />
    <Container className="py-3">
      <Row>
        <Col sm={4}>
          <h3>Capture</h3>
          <div>
            <input type="file" name="image" accept="image/*" capture="environment" />
          </div>
        </Col>
        <Col sm={8}>Utenti</Col>
      </Row>
    </Container>
  </div>;
}
