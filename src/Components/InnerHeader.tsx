import React from "react";
import {Navbar, Container} from "react-bootstrap";
import money from '../money.png';

export default function InnerHeader() {
  return <Navbar expand="lg">
    <Container>
      <Navbar.Brand href={'/' + process.env.REACT_APP_BASE_FOLDER}>
        <img
          src={money}
          width="100"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Brand href={'/' + process.env.REACT_APP_BASE_FOLDER}>
        <a href="https://www.buymeacoffee.com/davidginanni">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy me coffe&emoji=&slug=davidginanni&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
        </a>
      </Navbar.Brand>
    </Container>
  </Navbar>;
}
