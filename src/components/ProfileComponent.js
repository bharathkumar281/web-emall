import React from "react";
import { images } from "../constants/urls";
import { Card, Col, Container, Row } from "react-bootstrap";

const Profile = (props) => {
    const rows = props.fields.map(field => {
        return (
            <dl className="row" key={field.key}>
                <dt className="col-4 col-md-5">{field.key}</dt>
                <dt className="col-8 col-md-7">{field.val}</dt>
            </dl>
        );
    });
    return (
        <Container fluid className="pt-5 pb-5">
            <h1>Profile</h1>
            <hr />
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="add-shadow border-0">
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col xs={5} md={3} className="align-self-center">
                                    <img className="rounded-pill img-fluid" src={images.profile} alt="profile" />
                                </Col>
                                <Col xs={12} className="offset-0 offset-sm-2 offset-md-0 col-10 col-md-8 pt-5 pt-md-auto">
                                    {rows}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;