import React from "react";
import {Navbar, Container} from "react-bootstrap";

export default function InnerHeader() {
  return <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Contify</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Container>
  </Navbar>;
}
