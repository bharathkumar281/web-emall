import React from "react";
import { Form,Button,Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

function Register() {

  return (
    <div className="Login">
      <Container>
      <Form>
          <Form.Group controlId="formUserID">
            <Form.Label>UserID:</Form.Label>
            <Form.Control type="text" placeholder="UserID"></Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="example@email.com"></Form.Control>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="Password" placeholder="Password"></Form.Control>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="Password" placeholder="Password"></Form.Control>
          </Form.Group>
          <Button type="submit" variant="outline-primary">Register</Button>
        
      </Form>
      </Container>
    </div>
  );
}

export default Register;