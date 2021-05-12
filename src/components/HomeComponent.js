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
            <Card className="shadow border-0 p-3 h-100" style={{borderRadius: '20px'}}>
                <Card.Img variant="top" src={props.image} className="p-5" />
                <Card.Body>
                    <h3>{props.title}</h3>
                    <p>{props.text}</p>
                </Card.Body>
            </Card>
        );
    }

    const Head = ({ textColor, btnColor, display }) => {
        return (
            <Container className={`${textColor} text-right pt-5 pb-5 mt-5 mb-5 ${display}`}>
                <h3 className="display-1">eMall</h3>
                <p className="lead">Manage spaces easily and effectively !</p>
                <div className="row justify-content-end pt-3">
                    <div className="col-auto">
                        <Link to="/login">
                            <div className={`btn btn-lg ${btnColor} btn-rounded`} >Sign In</div>
                        </Link>
                    </div>
                    <div className="col-auto">
                        <Link to="/register">
                            <div className={`btn btn-lg ${btnColor} btn-rounded`} >Sign Up</div>
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }

    return (
        <>
            <Jumbotron className="bg-warning" fluid style={
                {
                    background: `url(${images.shopping}) no-repeat`,
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}>
                <Head display="d-none d-lg-block" btnColor="btn-outline-dark" />
                <Head display="d-lg-none" textColor="text-light" btnColor="btn-outline-light" />
            </Jumbotron>
            <Container className="mt-5 pt-5 text-center mb-5">
                <h1 className="pb-5 mb-5 display-3">What is eMall ?</h1>
                <p className="lead">eMall is an application which provides a great Booking
					            Interface to manage Infrastructure spaces for Mall staff</p>
                <p className="lead">It also provides the facility to manage mall layout and staff members for Mall administrators</p>
                <Row className="justify-content-center pt-5">
                    <Col xs={12} md={5}>
                        <Image fluid src={images.shoppingGirl} />
                    </Col>
                </Row>
            </Container>
            <div className="w-100 bg-warning mt-5" style={{
                background: `url(${images.shopping}) no-repeat`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}>
                <Container className="pt-5 text-center" >
                    <h1 className="mb-5 display-3 text-dark d-none d-lg-block">Our Features</h1>
                    <h1 className="mb-5 display-3 text-white d-lg-none">Our Features</h1>
                    <h1 className="mt-5 mb-5 text-white d-lg-none">Mall Administrator</h1>
                    <h1 className="mt-5 mb-5 d-none d-lg-block">Mall Administrator</h1>
                    <div className="row justify-content-center align-items-stretch mb-5">
                        <Col xs={12} md={5} lg={4}>
                            <Feature title="Dashboard view" text="Analyse Revenue stats of the Mall Easily"
                                image={images.dashboard} />
                        </Col>
                        <Col xs={12} md={5} lg={4} className="mt-5 mt-md-0">
                            <Feature title="Manage layout" text="Easily create and Manage Architectural layout of the mall"
                                image={images.layout} />
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mt-5 mt-lg-0">
                            <Feature title="Manage Staff" text="Manage the Staff members and analyse their performance"
                                image={images.manageusers} />
                        </Col>
                    </div>
                    <h1 className="mt-5 pt-5 mb-5 d-none d-lg-block">Mall Staff Members</h1>
                    <h1 className="mt-5 pt-5 mb-5 text-white d-lg-none">Mall Staff Members</h1>
                    <div className="row justify-content-center align-items-stretch pb-5">
                        <Col xs={12} md={5} lg={4}>
                            <Feature title="Dashboard view" text="Analyse Booking stats on monthly basis"
                                image={images.dashboard} />
                        </Col>
                        <Col xs={12} md={5} lg={4} className="mt-5 mt-md-0">
                            <Feature title="Easy to use" text="Easily book mall spaces with our simple booking interface"
                                image={images.booking} />
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mt-5 mt-lg-0">
                            <Feature title="Booking Management" text="Users can instantaneously Create and Cancel bookings"
                                image={images.cancel} />
                        </Col>
                    </div>
                </Container>

            </div>

            <Footer />
        </>
    );
}

export default withRouter(Home);