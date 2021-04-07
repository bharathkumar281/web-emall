import React from "react";
import { Form, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import Header from "./HeaderComponent";
import { withRouter } from "react-router-dom";
import { colors } from "../constants/theme";
import AdminService from "../services/managementServices/AdminService";
import StaffService from "../services/clientServices/StaffService";
import { Button } from "./CustomComponents";

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
        this.setState({ isLoading: true });
        let elements = event.target.elements;
        let user = {
            email: elements.email.value,
            password: elements.password.value,
        };

        if (elements.isAdmin.checked) {
            AdminService.login(user)
                .then(response => response.data)
                .then(admin => {
                    if (admin === '') this.setState({ isLoading: false, errorMessage: 'Invalid credentials !' });
                    else {
                        console.log(admin);
                        this.setState({ isLoading: false });
                        sessionStorage.setItem('admin', JSON.stringify(admin));
                        this.props.history.push('/admin');
                    }
                })
                .catch(error => this.setState({
                    isLoading: false,
                    errorMessage: error.message
                }))
        }

        else {
            StaffService.login(user)
                .then(response => response.data)
                .then(staff => {
                    if (staff === '') this.setState({ isLoading: false, errorMessage: 'Invalid credentials !' });
                    else {
                        console.log(staff);
                        this.setState({ isLoading: false });
                        sessionStorage.setItem('user', JSON.stringify(staff));
                        this.props.history.push('/staff');
                    }
                })
                .catch(error => this.setState({
                    isLoading: false,
                    errorMessage: error.message
                }))
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
                            <Alert dismissible variant="danger" onClose={() => { this.setState({ errorMessage: null }) }}
                                style={{ background: colors.dark }}
                                className={errorMsg ? 'text-white' : 'd-none'}>{errorMsg}</Alert>
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
                                <Button className="add-shadow-small mr-3"
                                    type="submit" variant="dark">Login</Button>
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
