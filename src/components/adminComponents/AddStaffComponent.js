import React from "react";
import { Container, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { colors } from "../../constants/theme";
import StaffService from "../../services/clientServices/StaffService";
import { Button } from "../CustomComponents";

class AddStaff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.addStaff = this.addStaff.bind(this);
    }

    addStaff(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        const elements = event.target.elements;
        const staff = {
            username: elements.username.value,
            password: elements.password.value,
            email: elements.email.value,
            mallId: this.props.mall.mallId
        }
        StaffService.addStaff(staff)
            .then(response => response.data)
            .then(staff => {
                let msg = staff === '' ? 'User already present !' : 'User added successfully !';
                this.setState({
                    isLoading: false,
                    alertMsg: msg
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    alertMsg: error.message
                });
            });
    }

    render() {
        return (
            <Container fluid>
                <h1 className="pt-5">Add Staff Members</h1>
                <hr />
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Alert dismissible className={`border-0 shadow text-white ${this.state.alertMsg ? '' : 'd-none'}`}
                            style={{ background: colors.dark }} onClose={() => { this.setState({ alertMsg: null }) }} >
                            {this.state.alertMsg}
                        </Alert>
                        <Form onSubmit={(event) => { this.addStaff(event) }}>
                            <Form.Group controlId="formUsername" >
                                <Form.Label>Username:</Form.Label>
                                <Form.Control name="username" required className="border-0 shadow" placeholder="username"
                                    type="text" minLength="3" maxLength="15" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name="password" required className="border-0 shadow" placeholder="password"
                                    type="password" minLength="4" maxLength="10" />
                            </Form.Group>
                            <Form.Group controlId="formEmail" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control name="email" required className="border-0 shadow"
                                    type="email" minLength="6" placeholder="example@email.com" />
                            </Form.Group>
                            <Button type="submit" className="shadow mr-3"
                                variant="dark">Add</Button>
                            <Spinner className={this.state.isLoading ? '' : 'd-none'}
                                animation="border" variant="primary" size="sm" />
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default AddStaff;