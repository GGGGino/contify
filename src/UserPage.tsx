import React, {useState} from "react";
import InnerHeader from "./InnerHeader";
import {Col, Container, Form, Row} from "react-bootstrap";

export default function UserPage() {
  const [myInfoScope, setInfo]: [any, any] = useState({
    name: 'Gino',
    maxImporto: 0
  });

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    myInfoScope[name] = target.value;

    console.log('myInfoScopeInside', myInfoScope, event);

    setInfo({...myInfoScope});
  };

  console.log(myInfoScope);

  return <div>
    <InnerHeader />
    <Container className="py-3">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={handleInputChange} />
              <Form.Text className="text-muted">
                Set your name
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="maxImporto">
              <Form.Label>Max import</Form.Label>
              <Form.Control type="number" placeholder="Max import" onChange={handleInputChange}/>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>{JSON.stringify(myInfoScope)}</div>
        </Col>
      </Row>
    </Container>
  </div>;
}
