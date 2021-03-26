import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import Header from "./HeaderComponent";

export const Login = () => {

    return (
        <div>
            <Header register home />
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" md="8" lg="6">
                        <Card>
                            <Card.Header className="bg-dark text-white">
                                <Card.Title>Login</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control name="email" type="email" placeholder="example@email.com"></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control name="password" type="Password" placeholder="Password"></Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="dark">Login</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
