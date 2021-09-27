import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import {ConfigFormProps} from "../interfaces/ConfigFormProps";

export default function ConfigForm({
  initialValues = {name: '', alreadyPutted: 0},
  sendLabel,
  submitCallback
}: ConfigFormProps) {
  const [myInfoScope, setInfo]: [any, any] = useState<UserConfiguration>(initialValues);

  const handleInputChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    setInfo({...myInfoScope, [name]: target.value});
  };

  const handleNumberChange = (event: any) => {
    const target = event.target;
    const name = target.id;

    setInfo({...myInfoScope, [name]: Math.trunc(parseFloat(target.value) * 100)});
  };

  const handleGenerate = (event: any) => {
    submitCallback(myInfoScope);
  };

  return (<Form>
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Name" defaultValue={myInfoScope.name} onChange={handleInputChange} />
      <Form.Text className="text-muted">
        Set your name
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="alreadyPutted">
      <Form.Label>Already putted</Form.Label>
      <Form.Control type="number" placeholder="0" defaultValue={myInfoScope.alreadyPutted} onChange={handleNumberChange}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="maxToPut">
      <Form.Label>Max import</Form.Label>
      <Form.Control type="number" placeholder="0" defaultValue={myInfoScope.maxToPut} onChange={handleNumberChange}/>
    </Form.Group>

    <Button variant="primary" onClick={handleGenerate}>
      {sendLabel}
    </Button>
  </Form>);
}
