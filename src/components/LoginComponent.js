import React from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Header from "./HeaderComponent";
import StaffService from '../services/clientServices/StaffService';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { errorClass: "d-none" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let elements = event.target.elements;
        let user = {
            email: elements.email.value,
            password: elements.password.value,
        };

        console.log(user);

        user = {
            "username": "client-2",
            "password": "cli123",
            "email": "cli2@gmail.com",
            "mallId": 1
        }
        
        StaffService.getAll()
        .then(response => console.log(response.data));
    }

    render() {
        return (
            <div>
                <Header register home title="Login" />
                <Container>
                    <Row>
                        <Col xs="12" md="8" lg="6">
                            <Alert variant="danger" className={this.state.errorClass}>{this.state.errorMessage}</Alert>
                            <Form onSubmit={(event) => this.handleSubmit(event)} >
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address:</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="example@email.com"
                                        required ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control name="password" type="Password" placeholder="Password" required
                                        maxLength="10" minLength="3"></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formRole">
                                    <Form.Check type="checkbox" label="login as Administrator" name="isAdmin" />
                                </Form.Group>
                                <Button type="submit" variant="dark" style={{ background: '#162d50' }}>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };
};
