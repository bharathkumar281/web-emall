import React, { Component } from "react";
import { Form, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { colors } from "../constants/theme";
import Header from "./HeaderComponent";
import AdminService from "../services/managementServices/AdminService";
import { withRouter } from "react-router";
import { Button } from "./CustomComponents";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const elements = event.target.elements;
        if (elements.password.value !== elements.cpassword.value) {
            this.setState({ errorMessage: 'Password and Confirm password do not match !' })
        }
        else {
            this.setState({ errorMessage: null, isLoading: true });
            const user = {
                username: elements.username.value,
                email: elements.email.value,
                password: elements.password.value
            }
            console.log(user);
            AdminService.addAdmin(user)
                .then(response => {
                    let msg = 'User Registered successfully !';
                    if (response.data === '') {
                        msg = 'User already registered !';
                    }
                    this.setState({ errorMessage: msg, isLoading: false });
                })
                .catch(error => this.setState({ errorMessage: error.message, isLoading: false }));
        }
    }

    render() {
        const errorMsg = this.state.errorMessage;
        return (
            <div className="Register pb-5">
                <Header home login title="Register" subtitle="as Administrator" />
                <Container>
                    <Row>
                        <Col xs="12" md="8" lg="6">
                            <Alert style={{ background: colors.dark, color: colors.light }}
                                variant="danger" dismissible onClose={() => { this.setState({ errorMessage: null }) }}
                                className={errorMsg ? '' : 'd-none'}>{errorMsg}</Alert>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>

                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control required
                                        className="add-shadow-small"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        minLength="3"
                                        maxLength="15" />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address:</Form.Label>
                                    <Form.Control required
                                        className="add-shadow-small"
                                        name="email"
                                        type="email"
                                        placeholder="example@email.com"
                                        minLength="3"
                                        maxLength="30" />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control required
                                        className="add-shadow-small"
                                        name="password"
                                        type="Password"
                                        placeholder="Password"
                                        minLength="4"
                                        maxLength="12" />
                                </Form.Group>

                                <Form.Group controlId="conPassword">
                                    <Form.Label>Confirm Password:</Form.Label>
                                    <Form.Control required
                                        className="add-shadow-small"
                                        name="cpassword"
                                        type="Password"
                                        placeholder="Password"
                                        minLength="4"
                                        maxLength="12" />
                                </Form.Group>
                                <Button type="submit" className="add-shadow-small mr-3" variant="dark">Register</Button>
                                <Spinner className={this.state.isLoading ? '' : 'd-none'} animation="border" variant="primary" size="sm" />
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default withRouter(Register);