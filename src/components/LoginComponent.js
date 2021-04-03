import React from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import Header from "./HeaderComponent";
import { withRouter } from "react-router-dom";
import { colors } from "../constants/theme";
// import StaffService from "../services/clientServices/StaffService";
// import AdminService from "../services/managementServices/AdminService";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let elements = event.target.elements;
        let user = {
            email: elements.email.value,
            password: elements.password.value,
        };

        if (elements.isAdmin.checked) {
            sessionStorage.setItem('admin', JSON.stringify(user));
            this.props.history.push('/admin');
        }

        else {
            sessionStorage.setItem('user', JSON.stringify(user));
            this.props.history.push('/staff');
        }
    }

    render() {
        const errorMsg = this.state.errorMessage;
        return (
            <div>
                <Header register home title="Login" />
                <Container>
                    <Row>
                        <Col xs="12" md="8" lg="6">
                            <Alert variant="danger" className={errorMsg ? '' : 'd-none'}>{errorMsg}</Alert>
                            <Form onSubmit={(event) => this.handleSubmit(event)} >
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

                                <Form.Group controlId="formRole">
                                    <Form.Check
                                        type="checkbox"
                                        label="login as Administrator"
                                        name="isAdmin" />
                                </Form.Group>
                                <Button className="add-shadow-small"
                                    type="submit" variant="dark"
                                    style={{ background: colors.dark }}>Login</Button>
                                <Spinner className={this.state.isLoading ? '' : 'd-none'}
                                    animation="border" variant="primary" size="sm" />
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };
};

export default withRouter(Login);
