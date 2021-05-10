import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Button } from "./CustomComponents";
import { FaTrashAlt } from "react-icons/fa";

const Profile = (props) => {

    const rows = [];

    Object.entries(props.fields).forEach(([key, val]) => {
        rows.push(
            <dl className="row" key={key}>
                <dt className="col-4 col-md-5">{key}</dt>
                <dt className="col-8 col-md-7">{val}</dt>
            </dl>
        )
    });

    const Delbtn = () => {
        if (!props.del) return <></>
        return (
            <Button variant="danger" onClick={props.del}
                className="ml-2">
                <FaTrashAlt />
            </Button>
        );
    }

    const Refbtn = () => {
        if (!props.refresh) return <></>
        return (
            <Button variant='dark' className="ml-2"
                onClick={props.refresh}>
                <span className="fa fa-refresh"></span>
            </Button>
        );
    }

    return (
        <Container fluid className="pt-5">
            <h1>
                {props.title}
                <Refbtn />
                <Delbtn />
            </h1>
            <hr />
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="add-shadow-small border-0">
                        <Card.Body>
                            <Row className="justify-content-center">
                                <Col xs={5} md={3} className="align-self-center">
                                    <img className="img-fluid" src={props.img} alt="profile" />
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