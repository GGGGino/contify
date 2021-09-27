import React from "react";
import {Navbar, Container} from "react-bootstrap";
import money from '../money.png';

export default function InnerHeader() {
  return <Navbar expand="lg">
    <Container>
      <Navbar.Brand href={'/' + process.env.REACT_APP_BASE_FOLDER}>
        <img
          src={money}
          width="55"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        Splittami
        </Navbar.Brand>
    </Container>
  </Navbar>;
}
