import React, {useState} from "react";
import {Container, Row, Col, Table} from "react-bootstrap";
import InnerHeader from "./InnerHeader";
import {QrcodeScannerPlugin} from "./QrcodeScannerPlugin";

export default function AdminPage() {
  const [qrcodes, setQrcodes] = useState<Array<string>>([]);
  const onQrcodeScanned = (qrCodeScanned: string) => {
    console.log('ecco il qrcode: ' + qrCodeScanned);
    qrcodes.push(qrCodeScanned);
    setQrcodes([...qrcodes]);
  };
  const codesDoms = qrcodes.map((qrCode, index) => (<tr key={index}>
    <td>{qrCode.slice(0, 10)}</td>
    <td>{atob(qrCode)}</td>
  </tr>));

  return <div>
    <InnerHeader/>
    <Container className="py-3">
      <Row>
        <Col sm={4}>
          <h3>Capture</h3>
          <div>
            <QrcodeScannerPlugin onQrcodeScanned={onQrcodeScanned} />
          </div>
        </Col>
        <Col sm={8}>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>base64</th>
              <th>decoded</th>
            </tr>
            </thead>
            <tbody>
            {codesDoms}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  </div>;
}
