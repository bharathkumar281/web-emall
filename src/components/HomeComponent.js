import React from "react";
import { Card, Col, Container, Image, Jumbotron, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { images } from "../constants/urls";
import Footer from "./FooterComponent";

const Home = (props) => {

    if (sessionStorage.getItem('user')) props.history.push('/staff');

    const Feature = (props) => {
        return (
            <Card className="shadow border-0 p-3 h-100">
                <Card.Img variant="top" src={props.image} className="p-5" />
                <Card.Body>
                    <h2>{props.title}</h2>
                    <p>{props.text}</p>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Jumbotron fluid style={
                {
                    background: `url(${images.shopping}) no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <div className="container text-right pt-5 pb-5">
                    <h3 className="display-1">eMall</h3>
                    <p className="lead">Manage spaces easily and effectively !</p>
                    <div className="row justify-content-end pt-3">
                        <div className="col-auto">
                            <Link to="/login">
                                <div className="btn btn-lg btn-outline-dark btn-rounded" >Sign In</div>
                            </Link>
                        </div>
                        <div className="col-auto">
                            <Link to="/register">
                                <div className="btn btn-lg btn-outline-dark btn-rounded" >Sign Up</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Jumbotron>
            <Container className="pt-5 text-center pb-5">
                <h1 className="pb-5 mb-5 display-2">What is eMall ?</h1>
                <p className="lead">eMall is a web application which provides a great Booking
					            Interface to manage your Infrastructure spaces.</p>
                <p className="lead">eMall provides a platform to effectively and easily book spaces for mall staff</p>
                <p className="lead">It also provides the facility to manage mall layout and staff members for Mall administrator</p>
                <Row className="justify-content-center pt-5">
                    <Col xs={12} md={5}>
                        <Image fluid src={images.shoppingGirl} />
                    </Col>
                </Row>
            </Container>
            <hr />
            <Container className="pt-5 text-center">
                <h1 className="mb-5 display-2">Our Features</h1>
                <h1 className="mt-5 mb-5">Mall Administrator</h1>
                <div className="d-flex justify-content-center align-items-stretch mb-5 flex-column flex-md-row">
                    <Col xs={12} md={4} className="mt-5 mt-lg-0">
                        <Feature title="Dashboard view" text="Analyse Revenue stats of the Mall Easily"
                            image={images.dashboard} />
                    </Col>
                    <Col xs={12} md={4} className="mt-5 mt-lg-0">
                        <Feature title="Manage layout" text="Easily create and Manage Architectural layout of the mall"
                            image={images.layout} />
                    </Col>
                    <Col xs={12} md={4} className="mt-5 mt-lg-0">
                        <Feature title="Manage Staff" text="Manage the Staff members and analyse their performance"
                            image={images.manageusers} />
                    </Col>
                </div>
                <h1 className="mt-5 mb-5">Mall Staff Members</h1>
                <div className="d-flex justify-content-center align-items-stretch mb-5 flex-column flex-md-row">
                    <Col xs={12} md={4} className="mt-5 mt-md-0">
                        <Feature title="Dashboard view" text="Analyse Booking stats on monthly basis"
                            image={images.dashboard} />
                    </Col>
                    <Col xs={12} md={4} className="mt-5 mt-md-0">
                        <Feature title="Easy Bookings" text="Easily book mall spaces with our simple booking interface"
                            image={images.booking} />
                    </Col>
                    <Col xs={12} md={4} className="mt-5 mt-md-0">
                        <Feature title="Booking Management" text="Users can instantaneously Book and Cancel bookings anytime"
                            image={images.cancel} />
                    </Col>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default withRouter(Home);