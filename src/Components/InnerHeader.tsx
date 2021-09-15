import React from "react";
import {Navbar, Container} from "react-bootstrap";
import money from '../money.png';

export default function InnerHeader() {
  return <Navbar expand="lg">
    <Container>
      <Navbar.Brand href="/">
        <img
          src={money}
          width="55"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        Contify
        </Navbar.Brand>
    </Container>
  </Navbar>;
}
