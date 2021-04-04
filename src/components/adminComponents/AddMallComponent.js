import React from "react";
import { Container, Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { colors } from "../../constants/theme";
import MallService from "../../services/managementServices/MallService";

class AddMall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.addMall = this.addMall.bind(this);
    }

    addMall(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        const elements = event.target.elements;
        const mall = {
            name: elements.name.value,
            branch: elements.branch.value,
            spaceCost: elements.spacecost.value
        }
        MallService.addMall(mall, this.props.user.adminId)
            .then(response => response.data)
            .then(mall => {
                if (mall === '') {
                    this.setState({
                        isLoading: false,
                        alertMsg: 'Mall already registered !'
                    });
                }
                else {
                    this.props.refresh();
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    alertMsg: error.message
                });
                console.log(error.message);
            });
    }

    render() {
        return (
            <Container fluid>
                <h1 className="pt-5">Register a Mall</h1>
                <hr />
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6}>
                        <Alert dismissible className={`add-shadow-small text-white ${this.state.alertMsg ? '' : 'd-none'}`}
                            style={{ background: colors.dark }} onClose={() => { this.setState({ alertMsg: null }) }} >
                            {this.state.alertMsg}
                        </Alert>
                        <Form onSubmit={(event) => { this.addMall(event) }}>
                            <Form.Group>
                                <Form.Label>Mall name:</Form.Label>
                                <Form.Control name="name" required className="add-shadow-small" placeholder="name of the mall"
                                    type="text" minLength="3" maxLength="20" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mall branch:</Form.Label>
                                <Form.Control name="branch" required className="add-shadow-small" placeholder="branch of the mall"
                                    type="text" minLength="3" maxLength="20" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Cost per Space (in rs):</Form.Label>
                                <Form.Control name="spacecost" required className="add-shadow-small"
                                    type="number" min={100} max={5000} placeholder="cost per day" />
                            </Form.Group>
                            <Button type="submit" className="add-shadow-small mr-3"
                                variant="dark" style={{ background: colors.dark }}>Add</Button>
                            <Spinner className={this.state.isLoading ? '' : 'd-none'}
                                animation="border" variant="primary" size="sm" />
                        </Form>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default AddMall;