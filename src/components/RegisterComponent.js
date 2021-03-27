import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "./HeaderComponent";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let elements = event.target.elements;
        let user = {
            email: elements.email.value,
            password: elements.password.value
        };
        console.log(user);
    }

    render() {
        return (
            <div className="Register pb-5">
                <Header home login title="Register" subtitle="as Administrator" />
                <Container>
                    <Row>
                        <Col xs="12" md="8" lg="6">
                            <Form onSubmit={(event) => this.handleSubmit(event)} model="feedback">

                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control name="username" type="text" placeholder="Username"></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address:</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="example@email.com"></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control name="password" type="Password" placeholder="Password"></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="conPassword">
                                    <Form.Label>Confirm Password:</Form.Label>
                                    <Form.Control type="Password" placeholder="Password"></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="dark" style={{background: '#162d50'}}>Register</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}