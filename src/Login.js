import React from "react";
import { Form,Button,Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'

function Login() {

  return (
    <div className="Login">
      <Container>
      <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="example@email.com"></Form.Control>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="Password" placeholder="Password"></Form.Control>
          </Form.Group>
          <Button type="submit" variant="outline-primary">Login</Button>
        
      </Form>
      </Container>
    </div>
  );
}

export default Login;